"use client";

import Field from "@/components/common/Field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useToast";
import { ICampaign } from "@/models/campaigns/ICampaign";
import { IGroup } from "@/models/groups/IGroup";
import CampaignService from "@/services/campaignService";
import GroupService from "@/services/groupService";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface CampaignDetailsPanelProps {
    campaign: ICampaign;
    setCampaign: (campaign: ICampaign) => void;
} 
export default function CampaignDetailsPanel({ campaign, setCampaign }: CampaignDetailsPanelProps) {

    const t = useTranslations("CampaignDetails");
    const { error } = useToast();

    const [description, setDescription] = useState<string>(campaign.description);

    const cancelRef = useRef<boolean>(false);
    

    useEffect(() => {
        cancelRef.current = true;
        setDescription(campaign.description);
        // Attendre que le composant soit monté avant de mettre à jour le state
        (async () => {
            await new Promise(resolve => setTimeout(resolve, 1));
            cancelRef.current = false;
        }
        )();
    }, [campaign]);

    const updateCampaign = useCallback(
        async (updateCampaign: Partial<ICampaign>) => {
          try {
            let response = await CampaignService.updateCampaign(campaign._id, updateCampaign);
            campaign = response.data;
          } catch (err) {
            error(t("errors"));
            console.error("Error fetching characters:", err);
          }
        },
        []
    );

    const onChange = () => {
        campaign.description = description;
        updateCampaign(campaign);
    }

    useEffect(() => {
        if (cancelRef.current) return;
        onChange();
    }, [description]);

    return (
        <div className="flex flex-col h-full gap-3 p-5">
            <div className="w-full">
                <div className="w-full flex justify-between items-center">
                    <Label htmlFor={"description"} className="text-foreground">{t("labels.description")}</Label>
                    <Button variant={"link"}>{t("actions.delete")}</Button>
                </div>
                <Textarea className="h-[10dvh] bg-card" placeholder={t("placeholders.description")} value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
        </div>
    );

}