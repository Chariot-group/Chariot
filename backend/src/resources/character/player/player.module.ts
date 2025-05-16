import { Module } from '@nestjs/common';
import { PlayerService } from '@/resources/character/player/player.service';
import { PlayerController } from '@/resources/character/player/player.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Player,
  PlayerSchema,
} from '@/resources/character/player/schemas/player.schema';
import { Group, GroupSchema } from '@/resources/group/schemas/group.schema';
import { CharacterService } from '@/resources/character/character.service';
import { Character, CharacterSchema } from '@/resources/character/core/schemas/character.schema';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService, CharacterService],
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
  ],
})
export class PlayerModule {}
