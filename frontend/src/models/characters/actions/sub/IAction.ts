import IDamage from "@/models/characters/actions/sub/IDamage";

export default interface IAction {
    name: string;
    type: string;
    attackBonus: number;
    damage: IDamage
    range: string;
}