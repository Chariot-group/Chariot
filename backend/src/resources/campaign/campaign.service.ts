import {
  BadRequestException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCampaignDto } from '@/resources/campaign/dto/create-campaign.dto';
import { UpdateCampaignDto } from '@/resources/campaign/dto/update-campaign.dto';
import { Campaign, CampaignDocument } from '@/resources/campaign/schemas/campaign.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from '@/resources/group/schemas/group.schema';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  private readonly logger = new Logger(CampaignService.name);
  private readonly SERVICE_NAME = CampaignService.name;

  private async validateGroupRelations(
    groupIds: string[],
    type: 'Main' | 'NPC' | 'Archived',
  ): Promise<void> {
    if (!groupIds || groupIds.length === 0) return;

    for (const groupId of groupIds) {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new BadRequestException(`Invalid ${type} group ID: ${groupId}`);
      }

      const group = await this.groupModel.findById(groupId).exec();

      if (!group) {
        throw new NotFoundException(`${type} group not found: ${groupId}`);
      }

      if (group.deletedAt) {
        throw new GoneException(`${type} group deleted: ${groupId}`);
      }
    }
  }

  private async validateResource(id: string): Promise<void> {

    if (!Types.ObjectId.isValid(id)) {
      const message = `Error while fetching campaign #${id}: Id is not a valid mongoose id`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new BadRequestException(message);
    }
    const campaign = await this.campaignModel.findById(id).exec();

    if (!campaign) {
      const message = `Campaign #${id} not found`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new NotFoundException(message);
    }

    if (campaign.deletedAt) {
      const message = `Campaign #${id} is gone`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new GoneException(message);
    }
  }

  async create(createCampaignDto: CreateCampaignDto, userId: string) {
    try {
      const { groups, ...campaignData } = createCampaignDto;
      const totalGroups = groups.main.concat(groups.npc, groups.archived);

      await this.validateGroupRelations(createCampaignDto.groups.main, 'Main');
      await this.validateGroupRelations(createCampaignDto.groups.npc, 'NPC');
      await this.validateGroupRelations(
        createCampaignDto.groups.archived,
        'Archived',
      );

      const start: number = Date.now();
      const campaign = await this.campaignModel.create({
        ...campaignData,
        groups,
        createdBy: new Types.ObjectId(userId),
      });
      await this.groupModel.updateMany(
        { _id: { $in: totalGroups.map((id) => id) } },
        { $addToSet: { campaigns: campaign._id } },
      );
      const end: number = Date.now();

      const message = `Campaign created in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: campaign,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof GoneException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      const message = `Error while creating campaign: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }

  async findAllByUser(
    userId: string,
    query: {
      page?: number;
      offset?: number;
      sort?: string;
      label?: string;
    },
  ) {
    try {
      const { page = 1, offset = 10, label = '' } = query;
      const skip = (page - 1) * offset;

      const filters = {
        label: { $regex: `${decodeURIComponent(label)}`, $options: 'i' },
        deletedAt: { $eq: null },
        createdBy: new Types.ObjectId(userId),
      };

      const sort: { [key: string]: 1 | -1 } = { updatedAt: -1 };

      if (query.sort) {
        query.sort.startsWith('-')
          ? (sort[query.sort.substring(1)] = -1)
          : (sort[query.sort] = 1);
      }

      const totalItems = await this.campaignModel.countDocuments(filters);

      const start: number = Date.now();
      const campaigns = await this.campaignModel
        .find(filters)
        .skip(skip)
        .limit(offset)
        .sort(sort)
        .populate({
          path: 'groups.main',
          match: { deletedAt: null },
          select: '_id',
        })
        .populate({
          path: 'groups.npc',
          match: { deletedAt: null },
          select: '_id',
        })
        .populate({
          path: 'groups.archived',
          match: { deletedAt: null },
          select: '_id',
        })
        .exec();
      const end: number = Date.now();

      let campaignsWithGroupsClean = campaigns.map(doc => ({
        ...doc.toObject(),
        groups: {
          main: doc.groups.main.map(group => group._id),
          npc: doc.groups.npc.map(group => group._id),
          archived: doc.groups.archived.map(group => group._id),
        },
      }))

      const message = `Campaigns found in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: campaignsWithGroupsClean,
        pagination: {
          page,
          offset,
          totalItems,
        },
      };
    } catch (error) {
      const message = `Error while fetching campaigns: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }

  async findOne(id: string) {
    try {

      await this.validateResource(id);
      
      const start: number = Date.now();
      const campaign = await this.campaignModel
        .findById(id)
        .populate({ path: 'groups.main', populate: { path: 'characters' } })
        .populate({ path: 'groups.npc', populate: { path: 'characters' } })
        .populate({ path: 'groups.archived', populate: { path: 'characters' } })
        .exec();
      const end: number = Date.now();

      const message = `Campaign #${id} found in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: campaign,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof GoneException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      const message = `Error while fetching campaign #${id}: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }

  async update(id: string, updateCampaignDto: UpdateCampaignDto) {
    try {
      
      await this.validateResource(id);

      if (updateCampaignDto.groups) {
        await this.validateGroupRelations(
          updateCampaignDto.groups.main,
          'Main',
        );
        await this.validateGroupRelations(updateCampaignDto.groups.npc, 'NPC');
        await this.validateGroupRelations(
          updateCampaignDto.groups.archived,
          'Archived',
        );
      }


      const start = Date.now();

      // Find existing campaign
      const existingCampaign = await this.campaignModel.findById(id);

      // Handle label update attempt
      if (
        updateCampaignDto.label &&
        updateCampaignDto.label !== existingCampaign.label
      ) {
        const message = `Campaign label cannot be modified`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      // Handle groups update if present
      if (updateCampaignDto.groups) {
        const { main = [], npc = [], archived = [] } = updateCampaignDto.groups;
        const newGroupIds = [...main, ...npc, ...archived];
        const currentGroupIds = [
          ...existingCampaign.groups.main,
          ...existingCampaign.groups.npc,
          ...existingCampaign.groups.archived,
        ].map((id) => id.toString());

        // Remove campaign from old groups
        const groupsToRemove = currentGroupIds.filter(
          (id) => !newGroupIds.includes(id),
        );
        if (groupsToRemove.length > 0) {
          await this.groupModel.updateMany(
            { _id: { $in: groupsToRemove } },
            { $pull: { campaigns: id } },
          );
        }

        // Add campaign to new groups
        const groupsToAdd = newGroupIds.filter(
          (id) => !currentGroupIds.includes(id),
        );
        if (groupsToAdd.length > 0) {
          await this.groupModel.updateMany(
            { _id: { $in: groupsToAdd } },
            { $addToSet: { campaigns: id } },
          );
        }
      }

      // Update campaign
      const updatedCampaign = await this.campaignModel
        .findByIdAndUpdate(
          id,
          {
            ...updateCampaignDto,
            updatedAt: new Date(),
          },
          { new: true },
        )
        .populate([
          { path: 'groups.main', populate: { path: 'characters' } },
          { path: 'groups.npc', populate: { path: 'characters' } },
          { path: 'groups.archived', populate: { path: 'characters' } },
        ]);

      const end = Date.now();

      const message = `Campaign #${id} updated in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);

      return {
        message: message,
        data: updatedCampaign,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof GoneException
      ) {
        throw error;
      }
      const message = `Error updating campaign #${id}: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }

  async remove(id: string) {
    try {
      await this.validateResource(id);

      const start: number = Date.now();

      const campaign = await this.campaignModel.findById(id).exec();

      campaign.deletedAt = new Date();
      campaign.groups.main.forEach(async (groupId) => {
        await this.groupModel
          .updateOne({ _id: groupId }, { $pull: { campaign: id } })
          .exec();
      });
      campaign.groups.main = [];
      campaign.groups.npc = [];
      campaign.groups.archived = [];
      await campaign.save();

      const end: number = Date.now();

      const message = `Campaign #${id} delete in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: campaign,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof GoneException
      ) {
        throw error;
      }

      const message = `Error while deleting campaign #${id}: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }
}
