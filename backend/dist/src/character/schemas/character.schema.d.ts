import mongoose, { Document } from 'mongoose';
import { Classification } from './classification/classification.schema';
import { Stats } from './stat/stats.schema';
import { Combat } from './combat/combat.schema';
import { Traits } from './trait/trait.schema';
import { Actions } from './actions/actions.schema';
import { Group } from '@/group/schemas/group.schema';
export type CharacterDocument = Character & Document;
export declare class Character {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    classification: Classification;
    stats: Stats;
    combat: Combat;
    traits: Traits[];
    actions: Actions[];
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
