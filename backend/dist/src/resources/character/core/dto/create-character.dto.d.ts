import { StatsDto } from '@/resources/character/core/dto/stats/stats.dto';
import { AffinitiesDto } from '@/resources/character/core/dto/affinities/affinities.dto';
import { AbilityDto } from '@/resources/character/core/dto/ability/ability.dto';
import { SpellcastingDto } from '@/resources/character/core/dto/spellcasting/spellcasting.dto';
export declare class CreateCharacterDto {
    name: string;
    groups?: string[];
    stats: StatsDto;
    affinities: AffinitiesDto;
    abilities: AbilityDto[];
    spellcasting: SpellcastingDto[];
}
