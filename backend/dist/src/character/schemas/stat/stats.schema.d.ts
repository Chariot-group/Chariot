import { Speed } from "./sub/speed.schema";
import { AbilityScores } from "./sub/abilityScores.schema";
import { SavingThrows } from "./sub/savingThrows.schema";
import { Skills } from "./sub/skill.schema";
import { Senses } from "./sub/sense.schema";
export declare class Stats {
    maxHitPoints: number;
    currentHitPoints: number;
    tempHitPoints: number;
    hitDice: string;
    armorClass: number;
    speed: Speed;
    abilityScores: AbilityScores;
    savingThrows?: SavingThrows;
    skills?: Skills;
    senses: Senses;
}
