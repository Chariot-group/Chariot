"use client"

import Champs from "@/components/common/Champs";
import IClassification from "@/models/characters/classification/IClassification";
import { useTranslations } from "next-intl";
import IStats from "@/models/characters/stat/IStats";
import ICombat from "@/models/characters/combat/ICombat";
import InformationsCard from "./cards/InformationsCard";

interface IGlobalSectionProps {
    combat: ICombat;
    setCombat: (combat: ICombat) => void;
}
export default function GlobalSection({ combat, setCombat }: IGlobalSectionProps) {

    const t = useTranslations("CharacterDetailsPanel");

    return (
        <div className="flex flex-col gap-3">
            <InformationsCard combat={combat} setCombat={setCombat} />
        </div>
    )
}