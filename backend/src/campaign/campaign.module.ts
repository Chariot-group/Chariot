import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema } from './schemas/campaign.schema';
import { Logger } from 'winston';
import { Groups, GroupsSchema } from './schemas/sub/groups.schema';
import { GroupModule } from '@/group/group.module';
import { Group, GroupSchema } from '@/group/schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
      { name: Groups.name, schema: GroupsSchema },
      { name: Group.name, schema: GroupSchema },
    ]),
    GroupModule,
  ],
  exports: [
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
  ],
  controllers: [CampaignController],
  providers: [CampaignService, Logger],
})
export class CampaignModule {}
