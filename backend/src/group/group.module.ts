import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group, GroupSchema } from './schemas/group.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterModule } from '@/character/character.module';
import { Campaign, CampaignSchema } from '@/campaign/schemas/campaign.schema';
import {
  Character,
  CharacterSchema,
} from '@/character/schemas/character.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: Character.name, schema: CharacterSchema },
    ]),
    CharacterModule,
  ],
  exports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
