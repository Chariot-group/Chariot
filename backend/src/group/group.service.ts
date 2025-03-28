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

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  private readonly SERVICE_NAME = GroupService.name;
  private readonly logger = new Logger(this.SERVICE_NAME);

  create(createGroupDto: CreateGroupDto) {
    return 'This action adds a new group';
  }

  async findAll(
    query: { page?: number; offset?: number; label?: string; sort?: string },
    campaignId?: string,
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
        filters['campaigns'] = { $in: [campaignId] };
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

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
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
