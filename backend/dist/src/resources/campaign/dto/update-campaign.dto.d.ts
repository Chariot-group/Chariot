import { CreateCampaignDto } from '@/resources/campaign/dto/create-campaign.dto';
declare const UpdateCampaignDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateCampaignDto, "label">>>;
export declare class UpdateCampaignDto extends UpdateCampaignDto_base {
    readonly label?: string;
}
export {};
