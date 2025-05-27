export declare class Skills {
    athletics: number;
    acrobatics: number;
    sleightHand: number;
    stealth: number;
    arcana: number;
    history: number;
    investigation: number;
    nature: number;
    religion: number;
    animalHandling: number;
    insight: number;
    medicine: number;
    perception: number;
    survival: number;
    deception: number;
    intimidation: number;
    performance: number;
    persuasion: number;
}
export declare const SkillsSchema: import("mongoose").Schema<Skills, import("mongoose").Model<Skills, any, any, any, import("mongoose").Document<unknown, any, Skills, any> & Skills & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Skills, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Skills>, {}> & import("mongoose").FlatRecord<Skills> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
