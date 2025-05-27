import { CampaignGroupDto } from './sub/campaigns.dto';
export declare class CreateGroupDto {
    readonly label: string;
    readonly description?: string;
    readonly characters?: string[];
    readonly campaigns: CampaignGroupDto[];
}
