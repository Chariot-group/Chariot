import { Profile } from '@/resources/character/core/schemas/profile/profile.schema';
export declare class PlayerProfile extends Profile {
    race?: string;
    subrace?: string;
}
export declare const PlayerProfileSchema: import("mongoose").Schema<PlayerProfile, import("mongoose").Model<PlayerProfile, any, any, any, import("mongoose").Document<unknown, any, PlayerProfile, any> & PlayerProfile & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PlayerProfile, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PlayerProfile>, {}> & import("mongoose").FlatRecord<PlayerProfile> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
