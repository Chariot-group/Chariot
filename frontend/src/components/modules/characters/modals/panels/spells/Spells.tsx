import ISpellcasting from "@/models/characters/spellcasting/ISpellcasting";
import IPlayer from "@/models/player/IPlayer"
import { useEffect, useState } from "react";
import SpellsCasting from "./sections/SpellsCasting";
import SpellCasting from "./sections/SpellCasting";

interface Props {
    player: IPlayer;
}
export default function Spells({ player }: Props) {

    const [spellCastingSelected, setSpellCastingSelected] = useState<ISpellcasting>(player.spellcasting[0]);

    return (
        <div className="flex flex-row gap-3 h-full h-[90%] overflow-auto">
            <div className="flex flex-col gap-3 w-1/6 h-full">
                <SpellsCasting player={player} setSelectedSpellcasting={setSpellCastingSelected} selectedSpellcasting={spellCastingSelected} />
            </div>
            <div className="flex flex-col border border-ring h-full">
            </div>
            <div className="flex flex-col gap-3 w-5/6 h-full">
                <SpellCasting selectedSpellcasting={spellCastingSelected} />
            </div>
        </div>
    )
}