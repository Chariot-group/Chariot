import { Card } from "@/components/ui/card";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { useState } from "react";
import IPlayer from "@/models/player/IPlayer";
import { parse } from "path";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function PlayerBattle({ player, isUpdate, updatePlayer }: Props) {

    const [maxHitPoints, setMaxHitPoints] = useState<number>(player.stats.maxHitPoints);
    const [currentHitPoints, setCurrentHitPoints] = useState<number>(player.stats.currentHitPoints);
    const [tempHitPoints, setTempHitPoints] = useState<number>(player.stats.tempHitPoints);
    const [armorClass, setArmorClass] = useState<number>(player.stats.armorClass);

    const changeMaxHitPoints = (value: any) => {
        setMaxHitPoints(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                maxHitPoints: parseInt(value)
            }
        });
    }

    const changeCurrentHitPoints = (value: any) => {
        setCurrentHitPoints(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                currentHitPoints: parseInt(value)
            }
        });
    }

    const changeTempHitPoints = (value: any) => {
        setTempHitPoints(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                tempHitPoints: parseInt(value)
            }
        });
    }

    const changeArmorClass = (value: any) => {
        setArmorClass(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                armorClass: parseInt(value)
            }
        });
    }

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs isActive={isUpdate} min={0} color="card" label="PV maximum" value={maxHitPoints} id={"maxHP"} type={"number"} placeholder={"PV maximum"} setValue={changeMaxHitPoints} />
            <Champs isActive={isUpdate} min={0} max={maxHitPoints} color="card" label="PV" value={currentHitPoints} id={"hp"} type={"number"} placeholder={"PV"} setValue={changeCurrentHitPoints} />
            <Champs isActive={isUpdate} min={0} max={maxHitPoints} color="card" label="PV temporaire" value={tempHitPoints} id={"tempHP"} type={"number"} placeholder={"PV temporaire"} setValue={changeTempHitPoints} />
            <Champs isActive={isUpdate} min={0} color="card" label="Class d'armure" value={armorClass} id={"armorClass"} type={"number"} placeholder={"Class d'armure"} setValue={changeArmorClass} />
        </Card>
    )
}