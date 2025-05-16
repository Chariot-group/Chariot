import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Speed } from '@/resources/character/core/schemas/stats/sub/speed.schema';
import { AbilityScores } from '@/resources/character/core/schemas/stats/sub/abilityScores.schema';
import { SavingThrows } from '@/resources/character/core/schemas/stats/sub/savingThrows.schema';
import { Skills } from '@/resources/character/core/schemas/stats/sub/skill.schema';
import {
  SIZES,
  Size,
} from '@/resources/character/core/constants/sizes.constant';

@Schema({ _id: false })
export class Stats {
  @Prop({
    type: String,
    required: true,
    enum: SIZES,
  })
  size: Size;

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

  @Prop({ type: [{ name: String, value: Number }], default: [] })
  senses: { name: string; value: number }[];
}

export const StatsSchema = SchemaFactory.createForClass(Stats);
