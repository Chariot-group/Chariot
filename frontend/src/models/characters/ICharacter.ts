import { IGroup } from "@/models/groups/IGroup";
import IAffinities from "@/models/characters/affinities/IAffinities";
import ISpellcasting from "@/models/characters/spellcasting/ISpellcasting";
import IAbility from "@/models/characters/abilities/IAbility";

export default interface ICharacter {
    _id: string;
    name: string;   // OK
    kind: 'npc' | 'player'; // OK
    affinities: IAffinities // OK
    abilities: IAbility[];  // OK
    spellcasting: ISpellcasting[];
    groups: IGroup[] | string[];
    deletedAt?: Date;
}