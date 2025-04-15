"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import GroupListPanel from "../groups/GroupListPanel";
import { IGroup } from "@/models/groups/IGroup";
import { useState } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import GroupService from "@/services/groupService";
import GroupDnDWrapper from "../groups/GroupDndProvider";
import { ICampaign } from "@/models/campaigns/ICampaign";

interface Props {
  idCampaign: string; // ID de la campagne des groupes
}
export default function GroupsCampaignsPanel({ idCampaign }: Props) {
  const t = useTranslations("GroupListPanel");

  const [mainGroups, setMainGroups] = useState<IGroup[]>([]);
  const [npcGroups, setNpcGroups] = useState<IGroup[]>([]);
  const [archivedGroups, setArchivedGroups] = useState<IGroup[]>([]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !["main", "npc", "archived"].includes(over.id as string))
      return;

    const group: IGroup = active.data.current?.group;
    const from = active.data.current?.from;
    const to = over.id as "main" | "npc" | "archived";

    if (from === to) return;

    const updatedCampaigns = group.campaigns.map(
      (campaign: ICampaign | string) => {
        const campaignId =
          typeof campaign === "string" ? campaign : campaign._id;
        if (campaignId !== idCampaign) return campaign;
        return { idCampaign: campaignId, type: to };
      }
    );

    const response = await GroupService.updateGroup(group._id, {
      campaigns: updatedCampaigns,
    });

    const groupSetters = {
      main: setMainGroups,
      npc: setNpcGroups,
      archived: setArchivedGroups,
    };

    Object.entries(groupSetters).forEach(([key, setter]) => {
      if (from === key)
        setter((prev) => prev.filter((g) => g._id !== group._id));
    });

    groupSetters[to]((prev) => [...prev, response.data as IGroup]);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h2>{t("title.default")}</h2>
        <Button>{t("create")}</Button>
      </div>
      <div className="flex flex-row gap-4 mt-4 justify-between h-full">
        <GroupDnDWrapper onDragEnd={handleDragEnd}>
          <div className="rounded-xl border border-ring bg-card text-card-foreground shadow">
            <GroupListPanel
              groups={mainGroups}
              setGroups={setMainGroups}
              reverse={true}
              grabbled={true}
              idCampaign={idCampaign}
              addable={false}
              type="main"
            />
          </div>
          <div className="flex items-center">
            <span className="text-muted-foreground">{"< >"}</span>
          </div>
          <div className="rounded-xl border border-ring bg-card text-card-foreground shadow">
            <GroupListPanel
              groups={npcGroups}
              setGroups={setNpcGroups}
              reverse={true}
              grabbled={true}
              idCampaign={idCampaign}
              addable={false}
              type="npc"
            />
          </div>
          <div className="flex items-center">
            <span className="text-muted-foreground">{"< >"}</span>
          </div>
          <div className="rounded-xl border border-ring bg-card text-card-foreground shadow">
            <GroupListPanel
              groups={archivedGroups}
              setGroups={setArchivedGroups}
              reverse={true}
              grabbled={true}
              idCampaign={idCampaign}
              addable={false}
              type="archived"
            />
          </div>
        </GroupDnDWrapper>
      </div>
    </div>
  );
}
