import React from "react";
import InitiativeItem from "./InitiativeItem";
import ICharacter from "@/models/characters/ICharacter";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IParticipant } from "@/models/participant/IParticipant";

interface Props {
  participants: IParticipant[];
  setParticipants: (participants: IParticipant[]) => void;
  currentParticipant?: IParticipant;
}

const InitiativeList = ({
  participants,
  setParticipants,
  currentParticipant,
}: Props) => {
  const handleInitiativeChange = (participant: IParticipant) => {
    setParticipants(
      participants.map((p) =>
        p.character._id === participant.character._id ? participant : p
      )
    );
  };

  const handleSetParticipant = (updatedParticipant: IParticipant) =>
    setParticipants(
      participants.map((p) =>
        p.character._id === updatedParticipant.character._id
          ? updatedParticipant
          : p
      )
    );

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-xl text-center">
          <TableHead>Initiative</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>PV</TableHead>
          <TableHead>CA</TableHead>
          <TableHead>Groupe</TableHead>
          <TableHead>Détail</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {participants.map((participant) => (
          <InitiativeItem
            key={participant.character._id}
            participant={participant}
            handleInitiativeChange={handleInitiativeChange}
            setParticipant={handleSetParticipant}
            isCurrent={
              currentParticipant?.character._id === participant.character._id
            }
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default InitiativeList;
