import { Character, CharacterDocument } from '@/resources/character/core/schemas/character.schema';
import { Model } from 'mongoose';
import { GroupDocument } from '@/resources/group/schemas/group.schema';
export declare class CharacterService {
    private characterModel;
    private groupModel;
    constructor(characterModel: Model<CharacterDocument>, groupModel: Model<GroupDocument>);
    private validateResource;
    private readonly SERVICE_NAME;
    private readonly logger;
    findAllByUser(userId: string, query: {
        page?: number;
        offset?: number;
        name?: string;
        sort?: string;
    }, groupId?: string): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, CharacterDocument, {}> & Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
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
        data: import("mongoose").Document<unknown, {}, CharacterDocument, {}> & Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, CharacterDocument, {}> & Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
