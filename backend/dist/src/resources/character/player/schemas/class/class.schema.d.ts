export declare class Class {
    name?: string;
    subclass?: string;
    level: number;
    hitDice?: number;
}
export declare const ClassSchema: import("mongoose").Schema<Class, import("mongoose").Model<Class, any, any, any, import("mongoose").Document<unknown, any, Class, any> & Class & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Class, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Class>, {}> & import("mongoose").FlatRecord<Class> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
