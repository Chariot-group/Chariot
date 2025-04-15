import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import ICharacter from "@/models/characters/ICharacter";
import { IParticipant } from "@/models/participant/IParticipant";
import { on } from "events";
import { Heart, Shield, Sword } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
  participant: IParticipant;
  handleInitiativeChange: (participant: IParticipant) => void;
}

const InitiativeItem = ({ participant, handleInitiativeChange }: Props) => {
  const [localInitiative, setLocalInitiative] = useState<string>("");

  useEffect(() => {
    setLocalInitiative(participant.initiative?.toString() ?? "");
  }, [participant.initiative]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // n'accepte que les chiffres
    setLocalInitiative(value);
  };

  const onBlur = () => {
    const parsed = Number(localInitiative);
    if (!isNaN(parsed)) {
      handleInitiativeChange({ ...participant, initiative: parsed });
    }
  };

  return (
    <TableRow
      className={` ${
        participant.character.stats.currentHitPoints <= 0 && "bg-muted"
      }`}
    >
      <TableCell>
        <div className="relative flex items-center">
          <Input
            className="w-20 bg-card  md:text-xl font-semibold"
            value={localInitiative}
            onChange={onChange}
            onBlur={onBlur}
          />
          <Sword className="absolute left-12" />
        </div>
      </TableCell>
      <TableCell>{participant.character.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xl bg-card">
          <Heart />
          {participant.character.stats.currentHitPoints}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xl bg-card">
          <Shield />
          {participant.character.stats.armorClass}
        </Badge>
      </TableCell>
      <TableCell>{participant.groupLabel}</TableCell>
      <TableCell>
        <Button>Détail</Button>
      </TableCell>
    </TableRow>
  );
};

export default InitiativeItem;
