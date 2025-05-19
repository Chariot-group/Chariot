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
import IPlayer from "@/models/player/IPlayer";
import { set } from "react-hook-form";

interface Props {
    selectedSpellcasting: ISpellcasting;
    isUpdate: boolean;
    changeSpellCasting: (spellcasting: ISpellcasting) => void;
    spellCastingIndex: number;
}
export default function SpellCasting({ selectedSpellcasting, isUpdate, changeSpellCasting, spellCastingIndex }: Props) {

    const [ability, setAbility] = useState<string | undefined>(selectedSpellcasting.ability);
    const [saveDC, setSaveDC] = useState<number | undefined>(selectedSpellcasting.saveDC);
    const [attackBonus, setAttackBonus] = useState<number>(selectedSpellcasting.attackBonus);
    const [totalSlots, setTotalSlots] = useState<number>(selectedSpellcasting.totalSlots);

    const changeAbility = (value: string) => {
        setAbility(value);
        changeSpellCasting({
            ...selectedSpellcasting,
            ability: value
        });
    }
    const changeSaveDC = (value: number) => {
        setSaveDC(value);
        changeSpellCasting({
            ...selectedSpellcasting,
            saveDC: value
        });
    }
    const changeAttackBonus = (value: number) => {
        setAttackBonus(value);
        changeSpellCasting({
            ...selectedSpellcasting,
            attackBonus: value
        });
    }
    const changeTotalSlots = (value: number) => {
        setTotalSlots(value);
        changeSpellCasting({
            ...selectedSpellcasting,
            totalSlots: value
        });
    }

    const [spellSlotsByLevel, setSpellSlotsByLevel] = useState<ISpellSlotsByLevel>(selectedSpellcasting.spellSlotsByLevel || {});

    const [spells, setSpells] = useState<ISpell[]>(selectedSpellcasting.spells);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        setLoading(true);
        setAbility(selectedSpellcasting.ability);
        setSaveDC(selectedSpellcasting.saveDC);
        setAttackBonus(selectedSpellcasting.attackBonus);
        setTotalSlots(selectedSpellcasting.totalSlots);
        setSpellSlotsByLevel(selectedSpellcasting.spellSlotsByLevel || {});
        setSpells(selectedSpellcasting.spells);
        setLoading(false);
    }, [selectedSpellcasting]);

    const updateSpellSlots = (value: ISpellSlotsByLevel) => {
        setSpellSlotsByLevel(value);
        changeSpellCasting({
            ...selectedSpellcasting,
            spellSlotsByLevel: value
        });
    }

    const addSlot = () => {
        const newSpellSlotsByLevel = { ...spellSlotsByLevel };
        newSpellSlotsByLevel[Object.keys(spellSlotsByLevel).length + 1] = {
            total: 0,
            used: 0
        }
        updateSpellSlots(newSpellSlotsByLevel);
    }
    const removeSpellSlot = (level: number) => {
        const newSpellSlotsByLevel = { ...spellSlotsByLevel };
        delete newSpellSlotsByLevel[level];
        updateSpellSlots(newSpellSlotsByLevel);
    }
    const updateUsedSlot = (level: number, used: number) => {
        const newSpellSlotsByLevel = { ...spellSlotsByLevel };
        newSpellSlotsByLevel[level] = {
            ...newSpellSlotsByLevel[level],
            used: used
        }

        updateSpellSlots(newSpellSlotsByLevel);
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
        changeTotalSlots(newTotal);

        updateSpellSlots(newSpellSlotsByLevel);
    }

    const updateSpell = (spells: ISpell[]) => {
        setSpells(spells);
        changeSpellCasting({
            ...selectedSpellcasting,
            spells: spells
        });
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
        updateSpell([...spells, newSpell]);
    }
    const removeSpell = (index: number) => {
        const newSpells = [...spells];
        newSpells.splice(index, 1);
        updateSpell(newSpells);
    }
    const updateNameSpell = (index: number, name: string) => {
        const newSpells = [...spells];
        newSpells[index] = {
            ...newSpells[index],
            name: name
        }
        updateSpell(newSpells);
    }
    const updateLevelSpell = (index: number, level: number) => {
        const newSpells = [...spells];
        newSpells[index] = {
            ...newSpells[index],
            level: level
        }
        updateSpell(newSpells);
    }
    const updateDescriptionSpell = (index: number, description: string) => {
        const newSpells = [...spells];
        newSpells[index] = {
            ...newSpells[index],
            description: description
        }
        console.log("description", description, newSpells, index);
        updateSpell(newSpells);
    }
    const updateCastingTimeSpell = (index: number, castingTime: string) => {
        const newSpells = [...spells];
        newSpells[index] = {
            ...newSpells[index],
            castingTime: castingTime
        }
        updateSpell(newSpells);
    }
    const updateRangeSpell = (index: number, range: string) => {
        const newSpells = [...spells];
        newSpells[index] = {
            ...newSpells[index],
            range: range
        }
        updateSpell(newSpells);
    }
    const updateComponentsSpell = (index: number, components: string[]) => {
        const newSpells = [...spells];
        newSpells[index] = {
            ...newSpells[index],
            components: components
        }
        updateSpell(newSpells);
    }

    return (
        <div className="flex flex-row gap-3 w-full h-full">
            <div className="flex flex-col gap-3 w-1/4 h-full">
                <Card className={"bg-card p-4 flex flex-col bg-background"} >
                    <Champs isActive={isUpdate} color="card" id={"ability"} type={"text"} label={"Abilitée"} placeholder={"Abilitée"} value={ability} setValue={changeAbility}></Champs>
                    <Champs isActive={isUpdate} color="card" id={"saveDC"} type={"number"} label={"Dé de sauvegarde"} placeholder={"Dé de sauvegarde"} value={saveDC} setValue={changeSaveDC}></Champs>
                    <Champs isActive={isUpdate} color="card" id={"attackBonus"} type={"number"} label={"Attaque bonus"} placeholder={"Attaque bonus"} value={attackBonus} setValue={changeAttackBonus}></Champs>
                    <p className="text-sm"><span className="font-bold">Nombre de slots: </span>{totalSlots}</p>
                </Card>

                <Card className={"bg-card p-4 gap-2 flex flex-col bg-background"} >
                    <div className="flex flex-row gap-3 justify-between">
                        <h1>Slots</h1>
                        {isUpdate && <Tooltip>
                            <TooltipTrigger asChild>
                                <PlusCircleIcon onClick={() => addSlot()} className="text-primary cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Ajouter un slots</p>
                            </TooltipContent>
                        </Tooltip>}
                    </div>
                    <div className="flex flex-col gap-3">
                        {
                            loading || Object.keys(spellSlotsByLevel).length <= 0 && 
                            <div className="row-start-2 col-span-4 flex items-top justify-center">
                                <p className="text-gray-500">Aucun slot trouvé</p>
                            </div>
                        }
                        {!loading && Object.keys(spellSlotsByLevel).map((level, index) => (
                            <Card key={index} className={"bg-card p-4 flex h-full flex-col bg-card"} >
                                <div className="flex flex-row gap-3 justify-between items-center">
                                    <p className="text-sm"><span className="font-bold">Niveau: </span>{level}</p>
                                    {isUpdate && <Tooltip>
                                        <TooltipTrigger asChild>
                                            <TrashIcon onClick={() => removeSpellSlot(level as any)} className="text-primary cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Supprimé le slot</p>
                                        </TooltipContent>
                                    </Tooltip>}
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div className="flex flex-row items-center w-full">
                                        <Label htmlFor={"total"+level} className="text-foreground flex flex-row gap-1 items-center w-full"><span className="font-bold w-auto">Total:</span>
                                            <Input readOnly={!isUpdate} min={0} id={"total"+level} type={"number"} value={spellSlotsByLevel[level as any].total} onChange={(e) => updateTotalSlots(level as any, e.target.value as any)} placeholder={"Total"} className={`w-10 p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0` }/>
                                        </Label>
                                    </div>
                                    <div className="flex flex-row items-center w-full">
                                        <Label htmlFor={"used"+level} className="text-foreground flex flex-row gap-1 items-center w-full"><span className="font-bold w-auto">Utilisé:</span>
                                            <Input readOnly={!isUpdate} max={spellSlotsByLevel[level as any].total} min={0} id={"used"+level} type={"number"} value={spellSlotsByLevel[level as any].used} onChange={(e) => updateUsedSlot(level as any, e.target.value as any)} placeholder={"Utilisé"} className={`w-10 p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0` }/>
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
                    {isUpdate && <Tooltip>
                        <TooltipTrigger asChild>
                            <PlusCircleIcon onClick={() => addSpell()} className="text-primary cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Ajouter un sort</p>
                        </TooltipContent>
                    </Tooltip>}
                </div>
                <div className="grid grid-cols-3 gap-4 items-start">
                    {loading || spells.length <= 0 && 
                        <div className="row-start-2 col-span-4 flex items-top justify-center">
                            <p className="text-gray-500">Aucun sort trouvé</p>
                        </div>
                    }
                    {!loading && spells.map((spell, index) => (
                        <Card key={index} className={"bg-card p-4 flex flex-col bg-background"} >
                            <div className="flex flex-row gap-3 justify-between items-center">
                                <Champs isActive={isUpdate} color="card" id={"name"+index} type={"text"} label={"Nom"} placeholder={"Nom"} value={spell.name} setValue={(value) => updateNameSpell(index, value)}></Champs>
                                {isUpdate && <Tooltip>
                                    <TooltipTrigger asChild>
                                        <TrashIcon onClick={() => removeSpell(index)} className="text-primary cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Supprimé le sort</p>
                                    </TooltipContent>
                                </Tooltip>}
                            </div>
                            <div className="flex flex-col">
                                <Champs isActive={isUpdate} color="card" id={"level"+index} type={"number"} label={"Niveau"} placeholder={"Niveau"} value={spell.level} setValue={(value) => updateLevelSpell(index, value)}></Champs>
                                <Champs isActive={isUpdate} color="card" id={"castingTime"+index} type={"text"} label={"Temps d'incantation"} placeholder={"Temps d'incantation"} value={spell.castingTime} setValue={(value) => updateCastingTimeSpell(index, value)}></Champs>
                                <Champs isActive={isUpdate} color="card" id={"range"+index} type={"text"} label={"Portée"} placeholder={"Portée"} value={spell.range} setValue={(value) => updateRangeSpell(index, value)}></Champs>
                                <Champs isActive={isUpdate} color="card" id={"components"+index} type={"text"} label={"Composants"} placeholder={"Composants"} value={spell.components.join(", ")} setValue={(value) => updateComponentsSpell(index, value.split(", "))}></Champs>
                                <div className="flex flex-col w-full gap-1.5 mt-1 h-1/3">
                                    <Label htmlFor={"description"} className="text-foreground font-bold">Description:</Label>
                                    <Textarea readOnly={!isUpdate} id={"description"+index} placeholder="Description" value={spell.description} onChange={(e) => updateDescriptionSpell(index, e.target.value)} className="h-full rounded-xl resize-none bg-card border-ring" />
                                </div>
                            </div>
                        </Card>
                    ))}

                </div>
            </div>
        </div>
    )

}