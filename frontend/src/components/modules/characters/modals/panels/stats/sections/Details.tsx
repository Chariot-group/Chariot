import { Card } from "@/components/ui/card";
import IStats from "@/models/player/stats/IStats";
import { Champs } from "../../../PlayerModalDetails";
import { useState } from "react";
import IPlayer from "@/models/player/IPlayer";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
    stats: IStats;
    player: IPlayer;
}
export default function Details({ stats, player }: Props) {

    const [darkvision, setDarkvision] = useState<number>(stats.darkvision);
    const [proficiencyBonus, setProficiencyBonus] = useState<number>(stats.proficiencyBonus);
    const [passivePerception, setPassivePerception] = useState<number>(stats.passivePerception);

    const [inspiration, setInspiration] = useState<boolean>(player.inspiration);

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs color="card" label="Vision dans le noir" value={darkvision} id={"darkvision"} type={"number"} placeholder={"Vision dans le noir"} setValue={setDarkvision} />
            <Champs color="card" label="Bonus de compétence" value={proficiencyBonus} id={"proficiencyBonus"} type={"number"} placeholder={"Bonus de compétence"} setValue={setProficiencyBonus} />
            <Champs color="card" label="Perception passive" value={passivePerception} id={"passivePerception"} type={"number"} placeholder={"Perception passive"} setValue={setPassivePerception} />
            <div className="flex items-center space-x-2">
                <label
                    htmlFor="inspiration"
                    className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Inspiration:
                </label>
                <Checkbox id="inspiration" checked={inspiration} onCheckedChange={(state: boolean) => setInspiration(state)} />
            </div>
        </Card>
    )
}