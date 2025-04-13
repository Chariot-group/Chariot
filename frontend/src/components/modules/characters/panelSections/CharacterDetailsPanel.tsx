"use client"

import Champs from "@/components/common/Champs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ICharacter from "@/models/characters/ICharacter";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import GlobalSection from "./global/GlobalSection";
import IClassification from "@/models/characters/classification/IClassification";

interface ICharacterDetailsPanelProps {
    character: ICharacter;
}
export function CharacterDetailsPanel({ character }: ICharacterDetailsPanelProps) {

    const t = useTranslations("CharacterDetailsPanel");

    const cancelRef = useRef<boolean>(false);
    const [name, setName] = useState<string>(character.name);
    const [classification, setClassification] = useState<IClassification>(character.classification);
    const [stats, setStats] = useState(character.stats);

    useEffect(() => {
        cancelRef.current = true;
        setName(character.name);
        setClassification(character.classification);
        setStats(character.stats);
        // Attendre que le composant soit monté avant de mettre à jour le state
        (async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            cancelRef.current = false;
        })();
    }, [character]);

    const [global, setGlobal] = useState<boolean>(true);
    const [combat, setCombat] = useState<boolean>(false);
    const [actions, setActions] = useState<boolean>(false);
    const [traits, setTraits] = useState<boolean>(false);
    const updateTab = (tab: "global" | "combat" | "actions" | "traits") => {
        setGlobal(tab === "global");
        setCombat(tab === "combat");
        setActions(tab === "actions");
        setTraits(tab === "traits");
    }

    const onChange = () => {
        character.name = name;
        character.classification = classification;
        character.stats = stats;
        console.log(character);
    }
    useEffect(() => {
        if (cancelRef.current) return;
        onChange();
    }, [classification, stats]);

  return (
    <Card className="flex flex-col h-full gap-3 p-5">
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row w-1/5">
                <Champs id={"name"} type={"text"} label={t("labels.name")} onChange={onChange} placeholder={t("placeholders.name")} value={name} setValue={setName} />
            </div>
            <div className="flex flex-row items-center gap-2 text-foreground">
                <span className={`cursor-pointer underline-offset-4 ${global ? "underline" : "hover:underline"}`} onClick={(e) => updateTab('global')}>{t("navigation.global")}</span>
                <span className={`cursor-pointer underline-offset-4 ${combat ? "underline" : "hover:underline"}`} onClick={(e) => updateTab('combat')}>{t("navigation.combat")}</span>
                <span className={`cursor-pointer underline-offset-4 ${actions ? "underline" : "hover:underline"}`} onClick={(e) => updateTab('actions')}>{t("navigation.actions")}</span>
                <span className={`cursor-pointer underline-offset-4 ${traits ? "underline" : "hover:underline"}`} onClick={(e) => updateTab('traits')}>{t("navigation.traits")}</span>
            </div>
            <Button variant={"link"}>Supprimer</Button>
        </div>
        <div className="flex flex-col h-full flex-1 h-auto overflow-auto scrollbar-hide">
            {
                global && (
                    <GlobalSection classification={classification} setClassification={setClassification} stats={stats} setStats={setStats}/>
                )
            }
            {
                combat && (
                    <h1>Combat</h1>
                )
            }
            {
                actions && (
                    <h1>Actions</h1>
                )
            }
            {
                traits && (
                    <h1>Traits</h1>
                )
            }
        </div>
    </Card>
  );
}