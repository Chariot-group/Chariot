import { Card } from "@/components/ui/card";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { useState } from "react";
import IPlayer from "@/models/player/IPlayer";
import { parse } from "path";
import { useTranslations } from "next-intl";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function PlayerAbilityScores({ player, isUpdate, updatePlayer }: Props) {

    const t = useTranslations("CharacterDetailsPanel");

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
            <Card className="p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate}  color="card" label={t('abilityScores.strength')} value={strengthAS} id={"strengthAS"} type={"number"} placeholder={t('abilityScores.strength')} setValue={changeStrengthAS} />
                <Champs isActive={isUpdate}  color="card" label={t('abilityScores.save')} value={strengthST} id={"strengthST"} type={"number"} placeholder={t('abilityScores.save')} setValue={changeStrengthST} />
            </Card>
            <Card className="p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate}  color="card" label={t('abilityScores.dexterity')} value={dexterityAS} id={"dexterityAS"} type={"number"} placeholder={t('abilityScores.dexterity')} setValue={changeDexterityAS} />
                <Champs isActive={isUpdate}  color="card" label={t('abilityScores.save')} value={dexterityST} id={"dexterityST"} type={"number"} placeholder={t('abilityScores.save')} setValue={changeDexterityST} />
            </Card>
            <Card className="p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate}  color="card" label={t('abilityScores.constitution')} value={constitutionAS} id={"constitutionAS"} type={"number"} placeholder={t('abilityScores.constitution')} setValue={changeConstitutionAS} />
                <Champs isActive={isUpdate}  color="card" label={t('abilityScores.save')} value={constitutionST} id={"constitutionST"} type={"number"} placeholder={t('abilityScores.save')} setValue={changeConstitutionST} />
            </Card>
            <Card className="p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate}  color="card" label={t('abilityScores.intelligence')} value={intelligenceAS} id={"intelligenceAS"} type={"number"} placeholder={t('abilityScores.intelligence')} setValue={changeIntelligenceAS} />
                <Champs isActive={isUpdate}  color="card" label={t('abilityScores.save')} value={intelligenceST} id={"intelligenceST"} type={"number"} placeholder={t('abilityScores.save')} setValue={changeIntelligenceST} />
            </Card>
            <Card className="p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate}  color="card" label={t('abilityScores.wisdom')} value={wisdomAS} id={"wisdomAS"} type={"number"} placeholder={t('abilityScores.wisdom')} setValue={changeWisdomAS} />
                <Champs isActive={isUpdate}  color="card" label={t('abilityScores.save')} value={wisdomST} id={"wisdomST"} type={"number"} placeholder={t('abilityScores.save')} setValue={changeWisdomST} />
            </Card>
            <Card className="p-4 flex flex-col bg-background">
                <Champs isActive={isUpdate}  color="card" label={t('abilityScores.charisma')} value={charismaAS} id={"charismaAS"} type={"number"} placeholder={t('abilityScores.charisma')} setValue={changeCharismaAS} />
                <Champs isActive={isUpdate}  color="card" label={t('abilityScores.save')} value={charismaST} id={"charismaST"} type={"number"} placeholder={t('abilityScores.save')} setValue={changeCharismaST} />
            </Card>
        </div>
    );

}