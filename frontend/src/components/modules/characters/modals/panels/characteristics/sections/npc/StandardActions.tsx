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
export default function StandardActions({ npc, updateNpc, isUpdate }: Props) {

    const [standardActions, setStandardActions] = useState<IAction[]>(npc.actions.standard);

    const changeStandardActions = (value: IAction[]) => {
        setStandardActions(value);
        updateNpc({
            ...npc,
            actions: {
                ...npc.actions,
                standard: value
            }
        });
    }
    const addStandardAction = () => {
        const newAction: IAction = {
            name: "",
            type: "",
            attackBonus: 0,
            damage: {},
            range: ""
        };
        changeStandardActions([...standardActions, newAction]);
    };
    const removeStandardAction = (index: number) => {
        const newActions = standardActions.filter((_, i) => i !== index);
        changeStandardActions(newActions);
    };
    const updateNameAction = (index: number, name: string) => {
        const newActions = [...standardActions];
        const newAction = { ...newActions[index] };
        newAction.name = name;
        newActions[index] = newAction;
        changeStandardActions(newActions);
    };
    const updateTypeAction = (index: number, type: string) => {
        const newActions = [...standardActions];
        const newAction = { ...newActions[index] };
        newAction.type = type;
        newActions[index] = newAction;
        changeStandardActions(newActions);
    };
    const updateAttackBonusAction = (index: number, attackBonus: number) => {
        const newActions = [...standardActions];
        const newAction = { ...newActions[index] };
        newAction.attackBonus = attackBonus;
        newActions[index] = newAction;
        changeStandardActions(newActions);
    };
    const updateDamageDiceAction = (index: number, dice: string) => {
        const newActions = [...standardActions];
        const newAction = { ...newActions[index] };
        newAction.damage.dice = dice;
        newActions[index] = newAction;
        changeStandardActions(newActions);
    };
    const updateDamageTypeAction = (index: number, type: string) => {
        const newActions = [...standardActions];
        const newAction = { ...newActions[index] };
        newAction.damage.type = type;
        newActions[index] = newAction;
        changeStandardActions(newActions);
    };
    const updateRangeAction = (index: number, range: string) => {
        const newActions = [...standardActions];
        const newAction = { ...newActions[index] };
        newAction.range = range;
        newActions[index] = newAction;
        changeStandardActions(newActions);
    };

    return (
        <div className="flex flex-col gap-3 w-full h-full">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-lg font-bold">Standard</h2>
                {isUpdate && <Tooltip>
                    <TooltipTrigger asChild>
                        <PlusCircleIcon onClick={() => addStandardAction()} className="text-primary cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Ajouter une action standard</p>
                    </TooltipContent>
                </Tooltip>}
            </div>
            <div className="flex flex-col gap-3 w-full h-full overflow-auto">
                {standardActions.length <= 0 && <span className="text-sm text-gray-500">Aucune action standard</span>}
                {standardActions.length > 0 && standardActions.map((action, index) => (
                    <Card key={index} className="bg-card p-4 flex flex-col bg-background">
                        <div className="flex flex-row justify-between items-center">
                            <Champs label="Nom" value={action.name} id={`name-${index}`} type={"text"} placeholder={"Nom"} isActive={isUpdate} setValue={(value) => updateNameAction(index, value)} />
                            {isUpdate && <Tooltip>
                                <TooltipTrigger asChild>
                                    <TrashIcon onClick={() => removeStandardAction(index)} className="text-primary cursor-pointer"/>
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