import { Card } from "@/components/ui/card";
import IStats from "@/models/player/stats/IStats";
import { useState } from "react";
import IPlayer from "@/models/player/IPlayer";
import { Checkbox } from "@/components/ui/checkbox";
import { Champs } from "../../../../PlayerModalDetails";
import { parse } from "path";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function Details({ player, isUpdate, updatePlayer }: Props) {

    const [darkvision, setDarkvision] = useState<number>(player.stats.darkvision);
    const [proficiencyBonus, setProficiencyBonus] = useState<number>(player.stats.proficiencyBonus);
    const [passivePerception, setPassivePerception] = useState<number>(player.stats.passivePerception);

    const [inspiration, setInspiration] = useState<boolean>(player.inspiration);

    const changeDarkvision = (value: any) => {
        setDarkvision(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                darkvision: parseInt(value)
            }
        });
    }
    const changeProficiencyBonus = (value: any) => {
        setProficiencyBonus(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                proficiencyBonus: parseInt(value)
            }
        });
    }
    const changePassivePerception = (value: any) => {
        setPassivePerception(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                passivePerception: parseInt(value)
            }
        });
    }
    const changeInspiration = (value: boolean) => {
        setInspiration(value);
        updatePlayer({
            ...player,
            inspiration: value
        });
    }

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs isActive={isUpdate} min={0} color="card" label="Vision dans le noir" value={darkvision} id={"darkvision"} type={"number"} placeholder={"Vision dans le noir"} setValue={changeDarkvision} />
            <Champs isActive={isUpdate} min={0} color="card" label="Bonus de compétence" value={proficiencyBonus} id={"proficiencyBonus"} type={"number"} placeholder={"Bonus de compétence"} setValue={changeProficiencyBonus} />
            <Champs isActive={isUpdate} min={0} color="card" label="Perception passive" value={passivePerception} id={"passivePerception"} type={"number"} placeholder={"Perception passive"} setValue={changePassivePerception} />
            <div className="flex items-center space-x-2">
                <label
                    htmlFor="inspiration"
                    className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Inspiration:
                </label>
                <Checkbox disabled={!isUpdate} id="inspiration" checked={inspiration} onCheckedChange={(state: boolean) => changeInspiration(state)} />
            </div>
        </Card>
    )
}