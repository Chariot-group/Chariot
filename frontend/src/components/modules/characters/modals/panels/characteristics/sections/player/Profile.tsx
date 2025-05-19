import { Card } from "@/components/ui/card";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { useState } from "react";
import IPlayer from "@/models/player/IPlayer";
import { useTranslations } from "next-intl";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function Profile({ player, isUpdate, updatePlayer }: Props) {

    const t = useTranslations("CharacterDetailsPanel");

    const [level, setLevel] = useState<number>(player.progression.level);
    const [experience, setExperience] = useState<number>(player.progression.experience);
    const [race, setRace] = useState<string | undefined>(player.profile.race);
    const [subrace, setSubrace] = useState<string | undefined>(player.profile.subrace);
    const [alignment, setAlignment] = useState<string | undefined>(player.profile.alignment);

    const changeLevel = (value: any) => {
        setLevel(value);
        updatePlayer({
            ...player,
            progression: {
                ...player.progression,
                level: parseInt(value)
            }
        });
    }
    const changeExperience = (value: any) => {
        setExperience(value);
        updatePlayer({
            ...player,
            progression: {
                ...player.progression,
                experience: value
            }
        });
    }
    const changeRace = (value: string) => {
        setRace(value);
        updatePlayer({
            ...player,
            profile: {
                ...player.profile,
                race: value
            }
        });
    }
    const changeSubrace = (value: string) => {
        setSubrace(value);
        updatePlayer({
            ...player,
            profile: {
                ...player.profile,
                subrace: value
            }
        });
    }
    const changeAlignment = (value: string) => {
        setAlignment(value);
        updatePlayer({
            ...player,
            profile: {
                ...player.profile,
                alignment: value
            }
        });
    }

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs isActive={isUpdate} min={0} color="card" label={t('progression.level')} value={level} id={"level"} type={"number"} placeholder={t('progression.level')} setValue={changeLevel} />
            <Champs isActive={isUpdate} min={0} width="w-auto" color="card" label={t('progression.experience')} value={experience} id={"experience"} type={"number"} placeholder={t('progression.experience')} setValue={changeExperience} />
            <Champs isActive={isUpdate} color="card" id={"race"} type={"text"} label={t('profile.race')} placeholder={t('profile.race')} value={race} setValue={changeRace}></Champs>
            <Champs isActive={isUpdate} color="card" id={"subrace"} type={"text"} label={t('profile.subrace')} placeholder={t('profile.subrace')} value={subrace} setValue={changeSubrace}></Champs>
            <Champs isActive={isUpdate} color="card" id={"alignment"} type={"text"} label={t('profile.alignment')} placeholder={t('profile.alignment')} value={alignment} setValue={changeAlignment}></Champs>
        </Card>
    )
}