import ISpell from "./ISpell";

export default interface ISpellcasting {
    ability?: string;
    saveDC?: number;
    attackBonus: number;
    spellSlotsByLevel?: Map<number, { total?: number; used?: number }>;
    totalSlots: number;
    spells: ISpell[];
}