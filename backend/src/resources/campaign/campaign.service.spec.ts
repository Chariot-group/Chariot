import { Test, TestingModule } from '@nestjs/testing';
import { CampaignService } from './campaign.service';
import { getModelToken } from '@nestjs/mongoose';
import { Campaign } from './schemas/campaign.schema';
import { Group } from '@/resources/group/schemas/group.schema';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Types } from 'mongoose';

describe('CampaignService', () => {
  let service: CampaignService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignService,
      ],
    }).compile();

    service = module.get<CampaignService>(CampaignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});