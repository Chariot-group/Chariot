export declare class Progression {
    level: number;
    experience: number;
}
export declare const ProgressionSchema: import("mongoose").Schema<Progression, import("mongoose").Model<Progression, any, any, any, import("mongoose").Document<unknown, any, Progression, any> & Progression & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Progression, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Progression>, {}> & import("mongoose").FlatRecord<Progression> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
