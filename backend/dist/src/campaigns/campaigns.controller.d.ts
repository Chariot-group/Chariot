import { CampaignService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
export declare class CampaignController {
    private readonly campaignService;
    constructor(campaignService: CampaignService);
    create(createCampaignDto: CreateCampaignDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCampaignDto: UpdateCampaignDto): string;
    remove(id: string): string;
}
