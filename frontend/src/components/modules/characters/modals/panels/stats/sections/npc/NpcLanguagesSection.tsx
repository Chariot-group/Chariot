import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import INpc from "@/models/npc/INpc";
import { DotIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface Props {
  npc: INpc;
  isUpdate: boolean;
  updateNpc: (npc: INpc) => void;
}
export default function NpcLanguagesSection({ npc, isUpdate, updateNpc }: Props) {
  const t = useTranslations("CharacterDetailsPanel");

  const [languages, setLanguages] = useState<string[]>(npc.stats.languages);

  const changeLanguages = (value: string[]) => {
    setLanguages(value);
    updateNpc({
      ...npc,
      stats: {
        ...npc.stats,
        languages: value,
      },
    });
  };

  const addLanguage = () => {
    changeLanguages([...languages, ""]);
  };

  const removeLanguage = (index: number) => {
    const newLanguages = [...languages];
    newLanguages.splice(index, 1);
    changeLanguages(newLanguages);
  };

  const handleLanguageChange = (index: number, value: string) => {
    const newLanguages = [...languages];
    newLanguages[index] = value;
    changeLanguages(newLanguages);
  };

  return (
    <Card className="p-4 flex flex-col bg-background">
      <div className="flex flex-row gap-3 w-full h-full">
        <div className="flex flex-col gap-3 w-full h-full">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-lg font-bold">{t("languages.title")}</h2>
            {isUpdate && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <PlusCircleIcon
                    onClick={() => addLanguage()}
                    className="text-primary cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("actions.addLanguage")}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          {languages.length <= 0 && <span className="text-gray-500 text-sm">{t("languages.noLanguage")}</span>}
          {languages.length > 0 && (
            <ul className="list-disc">
              {languages.map((language, index) => (
                <li
                  key={index}
                  className="text-sm flex flex-row gap-2 items-center">
                  <DotIcon className="text-foreground" />
                  <Input
                    id={index.toString()}
                    type={"text"}
                    value={language ?? ""}
                    onChange={(e) => handleLanguageChange(index, e.target.value)}
                    placeholder={t("languages.languageName")}
                    className={`w-[10vh] p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0`}
                  />
                  {isUpdate && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TrashIcon
                          onClick={() => removeLanguage(index)}
                          className="cursor-pointer text-primary"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("actions.deleteLanguage")}</p>
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
