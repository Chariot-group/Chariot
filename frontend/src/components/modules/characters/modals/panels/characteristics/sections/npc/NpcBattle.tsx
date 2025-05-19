import { Card } from "@/components/ui/card";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { useState } from "react";
import INpc from "@/models/npc/INpc";
import { parse } from "path";

interface Props {
    npc: INpc;
    isUpdate: boolean;
    updateNpc: (npc: INpc) => void;
}
export default function NpcBattle({ npc, isUpdate, updateNpc }: Props) {

    const [maxHitPoints, setMaxHitPoints] = useState<number>(npc.stats.maxHitPoints);
    const [currentHitPoints, setCurrentHitPoints] = useState<number>(npc.stats.currentHitPoints);
    const [tempHitPoints, setTempHitPoints] = useState<number>(npc.stats.tempHitPoints);
    const [armorClass, setArmorClass] = useState<number>(npc.stats.armorClass);

    const changeMaxHitPoints = (value: any) => {
        setMaxHitPoints(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                maxHitPoints: parseInt(value)
            }
        });
    }

    const changeCurrentHitPoints = (value: any) => {
        setCurrentHitPoints(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                currentHitPoints: parseInt(value)
            }
        });
    }

    const changeTempHitPoints = (value: any) => {
        setTempHitPoints(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                tempHitPoints: parseInt(value)
            }
        });
    }

    const changeArmorClass = (value: any) => {
        setArmorClass(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
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