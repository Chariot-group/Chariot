import { IsString, IsOptional, IsMongoId, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ClassificationDto } from './sub/classification.dto';
import { StatsDto } from './sub/stats.dto';
import { CombatDto } from './sub/combat.dto';
import { TraitsDto } from './sub/traits.dto';
import { ActionsDto } from './sub/actions.dto';

export class CreateCharacterDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsMongoId({each:true})
  @IsArray()
  groups?: string[];

  @ValidateNested()
  @Type(() => ClassificationDto)
  classification: ClassificationDto;

  @ValidateNested()
  @Type(() => StatsDto)
  stats: StatsDto;

  @ValidateNested()
  @Type(() => CombatDto)
  combat: CombatDto;

  @ValidateNested()
  @Type(() => TraitsDto)
  traits: TraitsDto;

  @ValidateNested()
  @Type(() => ActionsDto)
  actions: ActionsDto;
}
