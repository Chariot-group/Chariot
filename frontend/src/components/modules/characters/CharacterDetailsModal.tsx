"use client";
import React, { useEffect, useState } from "react";
import { CharacterDetailsPanel } from "./panelSections/CharacterDetailsPanel";
import ICharacter from "@/models/characters/ICharacter";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  character: ICharacter;
}

const CharacterDetailsModal = ({
  isOpen,
  onClose,
  character,
}: Props) => {

  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div
        className={`w-3/4 h-3/4 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <CharacterDetailsPanel
          character={character}
        />
      </div>
    </div>
  );
};

export default CharacterDetailsModal;
