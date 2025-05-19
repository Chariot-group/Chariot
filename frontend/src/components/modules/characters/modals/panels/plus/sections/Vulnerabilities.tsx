import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import IAffinities from "@/models/characters/affinities/IAffinities";
import IPlayer from "@/models/player/IPlayer";
import { DotIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function Vulnerabilities({ player, isUpdate, updatePlayer }: Props) {

    const [vulnerabilities, setVulnerabilities] = useState<string[]>(player.affinities.vulnerabilities);

    const changeVulnerabilities = (value: string[]) => {
        setVulnerabilities(value);
        updatePlayer({
            ...player,
            affinities: {
                ...player.affinities,
                vulnerabilities: value
            }
        });
    }

    const addVulnerabilite = () => {
        changeVulnerabilities([...vulnerabilities, ""]);
    }
    const removeVulnerabilite = (index: number) => {
        const newVulnerabilites = [...vulnerabilities];
        newVulnerabilites.splice(index, 1);
        changeVulnerabilities(newVulnerabilites);
    }
    const updateVulnerabilite = (index: number, newVulnerabilite: string) => {
        const newVulnerabilites = [...vulnerabilities];
        newVulnerabilites[index] = newVulnerabilite;
        changeVulnerabilities(newVulnerabilites);
    }

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <div className="flex flex-row gap-3 w-full h-full">
                <div className="flex flex-col gap-3 w-full h-full">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg font-bold">Vulnérabilitées</h2>
                        {isUpdate && <Tooltip>
                            <TooltipTrigger asChild>
                                <PlusCircleIcon onClick={() => addVulnerabilite()} className="text-primary cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Ajouter une vulnérabilitée</p>
                            </TooltipContent>
                        </Tooltip>}
                    </div>
                    {
                        vulnerabilities.length <= 0 && <span className="text-gray-500 text-sm">Aucune vulnérabilitée trouvée</span>
                    }
                    { vulnerabilities.length > 0 && <ul className="list-disc">
                        {vulnerabilities.map((vulnerabilitie, index) => (
                            <li key={index} className="text-sm flex flex-row gap-2 items-center">                
                                <DotIcon className="text-foreground" />
                                <Input readOnly={!isUpdate} id={index.toString()} type={"text"} value={vulnerabilitie ?? ""} onChange={(e) => updateVulnerabilite(index, e.target.value)} placeholder={"Nouvelle vulnerabilitée"} className={`w-[10vh] p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0` } />
                                {isUpdate && <Tooltip>
                                    <TooltipTrigger asChild>
                                        {isUpdate && <TrashIcon onClick={() => removeVulnerabilite(index)} className="cursor-pointer text-primary" />}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Supprimer la vulnérabilitée</p>
                                    </TooltipContent>
                                </Tooltip>}
                            </li>
                        ))}
                    </ul>}
                </div>
            </div>
        </Card>
    )
    
}