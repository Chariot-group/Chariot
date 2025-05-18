"use client";
import Loading from "@/components/common/Loading";
import SearchInput from "@/components/common/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useToast } from "@/hooks/useToast";
import ICharacter from "@/models/characters/ICharacter";
import { IGroup } from "@/models/groups/IGroup";
import CharacterService from "@/services/CharacterService";
import { Plus, PlusCircleIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { RefObject, use, useCallback, useEffect, useRef, useState } from "react";
import { NPCCard, PlayerCard } from "./CharacterCard";
import IPlayer from "@/models/player/IPlayer";
import INpc from "@/models/npc/INpc";
import CharacterModal from "./CharacterModal";
import { set } from "react-hook-form";

interface ICharacterListPanelProps {
  offset?: number;
  characterSelected: ICharacter | null;
  setCharacterSelected: (group: ICharacter | null) => void;
  group: IGroup;
  isUpdating: boolean;
  removeCharacters: RefObject<string[]>;
  newCharacters: RefObject<Partial<ICharacter>[]>;
  addCharacter: (groupId: string) => void;
  deleteCharacter: (character: ICharacter) => void;
  updateCharacter: (character: ICharacter) => void;
  updateCharacters: RefObject<ICharacter[]>;
}
const CharacterListPanel = ({ offset = 8, characterSelected, setCharacterSelected, group, isUpdating, removeCharacters, newCharacters, addCharacter, deleteCharacter, updateCharacter, updateCharacters }: ICharacterListPanelProps) => {
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
  }, [currentLocale, search, group._id]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const selectCharacter = (character: ICharacter) => {
    // Vérifie si le character est dans updateCharacters
    if (updateCharacters.current?.some((c) => c._id === character._id)) {
      setCharacterSelected(updateCharacters.current.find((c) => c._id === character._id) as ICharacter);
      setModalIsOpen(true);
      return;
    }
    setCharacterSelected(character);
    setModalIsOpen(true);
  }

  useEffect(() => {
    if (updateCharacters.current && updateCharacters.current.length > 0) {
      setCharacters((prev) => {
        // Remplace les characters existants par ceux d'updateCharacters si même _id, sinon garde l'existant
        const updated = prev.map((char) => {
          const found = updateCharacters.current?.find((c) => c._id === char._id);
          return found ? found : char;
        });
        return [...updated];
      });
    }
  }, [group.characters]);

  return (
    <div className="w-full h-full flex flex-col">
      {characterSelected && <CharacterModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} character={characterSelected} updateCharacter={updateCharacter}/>}
      <CardHeader className="relative flex flex-row h-auto items-center">
        <CardTitle className="text-foreground font-bold">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-foreground">{t("title")}</span>
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
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[30dvh]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={t("search")}
          />
        </div>
      </CardHeader>
      <CardContent ref={containerRef} className="flex-1 h-auto overflow-auto scrollbar-hide">
        <div className="grid grid-cols-4 gap-3 items-start">
          {loading && <Loading />}
          {characters.length > 0  &&
            characters.map((character) => character.kind === 'player' ? (
              <PlayerCard  player={character as IPlayer} key={character._id} onClick={() => selectCharacter(character)} isUpdating={isUpdating} removeCharacter={deleteCharacter}></PlayerCard>
            ) : (
              <NPCCard npc={character as INpc} key={character._id} onClick={() => selectCharacter(character)}></NPCCard>
            ))
          }
          {characters.length === 0 && !loading && (
            <div className="row-start-2 col-span-4 flex items-top justify-center">
              <p className="text-gray-500">{t("noCharacters")}</p>
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
};

export default CharacterListPanel;