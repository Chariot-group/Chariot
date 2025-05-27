export declare class Ability {
    name: string;
    description: string;
}
export declare const AbilitySchema: import("mongoose").Schema<Ability, import("mongoose").Model<Ability, any, any, any, import("mongoose").Document<unknown, any, Ability, any> & Ability & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Ability, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Ability>, {}> & import("mongoose").FlatRecord<Ability> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
