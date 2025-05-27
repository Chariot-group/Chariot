import { Controller, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { NpcService } from '@/resources/character/npc/npc.service';
import { CreateNpcDto } from '@/resources/character/npc/dto/create-npc.dto';
import { UpdateNpcDto } from '@/resources/character/npc/dto/update-npc.dto';
import { IsCreator } from '@/common/decorators/is-creator.decorator';
import { CharacterService } from '@/resources/character/character.service';

@Controller('characters/npcs')
export class NpcController {
  constructor(
    private readonly npcService: NpcService,
    private readonly characterService: CharacterService,
  ) {}

  @Post()
  createNpc(@Req() request, @Body() createNpcDto: CreateNpcDto) {
    const userId = request.user.userId;

    return this.npcService.create(createNpcDto, userId);
  }

  @IsCreator(CharacterService)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNpcDto: UpdateNpcDto) {
    return this.npcService.update(id, updateNpcDto);
  }
}
