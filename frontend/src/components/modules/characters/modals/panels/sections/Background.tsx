import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import IBackground from "@/models/player/background/IBackground";
import { useState } from "react";

interface Props {
    background: IBackground;
}
export default function Background({ background }: Props) {

    const [personalityTraits, setPersonalityTraits] = useState<string | undefined>(background.personalityTraits);
    const [ideals, setIdeals] = useState<string | undefined>(background.ideals);
    const [bonds, setBonds] = useState<string | undefined>(background.bonds);
    const [flaws, setFlaws] = useState<string | undefined>(background.flaws);
    const [alliesAndOrgs, setAlliesAndOrgs] = useState<string | undefined>(background.alliesAndOrgs);
    const [backstory, setBackstory] = useState<string | undefined>(background.backstory);

    return (
        <Card className="bg-card p-4 flex flex-row gap-2 bg-background h-2/3">
            <div className="flex flex-col gap-1 w-full h-full">
                <div className="flex flex-col w-full gap-1.5 h-1/3">
                    <Label htmlFor={"personalityTraits"} className="text-foreground">Trait personnel</Label>
                    <Textarea id={"personalityTraits"} placeholder="Trait personnel" value={personalityTraits} onChange={(e) => setPersonalityTraits(e.target.value)} className="rounded-xl h-full resize-none bg-card border-ring" />
                </div>
                <div className="flex flex-col w-full gap-1.5 h-1/3">
                    <Label htmlFor={"ideals"} className="text-foreground">Idéaux</Label>
                    <Textarea id={"ideals"} placeholder="Idéaux" value={ideals} onChange={(e) => setIdeals(e.target.value)} className="rounded-xl h-full resize-none bg-card border-ring" />
                </div>
                <div className="flex flex-col w-full gap-1.5 h-1/3">
                    <Label htmlFor={"bonds"} className="text-foreground">Limites</Label>
                    <Textarea id={"bonds"} placeholder="Limites" value={bonds} onChange={(e) => setBonds(e.target.value)} className="rounded-xl h-full resize-none bg-card border-ring" />
                </div>
            </div>
            <div className="flex flex-col gap-1 w-full h-full">
                <div className="flex flex-col w-full gap-1.5 h-1/3">
                    <Label htmlFor={"flaws"} className="text-foreground">Défauts</Label>
                    <Textarea id={"flaws"} placeholder="Défauts" value={flaws} onChange={(e) => setFlaws(e.target.value)} className="h-full rounded-xl resize-none bg-card border-ring" />
                </div>
                <div className="flex flex-col w-full gap-1.5 h-1/3">
                    <Label htmlFor={"alliesAndOrgs"} className="text-foreground">Alliés et orgs</Label>
                    <Textarea id={"alliesAndOrgs"} placeholder="Alliés et orgs" value={alliesAndOrgs} onChange={(e) => setAlliesAndOrgs(e.target.value)} className="h-full rounded-xl resize-none bg-card border-ring" />
                </div>
                <div className="flex flex-col w-full gap-1.5 h-1/3">
                    <Label htmlFor={"backstory"} className="text-foreground">Histoire</Label>
                    <Textarea id={"backstory"} placeholder="Histoire" value={backstory} onChange={(e) => setBackstory(e.target.value)} className="h-full rounded-xl resize-none bg-card border-ring" />
                </div>
            </div>
        </Card>
    )
}