import { Card } from "@/components/ui/card";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { useState } from "react";
import IProgression from "@/models/player/progression/IProgression";
import IProfile from "@/models/player/profile/IProfile";
import IPlayer from "@/models/player/IPlayer";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function Profile({ player, isUpdate, updatePlayer }: Props) {

    const [level, setLevel] = useState<number>(player.progression.level);
    const [experience, setExperience] = useState<number>(player.progression.experience);
    const [race, setRace] = useState<string | undefined>(player.profile.race);
    const [subrace, setSubrace] = useState<string | undefined>(player.profile.subrace);
    const [alignment, setAlignment] = useState<string | undefined>(player.profile.alignment);

    const changeLevel = (value: number) => {
        setLevel(value);
        updatePlayer({
            ...player,
            progression: {
                ...player.progression,
                level: value
            }
        });
    }
    const changeExperience = (value: number) => {
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
            <Champs isActive={isUpdate} color="card" label="Niveau" value={level} id={"level"} type={"number"} placeholder={"Niveau"} setValue={changeLevel} />
            <Champs isActive={isUpdate} width="w-auto" color="card" label="Expérience" value={experience} id={"experience"} type={"number"} placeholder={"Expérience"} setValue={changeExperience} />
            <Champs isActive={isUpdate} color="card" id={"race"} type={"text"} label={"Race"} placeholder={"Race"} value={race} setValue={changeRace}></Champs>
            <Champs isActive={isUpdate} color="card" id={"subrace"} type={"text"} label={"Sous-race"} placeholder={"Sous-race"} value={subrace} setValue={changeSubrace}></Champs>
            <Champs isActive={isUpdate} color="card" id={"alignment"} type={"text"} label={"Alignement"} placeholder={"Alignement"} value={alignment} setValue={changeAlignment}></Champs>
        </Card>
    )
}