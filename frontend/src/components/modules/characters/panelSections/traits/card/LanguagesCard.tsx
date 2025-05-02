"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

interface ILanguagesCardProps {
    languages: string[];
    setLanguges: (languages: string[]) => void;
    isUpdating: boolean;
}
export default function LanguagesCard({ languages, setLanguges, isUpdating }: ILanguagesCardProps) {

    const t = useTranslations("CharacterDetailsPanel");

    const onDeleteLanguage = (index: number) => {
        const newLanguages = [...languages];
        newLanguages.splice(index, 1);
        setLanguges(newLanguages);
    }

    return (
        <div className="flex flex-row h-full gap-3">

            <Card className="flex flex-col gap-2 h-full bg-background p-3">
                <div className="flex flex-row gap-2 items-center justify-between">
                    <h3 className="text-foreground">{t("categories.traits.languages")}</h3>
                    <Button
                        className="w-full mt-2"
                        onClick={() => {
                            setLanguges([...languages, ""].reverse());
                        }}
                    >{t("actions.languagesAdd")}</Button>
                </div>
                <div className="flex flex-col h-full gap-2">
                    {
                        languages.length === 0 && (
                            <div className="text-muted-foreground h-full text-sm flex flex-col justify-center items-center">{t("categories.traits.noLanguage")}</div>
                        )
                    }
                    {
                        languages.length > 0 && languages.map((language, index) => (
                            <LanguageCard
                                key={index}
                                onChange={(value) => {
                                    const newLanguages = [...languages];
                                    newLanguages[index] = value;
                                    setLanguges(newLanguages);
                                }}
                                onDelete={() => onDeleteLanguage(index)}
                                language={language}
                                isUpdating={isUpdating}
                            />
                        ))
                    }
                </div>
            </Card>

        </div>
    )
}

interface ILanguageCardProps {
    language: string;
    onDelete: () => void;
    onChange: (value: string) => void;
    isUpdating: boolean;
}
function LanguageCard( { language, onDelete, onChange, isUpdating }: ILanguageCardProps) {

    return (
        <Card className="flex flex-row gap-2 p-3 bg-card items-center justify-between">
            <Input readOnly={!isUpdating} value={language} className="bg-background" onChange={(e) => onChange(e.target.value)} />
            <Trash2Icon className="hover:cursor-pointer" onClick={onDelete}/>
        </Card>
    )
}