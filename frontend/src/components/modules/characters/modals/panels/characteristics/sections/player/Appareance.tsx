import { Card } from "@/components/ui/card";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Size, SIZES } from "@/constants/CharacterConstants";
import { useState } from "react";
import IAppearance from "@/models/player/appearance/IAppearance";
import IStats from "@/models/player/stats/IStats";
import { Textarea } from "@/components/ui/textarea";
import IPlayer from "@/models/player/IPlayer";
import { parse } from "path";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function Appearance({ player, isUpdate, updatePlayer }: Props) {

    const [eyes, setEyes] = useState<string | undefined>(player.appearance.eyes);
    const [hair, setHair] = useState<string | undefined>(player.appearance.hair);
    const [skin, setSkin] = useState<string | undefined>(player.appearance.skin);
    const [height, setHeight] = useState<string | undefined>(player.appearance.height);
    const [weight, setWeight] = useState<string | undefined>(player.appearance.weight);
    const [age, setAge] = useState<number | undefined>(player.appearance.age);
    const [description, setDescription] = useState<string | undefined>(player.appearance.description);
    const [size, setSize] = useState<string>(player.stats.size);

    const changeEyes = (value: string) => {
        setEyes(value);
        updatePlayer({
            ...player,
            appearance: {
                ...player.appearance,
                eyes: value
            }
        });
    }
    const changeHair = (value: string) => {
        setHair(value);
        updatePlayer({
            ...player,
            appearance: {
                ...player.appearance,
                hair: value
            }
        });
    }
    const changeSkin = (value: string) => {
        setSkin(value);
        updatePlayer({
            ...player,
            appearance: {
                ...player.appearance,
                skin: value
            }
        });
    }
    const changeHeight = (value: string) => {
        setHeight(value);
        updatePlayer({
            ...player,
            appearance: {
                ...player.appearance,
                height: value
            }
        });
    }
    const changeWeight = (value: string) => {
        setWeight(value);
        updatePlayer({  
            ...player,
            appearance: {
                ...player.appearance,
                weight: value
            }
        });
    }
    const changeAge = (value: any) => {
        setAge(value);
        updatePlayer({
            ...player,
            appearance: {
                ...player.appearance,
                age: parseInt(value)
            }
        });
    }
    const changeDescription = (value: string) => {
        setDescription(value);
        updatePlayer({  
            ...player,
            appearance: {
                ...player.appearance,
                description: value
            }
        });
    }
    const changeSize = (value: Size) => {
        setSize(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                size: value
            }
        });
    }

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs isActive={isUpdate} color="card" label="Yeux" value={eyes} id={"eyes"} type={"text"} placeholder={"Yeux"} setValue={changeEyes} />
            <Champs isActive={isUpdate} color="card" label="Cheveux" value={hair} id={"hair"} type={"text"} placeholder={"Cheveux"} setValue={changeHair} />
            <Champs isActive={isUpdate} color="card" label="Peau" value={skin} id={"skin"} type={"text"} placeholder={"Peau"} setValue={changeSkin} />
            <Champs isActive={isUpdate} min={0} color="card" id={"age"} type={"number"} label={"Age"} placeholder={"Age"} value={age} setValue={changeAge}></Champs>
            <Champs isActive={isUpdate} min={0} color="card" id={"height"} type={"number"} label={"Taille"} placeholder={"Taille"} value={height} setValue={changeHeight}></Champs>
            <Champs isActive={isUpdate} min={0} color="card" id={"weight"} type={"number"} label={"Poids"} placeholder={"Poids"} value={weight} setValue={changeWeight}></Champs>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-foreground flex flex-row gap-1 items-center"><span className="font-bold">Taille:</span>
                    <Select onValueChange={changeSize} defaultValue={size}>
                        <SelectTrigger disabled={!isUpdate} className="p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0">
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
            <div className="flex flex-col w-full gap-1.5 mt-1 h-1/3">
                <Label htmlFor={"description"} className="text-foreground font-bold">Description</Label>
                <Textarea readOnly={!isUpdate} id={"description"} placeholder="Description physique" value={description} onChange={(e) => changeDescription(e.target.value)} className="h-full rounded-xl resize-none bg-card border-ring" />
            </div>
        </Card>
    )
}