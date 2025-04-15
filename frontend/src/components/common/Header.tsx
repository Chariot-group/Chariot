import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { ICampaign } from "@/models/campaigns/ICampaign";
import { useEffect } from "react";
import LocaleSwitcher from "../locale/LocaleSwitcher";

interface HeaderProps {
  campaign: ICampaign | null;
}
export function Header({ campaign }: HeaderProps) {

    const t = useTranslations("Header");

    return (
        <header className="text-white p-4 bg-card border-b-2 border-ring shadow-md">
            <div className="flex justify-between items-center">
                <Button >{t("launchBattle")}</Button>
                <h1 className="text-foreground text-2xl font-bold">{`${t("home")} ${campaign ? `- ${campaign.label}` : ""}`}</h1>
                <LocaleSwitcher />
            </div>
        </header>
    );
}