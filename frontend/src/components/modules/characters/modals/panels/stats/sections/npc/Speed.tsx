import { Card } from "@/components/ui/card";
import { useState } from "react";
import INpc from "@/models/npc/INpc";
import { Champs } from "../../../../PlayerModalDetails";
import { parse } from "path";

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

    const changeWalking = (value: any | undefined) => {
        setWalking(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                speed: {
                    ...npc.stats.speed,
                    walk: parseInt(value)
                }
            }
        });
    }
    const changeClimbing = (value: any | undefined) => {
        setClimbing(value);
        updateNpc({  
            ...npc,
            stats: {
                ...npc.stats,
                speed: {
                    ...npc.stats.speed,
                    climb: parseInt(value)
                }
            }
        });
    }
    const changeFlying = (value: any | undefined) => {
        setFlying(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                speed: {
                    ...npc.stats.speed,
                    fly: parseInt(value)
                }
            }
        });
    }
    const changeSwimming = (value: any | undefined) => {
        setSwimming(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                speed: {
                    ...npc.stats.speed,
                    swim: parseInt(value)
                }
            }
        });
    }
    const changeBurrowing = (value: any | undefined) => {
        setBurrowing(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                speed: {
                    ...npc.stats.speed,
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