import {
  BadRequestException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { CreateCampaignDto } from '@/campaign/dto/create-campaign.dto';
import { UpdateCampaignDto } from '@/campaign/dto/update-campaign.dto';
import { Campaign, CampaignDocument } from '@/campaign/schemas/campaign.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from '@/group/schemas/group.schema';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  private readonly logger = new Logger(CampaignService.name);
  private readonly SERVICE_NAME = CampaignService.name;

  async create(createCampaignDto: CreateCampaignDto, userId: string) {
    try {
      const { groups, ...campaignData } = createCampaignDto;
      const totalGroups = groups.main.concat(groups.npc, groups.archived);

      const groupCheckPromises = totalGroups.map((groupId) =>
        this.groupModel.findById(groupId).exec(),
      );
      const groupCheckResults = await Promise.all(groupCheckPromises);
      // Si un ou plusieurs groupes ne sont pas trouvés, on log et on lève une erreur
      const invalidGroups = groupCheckResults.filter((group) => !group);
      if (invalidGroups.length > 0) {
        const invalidGroupIds = totalGroups.filter(
          (_, index) => !groupCheckResults[index],
        );
        const message = `Invalid group IDs: ${invalidGroupIds.join(', ')}`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      const start: number = Date.now();
      const campaign = await this.campaignModel.create({
        ...campaignData,
        groups,
        createdBy: userId,
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
      if (error instanceof BadRequestException) {
        throw error;
      }
      const message = `Error while creating campaign: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }

  async findAll(query: {
    page?: number;
    offset?: number;
    sort?: string;
    label?: string;
  }) {
    try {
      const { page = 1, offset = 10, label = '' } = query;
      const skip = (page - 1) * offset;

      const filter = {
        label: { $regex: `${label}`, $options: 'i' },
        deletedAt: { $eq: null },
      };

      const sort: { [key: string]: 1 | -1 } = { updatedAt: -1 };

      if (query.sort) {
        query.sort.startsWith('-')
          ? (sort[query.sort.substring(1)] = -1)
          : (sort[query.sort] = 1);
      }

      const totalItems = await this.campaignModel.countDocuments(filter);

      const start: number = Date.now();
      const campaigns = await this.campaignModel
        .find(filter)
        .skip(skip)
        .limit(offset)
        .sort(sort)
        .exec();
      const end: number = Date.now();

      const message = `Campaigns found in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: campaigns,
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
      if (!Types.ObjectId.isValid(id)) {
        const message = `Error while fetching campaign ${id}: Id is not a valid mongoose id`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      const start: number = Date.now();
      const campaign = await this.campaignModel
        .findById(id)
        .populate({ path: 'groups.main', populate: { path: 'characters' } })
        .populate({ path: 'groups.npc', populate: { path: 'characters' } })
        .populate({ path: 'groups.archived', populate: { path: 'characters' } })
        .exec();
      const end: number = Date.now();

      if (!campaign) {
        const message = `Campaign ${id} not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }

      if (campaign.deletedAt) {
        const message = `Campaign ${id} is gone`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new GoneException(message);
      }

      const message = `Campaign found in ${end - start}ms`;
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

      const message = `Error while fetching campaign ${id}: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }

  update(id: number, updateCampaignDto: UpdateCampaignDto) {
    return `This action updates a #${id} campaign`;
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        const message = `Error while deleting campaign #${id}: Id is not a valid mongoose id`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      const start: number = Date.now();

      const campaign = await this.campaignModel.findById(id).exec();
      if (!campaign) {
        const message = `Campaign #${id} not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }

      if (campaign.deletedAt) {
        const message = `Campaign #${id} already deleted`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new GoneException(message);
      }

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

      const message = `Campaign delete in ${end - start}ms`;
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

      const message = `Error while deleting character ${id}: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }
}
