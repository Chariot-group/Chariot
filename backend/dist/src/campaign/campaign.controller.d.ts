import { CampaignService } from '@/campaign/campaign.service';
import { CreateCampaignDto } from '@/campaign/dto/create-campaign.dto';
import { UpdateCampaignDto } from '@/campaign/dto/update-campaign.dto';
export declare class CampaignController {
    private readonly campaignService;
    constructor(campaignService: CampaignService);
    create(createCampaignDto: CreateCampaignDto): string;
    findAll(page?: number, offset?: number, sort?: string, label?: string): string;
    findOne(id: string): Promise<IResponse>;
    update(id: string, updateCampaignDto: UpdateCampaignDto): string;
    remove(id: string): string;
}
