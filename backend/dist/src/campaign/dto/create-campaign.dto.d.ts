import { CreateGroupIdsDto } from '@/campaign/dto/sub/create-group-ids.dto';
export declare class CreateCampaignDto {
    readonly label: string;
    readonly description: string;
    groups: CreateGroupIdsDto;
}
