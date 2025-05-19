import IStatsBase from "@/models/npc/stat/IStatsBase";

export default interface IStats extends IStatsBase {
    proficiencyBonus: number;
}