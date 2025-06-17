import IStatsBase from "@/models/npc/stat/IStatsBase";
import IMastery from "./IMastery";

export default interface IStats extends IStatsBase {
  proficiencyBonus: number;
  masteries: IMastery;
}
