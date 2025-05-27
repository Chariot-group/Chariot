export declare class SpellDto {
    name?: string;
    level?: number;
    school?: string;
    description?: string;
    components?: string[];
    castingTime?: string;
    duration?: string;
    range?: string;
    effectType?: 'attack' | 'heal' | 'utility';
    damage?: string;
    healing?: string;
}
