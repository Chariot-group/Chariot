"use client"

import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import GroupListPanel from "../groups/GroupListPanel";
import { IGroup } from "@/models/groups/IGroup";
import { useState } from "react";

interface Props {
    idCampaign: string; // ID de la campagne des groupes
}
export default function GroupsCampaignsPanel({ idCampaign }: Props) {

    const currentLocale = useLocale();
    const t = useTranslations("GroupListPanel");

    const [group, setGroupSelected] = useState<IGroup | null>(null);

    return(
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <h2>{t("title.default")}</h2>
                <Button >{t("create")}</Button>
            </div>
            <div className="flex flex-row gap-4 mt-4 justify-between h-full">
                <div className="rounded-xl border border-ring bg-card text-card-foreground shadow">
                    <GroupListPanel reverse={true} grabbled={true} idCampaign={idCampaign} addable={false} type="main" groupSelected={group} setGroupSelected={setGroupSelected} />
                </div>
                <div className="flex items-center">
                    <span className="text-muted-foreground">{"< >"}</span>
                </div>
                <div className="rounded-xl border border-ring bg-card text-card-foreground shadow">
                    <GroupListPanel reverse={true} grabbled={true} idCampaign={idCampaign} addable={false} type="npc" groupSelected={group} setGroupSelected={setGroupSelected} />
                </div>
                <div className="flex items-center">
                    <span className="text-muted-foreground">{"< >"}</span>
                </div>
                <div className="rounded-xl border border-ring bg-card text-card-foreground shadow">
                    <GroupListPanel reverse={true} grabbled={true} idCampaign={idCampaign} addable={false} type="archived" groupSelected={group} setGroupSelected={setGroupSelected} />
                </div>
            </div>
        </div>
    );

}