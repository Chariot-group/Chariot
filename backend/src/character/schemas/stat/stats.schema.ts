import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Speed } from '@/character/schemas/stat/sub/speed.schema';
import { AbilityScores } from '@/character/schemas/stat/sub/abilityScores.schema';
import { SavingThrows } from '@/character/schemas/stat/sub/savingThrows.schema';
import { Skills } from '@/character/schemas/stat/sub/skill.schema';

const sizes = [
  'Tiny',
  'Small',
  'Medium',
  'Large',
  'Huge',
  'Gargantuan',
] as const;
@Schema({ _id: false })
export class Stats {
  @Prop({
    type: String,
    required: true,
    enum: sizes,
  })
  size: (typeof sizes)[number];

  @Prop({ required: true })
  maxHitPoints: number;

  @Prop({ required: true })
  currentHitPoints: number;

  @Prop({ required: true })
  tempHitPoints: number;

  @Prop({ required: true })
  armorClass: number;

  @Prop({ type: Speed, required: true })
  speed: Speed;

  @Prop({ type: AbilityScores, required: true })
  abilityScores: AbilityScores;

  @Prop({ default: 0 })
  darkvision: number;

  @Prop({ type: [String], required: true })
  languages: string[];

  @Prop({ required: true })
  passivePerception: number;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);

@Schema({ _id: false })
export class PlayerStats extends Stats {
  @Prop({ type: SavingThrows, required: true })
  savingThrows: SavingThrows;

  @Prop({ type: Skills, required: true })
  skills: Skills;

  @Prop({ required: true })
  proficiencyBonus: number;
}

export const PlayerStatsSchema = SchemaFactory.createForClass(PlayerStats);
@Schema({ _id: false })
export class NPCStats extends Stats {
  @Prop({ type: SavingThrows })
  savingThrows?: SavingThrows;

  @Prop({ type: Skills })
  skills?: Skills;
}

export const NPCStatsSchema = SchemaFactory.createForClass(NPCStats);
