import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Character } from '@/character/schemas/character.schema';
import { Actions } from '@/character/schemas/actions/actions.schema';
import { Challenge } from '@/character/schemas/challenge/challenge.schema';
import { Classification } from '@/character/schemas/classification/classification.schema';
import { NPCProfile } from '@/character/schemas/profile/profile.schema';

export type NPCDocument = NPC & Document;

@Schema()
export class NPC extends Character {
  @Prop({ type: [Actions], required: true, default: [] })
  actions: Actions[];

  @Prop({ type: [Challenge], required: true, default: [] })
  challenge: Challenge[];

  @Prop({ type: NPCProfile, required: true })
  profile: NPCProfile;
}

export const NPCSchema = SchemaFactory.createForClass(NPC);
