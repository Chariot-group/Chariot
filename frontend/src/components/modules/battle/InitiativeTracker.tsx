"use client";
import React, { useEffect, useState } from "react";
import InitiativeList from "./InitiativeList";
import { IGroupWithRelations } from "@/models/groups/IGroup";
import ICharacter from "@/models/characters/ICharacter";
import { IParticipant } from "@/models/participant/IParticipant";

interface Props {
  groups: IGroupWithRelations[];
}

const InitiativeTracker = ({ groups }: Props) => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [currentParticipant, setCurrentParticipant] = useState<
    IParticipant | undefined
  >(undefined);

  useEffect(() => {
    if (groups.length !== 2) {
      console.warn("Exactly 2 groups are required.");
      return;
    }
    console.log("groups", groups);
    const allParticipants: IParticipant[] = [];
    groups.forEach((group) => {
      group.characters.forEach((character) => {
        allParticipants.push({
          character,
          groupLabel: group.label,
          initiative: undefined,
        });
      });
    });
    setParticipants(allParticipants);
  }, [groups]);

  return (
    <div>
      <InitiativeList
        participants={participants}
        setParticipants={setParticipants}
      />
    </div>
  );
};

export default InitiativeTracker;
