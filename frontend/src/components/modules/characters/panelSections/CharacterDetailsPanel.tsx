"use client";

import Champs from "@/components/common/Field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ICharacter from "@/models/characters/ICharacter";
import { useTranslations } from "next-intl";
import { RefObject, useEffect, useState } from "react";
import GlobalSection from "./global/GlobalSection";
import IClassification from "@/models/characters/classification/IClassification";
import CombatSection from "./combat/CombatSection";
import IStats from "@/models/characters/stat/IStats";
import ICombat from "@/models/characters/combat/ICombat";
import IActions from "@/models/characters/actions/IActions";
import ActionsSection from "./actions/ActionsSection";
import TraitsSection from "./traits/TraitsSection";

interface ICharacterDetailsPanelProps {
  character: ICharacter;
  onDelete?: (character: ICharacter) => void;
  isUpdating: boolean;
  characterTempRef: RefObject<Map<string, Partial<ICharacter>>>;
}
export function CharacterDetailsPanel({
  character,
  onDelete,
  isUpdating,
  characterTempRef
}: ICharacterDetailsPanelProps) {
  const t = useTranslations("CharacterDetailsPanel");

  const [name, setName] = useState<string>(character.name);
  const [classification, setClassification] = useState<IClassification>(
    character.classification
  );
  const [stats, setStats] = useState<IStats>(character.stats);
  const [combat, setCombat] = useState<ICombat>(character.combat);
  const [action, setAction] = useState<IActions>(character.actions[0]);
  const [trait, setTrait] = useState(character.traits[0]);

  useEffect(() => {
    setName(character.name);
    setClassification(character.classification);
    setStats(character.stats);
    setCombat(character.combat);
    setAction(character.actions[0]);
    setTrait(character.traits[0]);
  }, [character]);

  const [global, setGlobal] = useState<boolean>(true);
  const [combatNav, setCombatNav] = useState<boolean>(false);
  const [actionsNav, setActionsNav] = useState<boolean>(false);
  const [traitsNav, setTraitsNav] = useState<boolean>(false);
  const updateTab = (tab: "global" | "combat" | "actions" | "traits") => {
    setGlobal(tab === "global");
    setCombatNav(tab === "combat");
    setActionsNav(tab === "actions");
    setTraitsNav(tab === "traits");
  };

  useEffect(() => {
    character.name = name;
    character.classification = classification;
    character.stats = stats;
    character.combat = combat;
    character.actions[0] = action;
    character.traits[0] = trait;
    characterTempRef.current?.set(character._id, character);
  }, [name, classification, stats, combat, action, trait]);

  return (
    <Card className="flex w-full flex-col h-full gap-3 p-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row w-1/5">
          <Champs
            id={"name"}
            type={"text"}
            label={t("labels.name")}
            placeholder={t("placeholders.name")}
            value={name}
            setValue={setName}
            isActive={isUpdating}
          />
        </div>
        <div className="flex flex-row items-center gap-2 text-foreground">
          <span
            className={`cursor-pointer underline-offset-4 ${
              global ? "underline" : "hover:underline"
            }`}
            onClick={(e) => updateTab("global")}
          >
            {t("navigation.global")}
          </span>
          <span
            className={`cursor-pointer underline-offset-4 ${
              combatNav ? "underline" : "hover:underline"
            }`}
            onClick={(e) => updateTab("combat")}
          >
            {t("navigation.combat")}
          </span>
          <span
            className={`cursor-pointer underline-offset-4 ${
              actionsNav ? "underline" : "hover:underline"
            }`}
            onClick={(e) => updateTab("actions")}
          >
            {t("navigation.actions")}
          </span>
          <span
            className={`cursor-pointer underline-offset-4 ${
              traitsNav ? "underline" : "hover:underline"
            }`}
            onClick={(e) => updateTab("traits")}
          >
            {t("navigation.traits")}
          </span>
        </div>
        {onDelete && isUpdating && (
          <Button variant={"link"} onClick={() => onDelete(character)}>
            {t("actions.characterDelete")}
          </Button>
        )}
        {!onDelete || !isUpdating && <div className="w-1/5"></div>}
      </div>
      <div className="flex flex-col h-auto flex-1 overflow-auto scrollbar-hide">
        {global && (
          <GlobalSection
            classification={classification}
            setClassification={setClassification}
            stats={stats}
            setStats={setStats}
            isUpdating={isUpdating}
          />
        )}
        {combatNav && <CombatSection combat={combat} setCombat={setCombat} isUpdating={isUpdating} />}
        {actionsNav && (
          <ActionsSection actions={action} setActions={setAction} isUpdating={isUpdating} />
        )}
        {traitsNav && <TraitsSection trait={trait} setTrait={setTrait} isUpdating={isUpdating} />}
      </div>
    </Card>
  );
}
