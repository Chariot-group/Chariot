import { CreateCharacterDto } from '@/resources/character/dto/create-character.dto';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ProgressionDto } from '@/resources/character/player/dto/progression/progression.dto';
import { ClassDto } from '@/resources/character/player/dto/class/class.dto';
import { ProfileDto } from '@/resources/character/dto/profile/profile.dto';
import { AppearanceDto } from '@/resources/character/player/dto/appearance/appearance.dto';
import { BackgroundDto } from '@/resources/character/player/dto/background/background.dto';
import { TreasureDto } from '@/resources/character/player/dto/treasure/treasure.dto';
import { PlayerStatsDto } from '@/resources/character/dto/stats/stats.dto';

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
