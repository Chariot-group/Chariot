import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TreasureDto {
  @IsOptional()
  @IsNumber()
  cp?: number;

  @IsOptional()
  @IsNumber()
  sp?: number;

  @IsOptional()
  @IsNumber()
  ep?: number;

  @IsOptional()
  @IsNumber()
  gp?: number;

  @IsOptional()
  @IsNumber()
  pp?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
