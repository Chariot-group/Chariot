"use client"

import Champs from "@/components/common/Champs";
import IClassification from "@/models/characters/classification/IClassification";
import { useTranslations } from "next-intl";
import ClassificationCard from "./cards/ClassificationCard";

interface IGlobalSectionProps {
    classification: IClassification;
    setClassification: (classification: IClassification) => void;
}
export default function GlobalSection({ classification, setClassification }: IGlobalSectionProps) {

    const t = useTranslations("CharacterDetailsPanel");

    return (
        <div className="flex flex-row gap-3">

            {/* Classification */}
            <ClassificationCard classification={classification} setClassification={setClassification} />

        </div>
    )
}