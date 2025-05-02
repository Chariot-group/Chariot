"use client"

import { Header } from "@/components/common/Header";
import Loading from "@/components/common/Loading";
import CharacterListPanel from "@/components/modules/characters/CharacterListPanel";
import { CharacterDetailsPanel } from "@/components/modules/characters/panelSections/CharacterDetailsPanel";
import GroupDetailsPanel from "@/components/modules/groups/GroupDetailsPanel";
import GroupListPanel from "@/components/modules/groups/GroupListPanel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/useToast";
import { ICampaign } from "@/models/campaigns/ICampaign";
import ICharacter from "@/models/characters/ICharacter";
import { IGroup } from "@/models/groups/IGroup";
import CampaignService from "@/services/campaignService";
import CharacterService from "@/services/CharacterService";
import GroupService from "@/services/groupService";
import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react";

export default function CampaignGroupsPage() {

    const [loading, setLoading] = useState<boolean>(false);

    const t = useTranslations('GroupPage');
    const { error } = useToast();

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
            await setGroupSelected(groupTempRef.current);
            setIsUpdating(false);
            setLoading(false);
        }
    }

    const updateGroup = useCallback(
        async (updateGroup: IGroup) => {
        try {
            if(!updateGroup._id) return;
            const { campaigns, ...group } = updateGroup;
            let response = await GroupService.updateGroup(updateGroup._id, group);

            characterTempRef.current.forEach(async (character, key) => {
                console.log("character", character);
                await CharacterService.updateCharacter(key, character);
            });

            setGroupSelected(response.data);
            setIsUpdating(false);
            
        } catch (err) {
            error(t("error"));
            console.error("Error updating characters:", error);
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

    const { campaignId } = useParams();

    const createCharacter = useCallback(
        async (createCharacter: Partial<ICharacter>) => {
            try {
                let response = await CharacterService.createCharacter(createCharacter);
                let character: ICharacter = response.data;
                setGroupSelected((prev) => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        characters: [...prev.characters, character._id]
                    }
                });
                setNewCharacter(character);
            } catch (err) {
                error(t("error"));
                console.error("Error fetching characters:", error);
            }
        },
        []
    );

    const deleteCharacter = useCallback(
        async (deleteCharacter: Partial<ICharacter>) => {
            try {
                await CharacterService.deleteCharacter(deleteCharacter._id);
                setGroupSelected((prev) => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        characters: prev.characters.filter((character) => character !== deleteCharacter._id)
                    }
                });
            } catch (err) {
                error(t("error"));
                console.error("Error fetching characters:", error);
            }
        }, []
    );

    const deleteGroup = useCallback(
        async (deleteGroup: IGroup) => {
            try {
                await GroupService.deleteGroup(deleteGroup._id);
                setGroupSelected((prev) => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        deletedAt: new Date()
                    }
                });
            } catch (err) {
                error(t("error"));
                console.error("Error fetching characters:", error);
            }
        }, []
    );

    const findCampaign = useCallback(
        async (campaignId: string) => {
            try {
                let response = await CampaignService.findOne(campaignId);
                setCampaign(response.data);
            } catch (err) {
                error(t("error"));
                console.error("Error fetching characters:", error);
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

    const addCharacter = (idGroup: string) => {
        const newCharacter: Partial<ICharacter> = {
            "name": "Goblin",
            "classification": {
                "type": "humanoid",
                "subtype": "goblinoid",
                "alignment": "neutral evil",
                "size": "Small"
            },
            "stats": {
                "maxHitPoints": 7,
                "currentHitPoints": 3,
                "tempHitPoints": 5,
                "hitDice": "2d6",
                "armorClass": 15,
                "speed": {
                    "walk": 30,
                },
                "abilityScores": {
                    "strength": 8,
                    "dexterity": 14,
                    "constitution": 10,
                    "intelligence": 10,
                    "wisdom": 8,
                    "charisma": 8
                },
                "savingThrows": {
                    "dexterity": 4,
                    "constitution": 2,
                    "intelligence": 2,
                    "wisdom": 1,
                    "charisma": 1,
                    "strength": 0
                },
                "skills": {
                    "stealth": 6,
                    "perception": 1,
                    "deception": 1,
                    "arcana": 2,
                    "athletics": 0,
                    "history": 2,
                    "insight": 1,
                    "intimidation": 1,
                    "investigation": 2,
                    "medicine": 1,
                    "nature": 2,
                    "performance": 1,
                    "persuasion": 1,
                    "religion": 2,
                    "sleightHand": 6,
                    "survival": 1,
                    "animalHandling": 1,
                    "acrobatics": 4
                },
                "senses": {
                    "darkvision": 60,
                    "passivePerception": 9
                },
            },
            "combat": {
                "challengeRating": 0.25,
                "experiencePoints": 50,
                "resistances": [],
                "immunities": [],
                "vulnerabilities": []
            },
            "traits": [
                {
                    "languages": [
                        "Common",
                        "Goblin"
                    ],
                    "abilities": [
                        {
                            "name": "Nimble Escape",
                            "description": "The goblin can take the Disengage or Hide action as a bonus action on each of its turns."
                        }
                    ]
                }
            ],
            "actions": [
                {
                    "standard": [
                        {
                            "name": "Scimitar",
                            "type": "melee",
                            "attackBonus": 4,
                            "damage": {
                                "dice": "1d6",
                                "type": "slashing"
                            },
                            "range": "5 feet"
                        },
                        {
                            "name": "Shortbow",
                            "type": "ranged",
                            "attackBonus": 4,
                            "damage": {
                                "dice": "1d6",
                                "type": "piercing"
                            },
                            "range": "80/320 feet"
                        }
                    ],
                    "legendary": [],
                    "lair": []
                }
            ],
            "groups": [
                idGroup
            ]
        };
        createCharacter(newCharacter);
    }

    return (
        <div className="w-full flex flex-col">
            <Header campaign={campaign} />
            <main className="h-full flex flex-row">
                <div className="w-[15%]">
                    <GroupListPanel search={search} setSearch={setSearch} idCampaign={campaignId?.toString() ?? ""} groupSelected={groupSelected} setGroupSelected={setGroupSelected} groups={groups} setGroups={setGroups} />
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
                                <GroupDetailsPanel group={groupSelected} setGroup={setGroupSelected} campaign={campaign} onDelete={deleteGroup} isUpdating={isUpdating} />
                            </div>
                            <div className="w-full justify-center flex flex-row">
                                <div className="w-[90%] border border-ring"></div>
                            </div>
                            <div className="w-full h-[6vh] flex flex-row justify-between items-center pr-5 pl-5">
                                <span className="text-2xl text-foreground">{t("yourCharacters")}</span>
                                <Button onClick={() => addCharacter(groupSelected._id)}>{t("addCharacter")}</Button>
                            </div>
                            <div className="h-[55vh] w-full flex flex-row pl-5 pr-5 gap-5">
                                <Card className="w-[20%] ">
                                    <CharacterListPanel 
                                        group={groupSelected}
                                        characterSelected={characterSelected}
                                        setCharacterSelected={setCharacterSelected} />
                                </Card>
                                {
                                    characterSelected && (
                                        <CharacterDetailsPanel onDelete={deleteCharacter} setCharacter={setCharacterSelected} character={characterSelected} isUpdating={isUpdating} characterTempRef={characterTempRef} />
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </main>
            <footer className="absolute bottom-0 w-full flex flex-row justify-end items-left">
                {
                    isUpdating && groupSelected && (
                        <div>
                            <Button variant={"outline"} onClick={cancelUpdate} className="mr-5 mb-2" >Annuler</Button>
                            <Button variant={"secondary"} onClick={() => updateGroup(groupSelected)} className="mr-5 mb-2" >Sauvegarder</Button>
                        </div>
                    )
                }
                {
                    !isUpdating && groupSelected && (
                        <Button variant={"secondary"} onClick={startUpdate} className="mr-5 mb-2" >Modifier</Button>
                    )
                }
            </footer>
        </div>
    );
}