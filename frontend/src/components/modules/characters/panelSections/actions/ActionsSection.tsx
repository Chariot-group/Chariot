"use client"

import { useTranslations } from "next-intl";
import IActions from "@/models/characters/actions/IActions";
import { ActionCard } from "@/components/modules/characters/panelSections/actions/cards/ActionCard";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PlusCircleIcon } from "lucide-react";

interface IActionsSectionProps {
    actions: IActions;
    setActions: (actions: IActions) => void;
    isUpdating: boolean;
}
export default function ActionsSection({ actions, setActions, isUpdating }: IActionsSectionProps) {

    const t = useTranslations("CharacterDetailsPanel");

    const onDelete = (index: number) => {
        const newActions = [...actions.standard];
        newActions.splice(index, 1);
        setActions({ ...actions, standard: newActions });
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-end">
                {
                    isUpdating && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PlusCircleIcon className="text-primary hover:cursor-pointer" onClick={() => setActions({ ...actions, standard: [...actions.standard, { name: "", type: "melee", attackBonus: 0, damage: { type: "bludgeoning", dice: "1d6" }, range: "melee" }].reverse() })} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("actions.actionsAdd")}</p>
                            </TooltipContent>
                        </Tooltip>
                    )
                }
            </div>
            {
                actions.standard.length > 0 ? (
                    actions.standard.map((action, index) => (
                        <ActionCard
                            onDelete={() => onDelete(index)}
                            key={index}
                            action={action}
                            setAction={(action) => {
                                const newActions = [...actions.standard];
                                newActions[index] = action;
                                setActions({ ...actions, standard: newActions });
                            }}
                            isUpdating={isUpdating}
                        />
                    ))
                ) : (
                    <div className="flex items-center justify-center p-4 text-muted-foreground">
                        {t("actions.noActions")}
                    </div>
                )
            }
        </div>
    )
}