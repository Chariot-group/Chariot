import { CampaignGroupDto } from '@/resources/group/dto/sub/campaigns.dto';
export declare class CreateGroupDto {
    readonly label: string;
    readonly description?: string;
    readonly characters?: string[];
    readonly campaigns: CampaignGroupDto[];
}
