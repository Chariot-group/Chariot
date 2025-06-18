import { Controller, Post, Body, Patch, Param, Req, GoneException, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { NpcService } from '@/resources/character/npc/npc.service';
import { CreateNpcDto } from '@/resources/character/npc/dto/create-npc.dto';
import { UpdateNpcDto } from '@/resources/character/npc/dto/update-npc.dto';
import { IsCreator } from '@/common/decorators/is-creator.decorator';
import { CharacterService } from '@/resources/character/character.service';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Character, CharacterDocument } from '@/resources/character/core/schemas/character.schema';

@Controller('characters/npcs')
export class NpcController {
  constructor(
    private readonly npcService: NpcService,
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) { }

  private readonly CONTROLLER_NAME = NpcController.name;
  private readonly logger = new Logger(this.CONTROLLER_NAME);

  private async validateResource(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      const message = `Error while fetching character #${id}: Id is not a valid mongoose id`;
      this.logger.error(message, null, this.CONTROLLER_NAME);
      throw new BadRequestException(message);
    }
    const npc = await this.characterModel.findById(id).exec();

    if (!npc) {
      const message = `NPC #${id} not found`;
      this.logger.error(message, null, this.CONTROLLER_NAME);
      throw new NotFoundException(message);
    }

    if (npc.deletedAt) {
      const message = `NPC #${id} is gone`;
      this.logger.error(message, null, this.CONTROLLER_NAME);
      throw new GoneException(message);
    }
  }

  @Post()
  createNpc(@Req() request, @Body() createNpcDto: CreateNpcDto) {
    const userId = request.user.userId;

    return this.npcService.create(createNpcDto, userId);
  }

  @IsCreator(CharacterService)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNpcDto: UpdateNpcDto) {
    await this.validateResource(id);

    return this.npcService.update(id, updateNpcDto);
  }
}
