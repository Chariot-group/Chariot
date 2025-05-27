export declare class Challenge {
    challengeRating?: number;
    experiencePoints?: number;
}
export declare const ChallengeSchema: import("mongoose").Schema<Challenge, import("mongoose").Model<Challenge, any, any, any, import("mongoose").Document<unknown, any, Challenge, any> & Challenge & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Challenge, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Challenge>, {}> & import("mongoose").FlatRecord<Challenge> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
