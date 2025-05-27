import { CharacterService } from '@/resources/character/character.service';
export declare class CharacterController {
    private readonly characterService;
    constructor(characterService: CharacterService);
    findAll(request: any, page?: number, offset?: number, name?: string, sort?: string): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./core/schemas/character.schema").CharacterDocument, {}> & import("./core/schemas/character.schema").Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
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
        data: import("mongoose").Document<unknown, {}, import("./core/schemas/character.schema").CharacterDocument, {}> & import("./core/schemas/character.schema").Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./core/schemas/character.schema").CharacterDocument, {}> & import("./core/schemas/character.schema").Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
