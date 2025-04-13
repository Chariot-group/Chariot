"use client"

import Champs from "@/components/common/Champs";
import IClassification from "@/models/characters/classification/IClassification";
import { useTranslations } from "next-intl";
import ClassificationCard from "./cards/ClassificationCard";
import InformationsCard from "./cards/InformationsCard";
import IStats from "@/models/characters/stat/IStats";
import MovingCards from "./cards/MovingCards";
import SkillsCard from "./cards/SkillsCard";
import SensesCard from "./cards/SensesCard";

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
            <div className="flex flex-col gap-3 w-2/3">
                <div className="flex flex-row gap-3">
                    <ClassificationCard classification={classification} setClassification={setClassification} />
                    <InformationsCard stats={stats} setStats={setStats} />
                </div>
                <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-3 w-1/2">
                        <MovingCards speed={stats.speed} setSpeed={(speed) => setStats({ ...stats, speed })} />
                        <SensesCard senses={stats.senses} setSenses={(senses) => setStats({ ...stats, senses })} />
                    </div>
                    <div className="w-1/2">
                        <SkillsCard skills={stats.skills} setSkills={(skills) => setStats({ ...stats, skills })} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-1/3">
                
            </div>
        </div>
    )
}