import { Types } from 'mongoose';
import { Group } from '@/group/schemas/group.schema';
import mongoose from 'mongoose';
export declare class Groups {
    main: Group[];
    npc: Group[];
    archived: Group[];
}
export declare const GroupsSchema: mongoose.Schema<Groups, mongoose.Model<Groups, any, any, any, mongoose.Document<unknown, any, Groups, any> & Groups & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Groups, mongoose.Document<unknown, {}, mongoose.FlatRecord<Groups>, {}> & mongoose.FlatRecord<Groups> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
