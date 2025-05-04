"use client"

import Champs from "@/components/common/Field";
import { Card } from "@/components/ui/card";
import IStats from "@/models/characters/stat/IStats";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface IInformationsCardProps {
    stats: IStats;
    setStats: (classification: IStats) => void;
    isUpdating: boolean;
}
export default function InformationsCard({ stats, setStats, isUpdating }: IInformationsCardProps) {

    const t = useTranslations("CharacterDetailsPanel");

    const [maxHitPoints, setMaxHP] = useState<number>(stats.maxHitPoints);
    const [currentHitPoints, setCurrentHP] = useState<number>(stats.currentHitPoints);
    const [armorClass, setArmorClass] = useState<number>(stats.armorClass);
    const [tempHitPoints, setTempHP] = useState<number>(stats.tempHitPoints);
    const [hitDice, setHitDice] = useState<string>(stats.hitDice);

    const onChange = () => {
        setStats({...stats, maxHitPoints, currentHitPoints, armorClass, tempHitPoints, hitDice});
    }

    useEffect(() => {
        setMaxHP(stats.maxHitPoints);
        setCurrentHP(stats.currentHitPoints);
        setArmorClass(stats.armorClass);
        setTempHP(stats.tempHitPoints);
        setHitDice(stats.hitDice);
    }, [stats]);

    return (
        <div className="flex flex-row gap-3">

            <Card className="flex flex-col gap-2 bg-background p-3">
                <h3 className="text-foreground">{t("categories.global.informations")}</h3>
                <div className="flex flex-row gap-2">
                    <Champs isActive={isUpdating} onChange={onChange} color="card" id={"maxHP"} type={"number"} label={t("labels.stats.maxHP")} placeholder={t("placeholders.stats.maxHP")} value={maxHitPoints} setValue={setMaxHP} />
                    <Champs isActive={isUpdating} onChange={onChange} color="card" id={"currentHP"} type={"number"} label={t("labels.stats.currentHP")} placeholder={t("placeholders.stats.currentHP")} value={currentHitPoints} setValue={setCurrentHP} />
                </div>
                <div className="flex flex-row gap-2">
                    <Champs isActive={isUpdating} onChange={onChange} color="card" id={"armorClass"} type={"number"} label={t("labels.stats.armorClass")} placeholder={t("placeholders.stats.armorClass")} value={armorClass} setValue={setArmorClass} />
                    <Champs isActive={isUpdating} onChange={onChange} color="card" id={"hitDice"} type={"text"} label={t("labels.stats.hitDice")} placeholder={t("placeholders.stats.hitDice")} value={hitDice} setValue={setHitDice} />
                </div>
            </Card>

        </div>
    )
}