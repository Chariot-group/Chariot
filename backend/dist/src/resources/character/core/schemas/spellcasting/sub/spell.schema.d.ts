import { EffectType } from '@/resources/character/core/constants/effect-types.constant';
export declare class Spell {
    name?: string;
    level?: number;
    school?: string;
    description?: string;
    components: string[];
    castingTime?: string;
    duration?: string;
    range?: string;
    effectType?: EffectType;
    damage?: string;
    healing?: string;
}
export declare const SpellSchema: import("mongoose").Schema<Spell, import("mongoose").Model<Spell, any, any, any, import("mongoose").Document<unknown, any, Spell, any> & Spell & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Spell, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Spell>, {}> & import("mongoose").FlatRecord<Spell> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
