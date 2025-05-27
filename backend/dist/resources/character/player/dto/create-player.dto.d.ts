import { CreateCharacterDto } from '@/resources/character/core/dto/create-character.dto';
import { ProgressionDto } from '@/resources/character/player/dto/progression/progression.dto';
import { ClassDto } from '@/resources/character/player/dto/class/class.dto';
import { PlayerProfileDto } from '@/resources/character/player/dto/profile/player-profile.dto';
import { AppearanceDto } from '@/resources/character/player/dto/appearance/appearance.dto';
import { BackgroundDto } from '@/resources/character/player/dto/background/background.dto';
import { TreasureDto } from '@/resources/character/player/dto/treasure/treasure.dto';
import { PlayerStatsDto } from '@/resources/character/player/dto/stats/player-stats.dto';
export declare class CreatePlayerDto extends CreateCharacterDto {
    inspiration: boolean;
    progression: ProgressionDto;
    class: ClassDto[];
    profile: PlayerProfileDto;
    appearance: AppearanceDto;
    background: BackgroundDto;
    treasure: TreasureDto;
    stats: PlayerStatsDto;
}
