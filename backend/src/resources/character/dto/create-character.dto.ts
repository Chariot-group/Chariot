import {
  IsString,
  IsOptional,
  IsMongoId,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StatsDto } from '@/resources/character/dto/stats/stats.dto';
import { AffinitiesDto } from '@/resources/character/dto/affinities/affinities.dto';
import { AbilityDto } from '@/resources/character/dto/ability/ability.dto';
import { SpellcastingDto } from '@/resources/character/dto/spellcasting/spellcasting.dto';

export class CreateCharacterDto {
  @IsString()
  name: string;

  @IsString()
  kind?: 'player' | 'npc';

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  groups?: string[];

  @ValidateNested()
  @IsOptional()
  @Type(() => StatsDto)
  stats: StatsDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => AffinitiesDto)
  affinities: AffinitiesDto;

  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  @Type(() => AbilityDto)
  abilities: AbilityDto[];

  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  @Type(() => SpellcastingDto)
  spellcasting: SpellcastingDto[];
}
