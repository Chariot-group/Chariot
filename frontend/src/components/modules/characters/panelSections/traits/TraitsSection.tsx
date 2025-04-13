"use client"

import ITrait from "@/models/characters/trait/ITrait";
import LanguagesCard from "./card/LanguagesCard";
import { useEffect, useRef, useState } from "react";
import AbilitiesCard from "./card/AbilitiesCard";

interface ITraitsSectionProps {
    trait: ITrait;
    setTrait: (combat: ITrait) => void;
}
export default function TraitsSection({ trait, setTrait }: ITraitsSectionProps) {

    const [languages, setLanguages] = useState<string[]>(trait.languages);
    const [abilities, setAbilities] = useState(trait.abilities);
    const cancelRef = useRef<boolean>(false);

    const onChange = () => {
        setTrait({ abilities, languages });
    }

    useEffect(() => {
        cancelRef.current = true;
        setLanguages(trait.languages);
        setAbilities(trait.abilities);
        (async () => {
            await new Promise(resolve => setTimeout(resolve, 2));
            cancelRef.current = false;
        })();
    }, [trait]);

    useEffect(() => {
        if (cancelRef.current) return;
        onChange();
    }, [languages, abilities]);

    return (
        <div className="flex flex-row h-full justify-between">
            <div className="flex flex-col gap-3 1/3">
                <LanguagesCard languages={languages} setLanguges={setLanguages} />
            </div>
            <div className="flex flex-col gap-3 w-2/3">
                <AbilitiesCard abilities={abilities} setAbilities={setAbilities} />
            </div>
        </div>
    )
}