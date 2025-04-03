import { IsNumber, IsArray, IsString } from 'class-validator';

export class CombatDto {
  @IsNumber()
  challengeRating: number;

  @IsNumber()
  experiencePoints: number;

  @IsArray()
  @IsString({ each: true })
  resistances: string[];

  @IsArray()
  @IsString({ each: true })
  immunities: string[];

  @IsArray()
  @IsString({ each: true })
  vulnerabilities: string[];
}