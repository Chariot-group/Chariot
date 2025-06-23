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

  const mockCampaignModel = {
    create: jest.fn(),
    countDocuments: jest.fn(),
    find: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    findById: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
  };

  const mockGroupModel = {
    updateMany: jest.fn(),
    updateOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignService,
        {
          provide: getModelToken(Campaign.name),
          useValue: mockCampaignModel,
        },
        {
          provide: getModelToken(Group.name),
          useValue: mockGroupModel,
        },
      ],
    }).compile();

    service = module.get<CampaignService>(CampaignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a campaign and update groups', async () => {
      const dto: CreateCampaignDto = {
        name: 'Test',
        label: 'test',
        groups: {
          main: ['id1'],
          npc: ['id2'],
          archived: [],
        },
      } as any;

      const mockCampaign = { _id: new Types.ObjectId(), ...dto };
      mockCampaignModel.create.mockResolvedValueOnce(mockCampaign);

      const result = await service.create(dto, 'userId');

      expect(mockCampaignModel.create).toHaveBeenCalled();
      expect(mockGroupModel.updateMany).toHaveBeenCalled();
      expect(result.data).toEqual(mockCampaign);
    });
  });

  describe('findAllByUser', () => {
    it('should return campaigns with pagination', async () => {
      mockCampaignModel.countDocuments.mockResolvedValueOnce(1);
      const campaignData = {
        toObject: () => ({
          _id: 'id',
          name: 'Test',
          label: 'test',
          groups: {
            main: [{ _id: 'id1' }],
            npc: [{ _id: 'id2' }],
            archived: [],
          },
        }),
        groups: {
          main: [{ _id: 'id1' }],
          npc: [{ _id: 'id2' }],
          archived: [],
        },
      };
      mockCampaignModel.exec.mockResolvedValueOnce([campaignData]);

      const result = await service.findAllByUser('userId', {});

      expect(result.data[0].groups.main).toEqual(['id1']);
    });
  });

  describe('findOne', () => {
    it('should return one campaign', async () => {
      const campaign = { _id: 'id', name: 'Test', groups: {} };
      mockCampaignModel.exec.mockResolvedValueOnce(campaign);

      const result = await service.findOne(new Types.ObjectId());

      expect(result.data).toEqual(campaign);
    });
  });

  describe('update', () => {
    it('should update campaign groups and data', async () => {
      const campaignId = new Types.ObjectId();
      const existingCampaign = {
        _id: campaignId,
        label: 'test',
        groups: { main: [], npc: [], archived: [] },
      };
      mockCampaignModel.findById.mockResolvedValue(existingCampaign);
      mockCampaignModel.findByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockResolvedValue(existingCampaign),
      });

      const result = await service.update(campaignId, {
        label: 'test',
        groups: { main: [], npc: [], archived: [] },
      });

      expect(result.data).toEqual(existingCampaign);
    });
  });

  describe('remove', () => {
    it('should soft delete the campaign', async () => {
      const campaign = {
        _id: new Types.ObjectId(),
        groups: {
          main: ['id1'],
          npc: [],
          archived: [],
        },
        save: jest.fn(),
      };
      mockCampaignModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(campaign),
      });

      const result = await service.remove(campaign._id);

      expect(campaign.save).toHaveBeenCalled();
      expect(result.data).toEqual(campaign);
    });
  });
});