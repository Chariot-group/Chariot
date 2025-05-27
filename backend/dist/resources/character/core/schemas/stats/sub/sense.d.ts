export declare class Sense {
    name: string;
    value: number;
}
export declare const SenseSchema: import("mongoose").Schema<Sense, import("mongoose").Model<Sense, any, any, any, import("mongoose").Document<unknown, any, Sense, any> & Sense & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Sense, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Sense>, {}> & import("mongoose").FlatRecord<Sense> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
