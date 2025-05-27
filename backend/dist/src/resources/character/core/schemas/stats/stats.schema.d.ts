import { Schema as MongooseSchema, Types } from 'mongoose';
import { Speed } from '@/resources/character/core/schemas/stats/sub/speed.schema';
import { AbilityScores } from '@/resources/character/core/schemas/stats/sub/abilityScores.schema';
import { SavingThrows } from '@/resources/character/core/schemas/stats/sub/savingThrows.schema';
import { Skills } from '@/resources/character/core/schemas/stats/sub/skill.schema';
import { Size } from '@/resources/character/core/constants/sizes.constant';
import { Sense } from '@/resources/character/core/schemas/stats/sub/sense';
export declare class Stats {
    size: Size;
    maxHitPoints: number;
    currentHitPoints: number;
    tempHitPoints: number;
    armorClass: number;
    speed: Speed;
    abilityScores: AbilityScores;
    darkvision: number;
    languages: string[];
    passivePerception: number;
    savingThrows: SavingThrows;
    skills: Skills;
    senses: Sense[];
}
export declare const StatsSchema: MongooseSchema<Stats, import("mongoose").Model<Stats, any, any, any, import("mongoose").Document<unknown, any, Stats, any> & Stats & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Stats, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Stats>, {}> & import("mongoose").FlatRecord<Stats> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
