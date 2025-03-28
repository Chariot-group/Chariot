import { IsArray, IsString, IsNumber, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class ActionDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  attackBonus: number;

  @IsObject()
  damage: { dice: string; type: string };

  @IsString()
  range: string;
}

export class ActionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  standard: ActionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  legendary: ActionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  lair: ActionDto[];
}
