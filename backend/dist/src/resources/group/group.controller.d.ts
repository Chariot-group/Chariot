import { GroupService } from '@/resources/group/group.service';
import { CreateGroupDto } from '@/resources/group/dto/create-group.dto';
import { UpdateGroupDto } from '@/resources/group/dto/update-group.dto';
import { CharacterService } from '@/resources/character/character.service';
export declare class GroupController {
    private readonly groupService;
    private readonly characterService;
    constructor(groupService: GroupService, characterService: CharacterService);
    create(request: any, createGroupDto: CreateGroupDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/group.schema").GroupDocument, {}> & import("./schemas/group.schema").Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAll(request: any, page?: number, offset?: number, label?: string, sort?: string, onlyWithMembers?: boolean): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/group.schema").GroupDocument, {}> & import("./schemas/group.schema").Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
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
    findAllCharacters(request: any, id: string, page?: number, offset?: number, name?: string, sort?: string): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("../character/core/schemas/character.schema").CharacterDocument, {}> & import("../character/core/schemas/character.schema").Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
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
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/group.schema").GroupDocument, {}> & import("./schemas/group.schema").Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/group.schema").GroupDocument, {}> & import("./schemas/group.schema").Group & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
