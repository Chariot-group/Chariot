import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from './schemas/group.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class GroupService {

    constructor(
      @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    ) {}
  
    private readonly SERVICE_NAME = GroupService.name;
    private readonly logger = new Logger(this.SERVICE_NAME);

  create(createGroupDto: CreateGroupDto) {
    return 'This action adds a new group';
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  async remove(id: string) {
    try{

      if (!Types.ObjectId.isValid(id)) {
        const message = `Error while deleting group #${id}: Id is not a valid mongoose id`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      const start: number = Date.now();
      const group = await this.groupModel.findById(id).exec();

      if(!group){
        const message = `Error while deleting group #${id}: Group not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }

      group.characters.forEach(async character => {
        console.log(character);
        //TODO: delete character
      });

      const end: number = Date.now();
      const message = `Group delete in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: group,
      };

    }catch(error){
      const message = `Error while deleting group #${id}: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }
}
