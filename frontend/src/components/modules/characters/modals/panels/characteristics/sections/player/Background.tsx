import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import IBackground from "@/models/player/background/IBackground";
import IPlayer from "@/models/player/IPlayer";
import { useState } from "react";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function Background({ player, isUpdate, updatePlayer }: Props) {

    const [personalityTraits, setPersonalityTraits] = useState<string | undefined>(player.background.personalityTraits);
    const [ideals, setIdeals] = useState<string | undefined>(player.background.ideals);
    const [bonds, setBonds] = useState<string | undefined>(player.background.bonds);
    const [flaws, setFlaws] = useState<string | undefined>(player.background.flaws);
    const [alliesAndOrgs, setAlliesAndOrgs] = useState<string | undefined>(player.background.alliesAndOrgs);
    const [backstory, setBackstory] = useState<string | undefined>(player.background.backstory);

    const changePersonalityTraits = (value: string) => {
        setPersonalityTraits(value);
        updatePlayer({
            ...player,
            background: {
                ...player.background,
                personalityTraits: value
            }
        });
    }
    const changeIdeals = (value: string) => {
        setIdeals(value);
        updatePlayer({
            ...player,
            background: {
                ...player.background,
                ideals: value
            }
        });
    }
    const changeBonds = (value: string) => {
        setBonds(value);
        updatePlayer({
            ...player,
            background: {
                ...player.background,
                bonds: value
            }
        });
    }
    const changeFlaws = (value: string) => {
        setFlaws(value);
        updatePlayer({      
            ...player,
            background: {
                ...player.background,
                flaws: value
            }
        });
    }
    const changeAlliesAndOrgs = (value: string) => {
        setAlliesAndOrgs(value);
        updatePlayer({      
            ...player,
            background: {
                ...player.background,
                alliesAndOrgs: value
            }
        });
    }
    const changeBackstory = (value: string) => {
        setBackstory(value);
        updatePlayer({
            ...player,
            background: {
                ...player.background,
                backstory: value
            }
        });
    }

    return (
        <Card className="bg-card p-4 flex flex-row gap-2 bg-background h-2/3">
            <div className="flex flex-col gap-2 w-full h-full">
                <div className="flex flex-col w-full gap-1.5 h-1/3">
                    <Label htmlFor={"personalityTraits"} className="text-foreground font-bold">Trait personnel</Label>
                    <Textarea readOnly={!isUpdate} id={"personalityTraits"} placeholder="Trait personnel" value={personalityTraits} onChange={(e) => changePersonalityTraits(e.target.value)} className="rounded-xl h-full resize-none bg-card border-ring" />
                </div>
                <div className="flex flex-col w-full gap-1.5 h-1/3">
                    <Label htmlFor={"ideals"} className="text-foreground font-bold">Idéaux</Label>
                    <Textarea readOnly={!isUpdate} id={"ideals"} placeholder="Idéaux" value={ideals} onChange={(e) => changeIdeals(e.target.value)} className="rounded-xl h-full resize-none bg-card border-ring" />
                </div>
                <div className="flex flex-col w-full gap-1.5 h-1/3">
                    <Label htmlFor={"bonds"} className="text-foreground font-bold">Limites</Label>
                    <Textarea readOnly={!isUpdate} id={"bonds"} placeholder="Limites" value={bonds} onChange={(e) => changeBonds(e.target.value)} className="rounded-xl h-full resize-none bg-card border-ring" />
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full h-full">
                <div className="flex flex-col w-full gap-1.5 h-1/3">
                    <Label htmlFor={"flaws"} className="text-foreground font-bold">Défauts</Label>
                    <Textarea readOnly={!isUpdate} id={"flaws"} placeholder="Défauts" value={flaws} onChange={(e) => changeFlaws(e.target.value)} className="h-full rounded-xl resize-none bg-card border-ring" />
                </div>
                <div className="flex flex-col w-full gap-1.5 h-1/3">
                    <Label htmlFor={"alliesAndOrgs"} className="text-foreground font-bold">Alliés et orgs</Label>
                    <Textarea readOnly={!isUpdate} id={"alliesAndOrgs"} placeholder="Alliés et orgs" value={alliesAndOrgs} onChange={(e) => changeAlliesAndOrgs(e.target.value)} className="h-full rounded-xl resize-none bg-card border-ring" />
                </div>
                <div className="flex flex-col w-full gap-1.5 h-1/3">
                    <Label htmlFor={"backstory"} className="text-foreground font-bold">Histoire</Label>
                    <Textarea readOnly={!isUpdate} id={"backstory"} placeholder="Histoire" value={backstory} onChange={(e) => changeBackstory(e.target.value)} className="h-full rounded-xl resize-none bg-card border-ring" />
                </div>
            </div>
        </Card>
    )
}