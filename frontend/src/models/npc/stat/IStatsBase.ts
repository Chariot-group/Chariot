import { Size } from "@/constants/CharacterConstants";
import IAbilityScores from "@/models/npc/stat/sub/IAbilityScores";
import ISavingThrows from "@/models/npc/stat/sub/ISavingThrows";
import ISenses from "@/models/npc/stat/sub/ISenses";
import ISkills from "@/models/npc/stat/sub/ISkills";
import ISpeed from "@/models/npc/stat/sub/ISpeed";

export default interface IStatsBase {
    size: Size; // OK
    maxHitPoints: number;   // OK
    currentHitPoints: number;   // OK
    tempHitPoints: number;  // OK
    armorClass: number;  // OK
    speed: ISpeed;  // OK
    abilityScores: IAbilityScores; // OK
    darkvision: number; // OK
    languages: string[];    // OK
    passivePerception: number;  // OK
    savingThrows: ISavingThrows; // OK
    skills: ISkills;    // OK
    senses: ISenses[];  // OK
}