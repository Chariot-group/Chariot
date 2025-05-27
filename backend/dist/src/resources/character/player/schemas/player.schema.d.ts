import { Document } from 'mongoose';
import { Character } from '@/resources/character/core/schemas/character.schema';
import { Progression } from '@/resources/character/player/schemas/progression/progression.schema';
import { Class } from '@/resources/character/player/schemas/class/class.schema';
import { PlayerProfile } from '@/resources/character/player/schemas/profile/player-profile.schema';
import { Appearance } from '@/resources/character/player/schemas/appearance/appearance.schema';
import { Background } from '@/resources/character/player/schemas/background/background.schema';
import { Treasure } from '@/resources/character/player/schemas/treasure/treasure.schema';
import { PlayerStats } from '@/resources/character/player/schemas/stats/player-stats.schema';
export type PlayerDocument = Player & Document;
export declare class Player extends Character {
    inspiration: boolean;
    progression: Progression;
    class: Class[];
    profile: PlayerProfile;
    appearance: Appearance;
    background: Background;
    treasure: Treasure;
    stats: PlayerStats;
}
export declare const PlayerSchema: import("mongoose").Schema<Player, import("mongoose").Model<Player, any, any, any, Document<unknown, any, Player, any> & Player & Required<{
    _id: import("mongoose").Schema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Player, Document<unknown, {}, import("mongoose").FlatRecord<Player>, {}> & import("mongoose").FlatRecord<Player> & Required<{
    _id: import("mongoose").Schema.Types.ObjectId;
}> & {
    __v: number;
}>;
