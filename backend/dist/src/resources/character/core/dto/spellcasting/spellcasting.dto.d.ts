import { SpellDto } from '@/resources/character/core/dto/spellcasting/sub/spell.dto';
export declare class SpellcastingDto {
    ability?: string;
    saveDC?: number;
    attackBonus?: number;
    spellSlotsByLevel?: Map<number, {
        total?: number;
        used?: number;
    }>;
    totalSlots?: number;
    spells: SpellDto;
}
