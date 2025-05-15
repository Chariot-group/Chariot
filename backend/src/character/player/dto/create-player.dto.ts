import { CreateCharacterDto } from '@/character/dto/create-character.dto';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ProgressionDto } from '@/character/dto/progression/progression.dto';
import { ClassDto } from '@/character/dto/class/class.dto';
import { ProfileDto } from '@/character/dto/profile/profile.dto';
import { AppearanceDto } from '@/character/dto/appearance/appearance.dto';
import { BackgroundDto } from '@/character/dto/background/background.dto';
import { TreasureDto } from '@/character/dto/treasure/treasure.dto';
import { PlayerStatsDto } from '@/character/dto/stats/stats.dto';

export class CreatePlayerDto extends CreateCharacterDto {
  @IsOptional()
  @IsBoolean()
  inspiration: boolean;

  @ValidateNested()
  @IsOptional()
  @Type(() => ProgressionDto)
  progression: ProgressionDto;

  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  @Type(() => ClassDto)
  classes: ClassDto[];

  @ValidateNested()
  @IsOptional()
  @Type(() => ProfileDto)
  profile: ProfileDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => AppearanceDto)
  appearance: AppearanceDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => BackgroundDto)
  background: BackgroundDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => TreasureDto)
  treasure: TreasureDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => PlayerStatsDto)
  stats: PlayerStatsDto;
}
