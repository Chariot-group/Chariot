import { Card } from "@/components/ui/card";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import ITreasure from "@/models/player/treasure/ITreasure";
import IPlayer from "@/models/player/IPlayer";
import { parse } from "path";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function Treasure({ player, isUpdate, updatePlayer }: Props) {

    const [cp, setCp] = useState<number>(player.treasure.cp);
    const [sp, setSp] = useState<number>(player.treasure.sp);
    const [ep, setEp] = useState<number>(player.treasure.ep);
    const [gp, setGp] = useState<number>(player.treasure.gp);
    const [pp, setPp] = useState<number>(player.treasure.pp);
    const [notes, setNotes] = useState<string | undefined>(player.treasure.notes);

    const changeCp = (value: any) => {
        setCp(value);
        updatePlayer({
            ...player,
            treasure: {
                ...player.treasure,
                cp: parseInt(value)
            }
        });
    }
    const changeSp = (value: any) => {
        setSp(value);
        updatePlayer({
            ...player,
            treasure: {
                ...player.treasure,
                sp: parseInt(value)
            }
        });
    }
    const changeEp = (value: any) => {
        setEp(value);
        updatePlayer({
            ...player,
            treasure: {
                ...player.treasure,
                ep: parseInt(value)
            }
        });
    }
    const changeGp = (value: any) => {
        setGp(value);
        updatePlayer({
            ...player,
            treasure: {
                ...player.treasure,
                gp: parseInt(value)
            }
        });
    }
    const changePp = (value: any) => {
        setPp(value);
        updatePlayer({
            ...player,
            treasure: {
                ...player.treasure,
                pp: parseInt(value)
            }
        });
    }
    const changeNotes = (value: string) => {
        setNotes(value);
        updatePlayer({
            ...player,
            treasure: {
                ...player.treasure,
                notes: value
            }
        });
    }
    
    return (
        <Card className="bg-card p-4 flex flex-row gap-2 bg-background">
            <div className="flex flex-col w-1/4 justify-center">
                <Champs isActive={isUpdate} min={0} color="card" label="Pièce de cuivre" value={cp} id={"cp"} type={"number"} placeholder={"Pièce de cuivre"} setValue={changeCp} />
                <Champs isActive={isUpdate} min={0} color="card" label="Pièce d'argent" value={sp} id={"sp"} type={"number"} placeholder={"Pièce d'argent"} setValue={changeSp} />
                <Champs isActive={isUpdate} min={0} color="card" label="Pièce d'electrum" value={ep} id={"ep"} type={"number"} placeholder={"Pièce d'electrum"} setValue={changeEp} />
                <Champs isActive={isUpdate} min={0} color="card" id={"gp"} type={"number"} label={"Pièce d'or"} placeholder={"Pièce d'or"} value={gp} setValue={changeGp}></Champs>
                <Champs isActive={isUpdate} min={0} color="card" id={"pp"} type={"number"} label={"Pièce de platine"} placeholder={"Pièce de platine"} value={pp} setValue={changePp}></Champs>
            </div>
            <div className="flex flex-col h-full gap-2 w-3/4">
                <Label htmlFor={"notes"} className="text-foreground font-bold">Notes</Label>
                <Textarea readOnly={!isUpdate} id={"notes"} placeholder="Notes" value={notes} onChange={(e) => changeNotes(e.target.value)} className="rounded-xl w-full h-full resize-none bg-card border-ring" />
            </div>
        </Card>
    )
}