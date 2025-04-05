import { IsNumber, IsObject, IsOptional } from 'class-validator';

export class StatsDto {
  @IsNumber()
  @IsOptional()
  maxHitPoints: number;

  @IsNumber()
  @IsOptional()
  currentHitPoints: number;

  @IsNumber()
  @IsOptional()
  tempHitPoints: number;

  @IsNumber()
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
