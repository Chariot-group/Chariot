import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ISense from "@/models/npc/stat/sub/ISenses";
import IPlayer from "@/models/player/IPlayer";
import { DotIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface Props {
  player: IPlayer;
  isUpdate: boolean;
  updatePlayer: (player: IPlayer) => void;
}
export default function PlayerSensesSection({ player, isUpdate, updatePlayer }: Props) {
  const t = useTranslations("CharacterDetailsPanel");

  const [senses, setSenses] = useState<ISense[]>(player.stats.senses);

  const changeSenses = (value: ISense[]) => {
    setSenses(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        senses: value,
      },
    });
  };

  const addSense = () => {
    const newSense = { name: "", value: 0 };
    changeSenses([...senses, newSense]);
  };

  const removeSense = (index: number) => {
    const newSenses = senses.filter((_, i) => i !== index);
    changeSenses(newSenses);
  };

  const updateName = (index: number, name: string) => {
    const newSenses = [...senses];
    const newSense = { ...newSenses[index] };
    newSense.name = name;
    newSenses[index] = newSense;
    changeSenses(newSenses);
  };

  const updateValue = (index: number, value: any) => {
    const newSenses = [...senses];
    const newSense = { ...newSenses[index] };
    newSense.value = parseInt(value);
    newSenses[index] = newSense;
    changeSenses(newSenses);
  };

  return (
    <Card className="p-4 flex flex-col bg-background">
      <div className="flex flex-row gap-3 w-full h-full">
        <div className="flex flex-col gap-3 w-full h-full">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-lg font-bold">{t("senses.title")}</h2>
            {isUpdate && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <PlusCircleIcon
                    onClick={() => addSense()}
                    className="text-primary cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("actions.addSens")}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          {senses.length <= 0 && <span className="text-gray-500 text-sm">{t("senses.noSens")}</span>}
          {senses.length > 0 && (
            <ul className="list-disc">
              {senses.map((sense, index) => (
                <li
                  key={index}
                  className="text-sm flex flex-row gap-2 items-center">
                  <DotIcon className="text-foreground" />
                  <Input
                    readOnly={!isUpdate}
                    id={index.toString()}
                    type={"text"}
                    value={Object.keys(sense) ?? ""}
                    onChange={(e) => updateName(index, e.target.value)}
                    placeholder={t("senses.sensName")}
                    className={`w-[10vh] p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0`}
                  />
                  <span> :</span>
                  <Input
                    readOnly={!isUpdate}
                    min={0}
                    id={index.toString()}
                    type={"number"}
                    value={Object.values(sense)[0] ?? 0}
                    onChange={(e) => updateValue(index, e.target.value)}
                    placeholder={t("senses.value")}
                    className={`w-10 p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0`}
                  />
                  {isUpdate && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TrashIcon
                          onClick={() => removeSense(index)}
                          className="cursor-pointer text-primary"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("actions.deleteSens")}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
}
