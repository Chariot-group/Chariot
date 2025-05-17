"use client"

import Champs from "@/components/common/Field";
import { Card } from "@/components/ui/card";
import ICombat from "@/models/characters/combat/ICombat";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface IInformationsCardProps {
    combat: ICombat;
    setCombat: (combat: ICombat) => void;
    isUpdating: boolean;
}
export default function InformationsCard({ combat, setCombat, isUpdating }: IInformationsCardProps) {

    const t = useTranslations("CharacterDetailsPanel");

    const [challengeRating, setChallangeRating] = useState<number>(combat?.challengeRating ?? 0);
    const [experiencePoints, setExperiencePoints] = useState<number>(combat?.experiencePoints ?? 0);

    const onChange = () => {
        setCombat({
            ...combat,
            challengeRating: challengeRating ?? 0,
            experiencePoints: experiencePoints ?? 0,
            resistances: combat?.resistances ?? [],
            immunities: combat?.immunities ?? [],
            vulnerabilities: combat?.vulnerabilities ?? []
        });
    }

    useEffect(() => {
        setChallangeRating(combat?.challengeRating ?? 0);
        setExperiencePoints(combat?.experiencePoints ?? 0);
    }, [combat]);

    return (
        <div className="flex flex-row gap-3">

            <Card className="flex flex-col gap-2 bg-background p-3">
                <h3 className="text-foreground">{t("categories.combat.stats")}</h3>
                <div className="flex flex-row gap-2">
                    <Champs isActive={isUpdating} onChange={onChange} color="card" id={"challengeRating"} type={"number"} label={t("labels.combat.challengeRating")} placeholder={t("placeholders.combat.challengeRating")} value={challengeRating} setValue={setChallangeRating} />
                    <Champs isActive={isUpdating} onChange={onChange} color="card" id={"experiencePoints"} type={"number"} label={t("labels.combat.experiencePoints")} placeholder={t("placeholders.combat.experiencePoints")} value={experiencePoints} setValue={setExperiencePoints} />
                </div>
            </Card>

        </div>
    )
}