import { Damage } from '@/resources/character/npc/schemas/actions/sub/damage.schema';
export declare class Action {
    name?: string;
    type?: string;
    attackBonus?: number;
    damage: Damage;
    range?: string;
}
