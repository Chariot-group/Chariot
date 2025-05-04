import {
  BadRequestException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from '@/group/schemas/group.schema';
import { SortOrder } from 'mongoose';
import { GroupDocument } from '@/group/schemas/group.schema';
import { CreateGroupDto } from '@/group/dto/create-group.dto';
import { UpdateGroupDto } from '@/group/dto/update-group.dto';
import { Model, Types } from 'mongoose';
import {
  Character,
  CharacterDocument,
} from '@/character/schemas/character.schema';
import { Campaign, CampaignDocument } from '@/campaign/schemas/campaign.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  private readonly SERVICE_NAME = GroupService.name;
  private readonly logger = new Logger(this.SERVICE_NAME);

  private async validateCharacterRelations(
    characterIds: string[],
  ): Promise<void> {
    if (!characterIds || characterIds.length === 0) return;

    for (const characterId of characterIds) {
      if (!Types.ObjectId.isValid(characterId)) {
        throw new BadRequestException(`Invalid character ID: ${characterId}`);
      }

      const character = await this.characterModel.findById(characterId).exec();

      if (!character) {
        throw new NotFoundException(`Character not found: ${characterId}`);
      }

      if (character.deletedAt) {
        throw new GoneException(`Character deleted: ${characterId}`);
      }
    }
  }

  private async validatecampaignRelations(
    campaignIds: string[],
  ): Promise<void> {
    if (!campaignIds || campaignIds.length === 0) return;

    for (const campaignId of campaignIds) {
      if (!Types.ObjectId.isValid(campaignId)) {
        throw new BadRequestException(`Invalid campaign ID: ${campaignId}`);
      }

      const campaign = await this.campaignModel.findById(campaignId).exec();

      if (!campaign) {
        throw new NotFoundException(`Campaign not found: ${campaignId}`);
      }

      if (campaign.deletedAt) {
        throw new GoneException(`Campaign deleted: ${campaignId}`);
      }
    }
  }

  async create(createGroupDto: CreateGroupDto, userId: string) {
    try {
      const { characters = [], campaigns, ...groupData } = createGroupDto;

      await this.validateCharacterRelations(characters);
      await this.validatecampaignRelations(
        campaigns.map((campaign) => campaign.idCampaign),
      );

      const start: number = Date.now();
      const group = await this.groupModel.create({
        ...groupData,
        characters,
        campaigns: campaigns.map((campaign) => campaign.idCampaign),
        createdBy: userId,
      });

      await this.characterModel.updateMany(
        { _id: { $in: characters.map((id) => id) } },
        { $addToSet: { groups: group._id } },
      );
      campaigns.forEach(async (campaign) => {
        const type = campaign.type;
        const campaignId = campaign.idCampaign;
        await this.campaignModel.updateMany(
          { _id: campaignId },
          { $addToSet: { [`groups.${type}`]: group._id } },
        );
      });
      const end: number = Date.now();

      const message = `Group created in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: group,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof GoneException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      const errorMessage = `Error while creating group: ${error.message}`;
      this.logger.error(errorMessage);
      throw new InternalServerErrorException(errorMessage);
    }
  }

  async findAllByUser(
    userId: string,
    query: { page?: number; offset?: number; label?: string; sort?: string },
    campaignId?: string,
    type: 'all' | 'main' | 'npc' | 'archived' = 'all',
  ) {
    try {
      const { label = '', page = 1, offset = 10, sort = 'updatedAt' } = query;

      let sortCriteria: { [key: string]: SortOrder } = { updatedAt: 'asc' };
      if (query.sort) {
        query.sort.startsWith('-')
          ? (sortCriteria[query.sort.substring(1)] = 'desc')
          : (sortCriteria[query.sort] = 'asc');
      }

      const filters: any = {
        label: { $regex: `${decodeURIComponent(label)}`, $options: 'i' },
        deletedAt: { $eq: null },
        createdBy: new Types.ObjectId(userId),
      };

      if (campaignId) {
        const campaign = await this.campaignModel.findById(campaignId).lean();
        if (!campaign) {
          const message = `Error while fetching groups: Campaign ${campaignId} not found`;
          this.logger.error(message, null, this.SERVICE_NAME);
          throw new NotFoundException(message);
        }

        let groupIds: string[] = [];
        if (type === 'all') {
          groupIds = [
            ...(campaign.groups?.main || []).map((group: any) =>
              group.toString(),
            ),
            ...(campaign.groups?.npc || []).map((group: any) =>
              group.toString(),
            ),
            ...(campaign.groups?.archived || []).map((group: any) =>
              group.toString(),
            ),
          ];
        } else {
          groupIds = (campaign.groups?.[type] || []).map((group: any) =>
            group.toString(),
          );
        }

        filters['campaigns'] = { $in: [campaignId] };
        filters['_id'] = { $in: groupIds };
      }

      const start: number = Date.now();
      const groups = await this.groupModel
        .find(filters)
        .sort(sortCriteria)
        .limit(offset)
        .skip((page - 1) * offset);

      const totalItems = await this.groupModel.countDocuments(filters);
      const end: number = Date.now();

      const message = `Groups found in ${end - start}ms`;
      this.logger.verbose(message);

      return {
        message: message,
        data: groups,
        pagination: {
          page: page,
          offset: offset,
          total: totalItems,
        },
      };
    } catch (error) {
      const errorMessage = `Error while fetching groups: ${error.message}`;
      this.logger.error(errorMessage);
      throw new InternalServerErrorException(errorMessage);
    }
  }

  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        const message = `Error while fetching group ${id}: Id is not a valid mongoose id`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      const start: number = Date.now();
      const group = await this.groupModel
        .findById(id)
        .populate('characters')
        .populate('campaigns')
        .exec();
      const end: number = Date.now();

      if (!group) {
        const message = `Group ${id} not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }

      if (group.deletedAt) {
        const message = `Group ${id} is gone`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new GoneException(message);
      }

      const message = `Group found in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: group,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof GoneException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      const message = `Error while fetching group ${id}: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    try {
      let { characters, campaigns, ...groupData } = updateGroupDto;

      if (!Types.ObjectId.isValid(id)) {
        const message = `Error while updating group #${id}: Id is not a valid mongoose id`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }
      let group = await this.groupModel
        .findById(id)
        .populate('campaigns')
        .exec();

      if (!group) {
        const message = `Group #${id} not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }

      if (group.deletedAt) {
        const message = `Group #${id} already deleted`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new GoneException(message);
      }

      if (characters) {
        await this.validateCharacterRelations(characters);
      }

      if (campaigns) {
        await this.validatecampaignRelations(
          campaigns.map((campaign) => campaign.idCampaign),
        );
      }
      let campaignIds = group.campaigns.map((campaign) =>
        campaign._id.toString(),
      );
      if (campaigns) {
        campaignIds = campaigns.map((campaign) => campaign.idCampaign);
      }

      let charactersToRemove = [];
      if (characters) {
        charactersToRemove = group.characters.filter(
          (oldCharacter) =>
            !characters.some(
              (newCharacters) => newCharacters === oldCharacter._id.toString(),
            ),
        );
      }

      const start: number = Date.now();
      const groupUpdate = await this.groupModel
        .updateOne(
          { _id: id },
          {
            ...groupData,
            characters,
            campaigns: campaignIds,
          },
        )
        .exec();
      group = await this.groupModel
        .findById(id)
        .populate('campaigns')
        .populate('characters')
        .exec();

      if (characters) {
        await this.characterModel.updateMany(
          { _id: { $in: characters.map((id) => id) } },
          { $addToSet: { groups: id } },
        );
        await this.characterModel.updateMany(
          { _id: { $in: charactersToRemove } },
          { $pull: { groups: id } },
        );
      }

      if (campaigns) {
        campaigns.forEach(async (newCampaign) => {
          ['main', 'npc', 'archived'].forEach(async (type) => {
            const campaignId = newCampaign.idCampaign;
            await this.campaignModel.updateMany(
              { _id: campaignId },
              { $pull: { [`groups.${type}`]: id } },
            );
          });
        });

        campaigns.forEach(async (campaign) => {
          const type = campaign.type;
          const campaignId = campaign.idCampaign;
          await this.campaignModel.updateMany(
            { _id: campaignId },
            { $addToSet: { [`groups.${type}`]: id } },
          );
        });
      }

      const end: number = Date.now();

      if (groupUpdate.modifiedCount === 0) {
        const message = `Group #${id} not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }

      const message = `Group update in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: group,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof GoneException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      const message = `Error while updating group: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        const message = `Error while deleting group #${id}: Id is not a valid mongoose id`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      const group = await this.groupModel.findById(id).exec();

      if (!group) {
        const message = `Error while deleting group #${id}: Group not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }

      if (group.deletedAt) {
        const message = `Error while deleting group #${id}: Group already deleted`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new GoneException(message);
      }

      const start: number = Date.now();
      group.deletedAt = new Date();

      const updated = await this.characterModel
        .updateMany(
          { _id: { $in: group.characters } },
          { $pull: { groups: id } },
        )
        .exec();

      group.characters = [];
      group.save();

      const end: number = Date.now();

      const message = `Group delete in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: group,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof GoneException
      ) {
        throw error;
      }
      const message = `Error while deleting group #${id}: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }
}
