import { Card } from "@/components/ui/card";
import ISpeed from "@/models/npc/stat/sub/ISpeed";
import { useState } from "react";
import { Champs } from "../../../PlayerModalDetails";

interface Props {
    speed: ISpeed;
}
export default function Speed({ speed }: Props) {

    const [walking, setWalking] = useState<number | undefined>(speed.walk);
    const [climbing, setClimbing] = useState<number | undefined>(speed.climb);
    const [flying, setFlying] = useState<number | undefined>(speed.fly);
    const [swimming, setSwimming] = useState<number | undefined>(speed.swim);
    const [burrowing, setBurrowing] = useState<number | undefined>(speed.burrow);

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs color="card" label="Vitesse de marche" value={walking} id={"walk"} type={"number"} placeholder={"Vitesse de marche"} setValue={setWalking} />
            <Champs color="card" label="Vitesse d'escalade" value={climbing} id={"climb"} type={"number"} placeholder={"Vitesse d'escalade"} setValue={setClimbing} />
            <Champs color="card" label="Vitesse de vol" value={flying} id={"fly"} type={"number"} placeholder={"Vitesse de vol"} setValue={setFlying} />
            <Champs color="card" label="Vitesse de nage" value={swimming} id={"swim"} type={"number"} placeholder={"Vitesse de nage"} setValue={setSwimming} />
            <Champs color="card" label="Vitesse de fouille" value={burrowing} id={"burrow"} type={"number"} placeholder={"Vitesse de fouille"} setValue={setBurrowing} />
        </Card>
    )
}