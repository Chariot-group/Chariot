import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AbilityDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}

export class TraitsDto {
  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AbilityDto)
  abilities: AbilityDto[];
}
