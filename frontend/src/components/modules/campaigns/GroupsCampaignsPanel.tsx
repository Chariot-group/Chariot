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
import { CrossIcon, EyeIcon, PlusCircleIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

interface Props {
  idCampaign: string; // ID de la campagne des groupes
  isUpdating: boolean; // Indique si la campagne est en cours de mise à jour
  groupsRef: RefObject<Map<string, { idCampaign: string; type: "main" | "npc" | "archived"; }>>; // Liste des groupes
  newGroupRef: RefObject<any[]>; // Liste des nouveaux groupes
  groupsLabelRef: RefObject<IGroup[]>; // Liste des groupes à ne pas afficher
}
export default function GroupsCampaignsPanel({ idCampaign, isUpdating, groupsRef, newGroupRef, groupsLabelRef }: Props) {
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

    groupsRef.current.set(group._id, {
      idCampaign: idCampaign,
      type: to,
    });
    group.campaigns = updatedCampaigns as any;

    //Chnage groupe si il existe dans newGroupRef
    if (newGroupRef.current.find((g) => g._id === group._id)) {
      newGroupRef.current = newGroupRef.current.map((g) => {
        if (g._id === group._id) {
          const t = { ...g, campaigns: [{
            idCampaign: idCampaign,
            type: to,
          }] };
          console.log(t);
          return t;
        }
        return g;
      });
    }

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
      let current = {
        _id: newGroupRef.current.length,
        label: "Nouveau groupe",
        description: "",
        campaigns: [{ idCampaign: idCampaign, type: "npc" }],
      };
      newGroupRef.current.push(current);
      setNpcGroups((prev) => [...prev, current as unknown as IGroup]);
    } catch(err){
        error(t("error"));
    }
  }, [])

  const [mainSearch, setMainSearch] = useState<string>("");
  const [npcSearch, setNpcSearch] = useState<string>("");
  const [archivedSearch, setArchivedSearch] = useState<string>("");

  const changeLabel = (label: string, group: IGroup) => {
    if(groupsLabelRef.current.find((g) => g._id === group._id)){
      groupsLabelRef.current = groupsLabelRef.current.map((g) => {
        if (g._id === group._id) {
          return { ...g, label };
        }
        return g;
      });
    } else {
      groupsLabelRef.current.push({ ...group, label });
    }
    setMainGroups((prev) =>
      prev.map((g) => (g._id === group._id ? { ...g, label } : g))
    );
    setNpcGroups((prev) =>
      prev.map((g) => (g._id === group._id ? { ...g, label } : g))
    );
    setArchivedGroups((prev) =>
      prev.map((g) => (g._id === group._id ? { ...g, label } : g))
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-row gap-3 justify-start items-center">
        <Link href={`/campaigns/${idCampaign}/groups`} className="text-foreground hover:underline underline-offset-2"><h2>{t("title.default")}</h2></Link>
        {
          isUpdating && (
            <Tooltip>
              <TooltipTrigger asChild>
                <PlusCircleIcon className="text-primary hover:cursor-pointer" onClick={createGroup} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("create")}</p>
              </TooltipContent>
            </Tooltip>
            
          )
        }
      </div>
      <div className="flex flex-row gap-4 mt-4 justify-between h-full">
        <GroupDnDWrapper onDragEnd={handleDragEnd}>
          <div className="rounded-xl border border-ring bg-card text-card-foreground shadow">
            <GroupListPanel
              changeLabel={changeLabel}
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
              changeLabel={changeLabel}
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
              changeLabel={changeLabel}
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
