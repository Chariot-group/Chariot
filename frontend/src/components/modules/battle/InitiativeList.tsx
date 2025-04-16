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
}

const InitiativeList = ({ participants, setParticipants }: Props) => {
  const handleInitiativeChange = (participant: IParticipant) => {
    setParticipants(
      participants.map((p) =>
        p.character._id === participant.character._id ? participant : p
      )
    );
  };

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
        {[...participants]
          .sort((a, b) => {
            const initA = a.initiative ?? -Infinity;
            const initB = b.initiative ?? -Infinity;
            return initB - initA;
          })
          .map((participant) => (
            <InitiativeItem
              key={participant.character._id}
              participant={participant}
              handleInitiativeChange={handleInitiativeChange}
              setParticipant={(updatedParticipant: IParticipant) =>
                setParticipants(
                  participants.map((p) =>
                    p.character._id === updatedParticipant.character._id
                      ? updatedParticipant
                      : p
                  )
                )
              }
            />
          ))}
      </TableBody>
      <TableCaption>Initiative tracker caption</TableCaption>
    </Table>
  );
};

export default InitiativeList;
