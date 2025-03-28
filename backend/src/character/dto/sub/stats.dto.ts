import { IsNumber, IsObject } from 'class-validator';

export class StatsDto {
  @IsNumber()
  maxHitPoints: number;

  @IsNumber()
  currentHitPoints: number;

  @IsNumber()
  tempHitPoints: number;

  @IsNumber()
  armorClass: number;

  @IsObject()
  speed: Record<string, number>;

  @IsObject()
  abilityScores: Record<string, number>;

  @IsObject()
  savingThrows: Record<string, number>;

  @IsObject()
  skills: Record<string, number>;

  @IsObject()
  senses: Record<string, number>;
}
