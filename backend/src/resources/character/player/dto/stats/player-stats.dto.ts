import { IsNumber, IsOptional } from 'class-validator';
import { StatsDto } from '@/resources/character/core/dto/stats/stats.dto';

export class PlayerStatsDto extends StatsDto {
  @IsOptional()
  @IsNumber()
  proficiencyBonus?: number;
}
