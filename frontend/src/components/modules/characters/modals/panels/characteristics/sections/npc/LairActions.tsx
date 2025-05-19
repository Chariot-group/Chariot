import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import IAction from "@/models/npc/actions/IAction";
import INpc from "@/models/npc/INpc";
import { PlusCircleIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Champs } from "../../../../PlayerModalDetails";

interface Props{
    npc: INpc;
    updateNpc: (npc: INpc) => void;
    isUpdate: boolean;
}
export default function LairActions({ npc, updateNpc, isUpdate }: Props) {

    const [lairActions, setLairActions] = useState<IAction[]>(npc.actions.lair);

    const changeActions = (value: IAction[]) => {
        setLairActions(value);
        updateNpc({
            ...npc,
            actions: {
                ...npc.actions,
                lair: value
            }
        });
    }
    const addAction = () => {
        const newAction: IAction = {
            name: "",
            type: "",
            attackBonus: 0,
            damage: {},
            range: ""
        };
        changeActions([...lairActions, newAction]);
    };
    const removeAction = (index: number) => {
        const newActions = lairActions.filter((_, i) => i !== index);
        changeActions(newActions);
    };
    const updateNameAction = (index: number, name: string) => {
        const newActions = [...lairActions];
        const newAction = { ...newActions[index] };
        newAction.name = name;
        newActions[index] = newAction;
        changeActions(newActions);
    };
    const updateTypeAction = (index: number, type: string) => {
        const newActions = [...lairActions];
        const newAction = { ...newActions[index] };
        newAction.type = type;
        newActions[index] = newAction;
        changeActions(newActions);
    };
    const updateAttackBonusAction = (index: number, attackBonus: number) => {
        const newActions = [...lairActions];
        const newAction = { ...newActions[index] };
        newAction.attackBonus = attackBonus;
        newActions[index] = newAction;
        changeActions(newActions);
    };
    const updateDamageDiceAction = (index: number, dice: string) => {
        const newActions = [...lairActions];
        const newAction = { ...newActions[index] };
        newAction.damage.dice = dice;
        newActions[index] = newAction;
        changeActions(newActions);
    };
    const updateDamageTypeAction = (index: number, type: string) => {
        const newActions = [...lairActions];
        const newAction = { ...newActions[index] };
        newAction.damage.type = type;
        newActions[index] = newAction;
        changeActions(newActions);
    };
    const updateRangeAction = (index: number, range: string) => {
        const newActions = [...lairActions];
        const newAction = { ...newActions[index] };
        newAction.range = range;
        newActions[index] = newAction;
        changeActions(newActions);
    };

    return (
        <div className="flex flex-col gap-3 w-full h-full">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-lg font-bold">Repaires</h2>
                {isUpdate && <Tooltip>
                    <TooltipTrigger asChild>
                        <PlusCircleIcon onClick={() => addAction()} className="text-primary cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Ajouter une action repaire</p>
                    </TooltipContent>
                </Tooltip>}
            </div>
            <div className="flex flex-col gap-3 w-full h-full overflow-auto">
                {lairActions.length <= 0 && <span className="text-sm text-gray-500">Aucune action repaire</span>}
                {lairActions.length > 0 && lairActions.map((action, index) => (
                    <Card key={index} className="bg-card p-4 flex flex-col bg-background">
                        <div className="flex flex-row justify-between items-center">
                            <Champs label="Nom" value={action.name} id={`name-${index}`} type={"text"} placeholder={"Nom"} isActive={isUpdate} setValue={(value) => updateNameAction(index, value)} />
                            {isUpdate && <Tooltip>
                                <TooltipTrigger asChild>
                                    <TrashIcon onClick={() => removeAction(index)} className="text-primary cursor-pointer"/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Supprimer l'action</p>
                                </TooltipContent>
                            </Tooltip>}
                        </div>
                        <div className="flex flex-col">
                            <Champs label="Type" value={action.type} id={`type-${index}`} type={"text"} placeholder={"Type"} isActive={isUpdate} setValue={(value) => updateTypeAction(index, value)} />
                            <Champs label="Bonus d'attaque" value={action.attackBonus} id={`attackBonus-${index}`} type={"number"} placeholder={"Bonus d'attaque"} isActive={isUpdate} setValue={(value) => updateAttackBonusAction(index, value)} />
                            <Champs label="Dégâts" value={action.damage.dice} id={`damageDice-${index}`} type={"text"} placeholder={"Dégâts"} isActive={isUpdate} setValue={(value) => updateDamageDiceAction(index, value)} />
                            <Champs label="Type de dégât" value={action.damage.type} id={`damageType-${index}`} type={"text"} placeholder={"Type de dégât"} isActive={isUpdate} setValue={(value) => updateDamageTypeAction(index, value)} />
                            <Champs label="Portée" value={action.range} id={`range-${index}`} type={"text"} placeholder={"Portée"} isActive={isUpdate} setValue={(value) => updateRangeAction(index, value)} />
                        </div>
                    
                    </Card>
                ))}
            </div>
        </div>
    );
}