import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import IAffinities from "@/models/characters/affinities/IAffinities";
import { DotIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

interface Props {
    affinities: IAffinities;
}
export default function Vulnerabilities({ affinities }: Props) {

    const [vulnerabilities, setVulnerabilities] = useState<string[]>(affinities.vulnerabilities);

    const addVulnerabilite = () => {
        setVulnerabilities([...vulnerabilities, ""]);
    }
    const removeVulnerabilite = (index: number) => {
        const newVulnerabilites = [...vulnerabilities];
        newVulnerabilites.splice(index, 1);
        setVulnerabilities(newVulnerabilites);
    }
    const updateVulnerabilite = (index: number, newVulnerabilite: string) => {
        const newVulnerabilites = [...vulnerabilities];
        newVulnerabilites[index] = newVulnerabilite;
        setVulnerabilities(newVulnerabilites);
    }

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <div className="flex flex-row gap-3 w-full h-full">
                <div className="flex flex-col gap-3 w-full h-full">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg font-bold">Vulnérabilitées</h2>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PlusCircleIcon onClick={() => addVulnerabilite()} className="text-primary cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Ajouter une vulnérabilitée</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    {
                        vulnerabilities.length <= 0 && <span className="text-gray-500 text-sm">Aucune vulnérabilitée trouvée</span>
                    }
                    { vulnerabilities.length > 0 && <ul className="list-disc">
                        {vulnerabilities.map((vulnerabilitie, index) => (
                            <li key={index} className="text-sm flex flex-row gap-2 items-center">                
                                <DotIcon className="text-foreground" />
                                <Input id={index.toString()} type={"text"} value={vulnerabilitie ?? ""} onChange={(e) => updateVulnerabilite(index, e.target.value)} placeholder={"Nouvelle vulnerabilitée"} className={`w-[10vh] p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0` } />
                                <TrashIcon onClick={() => removeVulnerabilite(index)} className="cursor-pointer text-primary" />
                            </li>
                        ))}
                    </ul>}
                </div>
            </div>
        </Card>
    )
    
}