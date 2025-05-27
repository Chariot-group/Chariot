import { ActionsDto } from '@/resources/character/npc/dto/actions/actions.dto';
import { ChallengeDto } from '@/resources/character/npc/dto/challenge/challenge.dto';
import { CreateCharacterDto } from '@/resources/character/core/dto/create-character.dto';
import { NPCProfileDto } from '@/resources/character/npc/dto/profile/npc-profile.dto';
export declare class CreateNpcDto extends CreateCharacterDto {
    actions: ActionsDto;
    challenge: ChallengeDto;
    profile: NPCProfileDto;
}
