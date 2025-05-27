import { Document } from 'mongoose';
import { Groups } from './sub/groups.schema';
export type CampaignDocument = Campaign & Document;
export declare class Campaign {
    label: string;
    description: string;
    groups: Groups;
    deletedAt?: Date;
}
export declare const CampaignSchema: import("mongoose").Schema<Campaign, import("mongoose").Model<Campaign, any, any, any, Document<unknown, any, Campaign, any> & Campaign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Campaign, Document<unknown, {}, import("mongoose").FlatRecord<Campaign>, {}> & import("mongoose").FlatRecord<Campaign> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
