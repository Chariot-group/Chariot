"use client"

import { useTranslations } from "next-intl";
import ICombat from "@/models/characters/combat/ICombat";
import InformationsCard from "./cards/InformationsCard";

interface ICombatSectionProps {
    combat: ICombat;
    setCombat: (combat: ICombat) => void;
    isUpdating: boolean;
}
export default function CombatSection({ combat, setCombat, isUpdating }: ICombatSectionProps) {

    const t = useTranslations("CharacterDetailsPanel");

    return (
        <div className="flex flex-col gap-3">
            <InformationsCard combat={combat} setCombat={setCombat} isUpdating={isUpdating} />
        </div>
    )
}