"use client"
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import CharacterListPanel from "@/components/modules/characters/CharacterListPanel";
import GroupListPanel from "@/components/modules/groups/GroupListPanel";
import { IGroup } from "@/models/groups/IGroup";
import ICharacter from "@/models/characters/ICharacter";
import { useState } from "react";
import GroupsCampaignsPanel from "@/components/modules/campaigns/GroupsCampaignsPanel";

export default function Home() {

  const [group, setGroupSelected] = useState<IGroup | null>(null);


  const [character, setCharacterSelected] = useState<ICharacter | null>(null);

  return (
    
    
    <div className="flex flex-row">
      <div className="w-[70%] p-6 h-[50vh]">
        <GroupsCampaignsPanel idCampaign="67f8edf28b4d04f3d0c07aed"/>
      </div>
    </div>
  );
}

