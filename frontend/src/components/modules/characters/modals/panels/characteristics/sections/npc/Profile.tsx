import { Card } from "@/components/ui/card";
import INpc from "@/models/npc/INpc";
import { useState } from "react";
import { Champs } from "../../../../PlayerModalDetails";
import { Size, SIZES } from "@/constants/CharacterConstants";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    npc: INpc;
    isUpdate: boolean;
    updateNpc: (npc: INpc) => void;
}
export default function Profile({ npc, isUpdate, updateNpc }: Props) {

    const [type, setType] = useState<string | undefined>(npc.profile?.type);
    const [subType, setSubType] = useState<string | undefined>(npc.profile?.subtype);
    const [alignment, setAlignment] = useState<string | undefined>(npc.profile?.alignment);

    const [size, setSize] = useState<string>(npc.stats.size);

    const [chanllengeRating, setChallengeRating] = useState<number | undefined>(npc.challenge?.challengeRating);
    const [experiencePoints, setExperiencePoints] = useState<number | undefined>(npc.challenge?.experiencePoints);

    const changeSize = (value: Size) => {
        setSize(value);
        updateNpc({
            ...npc,
            stats: {
                ...npc.stats,
                size: value
            }
        });
    }
    const changeType = (value: string) => {
        setType(value);
        updateNpc({
            ...npc,
            profile: {
                ...npc.profile,
                type: value
            }
        });
    }
    const changeSubType = (value: string) => {
        setSubType(value);
        updateNpc({
            ...npc,
            profile: {
                ...npc.profile,
                subtype: value
            }
        });
    }
    const changeAlignment = (value: string) => {
        setAlignment(value);
        updateNpc({
            ...npc,
            profile: {
                ...npc.profile,
                alignment: value
            }
        });
    }
    const changeChallengeRating = (value: any) => {
        setChallengeRating(value);
        updateNpc({
            ...npc,
            challenge: {
                ...npc.challenge,
                challengeRating: parseInt(value)
            }
        });
    }
    const changeExperiencePoints = (value: any) => {
        setExperiencePoints(value);
        updateNpc({
            ...npc,
            challenge: {
                ...npc.challenge,
                experiencePoints: parseInt(value)
            }
        });
    }

    return (
        <Card className="bg-card p-4 flex flex-col bg-background">
            <Champs label="Type" value={type} id={"type"} type={"text"} placeholder={"Type"} isActive={isUpdate} setValue={changeType} />
            <Champs label="Sous-type" value={subType} id={"subtype"} type={"text"} placeholder={"Sous-type"} isActive={isUpdate} setValue={changeSubType} />
            <Champs label="Alignement" value={alignment} id={"alignment"} type={"text"} placeholder={"Alignement"} isActive={isUpdate} setValue={changeAlignment} />
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-foreground flex flex-row gap-1 items-center"><span className="font-bold">Taille:</span>
                    <Select onValueChange={changeSize} defaultValue={size}>
                        <SelectTrigger disabled={!isUpdate} className="p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0">
                            <SelectValue placeholder="Taille" />
                        </SelectTrigger>
                        <SelectContent className="border-ring">
                            {
                                SIZES.map((size) => (
                                    <SelectItem key={size} value={size}>
                                        {size}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </Label>
            </div>
            <Champs label="Challenge" min={0} value={chanllengeRating} id={"challengeRating"} type={"number"} placeholder={"Challenge"} isActive={isUpdate} setValue={changeChallengeRating} />
            <Champs label="XP" min={0} value={experiencePoints} id={"experiencePoints"} type={"number"} placeholder={"XP"} isActive={isUpdate} setValue={changeExperiencePoints} />
        </Card>
    )

}