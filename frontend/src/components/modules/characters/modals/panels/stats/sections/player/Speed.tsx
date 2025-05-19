import { Card } from "@/components/ui/card";
import ISpeed from "@/models/npc/stat/sub/ISpeed";
import { useState } from "react";
import { Champs } from "../../../../PlayerModalDetails";
import IPlayer from "@/models/player/IPlayer";
import { parse } from "path";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function Speed({ player, isUpdate, updatePlayer }: Props) {

    const [walking, setWalking] = useState<number | undefined>(player.stats.speed.walk);
    const [climbing, setClimbing] = useState<number | undefined>(player.stats.speed.climb);
    const [flying, setFlying] = useState<number | undefined>(player.stats.speed.fly);
    const [swimming, setSwimming] = useState<number | undefined>(player.stats.speed.swim);
    const [burrowing, setBurrowing] = useState<number | undefined>(player.stats.speed.burrow);

    const changeWalking = (value: any | undefined) => {
        setWalking(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                speed: {
                    ...player.stats.speed,
                    walk: parseInt(value)
                }
            }
        });
    }
    const changeClimbing = (value: any | undefined) => {
        setClimbing(value);
        updatePlayer({  
            ...player,
            stats: {
                ...player.stats,
                speed: {
                    ...player.stats.speed,
                    climb: parseInt(value)
                }
            }
        });
    }
    const changeFlying = (value: any | undefined) => {
        setFlying(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                speed: {
                    ...player.stats.speed,
                    fly: parseInt(value)
                }
            }
        });
    }
    const changeSwimming = (value: any | undefined) => {
        setSwimming(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                speed: {
                    ...player.stats.speed,
                    swim: parseInt(value)
                }
            }
        });
    }
    const changeBurrowing = (value: any | undefined) => {
        setBurrowing(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                speed: {
                    ...player.stats.speed,
                    burrow: parseInt(value)
                }
            }
        });
    }

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs isActive={isUpdate} min={0} color="card" label="Vitesse de marche" value={walking} id={"walk"} type={"number"} placeholder={"Vitesse de marche"} setValue={changeWalking} />
            <Champs isActive={isUpdate} min={0} color="card" label="Vitesse d'escalade" value={climbing} id={"climb"} type={"number"} placeholder={"Vitesse d'escalade"} setValue={changeClimbing} />
            <Champs isActive={isUpdate} min={0} color="card" label="Vitesse de vol" value={flying} id={"fly"} type={"number"} placeholder={"Vitesse de vol"} setValue={changeFlying} />
            <Champs isActive={isUpdate} min={0} color="card" label="Vitesse de nage" value={swimming} id={"swim"} type={"number"} placeholder={"Vitesse de nage"} setValue={changeSwimming} />
            <Champs isActive={isUpdate} min={0} color="card" label="Vitesse de fouille" value={burrowing} id={"burrow"} type={"number"} placeholder={"Vitesse de fouille"} setValue={changeBurrowing} />
        </Card>
    )
}