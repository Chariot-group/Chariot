import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import IPlayer from "@/models/player/IPlayer";
import { PlusCircleIcon, TrashIcon } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Champs } from "../../../PlayerModalDetails";

interface Props {
    player: IPlayer;
}
export default function Classes({ player }: Props) {

    const [classes, setClasses] = useState(player.class);

    const addClass = () => {
        const newClass = {
            name: "",
            subclass: "",
            level: 1,
            hitDie: 6
        }
        setClasses([newClass, ...classes, ]);
    }

    const updateNameClass = (index: number, name: string) => {
        const newClasses = [...classes];
        newClasses[index].name = name;
        setClasses(newClasses);
    }

    const updateSubclassClass = (index: number, subclass: string) => {
        const newClasses = [...classes];
        newClasses[index].subclass = subclass;
        setClasses(newClasses);
    }
    
    const updateLevelClass = (index: number, level: number) => {
        const newClasses = [...classes];
        newClasses[index].level = level;
        setClasses(newClasses);
    }

    const updateHitDieClass = (index: number, hitDie: number) => {
        const newClasses = [...classes];
        newClasses[index].hitDie = hitDie;
        setClasses(newClasses);
        setClasses(newClasses);
    }

    const deleteClass = (index: number) => {
        const newClasses = [...classes];
        newClasses.splice(index, 1);
        setClasses(newClasses);
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <h1 className="text-foreground text-lg font-bold">Classes</h1>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <PlusCircleIcon onClick={() => addClass()} className="text-primary cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Ajouter une classe</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <div className="grid grid-cols-3 gap-4 p-4 items-start">
                {classes.length <= 0 && 
                <div className="row-start-2 col-span-4 flex items-top justify-center">
                    <p className="text-gray-500">Aucune classe trouvé</p>
                </div>
                }
                {classes.length > 0 && classes.map((classe, index) => (
                    <Card key={index} className="bg-card p-4 flex flex-col gap-2 bg-background">
                        <div className="flex flex-row gap-2 justify-between">
                            <Champs color="card" label="Classe" value={classe.name} id={`class-${index}`} type={"text"} placeholder={"Classe"} setValue={(value) => updateNameClass(index, value)} />
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <TrashIcon onClick={() => deleteClass(index)} className="text-red-500 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Supprimer la classe</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <Champs width="w-auto" color="card" label="Sous-classe" value={classe.subclass} id={`subclass-${index}`} type={"text"} placeholder={"Sous-classe"} setValue={(value) => updateSubclassClass(index, value)} />
                            <Champs color="card" label="Niveau" value={classe.level} id={`level-${index}`} type={"number"} placeholder={"Niveau"} setValue={(value) => updateLevelClass(index, value)} />
                            <Champs color="card" label="Dé de vie" value={classe.hitDie} id={`hitDie-${index}`} type={"number"} placeholder={"Dé de vie"} setValue={(value) => updateHitDieClass(index, value)} />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}