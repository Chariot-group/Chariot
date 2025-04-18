"use client";
import React, { useEffect, useState } from "react";
import InitiativeList from "./InitiativeList";
import { IGroupWithRelations } from "@/models/groups/IGroup";
import { IParticipant } from "@/models/participant/IParticipant";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, RefreshCcw, Swords } from "lucide-react";
import { useTranslations } from "next-intl";
interface Props {
  groups: (IGroupWithRelations | null)[];
}

const InitiativeTracker = ({ groups }: Props) => {
  const t = useTranslations("InitiativeTracker");
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [currentParticipant, setCurrentParticipant] = useState<
    IParticipant | undefined
  >(undefined);
  const [currentRound, setCurrentRound] = useState<number>(0);

  useEffect(() => {
    if (groups.length !== 2) {
      console.warn("Exactly 2 groups are required.");
      return;
    }
    const allParticipants: IParticipant[] = [];
    groups.forEach((group) => {
      group?.characters.forEach((character) => {
        allParticipants.push({
          character,
          groupLabel: group.label,
          initiative: 0,
        });
      });
    });

    sortAndSetParticipants(allParticipants);
  }, [groups]);

  const sortAndSetParticipants = (newParticipants: IParticipant[]) => {
    const sorted = [...newParticipants].sort((a, b) => {
      const initA = a.initiative ?? -Infinity;
      const initB = b.initiative ?? -Infinity;
      return initB - initA;
    });
    setParticipants(sorted);
  };

  const handleReset = () => {
    const resetParticipants = participants.map((p) => ({
      ...p,
      initiative: 0,
      character: {
        ...p.character,
        stats: {
          ...p.character.stats,
          currentHitPoints: p.character.stats.maxHitPoints,
        },
      },
    }));
    sortAndSetParticipants(resetParticipants);
    setCurrentParticipant(undefined);
    setCurrentRound(0);
  };

  const handleNext = () => {
    if (!currentParticipant) return;
    const currentIndex = participants.findIndex(
      (p) => p === currentParticipant
    );
    const total = participants.length;

    const validParticipants = participants.filter(
      (p) => p.character.stats.currentHitPoints > 0
    );
    if (validParticipants.length === 0) return;

    const nextParticipant = [...Array(total - 1)]
      .map((_, i) => (currentIndex + i + 1) % total)
      .map((i) => participants[i])
      .find((p) => p.character.stats.currentHitPoints > 0);

    if (nextParticipant) {
      setCurrentParticipant(nextParticipant);
      if (
        nextParticipant.character._id === validParticipants[0].character._id
      ) {
        setCurrentRound((prev) => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (!currentParticipant) return;
    const currentIndex = participants.findIndex(
      (p) => p === currentParticipant
    );
    const total = participants.length;

    const validParticipants = participants.filter(
      (p) => p.character.stats.currentHitPoints > 0
    );
    if (validParticipants.length === 0) return;

    const previousParticipant = [...Array(total - 1)]
      .map((_, i) => (currentIndex - i - 1 + total) % total)
      .map((i) => participants[i])
      .find((p) => p.character.stats.currentHitPoints > 0);

    if (previousParticipant) {
      setCurrentParticipant(previousParticipant);

      if (
        currentParticipant.character._id ===
          validParticipants[0].character._id &&
        currentRound > 0
      ) {
        setCurrentRound((prev) => prev - 1);
      }
    }
  };

  const handleBattleStart = () => {
    const firstParticipant = participants[0];
    if (firstParticipant) {
      setCurrentParticipant(firstParticipant);
    }
  };

  return (
    <div className="p-5">
      <InitiativeList
        participants={participants}
        setParticipants={sortAndSetParticipants}
        currentParticipant={currentParticipant}
      />
      <div className="flex justify-between mt-5">
        <p className="text-xl">
          {t("round")} : {currentRound}
        </p>
        <div className=" flex flex-row gap-x-2">
          <Button variant="outline" onClick={handleReset}>
            {t("reset")} <RefreshCcw />
          </Button>
          {currentParticipant && (
            <div className="flex flex-row gap-x-2">
              {!(
                currentRound === 0 &&
                currentParticipant.character._id ===
                  participants.find(
                    (p) => p.character.stats.currentHitPoints > 0
                  )?.character._id
              ) && (
                <Button onClick={handlePrevious}>
                  {t("previous")} <ArrowLeft />
                </Button>
              )}

              <Button onClick={handleNext}>
                {t("next")} <ArrowRight />
              </Button>
            </div>
          )}
          {!currentParticipant && (
            <Button onClick={handleBattleStart}>
              {t("start")} <Swords />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InitiativeTracker;
