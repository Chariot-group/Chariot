import { IsOptional, IsString } from 'class-validator';

export class ProfileDto {
  @IsOptional()
  @IsString()
  race?: string;

  @IsOptional()
  @IsString()
  subrace?: string;
}
