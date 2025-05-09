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

  @Prop({ default: 0 })
  maxHitPoints: number;

  @Prop({
    default: function () {
      return this.maxHitPoints;
    },
  })
  currentHitPoints: number;

  @Prop({ default: 0 })
  tempHitPoints: number;

  @Prop({ default: 0 })
  armorClass: number;

  @Prop({ type: Speed, default: {} })
  speed: Speed;

  @Prop({ type: AbilityScores, default: {} })
  abilityScores: AbilityScores;

  @Prop({ default: 0 })
  darkvision: number;

  @Prop({ type: [String], default: [] })
  languages: string[];

  @Prop({ default: 0 })
  passivePerception: number;

  @Prop({ type: SavingThrows, default: {} })
  savingThrows: SavingThrows;

  @Prop({ type: Skills, default: {} })
  skills: Skills;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);

@Schema({ _id: false })
export class PlayerStats extends Stats {
  @Prop({ default: 0 })
  proficiencyBonus: number;
}

export const PlayerStatsSchema = SchemaFactory.createForClass(PlayerStats);
