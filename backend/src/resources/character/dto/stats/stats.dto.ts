import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Size } from '@/resources/character/constants/sizes.constant';
import { AbilityScoresDto } from './sub/abilityScores.dto';
import { Type } from 'class-transformer';
import { SavingThrowsDto } from '@/resources/character/dto/stats/sub/savingThrows.dto';
import { SpeedDto } from '@/resources/character/dto/stats/sub/speed.dto';
import { SkillDto } from '@/resources/character/dto/stats/sub/skill.dto';

export class StatsDto {
  @IsOptional()
  @IsString()
  size: Size[number];

  @IsOptional()
  @IsNumber()
  maxHitPoints?: number;

  @IsOptional()
  @IsNumber()
  currentHitPoints?: number;

  @IsOptional()
  @IsNumber()
  tempHitPoints?: number;

  @IsOptional()
  @IsNumber()
  armorClass?: number;

  @IsOptional()
  @IsNumber()
  passivePerception?: number;

  @IsOptional()
  @IsNumber()
  darkvision?: number;

  @IsOptional()
  @IsString({ each: true })
  languages?: string[];

  @ValidateNested()
  @IsOptional()
  @Type(() => AbilityScoresDto)
  abilityScores?: AbilityScoresDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => SavingThrowsDto)
  savingThrows?: SavingThrowsDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => SpeedDto)
  speed?: SpeedDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => SkillDto)
  skills?: SkillDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Object)
  senses: { name: string; value: number }[];
}
