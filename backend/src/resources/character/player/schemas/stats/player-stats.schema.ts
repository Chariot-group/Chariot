import { Stats } from '@/resources/character/core/schemas/stats/stats.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class PlayerStats extends Stats {
  @Prop({ default: 0 })
  proficiencyBonus: number;
}

export const PlayerStatsSchema = SchemaFactory.createForClass(PlayerStats);
