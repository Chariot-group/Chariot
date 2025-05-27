import { CampaignService } from '@/resources/campaign/campaign.service';
import { CreateCampaignDto } from '@/resources/campaign/dto/create-campaign.dto';
import { UpdateCampaignDto } from '@/resources/campaign/dto/update-campaign.dto';
import { GroupService } from '@/resources/group/group.service';
export declare class CampaignController {
    private readonly campaignService;
    private readonly groupService;
    constructor(campaignService: CampaignService, groupService: GroupService);
    private readonly SERVICE_NAME;
    private readonly logger;
    create(request: any, createCampaignDto: CreateCampaignDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/campaign.schema").CampaignDocument, {}> & import("./schemas/campaign.schema").Campaign & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAll(request: any, page?: number, offset?: number, sort?: string, label?: string): Promise<{
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
    findAllGroups(request: any, id: string, page?: number, offset?: number, sort?: string, label?: string, type?: 'all' | 'main' | 'npc' | 'archived', onlyWithMembers?: boolean): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("../group/schemas/group.schema").GroupDocument, {}> & import("../group/schemas/group.schema").Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
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
        data: import("mongoose").Document<unknown, {}, import("./schemas/campaign.schema").CampaignDocument, {}> & import("./schemas/campaign.schema").Campaign & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updateCampaignDto: UpdateCampaignDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/campaign.schema").CampaignDocument, {}> & import("./schemas/campaign.schema").Campaign & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/campaign.schema").CampaignDocument, {}> & import("./schemas/campaign.schema").Campaign & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
