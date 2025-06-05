import { Document } from 'mongoose';
import { Actions } from '@/resources/character/npc/schemas/actions/actions.schema';
import { Challenge } from '@/resources/character/npc/schemas/challenge/challenge.schema';
import { NPCProfile } from '@/resources/character/npc/schemas/profile/npc-profile.schema';
import { Character } from '@/resources/character/core/schemas/character.schema';
export type NPCDocument = NPC & Document;
export declare class NPC extends Character {
    actions: Actions;
    challenge: Challenge;
    profile?: NPCProfile;
}
export declare const NPCSchema: import("mongoose").Schema<NPC, import("mongoose").Model<NPC, any, any, any, Document<unknown, any, NPC, any> & NPC & Required<{
    _id: import("mongoose").Schema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NPC, Document<unknown, {}, import("mongoose").FlatRecord<NPC>, {}> & import("mongoose").FlatRecord<NPC> & Required<{
    _id: import("mongoose").Schema.Types.ObjectId;
}> & {
    __v: number;
}>;
