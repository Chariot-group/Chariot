import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CharacterService } from '@/character/character.service';
export declare class GroupController {
    private readonly groupService;
    private readonly characterService;
    constructor(groupService: GroupService, characterService: CharacterService);
    create(createGroupDto: CreateGroupDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/group.schema").GroupDocument, {}> & import("./schemas/group.schema").Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    findAll(page?: number, offset?: number, label?: string, sort?: string): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/group.schema").GroupDocument, {}> & import("./schemas/group.schema").Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
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
    findAllCharacters(id: string, page?: number, offset?: number, name?: string, sort?: string): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("../character/schemas/character.schema").CharacterDocument, {}> & import("../character/schemas/character.schema").Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
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
        data: import("mongoose").Document<unknown, {}, import("./schemas/group.schema").GroupDocument, {}> & import("./schemas/group.schema").Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/group.schema").GroupDocument, {}> & import("./schemas/group.schema").Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/group.schema").GroupDocument, {}> & import("./schemas/group.schema").Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
