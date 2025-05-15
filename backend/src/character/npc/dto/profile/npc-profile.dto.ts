import { IsOptional, IsString } from 'class-validator';
import { ProfileDto } from '@/character/dto/profile/profile.dto';

export class NPCProfileDto extends ProfileDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  subtype?: string;
}
