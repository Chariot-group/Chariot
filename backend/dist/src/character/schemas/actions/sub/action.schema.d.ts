import { Damage } from "./damage.schema";
export declare class Action {
    name: string;
    type: string;
    attackBonus: number;
    damage: Damage;
    range: string;
}
