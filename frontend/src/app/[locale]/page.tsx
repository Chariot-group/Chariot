"use client";
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import CharacterListPanel from "@/components/modules/characters/CharacterListPanel";
import GroupListPanel from "@/components/modules/groups/GroupListPanel";
import { IGroup } from "@/models/groups/IGroup";
import ICharacter from "@/models/characters/ICharacter";
import { useState } from "react";

export default function Home() {
  const [group, setGroupSelected] = useState<IGroup | null>(null);

  const [character, setCharacterSelected] = useState<ICharacter | null>(null);

  return (
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
        <CharacterListPanel
          offset={15}
          idGroup={"67f8edf28b4d04f3d0c07a15"}
          characterSelected={character}
          setCharacterSelected={setCharacterSelected}
        />
      </div>
    </div>
  );
}
