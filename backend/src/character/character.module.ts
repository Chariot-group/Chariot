import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './schemas/character.schema';
import { Group, GroupSchema } from '@/group/schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Character.name, schema: CharacterSchema},
    ]),
    MongooseModule.forFeature([
      {name: Group.name, schema: GroupSchema},
    ])
  ],
  exports: [CharacterService],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
