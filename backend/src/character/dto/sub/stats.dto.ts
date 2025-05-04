import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class StatsDto {
  @IsOptional()
  maxHitPoints: number;

  @IsOptional()
  currentHitPoints: number;

  @IsOptional()
  tempHitPoints: number;

  @IsString()
  @IsOptional()
  hitDice: string;

  @IsOptional()
  armorClass: number;

  @IsObject()
  @IsOptional()
  speed: Record<string, number>;

  @IsObject()
  @IsOptional()
  abilityScores: Record<string, number>;

  @IsObject()
  @IsOptional()
  savingThrows: Record<string, number>;

  @IsObject()
  @IsOptional()
  skills: Record<string, number>;

  @IsObject()
  @IsOptional()
  senses: Record<string, number>;
}
