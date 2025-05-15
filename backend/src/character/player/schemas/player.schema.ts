import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Character } from '@/character/schemas/character.schema';
import { Progression } from '@/character/player/schemas/progression/progression.schema';
import { Class } from '@/character/player/schemas/class/class.schema';
import { PlayerProfile } from '@/character/schemas/profile/profile.schema';
import { Appearance } from '@/character/player/schemas/appearance/appearance.schema';
import { Background } from '@/character/player/schemas/background/background.schema';
import { Treasure } from '@/character/player/schemas/treasure/treasure.schema';
import { PlayerStats } from '@/character/schemas/stat/stats.schema';

export type PlayerDocument = Player & Document;

@Schema()
export class Player extends Character {
  @Prop({ required: true })
  inspiration: boolean;

  @Prop({ type: Progression, default: {} })
  progression: Progression;

  @Prop({ type: [Class], default: [] })
  classes: Class[];

  @Prop({ type: PlayerProfile, default: {} })
  profile: PlayerProfile;

  @Prop({ type: Appearance, default: {} })
  appearance: Appearance;

  @Prop({ type: Background, default: {} })
  background: Background;

  @Prop({ type: Treasure, default: {} })
  treasure: Treasure;

  @Prop({ type: PlayerStats, default: {} })
  stats: PlayerStats;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
