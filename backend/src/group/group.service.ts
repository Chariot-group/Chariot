import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from './schemas/group.schema';
import { SortOrder } from 'mongoose';
import { GroupDocument } from './schemas/group.schema';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { group } from 'console';

@Injectable()
export class GroupService {

   constructor(
        @InjectModel(Group.name) private groupModel: Model<GroupDocument>){}
  
    private readonly SERVICE_NAME = GroupService.name;
    private readonly logger = new Logger(this.SERVICE_NAME);

  create(createGroupDto: CreateGroupDto) {
    return 'This action adds a new group';
  }

  async findAll(query: { page?: number; offset?: number; label?: string; sort?: string }, campaignId?: string) {
    try {
      const { label = "", page = 1, offset = 10, sort = "updatedAt" } = query;

      let sortCriteria: { [key: string]: SortOrder } = { updatedAt: 'asc' };
      if (query.sort) {
        query.sort.startsWith("-")
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

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
