"use client"

import Champs from "@/components/common/Champs";
import IClassification from "@/models/characters/classification/IClassification";
import { useTranslations } from "next-intl";
import ClassificationCard from "./cards/ClassificationCard";
import InformationsCard from "./cards/InformationsCard";
import IStats from "@/models/characters/stat/IStats";

interface IGlobalSectionProps {
    classification: IClassification;
    setClassification: (classification: IClassification) => void;
    stats: IStats;
    setStats: (stats: IStats) => void;
}
export default function GlobalSection({ classification, setClassification, stats, setStats }: IGlobalSectionProps) {

    const t = useTranslations("CharacterDetailsPanel");

    return (
        <div className="flex flex-row gap-3">

            {/* Classification */}
            <ClassificationCard classification={classification} setClassification={setClassification} />
            <InformationsCard stats={stats} setStats={setStats} />

        </div>
    )
}