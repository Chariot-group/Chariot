import { Card } from "@/components/ui/card";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { useState } from "react";
import INpc from "@/models/npc/INpc";

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

    const changeMaxHitPoints = (value: number) => {
        setMaxHitPoints(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                maxHitPoints: value
            }
        });
    }

    const changeCurrentHitPoints = (value: number) => {
        setCurrentHitPoints(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                currentHitPoints: value
            }
        });
    }

    const changeTempHitPoints = (value: number) => {
        setTempHitPoints(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                tempHitPoints: value
            }
        });
    }

    const changeArmorClass = (value: number) => {
        setArmorClass(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                armorClass: value
            }
        });
    }

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs isActive={isUpdate} color="card" label="PV maximum" value={maxHitPoints} id={"maxHP"} type={"number"} placeholder={"PV maximum"} setValue={changeMaxHitPoints} />
            <Champs isActive={isUpdate} color="card" label="PV" value={currentHitPoints} id={"hp"} type={"number"} placeholder={"PV"} setValue={changeCurrentHitPoints} />
            <Champs isActive={isUpdate} color="card" label="PV temporaire" value={tempHitPoints} id={"tempHP"} type={"number"} placeholder={"PV temporaire"} setValue={changeTempHitPoints} />
            <Champs isActive={isUpdate} color="card" label="Class d'armure" value={armorClass} id={"armorClass"} type={"number"} placeholder={"Class d'armure"} setValue={changeArmorClass} />
        </Card>
    )
}