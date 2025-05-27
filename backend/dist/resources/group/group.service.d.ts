import { Group } from '@/resources/group/schemas/group.schema';
import { GroupDocument } from '@/resources/group/schemas/group.schema';
import { CreateGroupDto } from '@/resources/group/dto/create-group.dto';
import { UpdateGroupDto } from '@/resources/group/dto/update-group.dto';
import { Model } from 'mongoose';
import { CampaignDocument } from '@/resources/campaign/schemas/campaign.schema';
import { CharacterDocument } from '@/resources/character/core/schemas/character.schema';
export declare class GroupService {
    private groupModel;
    private campaignModel;
    private characterModel;
    constructor(groupModel: Model<GroupDocument>, campaignModel: Model<CampaignDocument>, characterModel: Model<CharacterDocument>);
    private readonly SERVICE_NAME;
    private readonly logger;
    private validateCharacterRelations;
    private validateResource;
    private validatecampaignRelations;
    create(createGroupDto: CreateGroupDto, userId: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, GroupDocument, {}> & Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAllByUser(userId: string, query: {
        page?: number;
        offset?: number;
        label?: string;
        sort?: string;
        onlyWithMembers?: any;
    }, campaignId?: string, type?: 'all' | 'main' | 'npc' | 'archived'): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, GroupDocument, {}> & Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
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
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, GroupDocument, {}> & Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, GroupDocument, {}> & Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
