export declare class Speed {
    walk?: number;
    climb?: number;
    swim?: number;
    fly?: number;
    burrow?: number;
}
export declare const SpeedSchema: import("mongoose").Schema<Speed, import("mongoose").Model<Speed, any, any, any, import("mongoose").Document<unknown, any, Speed, any> & Speed & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Speed, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Speed>, {}> & import("mongoose").FlatRecord<Speed> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
