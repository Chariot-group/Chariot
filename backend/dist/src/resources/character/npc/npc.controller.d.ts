import { NpcService } from '@/resources/character/npc/npc.service';
import { CreateNpcDto } from '@/resources/character/npc/dto/create-npc.dto';
import { UpdateNpcDto } from '@/resources/character/npc/dto/update-npc.dto';
import { CharacterService } from '@/resources/character/character.service';
export declare class NpcController {
    private readonly npcService;
    private readonly characterService;
    constructor(npcService: NpcService, characterService: CharacterService);
    createNpc(request: any, createNpcDto: CreateNpcDto): Promise<{
        message: string;
        data: any;
    }>;
    update(id: string, updateNpcDto: UpdateNpcDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../core/schemas/character.schema").CharacterDocument, {}> & import("../core/schemas/character.schema").Character & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
