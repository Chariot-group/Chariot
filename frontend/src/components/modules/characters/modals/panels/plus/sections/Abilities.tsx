import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import IPlayer from "@/models/player/IPlayer";
import { PlusCircleIcon, TrashIcon } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Champs } from "../../../PlayerModalDetails";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function Abilities({ player, isUpdate, updatePlayer }: Props) {

    const [abilities, setAbilities] = useState(player.abilities);

    const updateAbilities = (newAbilities: any) => {
        setAbilities(newAbilities);
        updatePlayer({
            ...player,
            abilities: newAbilities
        });
    }

    const addAbility = () => {
        updateAbilities([{ name: "", description: "" }, ...abilities]);
    }
    const deleteAbility = (index: number) => {
        const newAbilities = [...abilities];
        newAbilities.splice(index, 1);
        updateAbilities(newAbilities);
    }
    const updateNameAbility = (index: number, newName: string) => {
        const newAbilities = [...abilities];
        newAbilities[index].name = newName;
        updateAbilities(newAbilities);
    }
    const updateDescriptionAbility = (index: number, newDescription: string) => {
        const newAbilities = [...abilities];
        newAbilities[index].description = newDescription;
        updateAbilities(newAbilities);
    }
    

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <h1 className="text-foreground text-lg font-bold">Abilitées</h1>
                {isUpdate && <Tooltip>
                    <TooltipTrigger asChild>
                        <PlusCircleIcon onClick={() => addAbility()} className="text-primary cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Ajouter une abilitée</p>
                    </TooltipContent>
                </Tooltip>}
            </div>
            <div className="grid grid-cols-3 gap-4 p-4 items-start">
                {abilities.length <= 0 && 
                <div className="row-start-2 col-span-4 flex items-top justify-center">
                    <p className="text-gray-500">Aucune abilitée trouvée</p>
                </div>
                }
                {abilities.length > 0 && abilities.map((ability, index) => (
                    <Card key={index} className="bg-card p-4 flex justify-between flex-col gap-2 bg-background">
                        <div className="flex flex-row items-center gap-2 w-full">
                            <Champs isActive={isUpdate} width="w-full" color="card" label="Nom" value={ability.name} id={`class-${index}`} type={"text"} placeholder={"Classe"} setValue={(value) => updateNameAbility(index, value)} />
                            {isUpdate && <Tooltip>
                                <TooltipTrigger asChild>
                                    <TrashIcon onClick={() => deleteAbility(index)} className="text-red-500 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Supprimer l'abilitée</p>
                                </TooltipContent>
                            </Tooltip>}
                        </div>
                        <div className="flex flex-col gap-2 w-full h-full">
                            <div className="flex flex-col w-full gap-1.5 h-1/3">
                                <Label htmlFor={"description"} className="text-foreground font-bold">Description</Label>
                                <Textarea readOnly={!isUpdate} id={"description"} placeholder="Description physique" value={ability.description} onChange={(e) => updateDescriptionAbility(index, e.target.value)} className="h-full rounded-xl resize-none bg-card border-ring" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}