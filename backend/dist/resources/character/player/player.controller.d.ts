import { PlayerService } from '@/resources/character/player/player.service';
import { CreatePlayerDto } from '@/resources/character/player/dto/create-player.dto';
import { UpdatePlayerDto } from '@/resources/character/player/dto/update-player.dto';
import { CharacterService } from '@/resources/character/character.service';
export declare class PlayerController {
    private readonly playerService;
    private readonly characterService;
    constructor(playerService: PlayerService, characterService: CharacterService);
    createPlayer(request: any, createPlayerDto: CreatePlayerDto): Promise<{
        message: string;
        data: any;
    }>;
    update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../core/schemas/character.schema").Character, {}> & import("../core/schemas/character.schema").Character & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
