import ISpellcasting from "@/models/characters/spellcasting/ISpellcasting";
import IPlayer from "@/models/player/IPlayer"
import { useEffect, useState } from "react";
import SpellsCasting from "./sections/SpellsCasting";
import SpellCasting from "./sections/SpellCasting";
import { set } from "react-hook-form";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function Spells({ player, isUpdate, updatePlayer }: Props) {

    const [spellCastingSelected, setSpellCastingSelected] = useState<ISpellcasting>(player.spellcasting[0]);
    const [spellCastingIndex, setSpellCastingIndex] = useState<number>(0);

    const changeSpellCasting = (value: ISpellcasting) => {
        const newSpellcasting: ISpellcasting[] = [...spellcasting];
        newSpellcasting[spellCastingIndex] = value;
        console.log("spellCastingIndex", spellCastingIndex, newSpellcasting);
        changeSpellcastings(newSpellcasting);
    }

    const [spellcasting, setSpellcastings] = useState<ISpellcasting[]>(player.spellcasting);
    
    const changeSpellcastings = (value: ISpellcasting[]) => {
        setSpellcastings(value);
        setSpellCastingSelected(value[spellCastingIndex]);
        updatePlayer({
            ...player,
            spellcasting: value
        });
    }

    return (
        <div className="flex flex-row gap-3 h-full h-[90%] overflow-auto">
            <div className="flex flex-col gap-3 w-1/6 h-full">
                <SpellsCasting isUpdate={isUpdate} setSelectedSpellcasting={setSpellCastingSelected} selectedSpellcasting={spellCastingSelected} setSpellCastingIndex={setSpellCastingIndex} changeSpellcasting={changeSpellcastings} spellcasting={spellcasting} />
            </div>
            <div className="flex flex-col border border-ring h-full">
            </div>
            <div className="flex flex-col gap-3 w-5/6 h-full">
                <SpellCasting spellCastingIndex={spellCastingIndex} isUpdate={isUpdate} selectedSpellcasting={spellCastingSelected} changeSpellCasting={changeSpellCasting}/>
            </div>
        </div>
    )
}