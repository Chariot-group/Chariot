import { Model } from 'mongoose';
import { CampaignDocument } from '@/resources/campaign/schemas/campaign.schema';
import { GroupDocument } from '@/resources/group/schemas/group.schema';
import { UserDocument } from '@/resources/user/schemas/user.schema';
import 'reflect-metadata';
import { CharacterDocument } from '@/resources/character/core/schemas/character.schema';
export declare class SeederService {
    private userModel;
    private campaignModel;
    private groupModel;
    private characterModel;
    constructor(userModel: Model<UserDocument>, campaignModel: Model<CampaignDocument>, groupModel: Model<GroupDocument>, characterModel: Model<CharacterDocument>);
    getRandomObjects(): any[];
    readonly SERVICE_NAME: string;
    seed(clean: boolean): Promise<void>;
}
