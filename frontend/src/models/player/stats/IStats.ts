import IStatsBase from "@/models/npc/stat/IStatsBase";
import IMastery from "./IMastery";
import IMasteryAbility from "./IMasteryAbility";

export default interface IStats extends IStatsBase {
  proficiencyBonus: number;
  masteries: IMastery;
  masteriesAbility: IMasteryAbility;
}
