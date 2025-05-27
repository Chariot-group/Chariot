export declare class AbilityScores {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}
export declare const AbilityScoresSchema: import("mongoose").Schema<AbilityScores, import("mongoose").Model<AbilityScores, any, any, any, import("mongoose").Document<unknown, any, AbilityScores, any> & AbilityScores & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AbilityScores, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AbilityScores>, {}> & import("mongoose").FlatRecord<AbilityScores> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
