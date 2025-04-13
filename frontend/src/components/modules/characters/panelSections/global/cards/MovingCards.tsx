"use client"

import Champs from "@/components/common/Champs";
import { Card } from "@/components/ui/card";
import ISpeed from "@/models/characters/stat/sub/ISpeed";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface IGlobalSectionProps {
    speed: ISpeed;
    setSpeed: (classification: ISpeed) => void;
}
export default function InformationsCard({ speed, setSpeed }: IGlobalSectionProps) {

    const t = useTranslations("CharacterDetailsPanel");

    const [walk, setWalk] = useState<number | undefined>(speed.walk);
    const [fly, setFly] = useState<number | undefined>(speed.fly);
    const [climb, setClimb] = useState<number | undefined>(speed.climb);
    const [swim, setSwim] = useState<number | undefined>(speed.swim);
    const [burrow, setBurrow] = useState<number | undefined>(speed.burrow);

    const onChange = () => {
        setSpeed({ walk, fly, climb, swim, burrow });
    }

    useEffect(() => {
        setWalk(speed.walk);
        setFly(speed.fly);
        setClimb(speed.climb);
        setSwim(speed.swim);
        setBurrow(speed.burrow);
    }, [speed]);

    return (
        <div className="flex flex-row gap-3">

            <Card className="flex flex-col gap-2 bg-background p-5">
                <h3 className="text-foreground">{t("categories.global.moving")}</h3>
                <div className="flex flex-row gap-2">
                    <Champs onChange={onChange} color="card" id={"walk"} type={"number"} label={t("labels.stats.speed.walk")} placeholder={t("placeholders.stats.speed.walk")} value={walk} setValue={setWalk} />
                    <Champs onChange={onChange} color="card" id={"swim"} type={"number"} label={t("labels.stats.speed.swim")} placeholder={t("placeholders.stats.speed.swim")} value={swim} setValue={setSwim} />
                    <Champs onChange={onChange} color="card" id={"climb"} type={"number"} label={t("labels.stats.speed.climb")} placeholder={t("placeholders.stats.maxHP")} value={climb} setValue={setClimb} />
                </div>
                <div className="flex flex-row gap-2">
                    <Champs onChange={onChange} color="card" id={"maxHP"} type={"number"} label={t("labels.stats.speed.fly")} placeholder={t("placeholders.stats.speed.fly")} value={fly} setValue={setFly} />
                    <Champs onChange={onChange} color="card" id={"maxHP"} type={"number"} label={t("labels.stats.speed.burrow")} placeholder={t("placeholders.stats.speed.burrow")} value={burrow} setValue={setBurrow} />
                </div>
            </Card>

        </div>
    )
}