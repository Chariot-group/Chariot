"use client";
import { Header } from "@/components/common/Header";
import CharacterDetailsModal from "@/components/modules/characters/CharacterDetailsModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const character = {
    _id: "67fcb61e1e90f27ba2e074b4",
    name: "Goblin",
    classification: {
      type: "humanoid",
      subtype: "goblinoid",
      alignment: "neutral evil",
      size: "Small",
    },
    stats: {
      maxHitPoints: 7,
      currentHitPoints: 3,
      tempHitPoints: 5,
      hitDice: "2d6",
      armorClass: 15,
      speed: {
        walk: 30,
        _id: "67fcb61e1e90f27ba2e074b6",
      },
      abilityScores: {
        strength: 8,
        dexterity: 14,
        constitution: 10,
        intelligence: 10,
        wisdom: 8,
        charisma: 8,
      },
      savingThrows: {
        strength: 0,
        dexterity: 4,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      },
      skills: {
        stealth: 6,
        athletics: 0,
        acrobatics: 0,
        sleightHand: 0,
        arcana: 0,
        history: 0,
        investigation: 0,
        nature: 0,
        religion: 0,
        animalHandling: 0,
        insight: 0,
        medicine: 0,
        perception: 0,
        survival: 0,
        deception: 0,
        intimidation: 0,
        performance: 0,
        persuasion: 0,
      },
      senses: {
        darkvision: 60,
        passivePerception: 9,
      },
      _id: "67fcb61e1e90f27ba2e074b5",
    },
    combat: {
      challengeRating: 0.25,
      experiencePoints: 50,
      resistances: [],
      immunities: [],
      vulnerabilities: [],
    },
    traits: [
      {
        languages: ["Common", "Goblin"],
        abilities: [
          {
            name: "Nimble Escape",
            description:
              "The goblin can take the Disengage or Hide action as a bonus action on each of its turns.",
          },
        ],
      },
    ],
    actions: [
      {
        standard: [
          {
            name: "Scimitar",
            type: "melee",
            attackBonus: 4,
            damage: {
              dice: "1d6",
              type: "slashing",
            },
            range: "5 feet",
          },
          {
            name: "Shortbow",
            type: "ranged",
            attackBonus: 4,
            damage: {
              dice: "1d6",
              type: "piercing",
            },
            range: "80/320 feet",
          },
        ],
        legendary: [],
        lair: [],
      },
    ],
    groups: ["67fcb61e1e90f27ba2e074c5"],
    deletedAt: undefined,
    createdAt: new Date("2025-04-14T07:15:42.087Z"),
    updatedAt: new Date("2025-04-14T07:15:42.087Z"),
    __v: 1,
  };

  return (
    <div className="flex flex-col">
      <Header campaign={null} />
      <Button
        onClick={() => {
          setIsPopupOpen(true);
        }}
      >
        Open Character Details
      </Button>
      <CharacterDetailsModal
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
        }}
        character={character}
      />
    </div>
  );
}
