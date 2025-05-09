import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Character } from '@/character/schemas/character.schema';
import { Actions } from '@/character/schemas/actions/actions.schema';
import { Challenge } from '@/character/schemas/challenge/challenge.schema';
import { NPCProfile } from '@/character/schemas/profile/profile.schema';

export type NPCDocument = NPC & Document;

@Schema()
export class NPC extends Character {
  @Prop({ type: [Actions], default: [] })
  actions: Actions[];

  @Prop({ type: [Challenge], default: [] })
  challenge: Challenge[];

  @Prop({ type: NPCProfile, default: {} })
  profile?: NPCProfile;
}

export const NPCSchema = SchemaFactory.createForClass(NPC);
