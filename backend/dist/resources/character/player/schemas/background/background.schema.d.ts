export declare class Background {
    personalityTraits?: string;
    ideals?: string;
    bonds?: string;
    flaws?: string;
    alliesAndOrgs?: string;
    backstory?: string;
}
export declare const BackgroundSchema: import("mongoose").Schema<Background, import("mongoose").Model<Background, any, any, any, import("mongoose").Document<unknown, any, Background, any> & Background & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Background, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Background>, {}> & import("mongoose").FlatRecord<Background> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
