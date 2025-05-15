"use client";
import Loading from "@/components/common/Loading";
import SearchInput from "@/components/common/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useToast } from "@/hooks/useToast";
import ICharacter from "@/models/characters/ICharacter";
import { IGroup } from "@/models/groups/IGroup";
import CharacterService from "@/services/characterService";
import { Plus, PlusCircleIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";

interface ICharacterListPanelProps {
  offset?: number;
  characterSelected: ICharacter | null;
  setCharacterSelected: (group: ICharacter | null) => void;
  group: IGroup;
  isUpdating: boolean;
  removeCharacters: RefObject<string[]>;
  newCharacters: RefObject<Partial<ICharacter>[]>;
  addCharacter: (groupId: string) => void;
}
const CharacterListPanel = ({ offset = 8, characterSelected, setCharacterSelected, group, isUpdating, removeCharacters, newCharacters, addCharacter }: ICharacterListPanelProps) => {
  const currentLocale = useLocale();
  const t = useTranslations("CharacterListPanel");

  const { error } = useToast();

  const [characters, setCharacters] = useState<ICharacter[]>([]);

  //Pagination
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  //Ref pour le scroll infini
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null); //Ref pour mesurer la hauteur des cards
  const [cardHeight, setCardHeight] = useState(0);

  const fetchCharacters = useCallback(
    async (search: string, nextPage = 1, reset = false) => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await CharacterService.getAllCharacters({
          page: nextPage,
          offset,
          name: encodeURIComponent(search),
        }, group._id);
        if (reset) {
          setCharacters(response.data);
          setCharacterSelected(response.data[0]);
        } else {
          setCharacters((prev) => {
            return [...prev, ...response.data];
          });
        }
        setPage(nextPage);
      } catch (err) {
        error(t("error"));
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading, group._id, group.characters]
  );

  useInfiniteScroll(containerRef, fetchCharacters, page, loading, search);

  //Mesurer la hauteur des cards
  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    if(isUpdating) {
      const updateCharacters = characters.filter((character) => !removeCharacters.current?.includes(character._id));
      //newCharacters en premiere position et seulement si il n'y a pas de doublon
      const newCharactersFiltered = newCharacters.current.filter((character) => !updateCharacters.some((c) => c._id === character._id));
      updateCharacters.unshift(...newCharactersFiltered.map((character) => character as ICharacter));
      let filtered = updateCharacters.filter((character) => character.name.toLowerCase().includes(search.toLowerCase()));
      setCharacters(filtered);
      setCharacterSelected(filtered[0]);
      return;
    }
    setCharacters([]);
    fetchCharacters(search, 1, true);
  }, [currentLocale, search, group]);

  return (
    <div className="w-full h-full flex flex-col">
        <CardHeader className="flex-none h-auto items-center gap-3">
          <CardTitle className="text-foreground font-bold">
            <div className="flex items-center gap-2">
              <p>{t("title")}</p>
              {
                isUpdating && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <PlusCircleIcon className="text-primary hover:cursor-pointer" onClick={() => addCharacter(group._id)} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("addCharacter")}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              }
            </div>
            </CardTitle>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={t("search")}
          />
        </CardHeader>
        <CardContent ref={containerRef} className="flex-1 h-auto overflow-auto scrollbar-hide">
            <div className="flex flex-col gap-3">
              {loading && <Loading />}
              {characters.length > 0  &&
                characters.map((character) => (
                  <Card key={character._id} className={`flex p-2 gap-3 border-ring shadow-md hover:border-2 bg-background ${characterSelected?._id === character._id ? "border-2" : "border"}`} onClick={() => setCharacterSelected(character)}>
                    <span className="text-foreground font-bold">{character.name}</span>
                  </Card>
                ))
              }
              {characters.length === 0 && !loading && (
                <div className="row-start-2 col-span-3 flex items-top justify-center">
                  <p className="text-gray-500">{t("noCharacters")}</p>
                </div>
              )}
            </div>
          </CardContent>
    </div>
  );
};

export default CharacterListPanel;