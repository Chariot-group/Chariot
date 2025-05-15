import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Character,
  CharacterSchema,
} from '@/resources/character/schemas/character.schema';
import { Group, GroupSchema } from '@/resources/group/schemas/group.schema';
import { PlayerSchema } from '@/resources/character/player/schemas/player.schema';
import { NPCSchema } from '@/resources/character/npc/schemas/npc.schema';
import { NpcModule } from '@/resources/character//npc/npc.module';
import { PlayerModule } from '@/resources/character/player/player.module';
import { CharacterService } from '@/resources/character/character.service';
import { CharacterController } from '@/resources/character/character.controller';

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
    NpcModule,
    PlayerModule,
  ],
  exports: [CharacterService],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
