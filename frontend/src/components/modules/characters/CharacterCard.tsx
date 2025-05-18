import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import INpc from "@/models/npc/INpc";
import IPlayer from "@/models/player/IPlayer";
import { useTranslations } from "next-intl";

interface PlayerCardProps {
    player: IPlayer;
    onClick: () => void;
}
export function PlayerCard( { player, onClick }: PlayerCardProps ) {

    const t = useTranslations("CharacterDetailsPanel");

    return (
        <Card onClick={onClick} className="border-ring shadow-md hover:shadow-[inset_0_0_0_1px_hsl(var(--ring))] cursor-pointer">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                <h2 className="text-lg font-bold">{player.name}</h2>
                <Badge>{t(player.kind)}</Badge>
            </CardHeader>
            <CardContent className="p-4 pt-2 flex flex-col gap-2">
                <div className="grid grid-cols-2">
                    {player.profile.race && <p className="text-sm"><span className="font-bold">{t("profile.race")}: </span>{player.profile.race}</p>}
                    {player.profile.subrace && <p className="text-sm"><span className="font-bold">{t("profile.subrace")}: </span>{player.profile.subrace}</p>}
                </div>
                {player.profile.alignment && <p className="text-sm"><span className="font-bold">{t("profile.alignment")}: </span>{player.profile.alignment}</p>}

                <div className="border-t border-ring"></div>
                <div className="grid grid-cols-2">
                    {player.progression.level && <p className="text-sm"><span className="font-bold">{t("progression.level")}: </span>{player.progression.level}</p>}
                    {player.progression.experience && <p className="text-sm"><span className="font-bold">{t("progression.experience")}: </span>{player.progression.experience}</p>}
                </div>
                <div className="border-t border-ring"></div>
                <div className="grid grid-cols-3 gap-1">
                    {player.appearance.eyes && <p className="text-sm"><span className="font-bold">{t("appearance.eyes")}: </span>{player.appearance.eyes}</p>}
                    {player.appearance.hair && <p className="text-sm"><span className="font-bold">{t("appearance.hair")}: </span>{player.appearance.hair}</p>}
                    {player.appearance.skin && <p className="text-sm"><span className="font-bold">{t("appearance.skin")}: </span>{player.appearance.skin}</p>}
                    {player.appearance.age && <p className="text-sm"><span className="font-bold">{t("appearance.age")}: </span>{player.appearance.age}</p>}
                    {player.appearance.height && <p className="text-sm"><span className="font-bold">{t("appearance.height")}: </span>{player.appearance.height}</p>}
                    {player.appearance.weight && <p className="text-sm"><span className="font-bold">{t("appearance.weight")}: </span>{player.appearance.weight}</p>}
                </div>
            </CardContent>
        </Card>
    );
}

interface NPCCardProps {
    npc: INpc;
    onClick: () => void;
}
export function NPCCard( { npc, onClick }: NPCCardProps ) {

    const t = useTranslations("CharacterDetailsPanel");

    return (
        <Card onClick={onClick} className="border-ring shadow-md hover:shadow-[inset_0_0_0_1px_hsl(var(--ring))] cursor-pointer">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                <h2 className="text-lg font-bold">{npc.name}</h2>
                <Badge >{t(npc.kind)}</Badge>
            </CardHeader>
            <CardContent className="p-4 pt-2 flex flex-col gap-2">
                <div className="grid grid-cols-2">
                    {npc.profile && npc.profile.type && <p className="text-sm"><span className="font-bold">{t("profile.type")}: </span>{npc.profile?.type}</p>}
                    {npc.profile && npc.profile.subtype && <p className="text-sm"><span className="font-bold">{t("profile.subtype")}: </span>{npc.profile?.subtype}</p>}
                </div>
                {npc.profile && npc.profile.alignment && <p className="text-sm"><span className="font-bold">{t("profile.alignment")}: </span>{npc.profile?.alignment}</p>}
            </CardContent>
        </Card>
    );
}