import { Card } from "@/components/ui/card";
import { Champs } from "../../PlayerModalDetails";
import IStats from "@/models/player/stats/IStats";
import { useState } from "react";

interface Props {
    stats: IStats;
}
export default function Battle({ stats }: Props) {

    const [maxHitPoints, setMaxHitPoints] = useState<number>(stats.maxHitPoints);
    const [currentHitPoints, setCurrentHitPoints] = useState<number>(stats.currentHitPoints);
    const [tempHitPoints, setTempHitPoints] = useState<number>(stats.tempHitPoints);
    const [armorClass, setArmorClass] = useState<number>(stats.armorClass);

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs color="card" label="PV maximum" value={maxHitPoints} id={"maxHP"} type={"number"} placeholder={"PV maximum"} setValue={setMaxHitPoints} />
            <Champs color="card" label="PV" value={currentHitPoints} id={"hp"} type={"number"} placeholder={"PV"} setValue={setCurrentHitPoints} />
            <Champs color="card" label="PV temporaire" value={tempHitPoints} id={"tempHP"} type={"number"} placeholder={"PV temporaire"} setValue={setTempHitPoints} />
            <Champs color="card" label="Class d'armure" value={armorClass} id={"armorClass"} type={"number"} placeholder={"Class d'armure"} setValue={setArmorClass} />
        </Card>
    )
}