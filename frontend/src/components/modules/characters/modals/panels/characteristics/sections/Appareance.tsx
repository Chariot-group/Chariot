import { Card } from "@/components/ui/card";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SIZES } from "@/constants/CharacterConstants";
import { useState } from "react";
import IAppearance from "@/models/player/appearance/IAppearance";
import IStats from "@/models/player/stats/IStats";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    appearance: IAppearance;
    stats: IStats;
}
export default function Appearance({ appearance, stats }: Props) {

    const [eyes, setEyes] = useState<string | undefined>(appearance.eyes);
    const [hair, setHair] = useState<string | undefined>(appearance.hair);
    const [skin, setSkin] = useState<string | undefined>(appearance.skin);
    const [height, setHeight] = useState<string | undefined>(appearance.height);
    const [weight, setWeight] = useState<string | undefined>(appearance.weight);
    const [age, setAge] = useState<number | undefined>(appearance.age);
    const [description, setDescription] = useState<string | undefined>(appearance.description);
    const [size, setSize] = useState<string>(stats.size);

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs color="card" label="Yeux" value={eyes} id={"eyes"} type={"text"} placeholder={"Yeux"} setValue={setEyes} />
            <Champs color="card" label="Cheveux" value={hair} id={"hair"} type={"text"} placeholder={"Cheveux"} setValue={setHair} />
            <Champs color="card" label="Peau" value={skin} id={"skin"} type={"text"} placeholder={"Peau"} setValue={setSkin} />
            <Champs color="card" id={"age"} type={"number"} label={"Age"} placeholder={"Age"} value={age} setValue={setAge}></Champs>
            <Champs color="card" id={"height"} type={"number"} label={"Taille"} placeholder={"Taille"} value={height} setValue={setHeight}></Champs>
            <Champs color="card" id={"weight"} type={"number"} label={"Poids"} placeholder={"Poids"} value={weight} setValue={setWeight}></Champs>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-foreground flex flex-row gap-1 items-center"><span className="font-bold">Taille:</span>
                    <Select onValueChange={setSize} defaultValue={size}>
                        <SelectTrigger className="p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0">
                            <SelectValue placeholder="Taille" />
                        </SelectTrigger>
                        <SelectContent className="border-ring">
                            {
                                SIZES.map((size) => (
                                    <SelectItem key={size} value={size}>
                                        {size}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </Label>
            </div>
            <div className="flex flex-col w-full gap-1.5 h-1/3">
                <Label htmlFor={"description"} className="text-foreground font-bold">Description</Label>
                <Textarea id={"description"} placeholder="Description physique" value={description} onChange={(e) => setDescription(e.target.value)} className="h-full rounded-xl resize-none bg-card border-ring" />
            </div>
        </Card>
    )
}