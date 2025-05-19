import { Card } from "@/components/ui/card";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { useState } from "react";
import INpc from "@/models/npc/INpc";

interface Props {
    npc: INpc;
    isUpdate: boolean;
    updateNpc: (npc: INpc) => void;
}
export default function NpcAbilityScores({ npc, isUpdate, updateNpc }: Props) {

    const [strengthST, setStrengthST] = useState<number>(npc.stats.savingThrows.strength);
    const [dexterityST, setDexterityST] = useState<number>(npc.stats.savingThrows.dexterity);
    const [constitutionST, setConstitutionST] = useState<number>(npc.stats.savingThrows.constitution);
    const [intelligenceST, setIntelligenceST] = useState<number>(npc.stats.savingThrows.intelligence);
    const [wisdomST, setWisdomST] = useState<number>(npc.stats.savingThrows.wisdom);
    const [charismaST, setCharismaST] = useState<number>(npc.stats.savingThrows.charisma);
    
    const [strengthAS, setStrengthAS] = useState<number>(npc.stats.abilityScores.strength);
    const [dexterityAS, setDexterityAS] = useState<number>(npc.stats.abilityScores.dexterity);
    const [constitutionAS, setConstitutionAS] = useState<number>(npc.stats.abilityScores.constitution);
    const [intelligenceAS, setIntelligenceAS] = useState<number>(npc.stats.abilityScores.intelligence);
    const [wisdomAS, setWisdomAS] = useState<number>(npc.stats.abilityScores.wisdom);
    const [charismaAS, setCharismaAS] = useState<number>(npc.stats.abilityScores.charisma);

    const changeStrengthST = (value: any) => {
        setStrengthST(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                savingThrows: {
                    ...npc.stats.savingThrows,
                    strength: parseInt(value)
                }
            }
        });
    }
    const changeDexterityST = (value: any) => {
        setDexterityST(value);
        updateNpc({  
            ...npc,
            stats: {
                ...npc.stats,
                savingThrows: {
                    ...npc.stats.savingThrows,
                    dexterity: parseInt(value)
                }
            }
        });
    }
    const changeConstitutionST = (value: any) => {
        setConstitutionST(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                savingThrows: {
                    ...npc.stats.savingThrows,
                    constitution: value
                }
            }
        });
    }
    const changeIntelligenceST = (value: any) => {
        setIntelligenceST(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                savingThrows: {
                    ...npc.stats.savingThrows,
                    intelligence: parseInt(value)
                }
            }
        });
    }
    const changeWisdomST = (value: any) => {
        setWisdomST(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                savingThrows: {
                    ...npc.stats.savingThrows,
                    wisdom: parseInt(value)
                }
            }
        });
    }
    const changeCharismaST = (value: any) => {
        setCharismaST(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                savingThrows: {
                    ...npc.stats.savingThrows,
                    charisma: parseInt(value)
                }
            }
        });
    }
    const changeStrengthAS = (value: any) => {
        setStrengthAS(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                abilityScores: {
                    ...npc.stats.abilityScores,
                    strength: parseInt(value)
                }
            }
        });
    }
    const changeDexterityAS = (value: any) => {
        setDexterityAS(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                abilityScores: {
                    ...npc.stats.abilityScores,
                    dexterity: parseInt(value)
                }
            }
        });
    }
    const changeConstitutionAS = (value: any) => {
        setConstitutionAS(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                abilityScores: {
                    ...npc.stats.abilityScores,
                    constitution: parseInt(value)
                }
            }
        });
    }
    const changeIntelligenceAS = (value: any) => {
        setIntelligenceAS(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                abilityScores: {
                    ...npc.stats.abilityScores,
                    intelligence: parseInt(value)
                }
            }
        });
    }
    const changeWisdomAS = (value: any) => {
        setWisdomAS(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                abilityScores: {
                    ...npc.stats.abilityScores,
                    wisdom: parseInt(value)
                }
            }
        });
    }
    const changeCharismaAS = (value: any) => {
        setCharismaAS(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                abilityScores: {
                    ...npc.stats.abilityScores,
                    charisma: parseInt(value)
                }
            }
        });
    }

    return (
        <div className="flex flex-col gap-3 w-1/6 h-full">
            {/* Stats */}
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate} color="card" label="Force" value={strengthAS} id={"strengthAS"} type={"number"} placeholder={"Force"} setValue={changeStrengthAS} />
                <Champs isActive={isUpdate} color="card" label="Jet de sauvegarde" value={strengthST} id={"strengthST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={changeStrengthST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate} color="card" label="Dextérité" value={dexterityAS} id={"dexterityAS"} type={"number"} placeholder={"Dextérité"} setValue={changeDexterityAS} />
                <Champs isActive={isUpdate} color="card" label="Jet de sauvegarde" value={dexterityST} id={"dexterityST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={changeDexterityST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate} color="card" label="Constitution" value={constitutionAS} id={"constitutionAS"} type={"number"} placeholder={"Constitution"} setValue={changeConstitutionAS} />
                <Champs isActive={isUpdate} color="card" label="Jet de sauvegarde" value={constitutionST} id={"constitutionST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={changeConstitutionST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate} color="card" label="Intelligence" value={intelligenceAS} id={"intelligenceAS"} type={"number"} placeholder={"Intelligence"} setValue={changeIntelligenceAS} />
                <Champs isActive={isUpdate} color="card" label="Jet de sauvegarde" value={intelligenceST} id={"intelligenceST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={changeIntelligenceST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate} color="card" label="Sagesse" value={wisdomAS} id={"wisdomAS"} type={"number"} placeholder={"Sagesse"} setValue={changeWisdomAS} />
                <Champs isActive={isUpdate} color="card" label="Jet de sauvegarde" value={wisdomST} id={"wisdomST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={changeWisdomST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate} color="card" label="Charisme" value={charismaAS} id={"charismaAS"} type={"number"} placeholder={"Force"} setValue={changeCharismaAS} />
                <Champs isActive={isUpdate} color="card" label="Jet de sauvegarde" value={charismaST} id={"charismaST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={changeCharismaST} />
            </Card>
        </div>
    );

}