import { CreateCampaignDto } from '@/resources/campaign/dto/create-campaign.dto';
import { UpdateCampaignDto } from '@/resources/campaign/dto/update-campaign.dto';
import { Campaign, CampaignDocument } from '@/resources/campaign/schemas/campaign.schema';
import { Model } from 'mongoose';
import { GroupDocument } from '@/resources/group/schemas/group.schema';
export declare class CampaignService {
    private campaignModel;
    private groupModel;
    constructor(campaignModel: Model<CampaignDocument>, groupModel: Model<GroupDocument>);
    private readonly logger;
    private readonly SERVICE_NAME;
    private validateGroupRelations;
    private validateResource;
    create(createCampaignDto: CreateCampaignDto, userId: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, CampaignDocument, {}> & Campaign & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAllByUser(userId: string, query: {
        page?: number;
        offset?: number;
        sort?: string;
        label?: string;
    }): Promise<{
        message: string;
        data: {
            groups: {
                main: import("mongoose").Schema.Types.ObjectId[];
                npc: import("mongoose").Schema.Types.ObjectId[];
                archived: import("mongoose").Schema.Types.ObjectId[];
            };
            _id: import("mongoose").Schema.Types.ObjectId;
            label: string;
            description: string;
            users: import("../user/schemas/user.schema").User[];
            deletedAt?: Date;
            createdBy: import("../user/schemas/user.schema").User;
            $locals: Record<string, unknown>;
            $op: "save" | "validate" | "remove" | null;
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            id?: any;
            isNew: boolean;
            schema: import("mongoose").Schema;
            __v: number;
        }[];
        pagination: {
            page: number;
            offset: number;
            totalItems: number;
        };
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, CampaignDocument, {}> & Campaign & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updateCampaignDto: UpdateCampaignDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, CampaignDocument, {}> & Campaign & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, CampaignDocument, {}> & Campaign & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
