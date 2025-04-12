import { IsString, IsOptional } from 'class-validator';

export class ClassificationDto {
  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  subtype?: string;

  @IsString()
  @IsOptional()
  alignment: string;

  @IsString()
  @IsOptional()
  size: string;
}
