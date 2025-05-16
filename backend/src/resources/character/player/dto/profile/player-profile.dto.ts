import { IsOptional, IsString } from 'class-validator';
import { ProfileDto } from '@/resources/character/dto/profile/profile.dto';

export class PlayerProfileDto extends ProfileDto {
  @IsOptional()
  @IsString()
  race?: string;

  @IsOptional()
  @IsString()
  subrace?: string;
}
