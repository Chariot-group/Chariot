export declare class SavingThrows {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}
export declare const SavingThrowsSchema: import("mongoose").Schema<SavingThrows, import("mongoose").Model<SavingThrows, any, any, any, import("mongoose").Document<unknown, any, SavingThrows, any> & SavingThrows & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SavingThrows, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SavingThrows>, {}> & import("mongoose").FlatRecord<SavingThrows> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
