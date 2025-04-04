"use client";
import CampaignListPanel from "@/components/modules/campaigns/CampaignListPanel";
import HealthCheck from "@/components/modules/monitoring/HealthCheck";
import { useToast } from "@/hooks/useToast";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  const { success, error, info, warning } = useToast();
  return (
    <div>
      <HealthCheck />
      <h1>{t("title")}</h1>
      <p>{t("about")}</p>
      <button onClick={() => success("C'est un message de succès !")}>
        Afficher un toast de succès
      </button>
      <button onClick={() => error("C'est un message d'erreur !")}>
        Afficher un toast d'erreur
      </button>
      <button onClick={() => info("C'est un message d'information !")}>
        Afficher un toast d'information
      </button>
      <button onClick={() => warning("C'est un message d'avertissement !")}>
        Afficher un toast d'avertissement
      </button>
      <div className="w-1/4">
        <CampaignListPanel />
      </div>
    </div>
  );
}
