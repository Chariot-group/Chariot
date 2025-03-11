import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema } from './schemas/campaign.schema';
import { Logger } from 'winston';
import { Groups, GroupsSchema } from './schemas/sub/groups.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Campaign.name, schema: CampaignSchema},
      {name: Groups.name, schema: GroupsSchema}
    ])
  ],
  controllers: [CampaignController],
  providers: [CampaignService, Logger],
})
export class CampaignModule {}
