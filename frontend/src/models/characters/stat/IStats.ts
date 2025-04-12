import IAbilityScores from "./sub/IAbilityScores";
import ISavingThrows from "./sub/ISavingThrows";
import ISenses from "./sub/ISenses";
import ISkills from "./sub/ISkills";
import ISpeed from "./sub/ISpeed";

export default interface IStats {
    maxHitPoints: number;
    currentHitPoints: number;
    tempHitPoints: number;
    hitDice: string;
    armorClass: number;
    seed: ISpeed;
    abilityScores: IAbilityScores;
    savingThrows?: ISavingThrows;
    skills?: ISkills;
    senses: ISenses
}