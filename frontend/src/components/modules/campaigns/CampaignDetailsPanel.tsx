"use client";

import DeleteValidation from "@/components/common/modals/DeleteValidation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useToast";
import { ICampaign } from "@/models/campaigns/ICampaign";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface CampaignDetailsPanelProps {
    campaign: ICampaign;
    setCampaign: (campaign: ICampaign) => void;
    onDelete: (campaign: ICampaign) => void;
    isUpdating: boolean;
} 
export default function CampaignDetailsPanel({ campaign, setCampaign, onDelete, isUpdating }: CampaignDetailsPanelProps) {

    const t = useTranslations("CampaignDetails");

    const [description, setDescription] = useState<string>(campaign.description);

    useEffect(() => {
        setDescription(campaign.description);
    }, [campaign]);

    useEffect(() => {
        setCampaign({
            ...campaign,
            description: description
        });
    }, [description]);

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col w-full gap-3 p-5">
            <DeleteValidation isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title={t("modal.title")} message={t("modal.description")} confirmMessage={t("modal.confirm")} onConfirm={() => onDelete(campaign)}  />
            <div className="w-full">
                <div className="w-full flex justify-between items-center">
                    <Label htmlFor={"description"} className="text-foreground">{t("labels.description")}</Label>
                    <Button variant={"link"} onClick={() => setDeleteModalOpen(true)}>{t("actions.delete")}</Button>
                </div>
                <Textarea readOnly={!isUpdating} className="h-[10dvh] bg-card" placeholder={t("placeholders.description")} value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
        </div>
    );

}