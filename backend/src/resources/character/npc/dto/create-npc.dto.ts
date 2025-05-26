import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { ProfileDto } from '@/resources/character/core/dto/profile/profile.dto';
import { ActionsDto } from '@/resources/character/npc/dto/actions/actions.dto';
import { ChallengeDto } from '@/resources/character/npc/dto/challenge/challenge.dto';
import { CreateCharacterDto } from '@/resources/character/core/dto/create-character.dto';

export class CreateNpcDto extends CreateCharacterDto {
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ActionsDto)
  actions: ActionsDto;

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ChallengeDto)
  challenge: ChallengeDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => ProfileDto)
  profile: ProfileDto;
}
