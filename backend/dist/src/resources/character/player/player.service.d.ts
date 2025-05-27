import { CreatePlayerDto } from '@/resources/character/player/dto/create-player.dto';
import { UpdatePlayerDto } from '@/resources/character/player/dto/update-player.dto';
import { Model } from 'mongoose';
import { GroupDocument } from '@/resources/group/schemas/group.schema';
import { Character } from '@/resources/character/core/schemas/character.schema';
export declare class PlayerService {
    private characterModel;
    private groupModel;
    constructor(characterModel: Model<Character>, groupModel: Model<GroupDocument>);
    private readonly SERVICE_NAME;
    private readonly logger;
    private validateGroupRelations;
    private validateResource;
    create(createPlayerDto: CreatePlayerDto, userId: string): Promise<{
        message: string;
        data: any;
    }>;
    update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Character, {}> & Character & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
