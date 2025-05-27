export declare class Damage {
    dice?: string;
    type?: string;
}
export declare const DamageSchema: import("mongoose").Schema<Damage, import("mongoose").Model<Damage, any, any, any, import("mongoose").Document<unknown, any, Damage, any> & Damage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Damage, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Damage>, {}> & import("mongoose").FlatRecord<Damage> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
