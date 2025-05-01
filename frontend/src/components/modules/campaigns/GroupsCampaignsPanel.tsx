"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import GroupListPanel from "../groups/GroupListPanel";
import { IGroup } from "@/models/groups/IGroup";
import { RefObject, useCallback, useState } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import GroupService from "@/services/groupService";
import GroupDnDWrapper from "../groups/GroupDndProvider";
import { ICampaign } from "@/models/campaigns/ICampaign";
import { useToast } from "@/hooks/useToast";

interface Props {
  idCampaign: string; // ID de la campagne des groupes
  isUpdating: boolean; // Indique si la campagne est en cours de mise à jour
  groupsRef: RefObject<Map<string, { idCampaign: string; type: "main" | "npc" | "archived"; }>>; // Liste des groupes
}
export default function GroupsCampaignsPanel({ idCampaign, isUpdating, groupsRef }: Props) {
  const t = useTranslations("GroupListPanel");
  const { error } = useToast();

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

    /*const response = await GroupService.updateGroup(group._id, {
      campaigns: updatedCampaigns,
    });*/
    groupsRef.current.set(group._id, {
      idCampaign: idCampaign,
      type: to,
    });
    group.campaigns = updatedCampaigns as any;

    const groupSetters = {
      main: setMainGroups,
      npc: setNpcGroups,
      archived: setArchivedGroups,
    };

    Object.entries(groupSetters).forEach(([key, setter]) => {
      if (from === key)
        setter((prev) => prev.filter((g) => g._id !== group._id));
    });

    groupSetters[to]((prev) => [...prev, group]);
  };

  const createGroup = useCallback(async () => {
    try {
        const response = await GroupService.createGroup({label: "Nouveau groupe", description: "", campaigns: [{idCampaign, type: "npc"}]});
        setNpcGroups((prev) => [...prev, response.data as IGroup]);
    } catch(err){
        error(t("error"));
    }
  }, [])

  const [mainSearch, setMainSearch] = useState<string>("");
  const [npcSearch, setNpcSearch] = useState<string>("");
  const [archivedSearch, setArchivedSearch] = useState<string>("");

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h2>{t("title.default")}</h2>
        <Button onClick={createGroup}>{t("create")}</Button>
      </div>
      <div className="flex flex-row gap-4 mt-4 justify-between h-full">
        <GroupDnDWrapper onDragEnd={handleDragEnd}>
          <div className="rounded-xl border border-ring bg-card text-card-foreground shadow">
            <GroupListPanel
              groups={mainGroups}
              setGroups={setMainGroups}
              reverse={true}
              grabbled={isUpdating}
              idCampaign={idCampaign}
              addable={false}
              type="main"
              setGroupSelected={() => {}}
              groupSelected={null}
              search={mainSearch}
              setSearch={setMainSearch}
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
              grabbled={isUpdating}
              idCampaign={idCampaign}
              addable={false}
              type="npc"
              setGroupSelected={() => {}}
              groupSelected={null}
              search={npcSearch}
              setSearch={setNpcSearch}
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
              grabbled={isUpdating}
              idCampaign={idCampaign}
              addable={false}
              type="archived"
              setGroupSelected={() => {}}
              groupSelected={null}
              search={archivedSearch}
              setSearch={setArchivedSearch}
            />
          </div>
        </GroupDnDWrapper>
      </div>
    </div>
  );
}
