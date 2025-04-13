"use client"

import Champs from "@/components/common/Champs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ISenses from "@/models/characters/stat/sub/ISenses";
import ISpeed from "@/models/characters/stat/sub/ISpeed";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface IGlobalSectionProps {
    
}
export default function InformationsCard({  }: IGlobalSectionProps) {

    const t = useTranslations("CharacterDetailsPanel");


    const onChange = () => {
    }

    return (
        <div className="flex flex-row gap-3">

            <Card className="flex flex-col gap-2 bg-background p-3">
                <h3 className="text-foreground">{t("labels.stats.abilityScores.strength")}</h3>
                <div className="flex flex-col gap-2">
                    <Input className={`bg-card`} />
                    <Input className={`bg-card`} />
                </div>
            </Card>

            <Card className="flex flex-col gap-2 bg-background p-3">
                <h3 className="text-foreground">{t("labels.stats.abilityScores.dexterity")}</h3>
                <div className="flex flex-col gap-2">
                    <Input className={`bg-card`} />
                    <Input className={`bg-card`} />
                </div>
            </Card>

            <Card className="flex flex-col gap-2 bg-background p-3">
                <h3 className="text-foreground">{t("labels.stats.abilityScores.constitution")}</h3>
                <div className="flex flex-col gap-2">
                    <Input className={`bg-card`} />
                    <Input className={`bg-card`} />
                </div>
            </Card>

            <Card className="flex flex-col gap-2 bg-background p-3">
                <h3 className="text-foreground">{t("labels.stats.abilityScores.intelligence")}</h3>
                <div className="flex flex-col gap-2">
                    <Input className={`bg-card`} />
                    <Input className={`bg-card`} />
                </div>
            </Card>

            <Card className="flex flex-col gap-2 bg-background p-3">
                <h3 className="text-foreground">{t("labels.stats.abilityScores.wisdom")}</h3>
                <div className="flex flex-col gap-2">
                    <Input className={`bg-card`} />
                    <Input className={`bg-card`} />
                </div>
            </Card>

            <Card className="flex flex-col gap-2 bg-background p-3">
                <h3 className="text-foreground">{t("labels.stats.abilityScores.charisma")}</h3>
                <div className="flex flex-col gap-2">
                    <Input className={`bg-card`} />
                    <Input className={`bg-card`} />
                </div>
            </Card>

        </div>
    )
}