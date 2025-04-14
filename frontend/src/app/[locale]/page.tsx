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
    </div>
  );
}
