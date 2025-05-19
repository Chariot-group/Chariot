import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ISpellcasting from "@/models/characters/spellcasting/ISpellcasting";
import { PlusCircleIcon, TrashIcon } from "lucide-react";
import { Champs } from "../../../PlayerModalDetails";
import IPlayer from "@/models/player/IPlayer";
import { useState } from "react";

interface Props {
    setSelectedSpellcasting: (spellcasting: ISpellcasting) => void;
    selectedSpellcasting: ISpellcasting;
    isUpdate: boolean;
    setSpellCastingIndex: (index: number) => void;
    changeSpellcasting: (spellcasting: ISpellcasting[]) => void;
    spellcasting: ISpellcasting[];
}
export default function SpellsCasting({ isUpdate, setSelectedSpellcasting, selectedSpellcasting, setSpellCastingIndex, changeSpellcasting, spellcasting }: Props) {

    const addSpellcasting = () => {
        const newSpellcasting: ISpellcasting = {
            ability: "",
            saveDC: 0,
            attackBonus: 0,
            spellSlotsByLevel: {},
            totalSlots: 0,
            spells: []
        }
        changeSpellcasting([...spellcasting, newSpellcasting]);
        setSelectedSpellcasting(newSpellcasting);
        setSpellCastingIndex(spellcasting.length);
    }

    const removeSpellcasting = (index: number) => {
        const newSpellcasting = [...spellcasting];
        newSpellcasting.splice(index, 1);
        if (selectedSpellcasting == spellcasting[index]) {
            setSelectedSpellcasting(newSpellcasting[0]);
            setSpellCastingIndex(0);
        }
        changeSpellcasting(newSpellcasting);
    }

    return (
        <div className="flex flex-col gap-3 w-full h-full">
            <div className="flex flex-row justify-between">
                <h1 className="text-foreground text-lg font-bold">Lancés de sorts</h1>
                {isUpdate && <Tooltip>
                    <TooltipTrigger asChild>
                        <PlusCircleIcon onClick={() => addSpellcasting()} className="text-primary cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Ajouter un lancé de sort</p>
                    </TooltipContent>
                </Tooltip>}
            </div>
            <div className="flex flex-col gap-3 h-full overflow-auto">
                {spellcasting.map((spell, index) => (
                    <Card key={index} onClick={() => {setSelectedSpellcasting(spell); setSpellCastingIndex(index)}} className={`border-ring shadow-md hover:shadow-[inset_0_0_0_1px_hsl(var(--ring))] cursor-pointer bg-card p-4 flex justify-between flex-col gap-2 bg-background ${selectedSpellcasting === spell && "shadow-[inset_0_0_0_1px_hsl(var(--ring))]"}`} >
                        <div className="flex flex-row justify-between items-center gap-2">
                            <p className="text-sm"><span className="font-bold">Abilitée: </span>{spell.ability}</p>
                            {isUpdate && <Tooltip>
                                <TooltipTrigger asChild>
                                    <TrashIcon onClick={() => removeSpellcasting(index)} className="text-primary cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Supprimé le lancé de sort</p>
                                </TooltipContent>
                            </Tooltip>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm"><span className="font-bold">Dé de sauvegarde: </span>{spell.saveDC}</p>
                            <p className="text-sm"><span className="font-bold">Attaque bonus: </span>{spell.attackBonus}</p>
                            <p className="text-sm"><span className="font-bold">Nombre de sorts: </span>{spell.spells.length}</p>
                            <p className="text-sm"><span className="font-bold">Nombre de slots: </span>{spell.totalSlots}</p>
                        </div>
                        
                    </Card>
                ))}
            </div>
        </div>
    )

}