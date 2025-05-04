"use client"

import Champs from "@/components/common/Field";
import { Card } from "@/components/ui/card";
import ISenses from "@/models/characters/stat/sub/ISenses";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface ISensesProps {
    senses: ISenses;
    setSenses: (classification: ISenses) => void;
    isUpdating: boolean;
}
export default function SensesCard({ senses, setSenses, isUpdating }: ISensesProps) {

    const t = useTranslations("CharacterDetailsPanel");

    const [darkvision, setDarkvision] = useState<number>(senses?.darkvision ?? 0);
    const [passivePerception, setPassivePerception] = useState<number>(senses?.passivePerception ?? 0);

    const onChange = () => {
        setSenses({ darkvision, passivePerception });
    }

    useEffect(() => {
        setPassivePerception(senses?.passivePerception ?? 0);
        setDarkvision(senses?.darkvision ?? 0);
    }, [senses]);

    return (
        <div className="flex flex-row gap-3">

            <Card className="flex flex-col gap-2 bg-background p-3">
                <h3 className="text-foreground">{t("categories.global.senses")}</h3>
                <div className="flex flex-row gap-2">
                    <Champs isActive={isUpdating} onChange={onChange} color="card" id={"nightVision"} type={"number"} label={t("labels.stats.senses.nightVision")} placeholder={t("placeholders.stats.senses.nightVision")} value={darkvision} setValue={setDarkvision} />
                    <Champs isActive={isUpdating} onChange={onChange} color="card" id={"passivePerception"} type={"number"} label={t("labels.stats.senses.passivePerception")} placeholder={t("placeholders.stats.senses.passivePerception")} value={passivePerception} setValue={setPassivePerception} />
                </div>
            </Card>

        </div>
    )
}