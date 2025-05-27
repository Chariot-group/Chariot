export declare class Appearance {
    age?: number;
    height?: number;
    weight?: number;
    eyes?: string;
    skin?: string;
    hair?: string;
    description?: string;
}
export declare const AppearanceSchema: import("mongoose").Schema<Appearance, import("mongoose").Model<Appearance, any, any, any, import("mongoose").Document<unknown, any, Appearance, any> & Appearance & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Appearance, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Appearance>, {}> & import("mongoose").FlatRecord<Appearance> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
