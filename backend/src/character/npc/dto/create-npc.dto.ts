import { CreateCharacterDto } from '@/character/dto/create-character.dto';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { ProfileDto } from '@/character/dto/profile/profile.dto';
import { ChallengeDto } from '@/character/npc/dto/challenge/challenge.dto';
import { ActionsDto } from '@/character/dto/sub/actions.dto';

export class CreateNpcDto extends CreateCharacterDto {
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  @Type(() => ActionsDto)
  actions: ActionsDto[];

  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  @Type(() => ChallengeDto)
  challenge: ChallengeDto[];

  @ValidateNested()
  @IsOptional()
  @Type(() => ProfileDto)
  profile: ProfileDto;
}
