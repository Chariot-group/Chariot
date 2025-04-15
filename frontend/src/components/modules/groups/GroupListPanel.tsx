"use client";

import { useToast } from "@/hooks/useToast";
import { IGroup } from "@/models/groups/IGroup";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import GroupService from "@/services/groupService";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import SearchInput from "@/components/common/SearchBar";
import Loading from "@/components/common/Loading";
import { useDroppable } from "@dnd-kit/core";
import GroupListPanelItem from "./GroupListPanelItem";

interface Props {
  groups: IGroup[]; // Liste des groupes à afficher
  setGroups: React.Dispatch<React.SetStateAction<IGroup[]>>; // Setter de la liste des groupes
  offset?: number; // Nombre de groupes à afficher par page
  idCampaign: string; // ID de la campagne des groupes
  reverse?: boolean; // Si vrai, les couleurs de fond sont inversé
  type?: "all" | "main" | "npc" | "archived"; // Titre de groupe à afficher
  grabbled?: boolean; // Si vrai, le curseur est en mode grab et une icône de grip est affichée
  addable?: boolean; // Si vrai, le bouton d'ajout de groupe est affiché
}
export default function GroupListPanel({
  groups,
  setGroups,
  offset = 8,
  idCampaign,
  reverse = false,
  type = "all",
  grabbled = false,
  addable = true,
}: Props) {
  const currentLocal = useLocale();
  const t = useTranslations("GroupListPanel");
  const { error } = useToast();

  const { setNodeRef, isOver } = useDroppable({
    id: type, // "main", "npc", etc.
  });

  //Pagination
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
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
            label: search,
            type,
          },
          idCampaign
        );
        if (reset) {
          setGroups(response.data || []);
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
    },
    [loading]
  );

  useInfiniteScroll(cardRef, fetchGroups, page, loading, search);

  useEffect(() => {
    setGroups([]);
    fetchGroups(search, 1, true);
  }, [currentLocal, search]);

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
            <Link href="/groups/add" title={t("create")}>
              <Card className="bg-primary justify-center flex p-2 gap-3 border-ring hover:border-2 hover:border-primary shadow-md">
                <span className="text-background font-bold">{t("create")}</span>
              </Card>
            </Link>
          )}
          {loading && <Loading />}
          {groups.length > 0 &&
            groups.map((group) => (
              <GroupListPanelItem
                key={group._id}
                group={group}
                currentPanelType={type}
                grabbled={grabbled}
                reverse={reverse}
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
