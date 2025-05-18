import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import IAffinities from "@/models/characters/affinities/IAffinities";
import { DotIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

interface Props {
    affinities: IAffinities;
}
export default function Resistances({ affinities }: Props) {

    const [resistances, setResistances] = useState<string[]>(affinities.resistances);

    const addResistance = () => {
        setResistances([...resistances, ""]);
    }
    const removeResistance = (index: number) => {
        const newResistances = [...resistances];
        newResistances.splice(index, 1);
        setResistances(newResistances);
    }
    const updateResistance = (index: number, newResistance: string) => {
        const newResistances = [...resistances];
        newResistances[index] = newResistance;
        setResistances(newResistances);
    }

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <div className="flex flex-row gap-3 w-full h-full">
                <div className="flex flex-col gap-3 w-full h-full">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg font-bold">Resistances</h2>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PlusCircleIcon onClick={() => addResistance()} className="text-primary cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Ajouter une resistance</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    {
                        resistances.length <= 0 && <span className="text-gray-500 text-sm">Aucune resistance trouvée</span>
                    }
                    { resistances.length > 0 && <ul className="list-disc">
                        {resistances.map((resistance, index) => (
                            <li key={index} className="text-sm flex flex-row gap-2 items-center">                
                                <DotIcon className="text-foreground" />
                                <Input id={index.toString()} type={"text"} value={resistance ?? ""} onChange={(e) => updateResistance(index, e.target.value)} placeholder={"Nouvelle résistance"} className={`w-[10vh] p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0` } />
                                <TrashIcon onClick={() => removeResistance(index)} className="cursor-pointer text-primary" />
                            </li>
                        ))}
                    </ul>}
                </div>
            </div>
        </Card>
    )
    
}