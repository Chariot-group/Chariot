"use client";
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import CharacterListPanel from "@/components/modules/characters/CharacterListPanel";
import GroupListPanel from "@/components/modules/groups/GroupListPanel";
import { IGroup } from "@/models/groups/IGroup";
import ICharacter from "@/models/characters/ICharacter";
import { useState } from "react";
import CampaignListPanel from "@/components/modules/campaigns/CampaignListPanel";
import { ICampaign } from "@/models/campaigns/ICampaign";
import { CharacterDetailsPanel } from "@/components/modules/characters/panelSections/CharacterDetailsPanel";
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
