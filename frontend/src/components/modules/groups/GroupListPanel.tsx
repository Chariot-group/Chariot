"use client"

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
import { Grip } from "lucide-react";
import { group } from "console";
import { Button } from "@/components/ui/button";

interface Props {
    offset?: number; // Nombre de groupes à afficher par page
    idCampaign: string; // ID de la campagne des groupes
    groupSelected: IGroup | null; // Groupe selectionné
    setGroupSelected: (group: IGroup | null) => void; // Fonction pour mettre à jour le groupe selectionné
    reverse?: boolean; // Si vrai, les couleurs de fond sont inversé
    type?: "all" | "main" | "npc" | "archived"; // Titre de groupe à afficher
    grabbled?: boolean; // Si vrai, le curseur est en mode grab et une icône de grip est affichée
    addable?: boolean; // Si vrai, le bouton d'ajout de groupe est affiché
}
export default function GroupListPanel({ offset = 8, idCampaign, groupSelected, setGroupSelected, reverse = false, type = "all", grabbled = false, addable = true }: Props) {

    const currentLocal = useLocale();
    const t = useTranslations('GroupListPanel');
    const { error } = useToast();

    const [groups, setGroups] = useState<IGroup[]>([]);
    const [newGroup, setNewGroup] = useState<IGroup | null>(null);

    //Pagination
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    //Infinite scroll
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

    const fetchGroups = useCallback(async (search: string, nextPage = 1, reset = false) => {
        if(loading) return;
        setLoading(true);
        try {
            const response = await GroupService.getAllGroups(
              {
                page: nextPage,
                offset,
                label: search,
                type,
              }, idCampaign);
            if(reset) {
                setGroups(response.data || []);
                setGroupSelected(response.data[0]);
            }else {
                setGroups((prev) => {
                  //Fix un bug surement dû au seeder.
                    return [...prev, ...response.data.filter((newGroup: { _id: string; }) => !prev.some(existingGroup => existingGroup._id === newGroup._id))];
                });
            }
            setPage(nextPage);
        } catch(err){
            error(t("error"));
        } finally {
            setLoading(false);
        }
    }, [loading, groupSelected?.deletedAt])

    const createGroup = useCallback(async () => {
      try {
          const response = await GroupService.createGroup({label: "Nouveau groupe", description: "", campaigns: [{idCampaign, type: "npc"}]});
          setNewGroup(response.data);
          fetchGroups(search, 1, true);
      } catch(err){
          error(t("error"));
      } finally {
          setLoading(false);
      }
  }, [])

    useEffect(() => {
      console.log("newGroup", newGroup);
      console.log("selected", groupSelected);
      if(newGroup) {
        setGroupSelected(newGroup);
        setNewGroup(null);
      }
    }, [groupSelected]);

    useInfiniteScroll(containerRef, fetchGroups, page, loading, search);

    useEffect(() => {
        setGroups([]);
        fetchGroups(search, 1, true);
    }, [currentLocal, search, groupSelected?.deletedAt]);

    return (
      <div className="w-full h-full flex flex-col">
        <CardHeader className="flex-none h-auto items-center gap-3">
          <CardTitle className="text-foreground font-bold">{t(type === "all" ? "title.default" : `title.${type}`)}</CardTitle>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={t("search")}
            reverse={reverse}
          />
        </CardHeader>
        <CardContent ref={containerRef} className="flex-1 h-auto overflow-auto scrollbar-hide">
            <div className="flex flex-col gap-3">
              {addable && 
              <Button onClick={() => createGroup()}>
                <span className="text-background font-bold">{t("create")}</span>
              </Button>}
              {loading && <Loading />}
              {groups.length > 0  &&
                groups.map((group) => (
                  <Card key={group._id} className={`cursor-pointer flex p-2 gap-3 border-ring shadow-md hover:border-2 ${reverse ? "bg-background" : "bg-card"} ${grabbled ? "justify-between cursor-grab" : "justify-center"} ${groupSelected?._id === group._id ? "border-2" : "border"}`} onClick={() => setGroupSelected(group)}>
                    <span className="text-foreground font-bold">{group.label}</span>
                    {grabbled && <Grip />}
                  </Card>
                ))
              }
              {groups.length === 0 && !loading && (
                <div className="row-start-2 col-span-3 flex items-top justify-center">
                  <p className="text-gray-500">{t("noGroups")}</p>
                </div>
              )}
            </div>
          </CardContent>
    </div>
    );
}