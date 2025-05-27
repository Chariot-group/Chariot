import { Schema as MongooseSchema } from 'mongoose';
import { Spell } from '@/resources/character/core/schemas/spellcasting/sub/spell.schema';
export declare class Spellcasting {
    ability?: string;
    saveDC?: number;
    attackBonus: number;
    spellSlotsByLevel?: Map<number, {
        total?: number;
        used?: number;
    }>;
    totalSlots: number;
    spells: Spell[];
}
export declare const SpellcastingSchema: MongooseSchema<Spellcasting, import("mongoose").Model<Spellcasting, any, any, any, import("mongoose").Document<unknown, any, Spellcasting, any> & Spellcasting & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Spellcasting, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Spellcasting>, {}> & import("mongoose").FlatRecord<Spellcasting> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
