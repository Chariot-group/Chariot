import { Card } from "@/components/ui/card";
import { Champs } from "../../PlayerModalDetails";
import { useState } from "react";
import IProgression from "@/models/player/progression/IProgression";
import IProfile from "@/models/player/profile/IProfile";

interface Props {
    progression: IProgression;
    profile: IProfile;
}
export default function Profile({ progression, profile }: Props) {

    const [level, setLevel] = useState<number>(progression.level);
    const [experience, setExperience] = useState<number>(progression.experience);
    const [race, setRace] = useState<string | undefined>(profile.race);
    const [subrace, setSubrace] = useState<string | undefined>(profile.subrace);
    const [alignment, setAlignment] = useState<string | undefined>(profile.alignment);

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs color="card" label="Niveau" value={level} id={"level"} type={"number"} placeholder={"Niveau"} setValue={setLevel} />
            <Champs color="card" label="Expérience" value={experience} id={"experience"} type={"number"} placeholder={"Expérience"} setValue={setExperience} />
            <Champs color="card" id={"race"} type={"text"} label={"Race"} placeholder={"Race"} value={race} setValue={setRace}></Champs>
            <Champs color="card" id={"subrace"} type={"text"} label={"Sous-race"} placeholder={"Sous-race"} value={subrace} setValue={setSubrace}></Champs>
            <Champs color="card" id={"alignment"} type={"text"} label={"Alignement"} placeholder={"Alignement"} value={alignment} setValue={setAlignment}></Champs>
        </Card>
    )
}