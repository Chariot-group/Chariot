import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Character } from '@/character/schemas/character.schema';
import { Progression } from '@/character/schemas/progression/progression.schema';
import { Class } from '@/character/schemas/class/class.schema';
import { PlayerProfile } from '@/character/schemas/profile/profile.schema';
import { Appearance } from '@/character/schemas/appearance/appearance.schema';
import { Background } from '@/character/schemas/background/background.schema';
import { Treasure } from '@/character/schemas/treasure/treasure.schema';

export type PlayerDocument = Player & Document;

@Schema()
export class Player extends Character {
  @Prop({ required: true })
  inspiration: boolean;

  @Prop({ type: Progression, required: true })
  progression: Progression;

  @Prop({ type: [Class], default: [] })
  classes: Class[];

  @Prop({ type: PlayerProfile, required: true })
  profile: PlayerProfile;

  @Prop({ type: Appearance, required: true })
  appearance: Appearance;

  @Prop({ type: Background, required: true })
  background: Background;

  @Prop({ type: Treasure, required: true })
  treasure: Treasure;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
