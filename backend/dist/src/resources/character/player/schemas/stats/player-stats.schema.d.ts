import { Stats } from '@/resources/character/core/schemas/stats/stats.schema';
export declare class PlayerStats extends Stats {
    proficiencyBonus: number;
}
export declare const PlayerStatsSchema: import("mongoose").Schema<PlayerStats, import("mongoose").Model<PlayerStats, any, any, any, import("mongoose").Document<unknown, any, PlayerStats, any> & PlayerStats & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PlayerStats, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PlayerStats>, {}> & import("mongoose").FlatRecord<PlayerStats> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
