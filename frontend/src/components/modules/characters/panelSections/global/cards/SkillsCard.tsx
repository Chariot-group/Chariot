"use client"

import Champs from "@/components/common/Field";
import { Card } from "@/components/ui/card";
import ISkills from "@/models/characters/stat/sub/ISkills";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface ISkillsProps {
    skills: ISkills | undefined;
    setSkills: (classification: ISkills) => void;
}
export default function SkillsCard({ skills, setSkills }: ISkillsProps) {

    const t = useTranslations("CharacterDetailsPanel");

    const [athletics, setAthletics] = useState<number>(skills?.athletics ?? 0);
    const [acrobatics, setAcrobatics] = useState<number>(skills?.acrobatics ?? 0);
    const [sleightHand, setSleightHand] = useState<number>(skills?.sleightHand ?? 0);
    const [stealth, setStealth] = useState<number>(skills?.stealth ?? 0);
    const [perception, setPerception] = useState<number>(skills?.perception ?? 0);
    const [insight, setInsight] = useState<number>(skills?.insight ?? 0);
    const [investigation, setInvestigation] = useState<number>(skills?.investigation ?? 0);
    const [history, setHistory] = useState<number>(skills?.history ?? 0);
    const [nature, setNature] = useState<number>(skills?.nature ?? 0);
    const [arcana, setArcana] = useState<number>(skills?.arcana ?? 0);
    const [religion, setReligion] = useState<number>(skills?.religion ?? 0);
    const [deception, setDeception] = useState<number>(skills?.deception ?? 0);
    const [intimidation, setIntimidation] = useState<number>(skills?.intimidation ?? 0);
    const [performance, setPerformance] = useState<number>(skills?.performance ?? 0);
    const [persuasion, setPersuasion] = useState<number>(skills?.persuasion ?? 0);
    const [medicine, setMedicine] = useState<number>(skills?.medicine ?? 0);
    const [survival, setSurvival] = useState<number>(skills?.survival ?? 0);
    const [animalHandling, setAnimalHandling] = useState<number>(skills?.animalHandling ?? 0);

    const onChange = () => {
        setSkills({ athletics, acrobatics, sleightHand, stealth, perception, insight, investigation, history, nature, arcana, religion, animalHandling, medicine, deception, intimidation, performance, persuasion, survival });
    }

    useEffect(() => {
        setAthletics(skills?.athletics ?? 0);
        setAcrobatics(skills?.acrobatics ?? 0);
        setSleightHand(skills?.sleightHand ?? 0);
        setStealth(skills?.stealth ?? 0);
        setPerception(skills?.perception ?? 0);
        setInsight(skills?.insight ?? 0);
        setInvestigation(skills?.investigation ?? 0);
        setHistory(skills?.history ?? 0);
        setNature(skills?.nature ?? 0);
        setArcana(skills?.arcana ?? 0);
        setReligion(skills?.religion ?? 0);
        setAnimalHandling(skills?.animalHandling ?? 0);
        setInsight(skills?.insight ?? 0);
        setMedicine(skills?.medicine ?? 0);
        setDeception(skills?.deception ?? 0);
        setIntimidation(skills?.intimidation ?? 0);
        setPerformance(skills?.performance ?? 0);
        setPersuasion(skills?.persuasion ?? 0);
        setSurvival(skills?.survival ?? 0);

    }, [skills]);

    return (
        <div className="flex flex-row gap-3">

            <Card className="flex flex-col gap-2 bg-background p-3">
                <h3 className="text-foreground">{t("categories.global.skills")}</h3>
                <div className="flex flex-row gap-2">
                    <Champs onChange={onChange} color="card" id={"athletic"} type={"number"} label={t("labels.stats.skills.athletics")} placeholder={t("placeholders.stats.skills.athletics")} value={athletics} setValue={setAthletics} />
                    <Champs onChange={onChange} color="card" id={"acrobatics"} type={"number"} label={t("labels.stats.skills.acrobatics")} placeholder={t("placeholders.stats.skills.acrobatics")} value={acrobatics} setValue={setAcrobatics} />
                    <Champs onChange={onChange} color="card" id={"stealth"} type={"number"} label={t("labels.stats.skills.stealth")} placeholder={t("placeholders.stats.skills.stealth")} value={stealth} setValue={setStealth} />
                    <Champs onChange={onChange} color="card" id={"perception"} type={"number"} label={t("labels.stats.skills.perception")} placeholder={t("placeholders.stats.skills.perception")} value={perception} setValue={setPerception} />
                </div>
                <div className="flex flex-row gap-2">
                    <Champs onChange={onChange} color="card" id={"intimidation"} type={"number"} label={t("labels.stats.skills.intimidation")} placeholder={t("placeholders.stats.skills.intimidation")} value={intimidation} setValue={setIntimidation} />
                    <Champs onChange={onChange} color="card" id={"arcana"} type={"number"} label={t("labels.stats.skills.arcana")} placeholder={t("placeholders.stats.skills.arcana")} value={arcana} setValue={setArcana} />
                    <Champs onChange={onChange} color="card" id={"history"} type={"number"} label={t("labels.stats.skills.history")} placeholder={t("placeholders.stats.skills.history")} value={history} setValue={setHistory} />
                    <Champs onChange={onChange} color="card" id={"survival"} type={"number"} label={t("labels.stats.skills.survival")} placeholder={t("placeholders.stats.skills.survival")} value={survival} setValue={setSurvival} />
                </div>
                <div className="flex flex-row gap-2">
                    <Champs onChange={onChange} color="card" id={"investigation"} type={"number"} label={t("labels.stats.skills.investigation")} placeholder={t("placeholders.stats.skills.investigation")} value={investigation} setValue={setInvestigation} />
                    <Champs onChange={onChange} color="card" id={"nature"} type={"number"} label={t("labels.stats.skills.nature")} placeholder={t("placeholders.stats.skills.nature")} value={nature} setValue={setNature} />
                    <Champs onChange={onChange} color="card" id={"religion"} type={"number"} label={t("labels.stats.skills.religion")} placeholder={t("placeholders.stats.skills.religion")} value={religion} setValue={setReligion} />
                    <Champs onChange={onChange} color="card" id={"deception"} type={"number"} label={t("labels.stats.skills.deception")} placeholder={t("placeholders.stats.skills.deception")} value={deception} setValue={setDeception} />
                </div>
                <div className="flex flex-row gap-2">
                    <Champs onChange={onChange} color="card" id={"performance"} type={"number"} label={t("labels.stats.skills.performance")} placeholder={t("placeholders.stats.skills.performance")} value={performance} setValue={setPerformance} />
                    <Champs onChange={onChange} color="card" id={"insight"} type={"number"} label={t("labels.stats.skills.insight")} placeholder={t("placeholders.stats.skills.insight")} value={insight} setValue={setInsight} />
                    <Champs onChange={onChange} color="card" id={"medicine"} type={"number"} label={t("labels.stats.skills.medicine")} placeholder={t("placeholders.stats.skills.medicine")} value={medicine} setValue={setMedicine} />
                    <Champs onChange={onChange} color="card" id={"persuasion"} type={"number"} label={t("labels.stats.skills.persuasion")} placeholder={t("placeholders.stats.skills.persuasion")} value={persuasion} setValue={setPersuasion} />
                </div>
                <div className="flex flex-row gap-2">
                    <Champs onChange={onChange} color="card" id={"sleightOfHand"} type={"number"} label={t("labels.stats.skills.sleightOfHand")} placeholder={t("placeholders.stats.skills.sleightOfHand")} value={sleightHand} setValue={setSleightHand} />
                    <Champs onChange={onChange} color="card" id={"animalHandling"} type={"number"} label={t("labels.stats.skills.animalHandling")} placeholder={t("placeholders.stats.skills.animalHandling")} value={animalHandling} setValue={setAnimalHandling} />
                </div>
            </Card>

        </div>
    )
}