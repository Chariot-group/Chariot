import { Card } from "@/components/ui/card";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { useState } from "react";
import IPlayer from "@/models/player/IPlayer";
import { parse } from "path";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function PlayerAbilityScores({ player, isUpdate, updatePlayer }: Props) {

    const [strengthST, setStrengthST] = useState<number>(player.stats.savingThrows.strength);
    const [dexterityST, setDexterityST] = useState<number>(player.stats.savingThrows.dexterity);
    const [constitutionST, setConstitutionST] = useState<number>(player.stats.savingThrows.constitution);
    const [intelligenceST, setIntelligenceST] = useState<number>(player.stats.savingThrows.intelligence);
    const [wisdomST, setWisdomST] = useState<number>(player.stats.savingThrows.wisdom);
    const [charismaST, setCharismaST] = useState<number>(player.stats.savingThrows.charisma);
    
    const [strengthAS, setStrengthAS] = useState<number>(player.stats.abilityScores.strength);
    const [dexterityAS, setDexterityAS] = useState<number>(player.stats.abilityScores.dexterity);
    const [constitutionAS, setConstitutionAS] = useState<number>(player.stats.abilityScores.constitution);
    const [intelligenceAS, setIntelligenceAS] = useState<number>(player.stats.abilityScores.intelligence);
    const [wisdomAS, setWisdomAS] = useState<number>(player.stats.abilityScores.wisdom);
    const [charismaAS, setCharismaAS] = useState<number>(player.stats.abilityScores.charisma);

    const changeStrengthST = (value: any) => {
        setStrengthST(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                savingThrows: {
                    ...player.stats.savingThrows,
                    strength: parseInt(value)
                }
            }
        });
    }
    const changeDexterityST = (value: any) => {
        setDexterityST(value);
        updatePlayer({  
            ...player,
            stats: {
                ...player.stats,
                savingThrows: {
                    ...player.stats.savingThrows,
                    dexterity: parseInt(value)
                }
            }
        });
    }
    const changeConstitutionST = (value: any) => {
        setConstitutionST(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                savingThrows: {
                    ...player.stats.savingThrows,
                    constitution: parseInt(value)
                }
            }
        });
    }
    const changeIntelligenceST = (value: any) => {
        setIntelligenceST(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                savingThrows: {
                    ...player.stats.savingThrows,
                    intelligence: parseInt(value)
                }
            }
        });
    }
    const changeWisdomST = (value: any) => {
        setWisdomST(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                savingThrows: {
                    ...player.stats.savingThrows,
                    wisdom: parseInt(value)
                }
            }
        });
    }
    const changeCharismaST = (value: any) => {
        setCharismaST(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                savingThrows: {
                    ...player.stats.savingThrows,
                    charisma: parseInt(value)
                }
            }
        });
    }
    const changeStrengthAS = (value: any) => {
        setStrengthAS(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                abilityScores: {
                    ...player.stats.abilityScores,
                    strength: parseInt(value)
                }
            }
        });
    }
    const changeDexterityAS = (value: any) => {
        setDexterityAS(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                abilityScores: {
                    ...player.stats.abilityScores,
                    dexterity: parseInt(value)
                }
            }
        });
    }
    const changeConstitutionAS = (value: any) => {
        setConstitutionAS(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                abilityScores: {
                    ...player.stats.abilityScores,
                    constitution: parseInt(value)
                }
            }
        });
    }
    const changeIntelligenceAS = (value: any) => {
        setIntelligenceAS(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                abilityScores: {
                    ...player.stats.abilityScores,
                    intelligence: parseInt(value)
                }
            }
        });
    }
    const changeWisdomAS = (value: any) => {
        setWisdomAS(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                abilityScores: {
                    ...player.stats.abilityScores,
                    wisdom: parseInt(value)
                }
            }
        });
    }
    const changeCharismaAS = (value: any) => {
        setCharismaAS(value);
        updatePlayer({
            ...player,
            stats: {
                ...player.stats,
                abilityScores: {
                    ...player.stats.abilityScores,
                    charisma: parseInt(value)
                }
            }
        });
    }

    return (
        <div className="flex flex-col gap-3 w-1/6 h-full">
            {/* Stats */}
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate}  color="card" label="Force" value={strengthAS} id={"strengthAS"} type={"number"} placeholder={"Force"} setValue={changeStrengthAS} />
                <Champs isActive={isUpdate}  color="card" label="Jet de sauvegarde" value={strengthST} id={"strengthST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={changeStrengthST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate}  color="card" label="Dextérité" value={dexterityAS} id={"dexterityAS"} type={"number"} placeholder={"Dextérité"} setValue={changeDexterityAS} />
                <Champs isActive={isUpdate}  color="card" label="Jet de sauvegarde" value={dexterityST} id={"dexterityST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={changeDexterityST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate}  color="card" label="Constitution" value={constitutionAS} id={"constitutionAS"} type={"number"} placeholder={"Constitution"} setValue={changeConstitutionAS} />
                <Champs isActive={isUpdate}  color="card" label="Jet de sauvegarde" value={constitutionST} id={"constitutionST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={changeConstitutionST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate}  color="card" label="Intelligence" value={intelligenceAS} id={"intelligenceAS"} type={"number"} placeholder={"Intelligence"} setValue={changeIntelligenceAS} />
                <Champs isActive={isUpdate}  color="card" label="Jet de sauvegarde" value={intelligenceST} id={"intelligenceST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={changeIntelligenceST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate}  color="card" label="Sagesse" value={wisdomAS} id={"wisdomAS"} type={"number"} placeholder={"Sagesse"} setValue={changeWisdomAS} />
                <Champs isActive={isUpdate}  color="card" label="Jet de sauvegarde" value={wisdomST} id={"wisdomST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={changeWisdomST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate}  color="card" label="Charisme" value={charismaAS} id={"charismaAS"} type={"number"} placeholder={"Force"} setValue={changeCharismaAS} />
                <Champs isActive={isUpdate}  color="card" label="Jet de sauvegarde" value={charismaST} id={"charismaST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={changeCharismaST} />
            </Card>
        </div>
    );

}