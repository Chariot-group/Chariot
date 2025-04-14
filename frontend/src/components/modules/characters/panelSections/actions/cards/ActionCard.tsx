"use client"

import Champs from "@/components/common/Field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import IAction from "@/models/characters/actions/sub/IAction";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface IActionCardProps {
    action: IAction;
    setAction: (action: IAction) => void;
    onDelete: () => void;
}
export function ActionCard({ action, setAction, onDelete }: IActionCardProps) {

    const t = useTranslations("CharacterDetailsPanel");
    
    const [name, setName] = useState<string>(action.name);
    const [type, setType] = useState<string>(action.type);
    const [attackBonus, setAttackBonus] = useState<number>(action.attackBonus);
    const [damageType, setDamageType] = useState<string>(action.damage.type);
    const [damageDice, setDamageDice] = useState<string>(action.damage.dice);
    const [range, setRange] = useState<string>(action.range);
    
    const onChange = () => {
        setAction({ ...action, name, type, attackBonus, damage: {type: damageType, dice: damageDice}, range });
    }
    
    useEffect(() => {
        setName(action.name);
        setType(action.type);
        setAttackBonus(action.attackBonus);
        setDamageDice(action.damage.dice);
        setDamageType(action.damage.type);
        setRange(action.range);
    }, [action]);

    return (
        <Card className="flex flex-col gap-2 bg-background p-3">
            <div className="flex justify-end">
                <Button variant={"link"} onClick={onDelete}>{t("actions.actionsDelete")}</Button>
            </div>
            <div className="flex flex-row gap-3">
                <Champs color="card" id={"name"} type={"text"} label={t("labels.actions.name")} placeholder={t("placeholders.actions.name")} value={name} setValue={setName} onChange={onChange}  />
                <Champs color="card" id={"type"} type={"text"} label={t("labels.actions.type")} placeholder={t("placeholders.actions.type")} value={type} setValue={setType} onChange={onChange}  />
                <Champs color="card" id={"attackBonus"} type={"text"} label={t("labels.actions.attackBonus")} placeholder={t("placeholders.actions.attackBonus")} value={attackBonus} setValue={setAttackBonus} onChange={onChange}  />
            </div>
            <div className="flex flex-row gap-3">
                <Champs color="card" id={"damageType"} type={"text"} label={t("labels.actions.damage.type")} placeholder={t("placeholders.actions.damage.type")} value={damageType} setValue={setDamageType} onChange={onChange}  />
                <Champs color="card" id={"damageDice"} type={"text"} label={t("labels.actions.damage.dice")} placeholder={t("placeholders.actions.damage.dice")} value={damageDice} setValue={setDamageDice} onChange={onChange}  />
                <Champs color="card" id={"range"} type={"text"} label={t("labels.actions.range")} placeholder={t("placeholders.actions.range")} value={range} setValue={setRange} onChange={onChange}  />
            </div>
        </Card>
    )
}