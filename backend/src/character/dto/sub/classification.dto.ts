import { IsString, IsOptional } from 'class-validator';

export class ClassificationDto {
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  subtype?: string;

  @IsString()
  alignment: string;

  @IsString()
  size: string;
}
