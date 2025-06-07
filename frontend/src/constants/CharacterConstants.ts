import INpc from "@/models/npc/INpc";
import IPlayer from "@/models/player/IPlayer";

export const SIZES = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"] as const;

export type Size = (typeof SIZES)[number];

export const DEFAULT_PLAYER: IPlayer = {
  _id: "",
  name: "Roger",
  kind: "player",
  affinities: {
    resistances: [],
    vulnerabilities: [],
    immunities: [],
  },
  abilities: [],
  spellcasting: [],
  groups: [],
  inspiration: false,
  progression: {
    level: 1,
    experience: 0,
  },
  class: [],
  profile: {
    race: "",
  },
  appearance: {
    height: 0,
  },
  background: {
    ideals: "",
  },
  treasure: {
    cp: 0,
    sp: 0,
    ep: 0,
    gp: 0,
    pp: 0,
  },
  stats: {
    proficiencyBonus: 0,
    size: SIZES[0],
    maxHitPoints: 10,
    currentHitPoints: 10,
    tempHitPoints: 0,
    armorClass: 10,
    speed: {
      walk: 30,
    },
    abilityScores: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    languages: [],
    passivePerception: 0,
    savingThrows: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    skills: {
      acrobatics: 0,
      animalHandling: 0,
      arcana: 0,
      athletics: 0,
      deception: 0,
      history: 0,
      insight: 0,
      intimidation: 0,
      investigation: 0,
      medicine: 0,
      nature: 0,
      perception: 0,
      performance: 0,
      persuasion: 0,
      religion: 0,
      sleightHand: 0,
      stealth: 0,
      survival: 0,
    },
    senses: [],
  },
};

export const DEFAULT_NPC: INpc = {
  _id: "",
  name: "Cultist",
  kind: "npc",
  affinities: {
    resistances: [],
    vulnerabilities: [],
    immunities: [],
  },
  abilities: [],
  spellcasting: [],
  groups: [],
  actions: {
    standard: [],
    legendary: [],
    lair: [],
  },
  challenge: {
    challengeRating: 0,
  },
  stats: {
    size: SIZES[0],
    maxHitPoints: 10,
    currentHitPoints: 10,
    tempHitPoints: 0,
    armorClass: 10,
    speed: {
      walk: 30,
    },
    abilityScores: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    languages: [],
    passivePerception: 0,
    savingThrows: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    skills: {
      acrobatics: 0,
      animalHandling: 0,
      arcana: 0,
      athletics: 0,
      deception: 0,
      history: 0,
      insight: 0,
      intimidation: 0,
      investigation: 0,
      medicine: 0,
      nature: 0,
      perception: 0,
      performance: 0,
      persuasion: 0,
      religion: 0,
      sleightHand: 0,
      stealth: 0,
      survival: 0,
    },
    senses: [],
  },
  profile: {
    type: "",
  },
};


export const LANGUAGES: string[] = [
  "Common",
  "Dwarvish",
  "Elvish",
  "Giant",
  "Gnomish",
  "Goblin",
  "Halfling",
  "Orc",
  "Abyssal",
  "Celestial",
  "Draconic",
  "Deep Speech",
  "Infernal",
  "Primordial",
  "Sylvan",
  "Undercommon"
];