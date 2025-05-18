import { Card } from "@/components/ui/card";
import ISkills from "@/models/npc/stat/sub/ISkills"
import { useState } from "react";
import { Champs } from "../../../PlayerModalDetails";

interface Props {
    skills: ISkills;
}
export default function Skills({ skills }: Props) {

    const [athletics, setAthletics] = useState<number>(skills.athletics);
    const [acrobatics, setAcrobatics] = useState<number>(skills.acrobatics);
    const [sleightHand, setSleightHand] = useState<number>(skills.sleightHand);
    const [stealth, setStealth] = useState<number>(skills.stealth);
    const [arcana, setArcana] = useState<number>(skills.arcana);
    const [history, setHistory] = useState<number>(skills.history);
    const [investigation, setInvestigation] = useState<number>(skills.investigation);
    const [nature, setNature] = useState<number>(skills.nature);
    const [religion, setReligion] = useState<number>(skills.religion);
    const [animalHandling, setAnimalHandling] = useState<number>(skills.animalHandling);
    const [insight, setInsight] = useState<number>(skills.insight);
    const [medicine, setMedicine] = useState<number>(skills.medicine);
    const [perception, setPerception] = useState<number>(skills.perception);
    const [survival, setSurvival] = useState<number>(skills.survival);
    const [deception, setDeception] = useState<number>(skills.deception);
    const [intimidation, setIntimidation] = useState<number>(skills.intimidation);
    const [performance, setPerformance] = useState<number>(skills.performance);
    const [persuasion, setPersuasion] = useState<number>(skills.persuasion);

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs color="card" label="Athlétisme" value={athletics} id={"athletics"} type={"number"} placeholder={"Athlétisme"} setValue={setAthletics} />
            <Champs color="card" label="Acrobaties" value={acrobatics} id={"acrobatics"} type={"number"} placeholder={"Acrobaties"} setValue={setAcrobatics} />
            <Champs color="card" label="Discrétion" value={stealth} id={"stealth"} type={"number"} placeholder={"Discrétion"} setValue={setStealth} />
            <Champs color="card" label="Vol à la tire" value={sleightHand} id={"sleightHand"} type={"number"} placeholder={"Vol à la tire"} setValue={setSleightHand} />
            <Champs color="card" label="Arcane" value={arcana} id={"arcana"} type={"number"} placeholder={"Arcane"} setValue={setArcana} />
            <Champs color="card" label="Histoire" value={history} id={"history"} type={"number"} placeholder={"Histoire"} setValue={setHistory} />
            <Champs color="card" label="Investigation" value={investigation} id={"investigation"} type={"number"} placeholder={"Investigation"} setValue={setInvestigation} />
            <Champs color="card" label="Nature" value={nature} id={"nature"} type={"number"} placeholder={"Nature"} setValue={setNature} />
            <Champs color="card" label="Religion" value={religion} id={"religion"} type={"number"} placeholder={"Religion"} setValue={setReligion} />
            <Champs color="card" label="Animalerie" value={animalHandling} id={"animalHandling"} type={"number"} placeholder={"Animalerie"} setValue={setAnimalHandling} />
            <Champs color="card" label="Perspicacité" value={insight} id={"insight"} type={"number"} placeholder={"Perspicacité"} setValue={setInsight} />
            <Champs color="card" label="Médecine" value={medicine} id={"medicine"} type={"number"} placeholder={"Médecine"} setValue={setMedicine} />
            <Champs color="card" label="Perception" value={perception} id={"perception"} type={"number"} placeholder={"Perception"} setValue={setPerception} />
            <Champs color="card" label="Survie" value={survival} id={"survival"} type={"number"} placeholder={"Survie"} setValue={setSurvival} />
            <Champs color="card" label="Tromperie" value={deception} id={"deception"} type={"number"} placeholder={"Tromperie"} setValue={setDeception} />
            <Champs color="card" label="Intimidation" value={intimidation} id={"intimidation"} type={"number"} placeholder={"Intimidation"} setValue={setIntimidation} />
            <Champs color="card" label="Performance" value={performance} id={"performance"} type={"number"} placeholder={"Performance"} setValue={setPerformance} />
            <Champs color="card" label="Persuasion" value={persuasion} id={"persuasion"} type={"number"} placeholder={"Persuasion"} setValue={setPersuasion} />
        </Card>
    )
}