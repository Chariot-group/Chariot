import mongoose, { Document } from 'mongoose';
import { Groups } from './sub/groups.schema';
import { User } from '@/user/schemas/user.schema';
export type CampaignDocument = Campaign & Document;
export declare class Campaign {
    _id: mongoose.Schema.Types.ObjectId;
    label: string;
    description: string;
    groups: Groups;
    users: User[];
    deletedAt?: Date;
}
export declare const CampaignSchema: mongoose.Schema<Campaign, mongoose.Model<Campaign, any, any, any, mongoose.Document<unknown, any, Campaign, any> & Campaign & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Campaign, mongoose.Document<unknown, {}, mongoose.FlatRecord<Campaign>, {}> & mongoose.FlatRecord<Campaign> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> & {
    __v: number;
}>;
