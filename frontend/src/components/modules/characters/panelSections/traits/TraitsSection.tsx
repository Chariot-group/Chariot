"use client"

import { useTranslations } from "next-intl";
import ITrait from "@/models/characters/trait/ITrait";
import LanguagesCard from "./card/LanguagesCard";
import { useEffect, useState } from "react";

interface IGlobalSectionProps {
    trait: ITrait;
    setTrait: (combat: ITrait) => void;
}
export default function TraitsSection({ trait, setTrait }: IGlobalSectionProps) {

    const t = useTranslations("CharacterDetailsPanel");

    const [languages, setLanguages] = useState<string[]>(trait.languages);

    const onChange = () => {
        setTrait({ ...trait, languages });
    }

    useEffect(() => {
        onChange();
    }, [languages]);

    return (
        <div className="flex flex-col gap-3 h-full">
            <LanguagesCard languages={languages} setLanguges={setLanguages} />
        </div>
    )
}