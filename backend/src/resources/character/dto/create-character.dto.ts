import { IsString, IsOptional, IsMongoId, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ClassificationDto } from '@/resources/character/dto/sub/classification.dto';
import { StatsDto } from '@/resources/character/dto/sub/stats.dto';
import { CombatDto } from '@/resources/character/dto/sub/combat.dto';
import { TraitsDto } from '@/resources/character/dto/sub/traits.dto';
import { ActionsDto } from '@/resources/character/dto/sub/actions.dto';

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
