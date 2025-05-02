"use client"

import Champs from "@/components/common/Field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import IAbility from "@/models/characters/trait/sub/Ability";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface IAbilitiesCardProps {
    abilities: IAbility[];
    setAbilities: (abilities: IAbility[]) => void;
    isUpdating: boolean;
}
export default function AbilitiesCard({ abilities, setAbilities, isUpdating }: IAbilitiesCardProps) {

    const t = useTranslations("CharacterDetailsPanel");

    const [selectedAbility, setSelectedAbility] = useState<IAbility>(abilities[0]);

    useEffect(() => {
        setSelectedAbility(abilities[0]);
    }, [abilities]);

    return (
        <div className="flex flex-row h-full gap-3 w-full">

            <Card className="flex flex-col gap-2 h-full bg-background p-3">
                <div className="flex flex-row gap-2 items-center justify-between">
                    <h3 className="text-foreground">{t("categories.traits.abilities")}</h3>
                    <Button
                        className="w-full mt-2"
                        onClick={() => {
                            const newAbilities = [...abilities, { name: "", description: "" }].reverse();
                            setAbilities(newAbilities);
                            setSelectedAbility(newAbilities[0]);
                        }
                        }
                    >{t("actions.abilitiesAdd")}</Button>
                </div>
                <div className="flex flex-col h-full gap-2">
                    {
                        abilities.length === 0 && (
                            <div className="text-muted-foreground h-full text-sm flex flex-col justify-center items-center">{t("categories.traits.noAbilities")}</div>
                        )
                    }
                    {
                        abilities.length > 0 && abilities.map((ability, index) => (
                            <Card key={index} className={`flex flex-row gap-2 p-3 bg-card items-center justify-between hover:border-2 hover:cursor-pointer ${selectedAbility.name == ability.name ? "border-2": ""}`} onClick={() => {
                                setSelectedAbility(ability);
                            }}>
                                <div className="flex flex-row gap-2 items-center justify-between w-full">
                                    <span>{ability.name}</span>
                                    <ChevronRight />
                                </div>
                            </Card>
                        ))
                    }
                </div>
            </Card>
            {
                selectedAbility && (
                    <div className="flex flex-row gap-2 h-full w-full">
                        <div className="flex flex-row gap-2 items-center">
                            {">"}
                        </div>
                        <Card className="flex flex-col gap-2 h-full w-full bg-background p-3">
                            <div className="flex justify-end">
                                <Button
                                    variant={"link"}
                                    className="justify-end"
                                    onClick={() => {
                                        const newAbilities = [...abilities];
                                        const index = newAbilities.findIndex((ability) => ability.name == selectedAbility.name);
                                        if (index !== -1) {
                                            newAbilities.splice(index, 1);
                                            setAbilities(newAbilities);
                                            setSelectedAbility(newAbilities[0]);
                                        }
                                    }
                                    }
                                >{t("actions.abilitiesDelete")}</Button>
                            </div>
                            <div className="w-full h-full flex flex-col gap-2">
                                <Champs color="card" id={"name"} type={"text"} label={t("labels.traits.abilities.name")} onChange={() => {}} placeholder={t("placeholders.traits.abilities.name")} value={selectedAbility.name} setValue={(value) => {
                                    const newAbilities = [...abilities];
                                    const index = newAbilities.findIndex((ability) => ability.name == selectedAbility.name);
                                    if (index !== -1) {
                                        newAbilities[index].name = value;
                                        setAbilities(newAbilities);
                                    }
                                }} isActive={isUpdating} />
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor={"description"} className="text-foreground">{t("labels.traits.abilities.description")}</Label>
                                    <Textarea className="h-[10dvh] bg-card" placeholder={t("placeholders.traits.abilities.description")} value={selectedAbility.description} onChange={(e) => {
                                        const newAbilities = [...abilities];
                                        const index = newAbilities.findIndex((ability) => ability.name == selectedAbility.name);
                                        if (index !== -1) {
                                            newAbilities[index].description = e.target.value;
                                            setAbilities(newAbilities);
                                        }
                                    }} readOnly={!isUpdating} />
                                </div>
                            </div>
                        </Card>
                    </div>
                )
            }
            

        </div>
    )
}