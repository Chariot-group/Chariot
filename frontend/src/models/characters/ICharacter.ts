import { IGroup } from "@/models/groups/IGroup";
import IAffinities from "@/models/characters/affinities/IAffinities";
import ISpellcasting from "@/models/characters/spellcasting/ISpellcasting";
import IAbility from "@/models/characters/abilities/IAbility";

export default interface ICharacter {
    _id: string;
    name: string;
    kind: 'npc' | 'player';
    affinities: IAffinities;
    abilities: IAbility[];
    spellcasting: ISpellcasting[];
    groups: IGroup[] | string[];
    deletedAt?: Date;
}