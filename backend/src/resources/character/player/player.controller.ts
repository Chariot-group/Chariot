import { Controller, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { PlayerService } from '@/resources/character/player/player.service';
import { CreatePlayerDto } from '@/resources/character/player/dto/create-player.dto';
import { UpdatePlayerDto } from '@/resources/character/player/dto/update-player.dto';
import { IsCreator } from '@/common/decorators/is-creator.decorator';
import { CharacterService } from '@/resources/character/character.service';

@Controller('characters/players')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly characterService: CharacterService,
  ) {}

  @Post()
  createPlayer(@Req() request, @Body() createPlayerDto: CreatePlayerDto) {
    const userId = request.user.userId;

    return this.playerService.create(createPlayerDto, userId);
  }

  @IsCreator(CharacterService)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(id, updatePlayerDto);
  }
}
