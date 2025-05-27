declare class ActionDto {
    name: string;
    type: string;
    attackBonus: number;
    damage: {
        dice: string;
        type: string;
    };
    range: string;
}
export declare class ActionsDto {
    standard: ActionDto[];
    legendary: ActionDto[];
    lair: ActionDto[];
}
export {};
