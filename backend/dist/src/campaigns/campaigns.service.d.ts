import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
export declare class CampaignService {
    create(createCampaignDto: CreateCampaignDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCampaignDto: UpdateCampaignDto): string;
    remove(id: number): string;
}
