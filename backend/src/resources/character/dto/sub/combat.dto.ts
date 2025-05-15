import { IsArray, IsString, IsOptional } from 'class-validator';

export class CombatDto {
  @IsOptional()
  challengeRating: number;

  @IsOptional()
  experiencePoints: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  resistances: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  immunities: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  vulnerabilities: string[];
}
