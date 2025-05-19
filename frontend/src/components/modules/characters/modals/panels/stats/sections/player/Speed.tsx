import { Card } from "@/components/ui/card";
import ISpeed from "@/models/npc/stat/sub/ISpeed";
import { useState } from "react";
import { Champs } from "../../../../PlayerModalDetails";
import IPlayer from "@/models/player/IPlayer";

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

    const changeWalking = (value: number | undefined) => {
        setWalking(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                speed: {
                    ...player.stats.speed,
                    walk: value
                }
            }
        });
    }
    const changeClimbing = (value: number | undefined) => {
        setClimbing(value);
        updatePlayer({  
            ...player,
            stats: {
                ...player.stats,
                speed: {
                    ...player.stats.speed,
                    climb: value
                }
            }
        });
    }
    const changeFlying = (value: number | undefined) => {
        setFlying(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                speed: {
                    ...player.stats.speed,
                    fly: value
                }
            }
        });
    }
    const changeSwimming = (value: number | undefined) => {
        setSwimming(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                speed: {
                    ...player.stats.speed,
                    swim: value
                }
            }
        });
    }
    const changeBurrowing = (value: number | undefined) => {
        setBurrowing(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                speed: {
                    ...player.stats.speed,
                    burrow: value
                }
            }
        });
    }

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs isActive={isUpdate} color="card" label="Vitesse de marche" value={walking} id={"walk"} type={"number"} placeholder={"Vitesse de marche"} setValue={changeWalking} />
            <Champs isActive={isUpdate} color="card" label="Vitesse d'escalade" value={climbing} id={"climb"} type={"number"} placeholder={"Vitesse d'escalade"} setValue={changeClimbing} />
            <Champs isActive={isUpdate} color="card" label="Vitesse de vol" value={flying} id={"fly"} type={"number"} placeholder={"Vitesse de vol"} setValue={changeFlying} />
            <Champs isActive={isUpdate} color="card" label="Vitesse de nage" value={swimming} id={"swim"} type={"number"} placeholder={"Vitesse de nage"} setValue={changeSwimming} />
            <Champs isActive={isUpdate} color="card" label="Vitesse de fouille" value={burrowing} id={"burrow"} type={"number"} placeholder={"Vitesse de fouille"} setValue={changeBurrowing} />
        </Card>
    )
}