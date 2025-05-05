import { IsString, IsOptional, IsMongoId, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ClassificationDto } from '@/character/dto/sub/classification.dto';
import { StatsDto } from '@/character/dto/sub/stats.dto';
import { CombatDto } from '@/character/dto/sub/combat.dto';
import { TraitsDto } from '@/character/dto/sub/traits.dto';
import { ActionsDto } from '@/character/dto/sub/actions.dto';

export class CreateCharacterDto {
  @IsString()
  name: string;

  @IsMongoId({each:true})
  @IsArray() 
  @IsOptional()
  groups?: string[];

  @ValidateNested()
  @IsOptional()
  @Type(() => ClassificationDto)
  classification: ClassificationDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => StatsDto)
  stats: StatsDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => CombatDto)
  combat: CombatDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => TraitsDto)
  traits: TraitsDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => ActionsDto)
  actions: ActionsDto;
}
