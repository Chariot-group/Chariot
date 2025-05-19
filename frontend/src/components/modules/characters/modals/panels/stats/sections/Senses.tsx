import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import IPlayer from "@/models/player/IPlayer";
import IStats from "@/models/player/stats/IStats";
import { DotIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function Senses({ player, isUpdate, updatePlayer }: Props) {

    const [senses, setSenses] = useState<{ [key: string]: number }[]>(player.stats.senses);

    const changeSenses = (value: { [key: string]: number }[]) => {
        setSenses(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                senses: value
            }
        });
    }

    const addSense = () => {
        const newSense = { "": 0 };
        changeSenses([...senses, newSense]);
    };

    const removeSense = (index: number) => {
        const newSenses = senses.filter((_, i) => i !== index);
        changeSenses(newSenses);
    };

    const updateKey = (index: number, key: string) => {
        const newSenses = [...senses];
        const newSense = { ...newSenses[index] };
        const oldKey = Object.keys(newSense)[0];
        const value = newSense[oldKey];
        delete newSense[oldKey];
        newSense[key] = value;
        newSenses[index] = newSense;
        changeSenses(newSenses);
    };

    const updateValue = (index: number, value: number) => {
        const newSenses = [...senses];
        const newSense = { ...newSenses[index] };
        const key = Object.keys(newSense)[0];
        newSense[key] = value;
        newSenses[index] = newSense;
        setSenses(newSenses);
    };

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <div className="flex flex-row gap-3 w-full h-full">
                <div className="flex flex-col gap-3 w-full h-full">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg font-bold">Senses</h2>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PlusCircleIcon onClick={() => addSense()} className="text-primary cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Ajouter un sense</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    {
                        senses.length <= 0 && <span className="text-gray-500 text-sm">Aucun sense trouvé</span>
                    }
                    { senses.length > 0 && 
                    <ul className="list-disc">
                        {senses.map((sense, index) => (
                            <li key={index} className="text-sm flex flex-row gap-2 items-center">                
                                <DotIcon className="text-foreground" />
                                <Input id={index.toString()} type={"text"} value={Object.keys(sense) ?? ""} onChange={(e) => updateKey(index, e.target.value)} placeholder={"Sense"} className={`w-[10vh] p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0` } />
                                <span> :</span>
                                <Input id={index.toString()} type={"number"} value={Object.values(sense)[0] ?? 0} onChange={(e) => updateValue(index, parseInt(e.target.value))} placeholder={"Valeur"} className={`w-10 p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0` } />
                                <TrashIcon onClick={() => removeSense(index)} className="cursor-pointer text-primary" />
                            </li>
                        ))}
                    </ul>}
                </div>
            </div>
        </Card>
    );

}