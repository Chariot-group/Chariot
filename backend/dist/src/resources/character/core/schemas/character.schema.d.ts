import mongoose, { Document } from 'mongoose';
import { Affinities } from '@/resources/character/core/schemas/affinities/affinities.schema';
import { Group } from '@/resources/group/schemas/group.schema';
import { BaseSchema } from '@/common/schemas/base-schema';
import { Ability } from '@/resources/character/core/schemas/ability/ability.schema';
import { Spellcasting } from '@/resources/character/core/schemas/spellcasting/spellcasting.schema';
import { Stats } from '@/resources/character/core/schemas/stats/stats.schema';
export type CharacterDocument = Character & Document;
export declare class Character extends BaseSchema {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    stats: Stats;
    affinities: Affinities;
    abilities: Ability[];
    spellcasting: Spellcasting[];
    groups: Group[];
    deletedAt?: Date;
}
export declare const CharacterSchema: mongoose.Schema<Character, mongoose.Model<Character, any, any, any, mongoose.Document<unknown, any, Character, any> & Character & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Character, mongoose.Document<unknown, {}, mongoose.FlatRecord<Character>, {}> & mongoose.FlatRecord<Character> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> & {
    __v: number;
}>;
