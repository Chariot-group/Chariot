import { CreateNpcDto } from '@/resources/character/npc/dto/create-npc.dto';
import { UpdateNpcDto } from '@/resources/character/npc/dto/update-npc.dto';
import { Model } from 'mongoose';
import { GroupDocument } from '@/resources/group/schemas/group.schema';
import { Character, CharacterDocument } from '@/resources/character/core/schemas/character.schema';
export declare class NpcService {
    private characterModel;
    private groupModel;
    constructor(characterModel: Model<CharacterDocument>, groupModel: Model<GroupDocument>);
    private readonly SERVICE_NAME;
    private readonly logger;
    private validateGroupRelations;
    private validateResource;
    create(createNpcDto: CreateNpcDto, userId: string): Promise<{
        message: string;
        data: any;
    }>;
    update(id: string, updateNpcDto: UpdateNpcDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, CharacterDocument, {}> & Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
