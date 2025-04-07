import { IsArray, IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AbilityDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class TraitsDto {
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  languages: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AbilityDto)
  abilities: AbilityDto[];
}
