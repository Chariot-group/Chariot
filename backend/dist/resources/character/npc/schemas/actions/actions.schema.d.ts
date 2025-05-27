import { Action } from '@/resources/character/npc/schemas/actions/sub/action.schema';
export declare class Actions {
    standard: Action[];
    legendary: Action[];
    lair: Action[];
}
export declare const ActionsSchema: import("mongoose").Schema<Actions, import("mongoose").Model<Actions, any, any, any, import("mongoose").Document<unknown, any, Actions, any> & Actions & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Actions, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Actions>, {}> & import("mongoose").FlatRecord<Actions> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
