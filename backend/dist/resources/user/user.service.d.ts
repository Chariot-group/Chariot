import { CreateUserDto } from '@/resources/user/dto/create-user.dto';
import { UpdateUserDto } from '@/resources/user/dto/update-user.dto';
import { User, UserDocument } from '@/resources/user/schemas/user.schema';
import { Model } from 'mongoose';
import { CampaignDocument } from '@/resources/campaign/schemas/campaign.schema';
export declare class UserService {
    private userModel;
    private campaignModel;
    constructor(userModel: Model<UserDocument>, campaignModel: Model<CampaignDocument>);
    private readonly SERVICE_NAME;
    private readonly logger;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    findAll(query: {
        page?: number;
        offset?: number;
        sort?: string;
        email?: string;
    }): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: number;
            offset: number;
            totalItems: number;
        };
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    findByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
