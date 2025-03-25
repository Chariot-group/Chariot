import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Character, CharacterDocument } from './schemas/character.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class CharacterService {

  constructor(
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>){}

  private readonly SERVICE_NAME = CharacterService.name;
  private readonly logger = new Logger(this.SERVICE_NAME);

  create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  findAll() {
    return `This action returns all character`;
  }

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  async remove(id: string) {
    try{
      if (!Types.ObjectId.isValid(id)) {
        const message = `Error while deleting character #${id}: Id is not a valid mongoose id`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      const start: number = Date.now();
      const character = await this.characterModel.updateOne({_id: id}, {deletedAt: new Date()}).exec();
      const end: number = Date.now();

      if (!character) {
        const message = `Character #${id} not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }
      
      const message = `Character delete in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: character,
      };
    }catch(error){
      const message = `Error while deleting character ${id}: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }
}
