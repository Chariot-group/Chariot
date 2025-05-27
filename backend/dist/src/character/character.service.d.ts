import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character, CharacterDocument } from './schemas/character.schema';
import { Model } from 'mongoose';
export declare class CharacterService {
    private characterModel;
    private groupModel;
    constructor(characterModel: Model<CharacterDocument>, groupModel: Model<CharacterDocument>);
    private validateGroupRelations;
    private readonly SERVICE_NAME;
    private readonly logger;
    create(createCharacterDto: CreateCharacterDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, CharacterDocument, {}> & Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAll(query: {
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
    update(id: number, updateCharacterDto: UpdateCharacterDto): string;
    remove(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, CharacterDocument, {}> & Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
