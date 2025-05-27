import { Document, Types } from 'mongoose';
import { Campaign } from '@/resources/campaign/schemas/campaign.schema';
import mongoose from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    username: string;
    email: string;
    otp?: string;
    password: string;
    campaigns: Campaign[];
    deletedAt?: Date;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, Document<unknown, any, User, any> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, Document<unknown, {}, mongoose.FlatRecord<User>, {}> & mongoose.FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
