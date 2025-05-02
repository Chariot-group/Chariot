"use client"

import { useTranslations } from "next-intl";
import IActions from "@/models/characters/actions/IActions";
import { ActionCard } from "./cards/ActionCard";
import { Button } from "@/components/ui/button";

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
                <Button onClick={() => setActions({ ...actions, standard: [...actions.standard, { name: "", type: "melee", attackBonus: 0, damage: { type: "bludgeoning", dice: "1d6" }, range: "melee" }].reverse() })}>
                    {t("actions.actionsAdd")}
                </Button>
            </div>
            {
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
            }
        </div>
    )
}