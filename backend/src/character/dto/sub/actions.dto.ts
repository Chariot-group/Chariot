import { IsArray, IsString, IsNumber, ValidateNested, IsObject, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class ActionDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsNumber()
  @IsOptional()
  attackBonus: number;

  @IsObject()
  @IsOptional()
  damage: { dice: string; type: string };

  @IsString()
  @IsOptional()
  range: string;
}

export class ActionsDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  standard: ActionDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  legendary: ActionDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  lair: ActionDto[];
}
