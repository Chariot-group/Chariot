"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import GroupListPanel from "../groups/GroupListPanel";
import { IGroup } from "@/models/groups/IGroup";
import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import GroupService from "@/services/groupService";

interface Props {
  idCampaign: string; // ID de la campagne des groupes
}
export default function GroupsCampaignsPanel({ idCampaign }: Props) {
  const t = useTranslations("GroupListPanel");
  const [refresh, setRefresh] = useState(Date.now());

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const group: IGroup = active.data.current?.group;
    const from = active.data.current?.from;
    const to = over.id;

    if (from !== to) {
      const updatedCampaigns = group.campaigns.map((campaign) => {
        if (campaign === idCampaign) {
          return { idCampaign, type: to as string };
        }
        return campaign;
      });

      GroupService.updateGroup(group._id, {
        campaigns: updatedCampaigns,
      });
      setRefresh(Date.now());
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h2>{t("title.default")}</h2>
        <Button>{t("create")}</Button>
      </div>
      <div className="flex flex-row gap-4 mt-4 justify-between h-full">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="rounded-xl border border-ring bg-card text-card-foreground shadow">
            <GroupListPanel
              reverse={true}
              grabbled={true}
              idCampaign={idCampaign}
              addable={false}
              type="main"
              refresh={refresh}
            />
          </div>
          <div className="flex items-center">
            <span className="text-muted-foreground">{"< >"}</span>
          </div>
          <div className="rounded-xl border border-ring bg-card text-card-foreground shadow">
            <GroupListPanel
              reverse={true}
              grabbled={true}
              idCampaign={idCampaign}
              addable={false}
              type="npc"
              refresh={refresh}
            />
          </div>
          <div className="flex items-center">
            <span className="text-muted-foreground">{"< >"}</span>
          </div>
          <div className="rounded-xl border border-ring bg-card text-card-foreground shadow">
            <GroupListPanel
              reverse={true}
              grabbled={true}
              idCampaign={idCampaign}
              addable={false}
              type="archived"
              refresh={refresh}
            />
          </div>
        </DndContext>
      </div>
    </div>
  );
}
