import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
export declare class CharacterController {
    private readonly characterService;
    constructor(characterService: CharacterService);
    createCharacter(createCharacterDto: CreateCharacterDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/character.schema").CharacterDocument, {}> & import("./schemas/character.schema").Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAll(page?: number, offset?: number, name?: string, sort?: string): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/character.schema").CharacterDocument, {}> & import("./schemas/character.schema").Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
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
        data: import("mongoose").Document<unknown, {}, import("./schemas/character.schema").CharacterDocument, {}> & import("./schemas/character.schema").Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updateCharacterDto: UpdateCharacterDto): string;
    remove(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/character.schema").CharacterDocument, {}> & import("./schemas/character.schema").Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
