import { Profile } from '@/resources/character/core/schemas/profile/profile.schema';
export declare class NPCProfile extends Profile {
    type?: string;
    subtype?: string;
}
export declare const NPCProfileSchema: import("mongoose").Schema<NPCProfile, import("mongoose").Model<NPCProfile, any, any, any, import("mongoose").Document<unknown, any, NPCProfile, any> & NPCProfile & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NPCProfile, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<NPCProfile>, {}> & import("mongoose").FlatRecord<NPCProfile> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
