"use client"
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import CharacterListPanel from "@/components/modules/characters/CharacterListPanel";
import HealthCheck from "@/components/modules/monitoring/HealthCheck";
import { useToast } from "@/hooks/useToast";
import ICharacter from "@/models/characters/ICharacter";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Home() {

  const [character, setCharacterSelected] = useState<ICharacter | null>(null);

  return (
    
    <div>
      <div className="w-1/4 h-[100vh] bg-card">
        <CharacterListPanel offset={15} idGroup={"67f8edf28b4d04f3d0c07a15"} characterSelected={character} setCharacterSelected={setCharacterSelected} />
      </div>
    </div>
  );
}
