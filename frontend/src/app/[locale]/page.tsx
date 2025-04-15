"use client";
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import { useState } from "react";
import CampaignListPanel from "@/components/modules/campaigns/CampaignListPanel";
import { ICampaign } from "@/models/campaigns/ICampaign";
import { Header } from "@/components/common/Header";

export default function Home() {
  const [selectedCampaign, setSelectedCampaign] = useState<ICampaign | null>(null);

  return (
    <div>
      <Header campaign={selectedCampaign} />
      <main className="flex flex-col mt-5">
        <LocaleSwitcher />
        <div className="flex flex-row">
          <div className="w-1/4 h-[100vh] bg-card">
            <CampaignListPanel
              offset={15}
              selectedCampaign={selectedCampaign}
              setSelectedCampaign={setSelectedCampaign}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
