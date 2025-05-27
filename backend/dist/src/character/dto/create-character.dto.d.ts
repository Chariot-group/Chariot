import { ClassificationDto } from './sub/classification.dto';
import { StatsDto } from './sub/stats.dto';
import { CombatDto } from './sub/combat.dto';
import { TraitsDto } from './sub/traits.dto';
import { ActionsDto } from './sub/actions.dto';
export declare class CreateCharacterDto {
    name: string;
    groups?: string[];
    classification: ClassificationDto;
    stats: StatsDto;
    combat: CombatDto;
    traits: TraitsDto;
    actions: ActionsDto;
}
