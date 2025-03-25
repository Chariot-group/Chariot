import { Injectable, Logger } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Character, CharacterDocument } from './schemas/character.schema';
import { Model, SortOrder } from 'mongoose';
@Injectable()
export class CharacterService {

  constructor(
      @InjectModel(Character.name) private characterModel: Model<CharacterDocument>){}

  private readonly SERVICE_NAME = CharacterService.name;
  private readonly logger = new Logger(this.SERVICE_NAME);

  create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  async findAll(query: {page?: number, offset?: number, name?: string, sort?: string}, campaign?: string) {
    try{
      console.log(query.page, query.sort);
      let {name = "", page = 1, offset = 10} = query;
      let sort: { [key: string]: SortOrder } = { updatedAt: 'asc' };
      if(query.sort){
        query.sort.startsWith("-") ? sort[query.sort.substring(1)] = 'desc' : sort[query.sort] = 'asc';
      }
      const filters = {name: { $regex: `${name}`, $options: 'i' }, deletedAt: null};

      const start: number = Date.now();
      const characters = await this.characterModel.find(filters)
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
          total: nbCharacters
        }
      }
    }catch(error){
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
