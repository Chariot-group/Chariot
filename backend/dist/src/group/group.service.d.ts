import { Group } from './schemas/group.schema';
import { GroupDocument } from './schemas/group.schema';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Model } from 'mongoose';
import { CharacterDocument } from '@/character/schemas/character.schema';
import { CampaignDocument } from '@/campaign/schemas/campaign.schema';
export declare class GroupService {
    private groupModel;
    private campaignModel;
    private characterModel;
    constructor(groupModel: Model<GroupDocument>, campaignModel: Model<CampaignDocument>, characterModel: Model<CharacterDocument>);
    private readonly SERVICE_NAME;
    private readonly logger;
    create(createGroupDto: CreateGroupDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, GroupDocument, {}> & Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    findAll(query: {
        page?: number;
        offset?: number;
        label?: string;
        sort?: string;
    }, campaignId?: string): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, GroupDocument, {}> & Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: number;
            offset: number;
            total: number;
        };
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, GroupDocument, {}> & Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, GroupDocument, {}> & Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, GroupDocument, {}> & Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
