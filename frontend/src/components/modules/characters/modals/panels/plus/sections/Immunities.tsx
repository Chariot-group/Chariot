import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import IAffinities from "@/models/characters/affinities/IAffinities";
import { DotIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

interface Props {
    affinities: IAffinities;
}
export default function Immunities({ affinities }: Props) {

    const [immunities, setImmunities] = useState<string[]>(affinities.immunities);

    const addImmmunitie = () => {
        setImmunities([...immunities, ""]);
    }
    const removeImmunitie = (index: number) => {
        const newImmunities = [...immunities];
        newImmunities.splice(index, 1);
        setImmunities(newImmunities);
    }
    const updateImmunitie = (index: number, newImmunitie: string) => {
        const newImmunities = [...immunities];
        newImmunities[index] = newImmunitie;
        setImmunities(newImmunities);
    }

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <div className="flex flex-row gap-3 w-full h-full">
                <div className="flex flex-col gap-3 w-full h-full">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg font-bold">Immunitées</h2>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PlusCircleIcon onClick={() => addImmmunitie()} className="text-primary cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Ajouter une immunitée</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    {
                        immunities.length <= 0 && <span className="text-gray-500 text-sm">Aucune immunitée trouvée</span>
                    }
                    { immunities.length > 0 && <ul className="list-disc">
                        {immunities.map((immunitie, index) => (
                            <li key={index} className="text-sm flex flex-row gap-2 items-center">                
                                <DotIcon className="text-foreground" />
                                <Input id={index.toString()} type={"text"} value={immunitie ?? ""} onChange={(e) => updateImmunitie(index, e.target.value)} placeholder={"Nouvelle immunitée"} className={`w-[10vh] p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0` } />
                                <TrashIcon onClick={() => removeImmunitie(index)} className="cursor-pointer text-primary" />
                            </li>
                        ))}
                    </ul>}
                </div>
            </div>
        </Card>
    )
    
}