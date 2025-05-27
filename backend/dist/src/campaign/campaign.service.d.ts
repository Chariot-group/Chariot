import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { CampaignDocument } from './schemas/campaign.schema';
import { Model } from 'mongoose';
import IResponse from 'src/types/response';
export declare class CampaignService {
    private campaignModel;
    constructor(campaignModel: Model<CampaignDocument>);
    private readonly logger;
    private readonly SERVICE_NAME;
    private readonly errorsService;
    private readonly MONGOOSE_ERROR_ID;
    private readonly RESOURCE_NOT_FIND;
    private readonly RESOURCE_FIND;
    private readonly RESOURCE_NOT_FIND_LOG;
    private readonly RESOURCE_FIND_LOG;
    create(createCampaignDto: CreateCampaignDto): string;
    findAll(): string;
    findOne(id: string): Promise<IResponse>;
    update(id: number, updateCampaignDto: UpdateCampaignDto): string;
    remove(id: number): string;
}
