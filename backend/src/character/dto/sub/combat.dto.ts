import { IsNumber, IsArray, IsString, IsOptional } from 'class-validator';

export class CombatDto {
  @IsNumber()
  @IsOptional()
  challengeRating: number;

  @IsNumber()
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
