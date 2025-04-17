import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { ICampaign } from "@/models/campaigns/ICampaign";
import { useEffect } from "react";
import Link from "next/link";
import LocaleSwitcher from "../locale/LocaleSwitcher";
import { useParams } from "next/navigation";

interface HeaderProps {
  campaign: ICampaign | null;
}
export function Header({ campaign }: HeaderProps) {
  const t = useTranslations("Header");
  const { campaignId } = useParams();

  return (
    <header className="text-white p-4 bg-card border-b-2 border-ring shadow-md">
      <div className="flex justify-between items-center">
        {campaignId && (
          <Button>
            <Link href={`/campaigns/${campaignId}/battle`}>
              {t("launchBattle")}
            </Link>
          </Button>
        )}
        {!campaignId && <div className="w-1/12"></div>}
        <h1 className="text-foreground text-2xl font-bold">{`${t("home")} ${
          campaign ? `- ${campaign.label}` : ""
        }`}</h1>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
