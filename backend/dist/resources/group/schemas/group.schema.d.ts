import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Campaign } from '@/resources/campaign/schemas/campaign.schema';
import { BaseSchema } from '@/common/schemas/base-schema';
import { Character } from '@/resources/character/core/schemas/character.schema';
export type GroupDocument = Group & Document;
export declare class Group extends BaseSchema {
    _id: mongoose.Schema.Types.ObjectId;
    label: string;
    description: string;
    characters: Character[];
    campaigns: Campaign[];
    deletedAt?: Date;
}
export declare const GroupSchema: mongoose.Schema<Group, mongoose.Model<Group, any, any, any, Document<unknown, any, Group, any> & Group & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Group, Document<unknown, {}, mongoose.FlatRecord<Group>, {}> & mongoose.FlatRecord<Group> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> & {
    __v: number;
}>;
