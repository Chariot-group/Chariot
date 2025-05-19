import { Card } from "@/components/ui/card";
import { useState } from "react";
import INpc from "@/models/npc/INpc";
import { Champs } from "../../../../PlayerModalDetails";

interface Props {
    npc: INpc;
    isUpdate: boolean;
    updateNpc: (npc: INpc) => void;
}
export default function Speed({ npc, isUpdate, updateNpc }: Props) {

    const [walking, setWalking] = useState<number | undefined>(npc.stats.speed.walk);
    const [climbing, setClimbing] = useState<number | undefined>(npc.stats.speed.climb);
    const [flying, setFlying] = useState<number | undefined>(npc.stats.speed.fly);
    const [swimming, setSwimming] = useState<number | undefined>(npc.stats.speed.swim);
    const [burrowing, setBurrowing] = useState<number | undefined>(npc.stats.speed.burrow);

    const changeWalking = (value: number | undefined) => {
        setWalking(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                speed: {
                    ...npc.stats.speed,
                    walk: value
                }
            }
        });
    }
    const changeClimbing = (value: number | undefined) => {
        setClimbing(value);
        updateNpc({  
            ...npc,
            stats: {
                ...npc.stats,
                speed: {
                    ...npc.stats.speed,
                    climb: value
                }
            }
        });
    }
    const changeFlying = (value: number | undefined) => {
        setFlying(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                speed: {
                    ...npc.stats.speed,
                    fly: value
                }
            }
        });
    }
    const changeSwimming = (value: number | undefined) => {
        setSwimming(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                speed: {
                    ...npc.stats.speed,
                    swim: value
                }
            }
        });
    }
    const changeBurrowing = (value: number | undefined) => {
        setBurrowing(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                speed: {
                    ...npc.stats.speed,
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