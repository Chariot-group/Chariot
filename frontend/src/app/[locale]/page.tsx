"use client"
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
      <div>
        
      </div>
    </div>
  );
}

