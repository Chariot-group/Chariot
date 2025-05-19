import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Champs } from "../../../../PlayerModalDetails";
import INpc from "@/models/npc/INpc";

interface Props {
    npc: INpc;
    isUpdate: boolean;
    updateNpc: (npc: INpc) => void;
}
export default function Skills({ npc, isUpdate, updateNpc }: Props) {

    const [athletics, setAthletics] = useState<number>(npc.stats.skills.athletics);
    const [acrobatics, setAcrobatics] = useState<number>(npc.stats.skills.acrobatics);
    const [sleightHand, setSleightHand] = useState<number>(npc.stats.skills.sleightHand);
    const [stealth, setStealth] = useState<number>(npc.stats.skills.stealth);
    const [arcana, setArcana] = useState<number>(npc.stats.skills.arcana);
    const [history, setHistory] = useState<number>(npc.stats.skills.history);
    const [investigation, setInvestigation] = useState<number>(npc.stats.skills.investigation);
    const [nature, setNature] = useState<number>(npc.stats.skills.nature);
    const [religion, setReligion] = useState<number>(npc.stats.skills.religion);
    const [animalHandling, setAnimalHandling] = useState<number>(npc.stats.skills.animalHandling);
    const [insight, setInsight] = useState<number>(npc.stats.skills.insight);
    const [medicine, setMedicine] = useState<number>(npc.stats.skills.medicine);
    const [perception, setPerception] = useState<number>(npc.stats.skills.perception);
    const [survival, setSurvival] = useState<number>(npc.stats.skills.survival);
    const [deception, setDeception] = useState<number>(npc.stats.skills.deception);
    const [intimidation, setIntimidation] = useState<number>(npc.stats.skills.intimidation);
    const [performance, setPerformance] = useState<number>(npc.stats.skills.performance);
    const [persuasion, setPersuasion] = useState<number>(npc.stats.skills.persuasion);

    const changeAthletics = (value: number) => {
        setAthletics(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    athletics: value
                }
            }
        });
    }
    const changeAcrobatics = (value: number) => {
        setAcrobatics(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    acrobatics: value
                }
            }
        });
    }
    const changeSleightHand = (value: number) => {
        setSleightHand(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    sleightHand: value
                }
            }
        });
    }
    const changeStealth = (value: number) => {
        setStealth(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    stealth: value
                }
            }
        });
    }
    const changeArcana = (value: number) => {
        setArcana(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    arcana: value
                }
            }
        });
    }
    const changeHistory = (value: number) => {
        setHistory(value);
        updateNpc({  
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    history: value
                }
            }
        });
    }
    const changeInvestigation = (value: number) => {
        setInvestigation(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    investigation: value
                }
            }
        });
    }
    const changeNature = (value: number) => {
        setNature(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    nature: value
                }
            }
        });
    }
    const changeReligion = (value: number) => {
        setReligion(value);
        updateNpc({  
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    religion: value
                }
            }
        });
    }
    const changeAnimalHandling = (value: number) => {
        setAnimalHandling(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    animalHandling: value
                }
            }
        });
    }
    const changeInsight = (value: number) => {
        setInsight(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    insight: value
                }
            }
        });
    }
    const changeMedicine = (value: number) => {
        setMedicine(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    medicine: value
                }
            }
        });
    }
    const changePerception = (value: number) => {
        setPerception(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    perception: value
                }
            }
        });
    }
    const changeSurvival = (value: number) => {
        setSurvival(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    survival: value
                }
            }
        });
    }
    const changeDeception = (value: number) => {
        setDeception(value);
        updateNpc({  
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    deception: value
                }
            }
        });
    }
    const changeIntimidation = (value: number) => {
        setIntimidation(value);
        updateNpc({  
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    intimidation: value
                }
            }
        });
    }
    const changePerformance = (value: number) => {
        setPerformance(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    performance: value
                }
            }
        });
    }
    const changePersuasion = (value: number) => {
        setPersuasion(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                skills: {
                    ...npc.stats.skills,
                    persuasion: value
                }
            }
        });
    }

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs isActive={isUpdate} color="card" label="Athlétisme" value={athletics} id={"athletics"} type={"number"} placeholder={"Athlétisme"} setValue={changeAthletics} />
            <Champs isActive={isUpdate} color="card" label="Acrobaties" value={acrobatics} id={"acrobatics"} type={"number"} placeholder={"Acrobaties"} setValue={changeAcrobatics} />
            <Champs isActive={isUpdate} color="card" label="Discrétion" value={stealth} id={"stealth"} type={"number"} placeholder={"Discrétion"} setValue={changeStealth} />
            <Champs isActive={isUpdate} color="card" label="Vol à la tire" value={sleightHand} id={"sleightHand"} type={"number"} placeholder={"Vol à la tire"} setValue={changeSleightHand} />
            <Champs isActive={isUpdate} color="card" label="Arcane" value={arcana} id={"arcana"} type={"number"} placeholder={"Arcane"} setValue={changeArcana} />
            <Champs isActive={isUpdate} color="card" label="Histoire" value={history} id={"history"} type={"number"} placeholder={"Histoire"} setValue={changeHistory} />
            <Champs isActive={isUpdate} color="card" label="Investigation" value={investigation} id={"investigation"} type={"number"} placeholder={"Investigation"} setValue={changeInvestigation} />
            <Champs isActive={isUpdate} color="card" label="Nature" value={nature} id={"nature"} type={"number"} placeholder={"Nature"} setValue={changeNature} />
            <Champs isActive={isUpdate} color="card" label="Religion" value={religion} id={"religion"} type={"number"} placeholder={"Religion"} setValue={changeReligion} />
            <Champs isActive={isUpdate} color="card" label="Animalerie" value={animalHandling} id={"animalHandling"} type={"number"} placeholder={"Animalerie"} setValue={changeAnimalHandling} />
            <Champs isActive={isUpdate} color="card" label="Perspicacité" value={insight} id={"insight"} type={"number"} placeholder={"Perspicacité"} setValue={changeInsight} />
            <Champs isActive={isUpdate} color="card" label="Médecine" value={medicine} id={"medicine"} type={"number"} placeholder={"Médecine"} setValue={changeMedicine} />
            <Champs isActive={isUpdate} color="card" label="Perception" value={perception} id={"perception"} type={"number"} placeholder={"Perception"} setValue={changePerception} />
            <Champs isActive={isUpdate} color="card" label="Survie" value={survival} id={"survival"} type={"number"} placeholder={"Survie"} setValue={changeSurvival} />
            <Champs isActive={isUpdate} color="card" label="Tromperie" value={deception} id={"deception"} type={"number"} placeholder={"Tromperie"} setValue={changeDeception} />
            <Champs isActive={isUpdate} color="card" label="Intimidation" value={intimidation} id={"intimidation"} type={"number"} placeholder={"Intimidation"} setValue={changeIntimidation} />
            <Champs isActive={isUpdate} color="card" label="Performance" value={performance} id={"performance"} type={"number"} placeholder={"Performance"} setValue={changePerformance} />
            <Champs isActive={isUpdate} color="card" label="Persuasion" value={persuasion} id={"persuasion"} type={"number"} placeholder={"Persuasion"} setValue={changePersuasion} />
        </Card>
    )
}