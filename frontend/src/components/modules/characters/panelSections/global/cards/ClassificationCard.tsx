"use client"

import Champs from "@/components/common/Champs";
import { Card } from "@/components/ui/card";
import IClassification from "@/models/characters/classification/IClassification";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface IGlobalSectionProps {
    classification: IClassification;
    setClassification: (classification: IClassification) => void;
}
export default function ClassificationCard({ classification, setClassification }: IGlobalSectionProps) {

    const t = useTranslations("CharacterDetailsPanel");

    const [alignment, setAlignment] = useState<string>(classification.alignment);
    const [size, setSize] = useState<string>(classification.size);
    const [type, setType] = useState<string>(classification.type);
    const [subType, setSubType] = useState<string>(classification.subtype);

    const onChange = () => {
        setClassification({alignment, size, type, subtype: subType});
    }

    useEffect(() => {
        setAlignment(classification.alignment);
        setSize(classification.size);
        setType(classification.type);
        setSubType(classification.subtype);
    }, [classification]);

    return (
        <div className="flex flex-row gap-3">

            <Card className="flex flex-col gap-2 bg-background p-3">
                <h3 className="text-foreground">{t("categories.global.classification")}</h3>
                <div className="flex flex-row gap-2">
                    <Champs onChange={onChange} color="card" id={"type"} type={"text"} label={t("labels.classification.type")} placeholder={t("placeholders.classification.type")} value={type} setValue={setType} />
                    <Champs onChange={onChange} color="card" id={"subType"} type={"text"} label={t("labels.classification.subType")} placeholder={t("placeholders.classification.subType")} value={subType} setValue={setSubType} />
                </div>
                <div className="flex flex-row gap-2">
                    <Champs onChange={onChange} color="card" id={"alignment"} type={"text"} label={t("labels.classification.alignment")} placeholder={t("placeholders.classification.alignment")} value={alignment} setValue={setAlignment} />
                    <Champs onChange={onChange} color="card" id={"size"} type={"text"} label={t("labels.classification.size")} placeholder={t("placeholders.classification.size")} value={size} setValue={setSize} />
                </div>
            </Card>

        </div>
    )
}