import { Document, Types } from 'mongoose';
import { Character } from '@/character/schemas/character.schema';
import mongoose from 'mongoose';
import { Campaign } from '@/campaign/schemas/campaign.schema';
export type GroupDocument = Group & Document;
export declare class Group {
    label: string;
    description: string;
    characters: Character[];
    campaigns: Campaign[];
    deletedAt?: Date;
}
export declare const GroupSchema: mongoose.Schema<Group, mongoose.Model<Group, any, any, any, Document<unknown, any, Group, any> & Group & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Group, Document<unknown, {}, mongoose.FlatRecord<Group>, {}> & mongoose.FlatRecord<Group> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
