import { Stats } from '@/resources/character/core/schemas/stats/stats.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Masteries } from './player-masteries.schema';

@Schema({ _id: false })
export class PlayerStats extends Stats {
  @Prop({ default: 0 })
  proficiencyBonus: number;

  @Prop({ type: Masteries, default: {} })
  masteries: Masteries;
}

export const PlayerStatsSchema = SchemaFactory.createForClass(PlayerStats);
