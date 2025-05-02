"use client"

import { Header } from "@/components/common/Header";
import Loading from "@/components/common/Loading";
import CampaignDetailsPanel from "@/components/modules/campaigns/CampaignDetailsPanel";
import CampaignListPanel from "@/components/modules/campaigns/CampaignListPanel";
import GroupsCampaignsPanel from "@/components/modules/campaigns/GroupsCampaignsPanel";
import { Button } from "@/components/ui/button";
import useBeforeUnload from "@/hooks/useBeforeUnload";
import { useToast } from "@/hooks/useToast";
import { ICampaign, ICampaignUpdated } from "@/models/campaigns/ICampaign";
import { IGroup } from "@/models/groups/IGroup";
import CampaignService from "@/services/campaignService";
import GroupService from "@/services/groupService";
import { group } from "console";
import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { use, useCallback, useEffect, useRef, useState } from "react";

export default function CampaignsPage() {

    const [selectedCampaign, setSelectedCampaign] = useState<ICampaign | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const t = useTranslations("CampaignPage");
    const { error } = useToast();

    //Recherche
    const searchParams = useSearchParams()
    const [search, setSearch] = useState(searchParams.get('search') ?? "");

    //Update
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    let campaignTempRef = useRef<ICampaign | null>(null);
    let newGroupRef = useRef<any[]>([]);
    let groupsRef = useRef<Map<string, { idCampaign: string; type: "main" | "npc" | "archived"; }>>(new Map());

    const startUpdate = () => {
        if (selectedCampaign) {
            campaignTempRef.current = selectedCampaign;
            setIsUpdating(true);
        }
    }

    const cancelUpdate = async () => {
        if (selectedCampaign) {
            setLoading(true);
            await setSelectedCampaign(campaignTempRef.current);
            setIsUpdating(false);
            setLoading(false);
        }
    }

    const saveActions = async () => {
        if (selectedCampaign) {
            updateCampaign(selectedCampaign);

            newGroupRef.current.forEach(async (group) => {
                await GroupService.createGroup(group);
            });
        }
    }

    const updateCampaign = useCallback(
        async (updateCampaign: Partial<ICampaign>) => {
          try {
            if(!updateCampaign._id) return;
            let response = await CampaignService.updateCampaign(updateCampaign._id, updateCampaign);

            groupsRef.current.forEach(async (campaigns, key) => {
                await GroupService.updateGroup(key, {
                    campaigns: [campaigns],
                });
            });

            let data = response.data;
            response.data.groups = {
                archived: data.groups.archived.map((group: { _id: any; }) => group._id),
                npc: data.groups.npc.map((group: { _id: any; }) => group._id),
                main: data.groups.main.map((group: { _id: any; }) => group._id),
            };

            setSelectedCampaign(data as ICampaign);
            setIsUpdating(false);
          } catch (err) {
            error(t("errors"));
            console.error("Error updating characters:", err);
          }
        },
        []
    );

    const deleteCampaign = useCallback(async (deletedCampaign: ICampaign) => {
        try {
            await CampaignService.deleteCampaign(deletedCampaign._id);
            setSelectedCampaign((prev) => {
                if (prev) {
                    return {
                        ...prev,
                        deletedAt: new Date(),
                    };
                }
                return prev;
            });
        } catch(err){
            error(t("error"));
        }
    }, []);

    useBeforeUnload(isUpdating, t("form.unsave"));

    return (
        <div className="w-full flex flex-col">
            <Header campaign={selectedCampaign} />
            <main className="h-full flex flex-row">
                <div className="w-1/4">
                    <CampaignListPanel search={search} setSearch={setSearch} selectedCampaign={selectedCampaign} setSelectedCampaign={setSelectedCampaign} />
                </div>
                <div className="h-[90vh] justify-center flex flex-col">
                    <div className="h-[80vh] border border-ring"></div>
                </div>
                <div className="w-full">
                    <div className="w-full h-full flex flex-row justify-center items-center">
                       {loading && (
                            <Loading />
                            )
                        } 
                        {!loading && selectedCampaign && (
                            <div className="flex flex-col justify-start items-center w-full h-full">
                                <div className="w-full flex flex-col">
                                    <CampaignDetailsPanel campaign={selectedCampaign} setCampaign={setSelectedCampaign} onDelete={deleteCampaign} isUpdating={isUpdating} />
                                </div>
                                <div className="w-[90vh] flex flex-col">
                                    <div className="w-[80vh] border border-ring"></div>
                                </div>
                                <div className="w-full h-full flex flex-row items-center p-5">
                                    <GroupsCampaignsPanel idCampaign={selectedCampaign._id} isUpdating={isUpdating} groupsRef={groupsRef} newGroupRef={newGroupRef} />
                                </div>
                            </div>
                        )} 
                        { !loading && !selectedCampaign && (
                            <div className="flex flex-col gap-10 justify-center items-center h-full">
                                <span className="w-full">{t("tutorial.step1")}</span>
                                <span className="w-full">{t("tutorial.step2")}</span>
                                <span className="w-full">{t("tutorial.step3")}</span>
                                <span className="w-full">{t("tutorial.step4")}</span>
                                <span className="w-full">{t("tutorial.step5")}</span>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <footer className="absolute bottom-0 w-full flex flex-row justify-end items-left">
                {
                    isUpdating && selectedCampaign && (
                        <div>
                            <Button variant={"outline"} onClick={cancelUpdate} className="mr-5 mb-2" >{t('form.cancel')}</Button>
                            <Button variant={"secondary"} onClick={() => saveActions} className="mr-5 mb-2" >{t('form.save')}</Button>
                        </div>
                    )
                }
                {
                    !isUpdating && selectedCampaign && (
                        <Button variant={"secondary"} onClick={startUpdate} className="mr-5 mb-2" >{t('form.update')}</Button>
                    )
                }
            </footer>
        </div>
    );
}