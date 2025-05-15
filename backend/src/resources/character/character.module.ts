import { Module } from '@nestjs/common';
import { CharacterService } from '@/resources/character/character.service';
import { CharacterController } from '@/resources/character/character.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Character,
  CharacterSchema,
} from '@/resources/character/schemas/character.schema';
import { Group, GroupSchema } from '@/resources/group/schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: Group.name, schema: GroupSchema },
    ]),
  ],
  exports: [CharacterService],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
