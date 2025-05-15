"use client";

import { useToast } from "@/hooks/useToast";
import { IGroup } from "@/models/groups/IGroup";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import GroupService from "@/services/groupService";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchBar";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { useDroppable } from "@dnd-kit/core";
import GroupListPanelItem from "./GroupListPanelItem";

interface Props {
  groups: IGroup[]; // Liste des groupes à afficher
  setGroups: React.Dispatch<React.SetStateAction<IGroup[]>>; // Setter de la liste des groupes
  groupSelected: IGroup | null; // Groupe selectionné
  setGroupSelected: (group: IGroup | null) => void; // Fonction pour mettre à jour le groupe selectionné
  offset?: number; // Nombre de groupes à afficher par page
  idCampaign: string; // ID de la campagne des groupes
  reverse?: boolean; // Si vrai, les couleurs de fond sont inversé
  type?: "all" | "main" | "npc" | "archived"; // Titre de groupe à afficher
  grabbled?: boolean; // Si vrai, le curseur est en mode grab et une icône de grip est affichée
  addable?: boolean; // Si vrai, le bouton d'ajout de groupe est affiché
  search: string;
  setSearch: (search: string) => void;
  disabledGroups?: IGroup[]; // Liste des groupes à ne pas afficher
  context?: boolean;
  changeLabel: (label: string, group: IGroup) => void; // Fonction pour changer le label d'un groupe
  updatedGroup: IGroup[]; // Liste des groupes à ne pas afficher
}
export default function GroupListPanel({
  groups,
  setGroups,
  offset = 8,
  groupSelected,
  setGroupSelected,
  idCampaign,
  reverse = false,
  type = "all",
  grabbled = false,
  addable = true,
  search,
  setSearch,
  disabledGroups,
  context = false,
  changeLabel,
  updatedGroup
}: Props) {
  const currentLocal = useLocale();
  const t = useTranslations("GroupListPanel");
  const { error } = useToast();

  const { setNodeRef, isOver } = useDroppable({
    id: type, // "main", "npc", etc.
  });

  const [newGroup, setNewGroup] = useState<IGroup | null>(null);
  //Pagination
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  //Infinite scroll
  const cardRef = useRef<HTMLDivElement | null>(null);

  const fetchGroups = useCallback(
    async (search: string, nextPage = 1, reset = false) => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await GroupService.getAllGroups(
          {
            page: nextPage,
            offset,
            label: encodeURIComponent(search),
            type,
          },
          idCampaign
        );
        if (reset) {
          setGroups(response.data || []);
          if (!context) {
            setGroupSelected(response.data[0] || null);
          }
        } else {
          setGroups((prev) => {
            //Fix un bug surement dû au seeder.
            return [
              ...prev,
              ...response.data.filter(
                (newGroup: { _id: string }) =>
                  !prev.some(
                    (existingGroup) => existingGroup._id === newGroup._id
                  )
              ),
            ];
          });
        }
        setPage(nextPage);
      } catch (err) {
        error(t("error"));
      } finally {
        setLoading(false);
      }
    }, [loading, groupSelected?.deletedAt, idCampaign]);

  const createGroup = useCallback(async () => {
    try {
      const response = await GroupService.createGroup({
        label: t("newGroup.label"),
        description: "",
        campaigns: [{ idCampaign: idCampaign, type: "npc" }],
      });
      setNewGroup(response.data);
      fetchGroups(search, 1, true);
      setSearch("");
    } catch (err) {
      error(t("error"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if(newGroup) {
      setGroupSelected(newGroup);
      setNewGroup(null);
    }
  }, [groupSelected]);

  useInfiniteScroll(cardRef, fetchGroups, page, loading, search);

  useEffect(() => {
    setGroups([]);
    fetchGroups(search, 1, true);
  }, [currentLocal, search, groupSelected?.deletedAt, idCampaign]);

  const isUpdated = (group: IGroup) => {
    return updatedGroup && updatedGroup.some((g) => g._id === group._id);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <CardHeader className="flex-none h-auto items-center gap-3">
        <CardTitle className="text-foreground font-bold">
          {t(type === "all" ? "title.default" : `title.${type}`)}
        </CardTitle>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("search")}
          reverse={reverse}
        />
      </CardHeader>
      <CardContent
        ref={cardRef}
        className={`flex-1 h-auto overflow-auto scrollbar-hide ${
          isOver ? (reverse ? "bg-primary/10" : "bg-primary/20") : ""
        }`}
      >
        <div className="flex flex-col gap-3" ref={setNodeRef}>
          {addable && (
            <Button onClick={() => createGroup()}>
              <span className="text-background font-bold">{t("create")}</span>
            </Button>
          )}
          {loading && <Loading />}
          {groups.length > 0 &&
            groups.map((group) => (
              <GroupListPanelItem
                changeLabel={changeLabel}
                idCampaign={idCampaign}
                key={group._id}
                group={group}
                currentPanelType={type}
                grabbled={grabbled}
                reverse={reverse}
                setGroupSelected={setGroupSelected}
                groupSelected={groupSelected}
                disabled={disabledGroups?.some((g) => g._id === group._id)}
                clickable={!context}
                updated={isUpdated(group)}
              />
            ))}
          {groups.length === 0 && !loading && !isOver && (
            <div className="row-start-2 col-span-3 flex items-top justify-center">
              <p className="text-gray-500">{t("noGroups")}</p>
            </div>
          )}
          {isOver && (
            <div className="row-start-2 col-span-3 flex items-top justify-center">
              <p className="text-gray-500">{t("dropHere")}</p>
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
}
