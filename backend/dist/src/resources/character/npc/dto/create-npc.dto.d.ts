import { ProfileDto } from '@/resources/character/core/dto/profile/profile.dto';
import { ActionsDto } from '@/resources/character/npc/dto/actions/actions.dto';
import { ChallengeDto } from '@/resources/character/npc/dto/challenge/challenge.dto';
import { CreateCharacterDto } from '@/resources/character/core/dto/create-character.dto';
export declare class CreateNpcDto extends CreateCharacterDto {
    actions: ActionsDto;
    challenge: ChallengeDto;
    profile: ProfileDto;
}
