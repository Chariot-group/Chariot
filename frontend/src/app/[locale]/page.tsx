"use client";
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import { useState } from "react";
import CampaignListPanel from "@/components/modules/campaigns/CampaignListPanel";
import { ICampaign } from "@/models/campaigns/ICampaign";
<<<<<<< HEAD
import { CharacterDetailsPanel } from "@/components/modules/characters/panelSections/CharacterDetailsPanel";
import CampaignDetailsPanel from "@/components/modules/campaigns/CampaignDetailsPanel";

export default function Home() {
  const [group, setGroupSelected] = useState<IGroup | null>(null);

  const [character, setCharacterSelected] = useState<ICharacter | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<ICampaign | null>(null);

  return (
    <div className="flex flex-col">
      <LocaleSwitcher />
      <div className="flex flex-row">
        <div className="w-1/4 h-[100vh] bg-card">
          <CampaignListPanel
            offset={15}
            selectedCampaign={selectedCampaign}
            setSelectedCampaign={setSelectedCampaign}
          />
        </div>
        {
          selectedCampaign && (
            <div className="w-1/4 h-[100vh] w-full">
              <CampaignDetailsPanel
                campaign={selectedCampaign}
                setCampaign={setSelectedCampaign}
              />
            </div>
          )}
      </div>
=======
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
>>>>>>> origin/develop
    </div>
  );
}
