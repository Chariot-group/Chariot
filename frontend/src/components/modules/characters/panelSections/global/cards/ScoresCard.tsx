"use client"

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import IAbilityScores from "@/models/characters/stat/sub/IAbilityScores";
import ISavingThrows from "@/models/characters/stat/sub/ISavingThrows";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface IScoresCardProps {
    abilityScores: IAbilityScores;
    setAbilityScores: (abilityScores: IAbilityScores) => void;
    savingThrows: ISavingThrows | undefined;
    setSavingThrows: (savingThrows: ISavingThrows) => void;
    isUpdating: boolean;
}
export default function ScoresCard({ abilityScores, setAbilityScores, savingThrows, setSavingThrows, isUpdating }: IScoresCardProps) {

    const t = useTranslations("CharacterDetailsPanel");

    const [strength, setStrength] = useState<number>(abilityScores.strength);
    const [dexterity, setDexterity] = useState<number>(abilityScores.dexterity);
    const [constitution, setConstitution] = useState<number>(abilityScores.constitution);
    const [intelligence, setIntelligence] = useState<number>(abilityScores.intelligence);
    const [wisdom, setWisdom] = useState<number>(abilityScores.wisdom);
    const [charisma, setCharisma] = useState<number>(abilityScores.charisma);

    const [savingThrowStrength, setSavingThrowStrength] = useState<number>(savingThrows?.strength || 0);
    const [savingThrowDexterity, setSavingThrowDexterity] = useState<number>(savingThrows?.dexterity || 0);
    const [savingThrowConstitution, setSavingThrowConstitution] = useState<number>(savingThrows?.constitution || 0);
    const [savingThrowIntelligence, setSavingThrowIntelligence] = useState<number>(savingThrows?.intelligence || 0);
    const [savingThrowWisdom, setSavingThrowWisdom] = useState<number>(savingThrows?.wisdom || 0);
    const [savingThrowCharisma, setSavingThrowCharisma] = useState<number>(savingThrows?.charisma || 0);

    const onChange = () => {
        setAbilityScores({
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma
        });
    }

    const onChangeSavingThrows = () => {
        setSavingThrows({
            strength: savingThrowStrength,
            dexterity: savingThrowDexterity,
            constitution: savingThrowConstitution,
            intelligence: savingThrowIntelligence,
            wisdom: savingThrowWisdom,
            charisma: savingThrowCharisma
        });
    }

    useEffect(() => {
        setStrength(abilityScores.strength);
        setDexterity(abilityScores.dexterity);
        setConstitution(abilityScores.constitution);
        setIntelligence(abilityScores.intelligence);
        setWisdom(abilityScores.wisdom);
        setCharisma(abilityScores.charisma);
        setSavingThrowStrength(savingThrows?.strength || 0);
        setSavingThrowDexterity(savingThrows?.dexterity || 0);
        setSavingThrowConstitution(savingThrows?.constitution || 0);
        setSavingThrowIntelligence(savingThrows?.intelligence || 0);
        setSavingThrowWisdom(savingThrows?.wisdom || 0);
        setSavingThrowCharisma(savingThrows?.charisma || 0);
    }, [strength, dexterity, constitution, intelligence, wisdom, charisma, savingThrowStrength, savingThrowDexterity, savingThrowConstitution, savingThrowIntelligence, savingThrowWisdom, savingThrowCharisma]);

    return (
        <div className="flex flex-row gap-3">

            <Card className="flex flex-col gap-2 bg-background p-3">
                <h3 className="text-foreground">{t("labels.stats.abilityScores.strength")}</h3>
                <div className="flex flex-col gap-2">
                    <CustomInput isActive={isUpdating} onChange={onChange} value={strength} setValue={setStrength} placeholder={t("placeholders.stats.abilityScores")} />
                    <CustomInput isActive={isUpdating} onChange={onChangeSavingThrows} value={savingThrowStrength} setValue={setSavingThrowStrength} placeholder={t("placeholders.stats.savingThrows")} />
                </div>
            </Card>

            <Card className="flex flex-col gap-2 bg-background p-3">
                 <h3 className="text-foreground">{t("labels.stats.abilityScores.dexterity")}</h3>
                 <div className="flex flex-col gap-2">
                     <CustomInput isActive={isUpdating} onChange={onChange} value={dexterity} setValue={setDexterity} placeholder={t("placeholders.stats.abilityScores")} />
                     <CustomInput isActive={isUpdating} onChange={onChangeSavingThrows} value={savingThrowDexterity} setValue={setSavingThrowDexterity} placeholder={t("placeholders.stats.savingThrows")} />
                 </div>
             </Card>
 
             <Card className="flex flex-col gap-2 bg-background p-3">
                 <h3 className="text-foreground">{t("labels.stats.abilityScores.constitution")}</h3>
                 <div className="flex flex-col gap-2">
                     <CustomInput isActive={isUpdating} onChange={onChange} value={constitution} setValue={setConstitution} placeholder={t("placeholders.stats.abilityScores")} />
                     <CustomInput isActive={isUpdating} onChange={onChangeSavingThrows} value={savingThrowConstitution} setValue={setSavingThrowConstitution} placeholder={t("placeholders.stats.savingThrows")} />
                 </div>
             </Card>
 
             <Card className="flex flex-col gap-2 bg-background p-3">
                 <h3 className="text-foreground">{t("labels.stats.abilityScores.intelligence")}</h3>
                 <div className="flex flex-col gap-2">
                     <CustomInput isActive={isUpdating} onChange={onChange} value={intelligence} setValue={setIntelligence} placeholder={t("placeholders.stats.abilityScores")} />
                     <CustomInput isActive={isUpdating} onChange={onChangeSavingThrows} value={savingThrowIntelligence} setValue={setSavingThrowIntelligence} placeholder={t("placeholders.stats.savingThrows")} />
                 </div>
             </Card>
 
             <Card className="flex flex-col gap-2 bg-background p-3">
                 <h3 className="text-foreground">{t("labels.stats.abilityScores.wisdom")}</h3>
                 <div className="flex flex-col gap-2">
                     <CustomInput isActive={isUpdating} onChange={onChange} value={wisdom} setValue={setWisdom} placeholder={t("placeholders.stats.abilityScores")} />
                     <CustomInput isActive={isUpdating} onChange={onChangeSavingThrows} value={savingThrowWisdom} setValue={setSavingThrowWisdom} placeholder={t("placeholders.stats.savingThrows")} />
                 </div>
             </Card>
 
             <Card className="flex flex-col gap-2 bg-background p-3">
                 <h3 className="text-foreground">{t("labels.stats.abilityScores.charisma")}</h3>
                 <div className="flex flex-col gap-2">
                     <CustomInput isActive={isUpdating} onChange={onChange} value={charisma} setValue={setCharisma} placeholder={t("placeholders.stats.abilityScores")} />
                     <CustomInput isActive={isUpdating} onChange={onChangeSavingThrows} value={savingThrowCharisma} setValue={setSavingThrowCharisma} placeholder={t("placeholders.stats.savingThrows")} />
                 </div>
             </Card>
        </div>
    )
}

interface ICustomInputProps {
    value: number;
    setValue: (value: number) => void;
    placeholder: string;
    onChange: () => void;
    isActive: boolean;
}
function CustomInput({ value, setValue, placeholder, onChange, isActive }: ICustomInputProps) {

    const [pending, setPending] = useState(false);

    const handleChange = (e: any) => {
        setPending(true);
        setValue(e.target.value);
    };

    useEffect(() => {
    if (pending) {
        onChange();
        setPending(false);
    }
    }, [value]);

    return (
        <Input readOnly={!isActive} type="number" onChange={handleChange} value={value === 0 ? "" : value} placeholder={placeholder} className={`bg-card`} />
    )
}