"use client"

import { Header } from "@/components/common/Header";
import Loading from "@/components/common/Loading";
import CharacterListPanel from "@/components/modules/characters/CharacterListPanel";
import GroupDetailsPanel from "@/components/modules/groups/GroupDetailsPanel";
import GroupListPanel from "@/components/modules/groups/GroupListPanel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useBeforeUnload from "@/hooks/useBeforeUnload";
import { useToast } from "@/hooks/useToast";
import { ICampaign } from "@/models/campaigns/ICampaign";
import ICharacter from "@/models/characters/ICharacter";
import { IGroup } from "@/models/groups/IGroup";
import CampaignService from "@/services/campaignService";
import CharacterService from "@/services/CharacterService";
import GroupService from "@/services/groupService";
import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function CampaignGroupsPage() {

    const [loading, setLoading] = useState<boolean>(false);

    const t = useTranslations('GroupPage');
    const { success, error } = useToast();

    //Recherche
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') ?? "");

    //Update
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    let groupTempRef = useRef<IGroup | null>(null);
    let characterTempRef = useRef<Map<string, ICharacter>>(new Map());

    const startUpdate = () => {
        if (groupSelected) {
            groupTempRef.current = groupSelected;
            setIsUpdating(true);
        }
    }

    const cancelUpdate = async () => {
        if (groupSelected) {
            setLoading(true);
            removedCharacterRef.current = [];
            newCharacterRef.current = [];
            await setGroupSelected(groupTempRef.current);
            setIsUpdating(false);
            setLoading(false);
            success(t("toasts.cancel"));
        }
    }

    const saveAction = async () => {
        if (groupSelected) {
            //Enlever les personnages supprimés de characterTempRef
            characterTempRef.current.forEach((character, key) => {
                if (removedCharacterRef.current.includes(character._id ?? "")) {
                    characterTempRef.current.delete(key);
                }
            });
            //Enlever les personnages ajoutés de characterTempRef
            newCharacterRef.current.forEach((character) => {
                if (characterTempRef.current.has(character._id ?? "")) {
                    characterTempRef.current.delete(character._id ?? "");
                }
            });
            characterTempRef.current.forEach(async (character, key) => {
                await CharacterService.updateCharacter(key, character);
            });
            await updateGroup(groupSelected);
            removedCharacterRef.current.forEach(async (characterId) => {
                await CharacterService.deleteCharacter(characterId);
            });
            newCharacterRef.current.forEach(async (character) => {
                const { _id, ...characterWithoutId } = character;
                await CharacterService.createCharacter(characterWithoutId);
            });
            removedCharacterRef.current = [];
            newCharacterRef.current = [];
            characterTempRef.current.clear();
            setIsUpdating(false);
            success(t("toasts.save"));
        }
    }

    const updateGroup = useCallback(
        async (updateGroup: IGroup) => {
            try {
                if(!updateGroup._id) return;
                const { campaigns, characters, ...group } = updateGroup;
                let response = await GroupService.updateGroup(updateGroup._id, group);

                setGroupSelected(response.data);
                setGroups((prev) => {
                    return prev.map((group) => {
                        if (group._id === response.data._id) {
                            return {
                                ...group,
                                label: response.data.label,
                            }
                        }
                        return group;
                    });
                });
            } catch (err) {
                error(t("toasts.errorGroup"));
            }
        },
        []
    );

    //Character
    const [groupSelected, setGroupSelected] = useState<IGroup | null>(null);
    const [characterSelected, setCharacterSelected] = useState<ICharacter | null>(null);
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [campaign, setCampaign] = useState<ICampaign | null>(null);
    const [newCharacter, setNewCharacter] = useState<ICharacter | null>(null);

    let newCharacterRef = useRef<Partial<ICharacter>[]>([]);
    let removedCharacterRef = useRef<string[]>([]);

    const { campaignId } = useParams();

    const createCharacter = useCallback(
        async (createCharacter: Partial<ICharacter>) => {
            try {
                createCharacter._id = createCharacter.name;
                newCharacterRef.current.push(createCharacter);
                let character: ICharacter = createCharacter as ICharacter;
                await setGroupSelected((prev) => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        characters: [...prev.characters, character._id]
                    }
                });
                await setNewCharacter(character);
            } catch (err) {
                error(t("toasts.errorCreateCharacter"));
            }
        },
        []
    );

    const deleteCharacter = useCallback(
        async (deleteCharacter: Partial<ICharacter>) => {
            try {
                removedCharacterRef.current.push(deleteCharacter._id ?? "");
                await setGroupSelected((prev) => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        characters: prev.characters.filter((character) => character !== deleteCharacter._id)
                    }
                });
            } catch (err) {
                error(t("toasts.errorDeleteCharacter"));
            }
        }, []
    );

    const deleteGroup = useCallback(
        async (deleteGroup: IGroup) => {
            try {
                await GroupService.deleteGroup(deleteGroup._id);
                setGroups((prev) => {
                    return prev.filter((group) => group._id !== deleteGroup._id);
                });
                setGroupSelected(groups[0] ?? null);
                success(t("toasts.groupDeleted"));
            } catch (err) {
                error(t("toasts.errorDeleteGroup"));
            }
        }, []
    );

    const findCampaign = useCallback(
        async (campaignId: string) => {
            try {
                let response = await CampaignService.findOne(campaignId);
                setCampaign(response.data);
            } catch (err) {
                error(t("toasts.errorFindCampaign"));
            }
        }, []
    );

    useEffect(() => {
        if(!campaignId) return;
        findCampaign(campaignId.toString());
    }, []);

    useEffect(() => {
        if(newCharacter) {
            setCharacterSelected(newCharacter);
            setNewCharacter(null);
        }
    }, [characterSelected]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Enter' && isUpdating) {
            saveAction();
            return;
          }
    
          if (event.key === 'Escape' && isUpdating) {
            cancelUpdate();
            return;
          }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isUpdating, groupSelected]);

    const addCharacter = (idGroup: string) => {
        //createCharacter(newCharacter);
    }

    useBeforeUnload(isUpdating, t("form.unsave"));

    return (
        <div className="w-full flex flex-col">
            <Header campaign={campaign} />
            <main className="h-full flex flex-row">
                <div className="w-[15%]">
                    <GroupListPanel search={search} setSearch={setSearch} idCampaign={campaignId?.toString() ?? ""} groupSelected={groupSelected} setGroupSelected={setGroupSelected} groups={groups} setGroups={setGroups} changeLabel={() => { } } updatedGroup={[]} />
                </div>
                <div className="h-[90vh] justify-center flex flex-col">
                    <div className="h-[80vh] border border-ring"></div>
                </div>
                {
                    loading && (
                        <Loading />
                    )
                }
                {
                    !loading && groupSelected && campaign && (
                        <div className="w-[85%] h[100vh] flex flex-col">
                            <div className="w-full">
                                <GroupDetailsPanel group={groupSelected} setGroup={setGroupSelected} onDelete={deleteGroup} isUpdating={isUpdating} startUpdate={startUpdate} saveActions={saveAction} cancelUpdate={cancelUpdate} />
                            </div>
                            <div className="w-full justify-center flex flex-row">
                                <div className="w-[90%] border border-ring"></div>
                            </div>
                            <div className="h-[55vh] w-full flex flex-row pl-5 pr-5 gap-5">
                                <CharacterListPanel 
                                        newCharacters={newCharacterRef}
                                        removeCharacters={removedCharacterRef}
                                        isUpdating={isUpdating}
                                        group={groupSelected}
                                        characterSelected={characterSelected}
                                        setCharacterSelected={setCharacterSelected}
                                        addCharacter={addCharacter} />
                                
                            </div>
                        </div>
                    )
                }
            </main>
        </div>
    );
}