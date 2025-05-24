import { Card } from "@/components/ui/card";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { useState } from "react";
import INpc from "@/models/npc/INpc";
import { useTranslations } from "next-intl";

interface Props {
  npc: INpc;
  isUpdate: boolean;
  updateNpc: (npc: INpc) => void;
}
export default function NpcFightingSection({
  npc,
  isUpdate,
  updateNpc,
}: Props) {
  const t = useTranslations("CharacterDetailsPanel");

  const [maxHitPoints, setMaxHitPoints] = useState<number>(
    npc.stats.maxHitPoints
  );
  const [currentHitPoints, setCurrentHitPoints] = useState<number>(
    npc.stats.currentHitPoints
  );
  const [tempHitPoints, setTempHitPoints] = useState<number>(
    npc.stats.tempHitPoints
  );
  const [armorClass, setArmorClass] = useState<number>(npc.stats.armorClass);

  const changeMaxHitPoints = (value: any) => {
    setMaxHitPoints(value);
    updateNpc({
      ...npc,
      stats: {
        ...npc.stats,
        maxHitPoints: parseInt(value),
      },
    });
  };

  const changeCurrentHitPoints = (value: any) => {
    setCurrentHitPoints(value);
    updateNpc({
      ...npc,
      stats: {
        ...npc.stats,
        currentHitPoints: parseInt(value),
      },
    });
  };

  const changeTempHitPoints = (value: any) => {
    setTempHitPoints(value);
    updateNpc({
      ...npc,
      stats: {
        ...npc.stats,
        tempHitPoints: parseInt(value),
      },
    });
  };

  const changeArmorClass = (value: any) => {
    setArmorClass(value);
    updateNpc({
      ...npc,
      stats: {
        ...npc.stats,
        armorClass: parseInt(value),
      },
    });
  };

  return (
    <Card className="p-4 flex flex-col bg-background">
      <Champs
        isActive={isUpdate}
        min={0}
        color="card"
        label={t("batlle.maxPv")}
        value={maxHitPoints}
        id={"maxHP"}
        type={"number"}
        placeholder={t("batlle.maxPv")}
        setValue={changeMaxHitPoints}
      />
      <Champs
        isActive={isUpdate}
        min={0}
        max={maxHitPoints}
        color="card"
        label={t("batlle.currentPv")}
        value={currentHitPoints}
        id={"hp"}
        type={"number"}
        placeholder={t("batlle.currentPv")}
        setValue={changeCurrentHitPoints}
      />
      <Champs
        isActive={isUpdate}
        min={0}
        max={maxHitPoints}
        color="card"
        label={t("batlle.temporaryPv")}
        value={tempHitPoints}
        id={"tempHP"}
        type={"number"}
        placeholder={t("batlle.temporaryPv")}
        setValue={changeTempHitPoints}
      />
      <Champs
        isActive={isUpdate}
        min={0}
        color="card"
        label={t("batlle.armorClass")}
        value={armorClass}
        id={"armorClass"}
        type={"number"}
        placeholder={t("batlle.armorClass")}
        setValue={changeArmorClass}
      />
    </Card>
  );
}
