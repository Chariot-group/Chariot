import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  GoneException,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Character, CharacterDocument } from './schemas/character.schema';
import { Model, SortOrder, Types } from 'mongoose';
import { Group } from '@/group/schemas/group.schema';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
    @InjectModel(Group.name) private groupModel: Model<CharacterDocument>,
  ) {}

  private readonly SERVICE_NAME = CharacterService.name;
  private readonly logger = new Logger(this.SERVICE_NAME);

  create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  async findAll(
    query: { page?: number; offset?: number; name?: string; sort?: string },
    groupId?: string,
  ) {
    try {
      console.log(query.page, query.sort);
      let { name = '', page = 1, offset = 10 } = query;
      let sort: { [key: string]: SortOrder } = { updatedAt: 'asc' };
      if (query.sort) {
        query.sort.startsWith('-')
          ? (sort[query.sort.substring(1)] = 'desc')
          : (sort[query.sort] = 'asc');
      }
      const filters = {
        name: { $regex: `${name}`, $options: 'i' },
        deletedAt: { $eq: null },
      };
      if (groupId) {
        filters['groups'] = { $in: [groupId] };
      }
      const start: number = Date.now();
      const characters = await this.characterModel
        .find(filters)
        .sort(sort)
        .limit(offset)
        .skip((page - 1) * offset);
      const nbCharacters = await this.characterModel.countDocuments(filters);
      const end: number = Date.now();

      let message = `Characters found in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message: message,
        data: characters,
        pagination: {
          page: page,
          offset: offset,
          total: nbCharacters,
        },
      };
    } catch (error) {
      const message = `Error while fetching characters: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }

  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        const message = `Error while fetching character ${id}: Id is not a valid mongoose id`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      const start: number = Date.now();
      const character = await this.characterModel
        .findById(id)
        .populate('groups')
        .exec();
      const end: number = Date.now();

      if (!character) {
        const message = `Character ${id} not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }

      if (character.deletedAt) {
        const message = `Character ${id} is gone`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new GoneException(message);
      }

      const message = `Character found in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: character,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof GoneException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      const message = `Error while fetching character ${id}: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        const message = `Error while deleting character #${id}: Id is not a valid mongoose id`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      const start: number = Date.now();

      const character = await this.characterModel.findById(id).exec();
      if (!character) {
        const message = `Character #${id} not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }

      if (character.deletedAt) {
        const message = `Character #${id} already deleted`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new GoneException(message);
      }

      character.deletedAt = new Date();
      character.groups.forEach(async (groupId) => {
        await this.groupModel
          .updateOne({ _id: groupId }, { $pull: { characters: id } })
          .exec();
      });
      await character.save();

      const end: number = Date.now();

      const message = `Character delete in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: character,
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
