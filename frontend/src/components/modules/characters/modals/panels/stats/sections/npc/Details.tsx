import { Card } from "@/components/ui/card";
import INpc from "@/models/npc/INpc";
import { useState } from "react";
import { Champs } from "../../../../PlayerModalDetails";

interface Props {
    npc: INpc;
    isUpdate: boolean;
    updateNpc: (npc: INpc) => void;
}
export default function Details({ npc, isUpdate, updateNpc }: Props) {

    const [darkvision, setDarkvision] = useState<number>(npc.stats.darkvision);
    const [passivePerception, setPassivePerception] = useState<number>(npc.stats.passivePerception);

    const changeDarkvision = (value: any) => {
        setDarkvision(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                darkvision: parseInt(value)
            }
        });
    }
    const changePassivePerception = (value: any) => {
        setPassivePerception(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                passivePerception: parseInt(value)
            }
        });
    }

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs label="Vision dans le noir" min={0} value={darkvision} id={"darkvision"} type={"number"} placeholder={"Vision dans le noir"} isActive={isUpdate} setValue={changeDarkvision} />
            <Champs label="Perception passive" value={passivePerception} id={"passivePerception"} type={"number"} placeholder={"Perception passive"} isActive={isUpdate} setValue={changePassivePerception} />
        </Card>
    );

}