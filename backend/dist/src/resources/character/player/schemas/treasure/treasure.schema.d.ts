export declare class Treasure {
    cp: number;
    sp: number;
    ep: number;
    gp: number;
    pp: number;
    notes?: string;
}
export declare const TreasureSchema: import("mongoose").Schema<Treasure, import("mongoose").Model<Treasure, any, any, any, import("mongoose").Document<unknown, any, Treasure, any> & Treasure & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Treasure, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Treasure>, {}> & import("mongoose").FlatRecord<Treasure> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
