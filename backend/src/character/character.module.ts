import { Module } from '@nestjs/common';
import { CharacterService } from '@/character/character.service';
import { CharacterController } from '@/character/character.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Character,
  CharacterSchema,
} from '@/character/schemas/character.schema';
import { Group, GroupSchema } from '@/group/schemas/group.schema';
import { PlayerSchema } from '@/character/schemas/player.schema';
import { NPCSchema } from '@/character/schemas/npc.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Character.name,
        schema: CharacterSchema,
        discriminators: [
          { name: 'player', schema: PlayerSchema },
          { name: 'npc', schema: NPCSchema },
        ],
      },
    ]),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  exports: [CharacterService],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
