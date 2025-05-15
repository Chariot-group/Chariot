import { Module } from '@nestjs/common';
import { GroupService } from '@/resources/group/group.service';
import { GroupController } from '@/resources/group/group.controller';
import { Group, GroupSchema } from '@/resources/group/schemas/group.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterModule } from '@/resources/character/character.module';
import { Campaign, CampaignSchema } from '@/resources/campaign/schemas/campaign.schema';
import {
  Character,
  CharacterSchema,
} from '@/resources/character/schemas/character.schema';

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
    GroupService,
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
