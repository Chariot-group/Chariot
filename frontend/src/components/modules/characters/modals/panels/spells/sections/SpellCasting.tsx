import { Card } from "@/components/ui/card";
import ISpellcasting, { ISpellSlotsByLevel } from "@/models/characters/spellcasting/ISpellcasting";
import { useEffect, useState } from "react";
import { Champs } from "../../../PlayerModalDetails";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PlusCircleIcon, Trash, TrashIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ISpell from "@/models/characters/spellcasting/ISpell";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    selectedSpellcasting: ISpellcasting;
}
export default function SpellCasting({ selectedSpellcasting }: Props) {

    const [ability, setAbility] = useState<string | undefined>(selectedSpellcasting.ability);
    const [saveDC, setSaveDC] = useState<number | undefined>(selectedSpellcasting.saveDC);
    const [attackBonus, setAttackBonus] = useState<number>(selectedSpellcasting.attackBonus);
    const [totalSlots, setTotalSlots] = useState<number>(selectedSpellcasting.totalSlots);

    const [spellSlotsByLevel, setSpellSlotsByLevel] = useState<ISpellSlotsByLevel>(selectedSpellcasting.spellSlotsByLevel || {});

    const [spells, setSpells] = useState<ISpell[]>(selectedSpellcasting.spells);

    useEffect(() => {
        setAbility(selectedSpellcasting.ability);
        setSaveDC(selectedSpellcasting.saveDC);
        setAttackBonus(selectedSpellcasting.attackBonus);
        setTotalSlots(selectedSpellcasting.totalSlots);
        setSpells(selectedSpellcasting.spells);
    }, [selectedSpellcasting]);

    const addSlot = () => {
        const newSpellSlotsByLevel = { ...spellSlotsByLevel };
        newSpellSlotsByLevel[Object.keys(spellSlotsByLevel).length + 1] = {
            total: 0,
            used: 0
        }
        setSpellSlotsByLevel(newSpellSlotsByLevel);
    }
    const removeSpellSlot = (level: number) => {
        const newSpellSlotsByLevel = { ...spellSlotsByLevel };
        delete newSpellSlotsByLevel[level];
        setSpellSlotsByLevel(newSpellSlotsByLevel);
    }

    const updateUsedSlot = (level: number, used: number) => {
        const newSpellSlotsByLevel = { ...spellSlotsByLevel };
        newSpellSlotsByLevel[level] = {
            ...newSpellSlotsByLevel[level],
            used: used
        }

        setSpellSlotsByLevel(newSpellSlotsByLevel);
    }
    const updateTotalSlots = (level: number, total: any) => {
        const newSpellSlotsByLevel = { ...spellSlotsByLevel };
        newSpellSlotsByLevel[level] = {
            ...newSpellSlotsByLevel[level],
            total: parseInt(total)
        }

        let newTotal = 0;
        Object.keys(spellSlotsByLevel).map((lev, index) => {
            if(level == parseInt(lev)) {
                newTotal += parseInt(total);
            }else {
                newTotal += newSpellSlotsByLevel[lev as any].total || 0;
            }
        });
        setTotalSlots(newTotal);

        setSpellSlotsByLevel(newSpellSlotsByLevel);
    }

    const addSpell = () => {
        const newSpell = {
            name: "",
            level: 0,
            description: "",
            castingTime: "",
            range: "",
            components: [],
        }
        setSpells([...spells, newSpell]);
    }

    const removeSpell = (index: number) => {
        const newSpells = [...spells];
        newSpells.splice(index, 1);
        setSpells(newSpells);
    }
    const updateNameSpell = (index: number, name: string) => {
        const newSpells = [...spells];
        newSpells[index] = {
            ...newSpells[index],
            name: name
        }
        setSpells(newSpells);
    }
    const updateLevelSpell = (index: number, level: number) => {
        const newSpells = [...spells];
        newSpells[index] = {
            ...newSpells[index],
            level: level
        }
        setSpells(newSpells);
    }
    const updateDescriptionSpell = (index: number, description: string) => {
        const newSpells = [...spells];
        newSpells[index] = {
            ...newSpells[index],
            description: description
        }
        setSpells(newSpells);
    }
    const updateCastingTimeSpell = (index: number, castingTime: string) => {
        const newSpells = [...spells];
        newSpells[index] = {
            ...newSpells[index],
            castingTime: castingTime
        }
        setSpells(newSpells);
    }
    const updateRangeSpell = (index: number, range: string) => {
        const newSpells = [...spells];
        newSpells[index] = {
            ...newSpells[index],
            range: range
        }
        setSpells(newSpells);
    }
    const updateComponentsSpell = (index: number, components: string[]) => {
        const newSpells = [...spells];
        newSpells[index] = {
            ...newSpells[index],
            components: components
        }
        setSpells(newSpells);
    }

    return (
        <div className="flex flex-row gap-3 w-full h-full">
            <div className="flex flex-col gap-3 w-1/4 h-full">
                <Card className={"bg-card p-4 flex flex-col bg-background"} >
                    <Champs color="card" id={"ability"} type={"text"} label={"Abilitée"} placeholder={"Abilitée"} value={ability} setValue={setAbility}></Champs>
                    <Champs color="card" id={"saveDC"} type={"number"} label={"Dé de sauvegarde"} placeholder={"Dé de sauvegarde"} value={saveDC} setValue={setSaveDC}></Champs>
                    <Champs color="card" id={"attackBonus"} type={"number"} label={"Attaque bonus"} placeholder={"Attaque bonus"} value={attackBonus} setValue={setAttackBonus}></Champs>
                    <p className="text-sm"><span className="font-bold">Nombre de slots: </span>{totalSlots}</p>
                </Card>

                <Card className={"bg-card p-4 gap-2 flex flex-col bg-background"} >
                    <div className="flex flex-row gap-3 justify-between">
                        <h1>Slots</h1>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PlusCircleIcon onClick={() => addSlot()} className="text-primary cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Ajouter un slots</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex flex-col gap-3">
                        {
                            Object.keys(spellSlotsByLevel).length <= 0 && 
                            <div className="row-start-2 col-span-4 flex items-top justify-center">
                                <p className="text-gray-500">Aucun slot trouvé</p>
                            </div>
                        }
                        {Object.keys(spellSlotsByLevel).map((level, index) => (
                            <Card key={index} className={"bg-card p-4 flex h-full flex-col bg-card"} >
                                <div className="flex flex-row gap-3 justify-between items-center">
                                    <p className="text-sm"><span className="font-bold">Niveau: </span>{level}</p>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <TrashIcon onClick={() => removeSpellSlot(level as any)} className="text-primary cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Supprimé le slot</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div className="flex flex-row items-center w-full">
                                        <Label htmlFor={"total"+level} className="text-foreground flex flex-row gap-1 items-center w-full"><span className="font-bold w-auto">Total:</span>
                                            <Input min={0} id={"total"+level} type={"number"} value={spellSlotsByLevel[level as any].total} onChange={(e) => updateTotalSlots(level as any, e.target.value as any)} placeholder={"Total"} className={`w-10 p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0` }/>
                                        </Label>
                                    </div>
                                    <div className="flex flex-row items-center w-full">
                                        <Label htmlFor={"used"+level} className="text-foreground flex flex-row gap-1 items-center w-full"><span className="font-bold w-auto">Utilisé:</span>
                                            <Input max={spellSlotsByLevel[level as any].total} min={0} id={"used"+level} type={"number"} value={spellSlotsByLevel[level as any].used} onChange={(e) => updateUsedSlot(level as any, e.target.value as any)} placeholder={"Utilisé"} className={`w-10 p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0` }/>
                                        </Label>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Card>
            </div>
            <div className="flex flex-col border border-ring h-full">
            </div>
            <div className="flex flex-col gap-3 w-3/4 h-full">
                <div className="flex flex-row gap-3 w-full">
                    <h1 className="text-foreground text-lg font-bold">Sorts</h1>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PlusCircleIcon onClick={() => addSpell()} className="text-primary cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Ajouter un sort</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="grid grid-cols-3 gap-4 items-start">
                    {spells.length <= 0 && 
                        <div className="row-start-2 col-span-4 flex items-top justify-center">
                            <p className="text-gray-500">Aucun sort trouvé</p>
                        </div>
                    }
                    {spells.map((spell, index) => (
                        <Card key={index} className={"bg-card p-4 flex flex-col bg-background"} >
                            <div className="flex flex-row gap-3 justify-between items-center">
                                <Champs color="card" id={"name"+index} type={"text"} label={"Nom"} placeholder={"Nom"} value={spell.name} setValue={(value) => updateNameSpell(index, value)}></Champs>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <TrashIcon onClick={() => removeSpell(index)} className="text-primary cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Supprimé le sort</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <div className="flex flex-col">
                                <Champs color="card" id={"level"+index} type={"number"} label={"Niveau"} placeholder={"Niveau"} value={spell.level} setValue={(value) => updateLevelSpell(index, value)}></Champs>
                                <Champs color="card" id={"castingTime"+index} type={"text"} label={"Temps d'incantation"} placeholder={"Temps d'incantation"} value={spell.castingTime} setValue={(value) => updateCastingTimeSpell(index, value)}></Champs>
                                <Champs color="card" id={"range"+index} type={"text"} label={"Portée"} placeholder={"Portée"} value={spell.range} setValue={(value) => updateRangeSpell(index, value)}></Champs>
                                <Champs color="card" id={"components"+index} type={"text"} label={"Composants"} placeholder={"Composants"} value={spell.components.join(", ")} setValue={(value) => updateComponentsSpell(index, value.split(", "))}></Champs>
                                <div className="flex flex-col w-full gap-1.5 mt-1 h-1/3">
                                    <Label htmlFor={"description"} className="text-foreground font-bold">Description:</Label>
                                    <Textarea id={"description"} placeholder="Description" value={spell.description} onChange={(e) => updateDescriptionSpell(index, e.target.value)} className="h-full rounded-xl resize-none bg-card border-ring" />
                                </div>
                            </div>
                        </Card>
                    ))}

                </div>
            </div>
        </div>
    )

}