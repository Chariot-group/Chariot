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
import ValidationPopup from "@/components/common/modals/DeleteValidation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [group, setGroupSelected] = useState<IGroup | null>(null);

  const [character, setCharacterSelected] = useState<ICharacter | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<ICampaign | null>(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleConfirm = () => {
    // Action à effectuer après confirmation
    console.log('Action confirmée!');
    // Votre logique ici (envoi de formulaire, suppression, etc.)
  };

  return (
    <div className="flex flex-col">
      <LocaleSwitcher />
      <div className="flex flex-row">
        <Button 
          variant="link"
          onClick={() => setIsPopupOpen(true)}
        >
          Ouvrir la popup de validation
        </Button>
        
        <ValidationPopup 
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          title="Êtes-vous sûr ?"
          message="Voulez-vouis vraiment supprimer cet campagne ? Toutes les données seront perdues."
          confirmMessage="Oui, supprimer"
          onConfirm={handleConfirm}
        />
      </div>
      <div className="flex flex-row">
        <div className="w-1/4 h-[100vh]">
          <GroupListPanel
            offset={15}
            idCampaign={"67f8edf28b4d04f3d0c07aed"}
            groupSelected={group}
            setGroupSelected={setGroupSelected}
          />
        </div>
        <div className="w-1/4 h-[100vh] bg-card">
          <GroupListPanel
            reverse={true}
            grabbled={true}
            type="main"
            offset={15}
            idCampaign={"67f8edf28b4d04f3d0c07aed"}
            groupSelected={group}
            setGroupSelected={setGroupSelected}
          />
        </div>
        <div className="w-1/4 h-[100vh]">
          <GroupListPanel
            grabbled={true}
            type="archived"
            addable={false}
            offset={15}
            idCampaign={"67f8edf28b4d04f3d0c07aed"}
            groupSelected={group}
            setGroupSelected={setGroupSelected}
          />
        </div>
        <div className="w-1/4 h-[100vh] bg-card">
          <GroupListPanel
            reverse={true}
            type="npc"
            addable={false}
            offset={15}
            idCampaign={"67f8edf28b4d04f3d0c07aed"}
            groupSelected={group}
            setGroupSelected={setGroupSelected}
          />
        </div>
        <div className="w-1/4 h-[100vh] bg-card">
          <CampaignListPanel
            offset={15}
            selectedCampaign={selectedCampaign}
            setSelectedCampaign={setSelectedCampaign}
          />
        </div>
      </div>
      <div className="flex flex-row gap-10 h-[70vh] p-5">
        <div className="w-1/5 bg-card">
          <CharacterListPanel
            offset={15}
            idGroup={"67f8edf28b4d04f3d0c07a15"}
            characterSelected={character}
            setCharacterSelected={setCharacterSelected}
          />
        </div>
        {
          character && (
            <div className="w-3/5">
              <CharacterDetailsPanel character={character} />
            </div>
          )
        }
        
      </div>
    </div>
  );
}
