import { Size } from '@/resources/character/core/constants/sizes.constant';
import { AbilityScoresDto } from './sub/abilityScores.dto';
import { SavingThrowsDto } from '@/resources/character/core/dto/stats/sub/savingThrows.dto';
import { SpeedDto } from '@/resources/character/core/dto/stats/sub/speed.dto';
import { SkillDto } from '@/resources/character/core/dto/stats/sub/skill.dto';
import { SenseDto } from '@/resources/character/core/dto/stats/sub/sense';
export declare class StatsDto {
    size: Size[number];
    maxHitPoints?: number;
    currentHitPoints?: number;
    tempHitPoints?: number;
    armorClass?: number;
    passivePerception?: number;
    darkvision?: number;
    languages?: string[];
    abilityScores?: AbilityScoresDto;
    savingThrows?: SavingThrowsDto;
    speed?: SpeedDto;
    skills?: SkillDto;
    senses: SenseDto[];
}
