"use client"

import { Header } from "@/components/common/Header";
import CampaignDetailsPanel from "@/components/modules/campaigns/CampaignDetailsPanel";
import CampaignListPanel from "@/components/modules/campaigns/CampaignListPanel";
import GroupsCampaignsPanel from "@/components/modules/campaigns/GroupsCampaignsPanel";
import { useToast } from "@/hooks/useToast";
import { ICampaign } from "@/models/campaigns/ICampaign";
import CampaignService from "@/services/campaignService";
import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function CampaignsPage() {

    const [selectedCampaign, setSelectedCampaign] = useState<ICampaign | null>(null);

    const t = useTranslations("CampaignPage");
    const { error } = useToast();

    const searchParams = useSearchParams()

    const [search, setSearch] = useState(searchParams.get('search') ?? "");

    const deleteCampaign = useCallback(async (deletedCampaign: ICampaign) => {
        try {
            const response = await CampaignService.deleteCampaign(deletedCampaign._id);
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
    }, [])

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
                        {selectedCampaign ? (
                            <div className="flex flex-col justify-start items-center w-full h-full">
                                <div className="w-full flex flex-col">
                                    <CampaignDetailsPanel campaign={selectedCampaign} setCampaign={setSelectedCampaign} onDelete={deleteCampaign} />
                                </div>
                                <div className="w-[90vh] flex flex-col">
                                    <div className="w-[80vh] border border-ring"></div>
                                </div>
                                <div className="w-full h-full flex flex-row items-center p-5">
                                    <GroupsCampaignsPanel idCampaign={selectedCampaign._id} />
                                </div>
                            </div>
                        ) : (
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
        </div>
    );
}