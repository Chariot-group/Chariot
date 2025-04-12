import {
  BadRequestException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schemas/group.schema';
import { SortOrder } from 'mongoose';
import { GroupDocument } from './schemas/group.schema';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Model, Types } from 'mongoose';
import {
  Character,
  CharacterDocument,
} from '@/character/schemas/character.schema';
import { Campaign, CampaignDocument } from '@/campaign/schemas/campaign.schema';
import { CampaignGroupDto } from './dto/sub/campaigns.dto';

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

  async create(createGroupDto: CreateGroupDto) {
    try {
      const { characters = [], campaigns, ...groupData } = createGroupDto;

      const characterCheckPromises = characters.map((characterId) =>
        this.characterModel.findById(characterId).exec(),
      );
      const characterCheckResults = await Promise.all(characterCheckPromises);
      const invalidCharacters = characterCheckResults.filter((character) => !character);
      if (invalidCharacters.length > 0) {
        const invalidCharacterIds = characters.filter(
          (_, index) => !characterCheckResults[index],
        );
        const message = `Invalid characters IDs: ${invalidCharacterIds.join(', ')}`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      const campaignCheckPromises = campaigns.map((campaign) =>
        this.campaignModel.findById(campaign.idCampaign).exec(),
      );
      const campaignCheckResults = await Promise.all(campaignCheckPromises);
      const invalidCampaigns = campaignCheckResults.filter((campaign) => !campaign);
      if (invalidCampaigns.length > 0) {
        const invalidCampaignIds = campaigns.map((campaign) => campaign.idCampaign).filter(
          (_, index) => !campaignCheckResults[index],
        );
        const message = `Invalid campaign IDs: ${invalidCampaignIds.join(', ')}`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      const start: number = Date.now();
      const group = await this.groupModel.create({
        ...groupData,
        characters,
        campaigns: campaigns.map((campaign) => campaign.idCampaign),
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
    }catch(error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const errorMessage = `Error while creating group: ${error.message}`;
      this.logger.error(errorMessage);
      throw new InternalServerErrorException(errorMessage);
    }
  }

  async findAll(
    query: { page?: number; offset?: number; label?: string; sort?: string },
    campaignId?: string, type: "all" | "main" | "npc" | "archived" = "all",
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
        label: { $regex: `${label}`, $options: 'i' },
        deletedAt: { $eq: null },
      };

      if (campaignId) {
        const campaign = await this.campaignModel.findById(campaignId).lean();
        if(!campaign) {
          const message = `Error while fetching groups: Campaign ${campaignId} not found`;
          this.logger.error(message, null, this.SERVICE_NAME);
          throw new NotFoundException(message);
        }
        
        let groupIds: string[] = [];
        if (type === 'all') {
          groupIds = [
            ...(campaign.groups?.main || []).map((group: any) => group.toString()),
            ...(campaign.groups?.npc || []).map((group: any) => group.toString()),
            ...(campaign.groups?.archived || []).map((group: any) => group.toString())
          ];
        } else {
          groupIds = (campaign.groups?.[type] || []).map((group: any) => group.toString());
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
      let group = await this.groupModel.findById(id).populate('campaigns').exec();

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

      //Vérification ids characters
      if(characters) {
        const invalidIds = [];
        characters.forEach((character) => {
          if (!Types.ObjectId.isValid(character)) {
            invalidIds.push(character);
          }
        });
        if(invalidIds.length > 0) {
          const message = `These are not valid mongoose Ids: ${invalidIds.join(', ')}`;
          this.logger.error(message, null, this.SERVICE_NAME);
          throw new BadRequestException(message);
        }
        const characterCheckPromises = characters.map((characterId) =>
          this.characterModel.findById(characterId).exec(),
        );
        const characterCheckResults = await Promise.all(characterCheckPromises);
        const invalidCharacters = characterCheckResults.filter((character) => !character);
        if (invalidCharacters.length > 0) {
          const invalidCharacterIds = characters.filter(
            (_, index) => !characterCheckResults[index],
          );
          const message = `Invalid characters IDs: ${invalidCharacterIds.join(', ')}`;
          this.logger.error(message, null, this.SERVICE_NAME);
          throw new NotFoundException(message);
        }
        const deletedCharacters = characterCheckResults.filter((character) => character.deletedAt);
        if (deletedCharacters.length > 0) {
          const deletedCharacterIds = characters.filter(
            (_, index) => characterCheckResults[index].deletedAt,
          );
          const message = `These characters are already deleted: ${deletedCharacterIds.join(', ')}`;
          this.logger.error(message, null, this.SERVICE_NAME);
          throw new GoneException(message);
        }
      }else{
        characters = group.characters.map((character) => character._id.toString());
      }

      let campaignIds: string[] = [];
      if(campaigns) {
        const invalidIds = [];
        campaigns.forEach((campaign) => {
          if (!Types.ObjectId.isValid(campaign.idCampaign)) {
            invalidIds.push(campaign.idCampaign);
          }
        });
        if(invalidIds.length > 0) {
          const message = `These are not valid mongoose Ids: ${invalidIds.join(', ')}`;
          this.logger.error(message, null, this.SERVICE_NAME);
          throw new BadRequestException(message);
        }
        const campaignCheckPromises = campaigns.map((campaign) =>
          this.campaignModel.findById(campaign.idCampaign).exec(),
        );
        const campaignCheckResults = await Promise.all(campaignCheckPromises);
        const invalidCampaigns = campaignCheckResults.filter((campaign) => !campaign);
        if (invalidCampaigns.length > 0) {
          const invalidCampaignIds = campaigns.map((campaign) => campaign.idCampaign).filter(
            (_, index) => !campaignCheckResults[index],
          );
          const message = `Invalid campaign IDs: ${invalidCampaignIds.join(', ')}`;
          this.logger.error(message, null, this.SERVICE_NAME);
          throw new NotFoundException(message);
        }
        const deletedCampaigns = campaignCheckResults.filter((campaign) => campaign.deletedAt);
        if (deletedCampaigns.length > 0) {
          const deletedCampaignIds = campaigns.filter(
            (_, index) => campaignCheckResults[index].deletedAt,
          ).map((campaign) => campaign.idCampaign);
          const message = `These campaigns are already deleted: ${deletedCampaignIds.join(', ')}`;
          this.logger.error(message, null, this.SERVICE_NAME);
          throw new GoneException(message);
        }
        campaignIds = campaigns.map((campaign) => campaign.idCampaign);
      }else {
        campaignIds = group.campaigns.map((campaign) => campaign._id.toString());
      }

      const charactersToRemove = group.characters.filter(
        (oldCharacter) => !characters.some((newCharacters) => newCharacters === oldCharacter._id.toString()),
      );

      const start: number = Date.now();
      const groupUpdate = await this.groupModel
        .updateOne(
          { _id: id }, 
          {
            ...groupData,
            characters,
            campaigns: campaignIds,
          }
        )
        .exec();
      group = await this.groupModel.findById(id).populate('campaigns').populate('characters').exec();
      
      await this.characterModel.updateMany(
        { _id: { $in: characters.map((id) => id) } },
        { $addToSet: { groups: id } },
      );
      await this.characterModel.updateMany(
        { _id: { $in: charactersToRemove } },
        { $pull: { groups: id } },
      );

      if(campaigns){
        campaigns.forEach(async (newCampaign) => {
          ["main", "npc", "archived"].forEach(async (type) => {
            const campaignId = newCampaign.idCampaign;
            await this.campaignModel.updateMany(
              { _id: campaignId },
              { $pull: { [`groups.${type}`]: id } },
            );
          })
        })
  
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
