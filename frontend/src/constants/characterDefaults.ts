import ICharacter from "@/models/characters/ICharacter";
import IClassification from "@/models/characters/classification/IClassification";
import ICombat from "@/models/characters/combat/ICombat";
import IStats from "@/models/characters/stat/IStats";
import ITrait from "@/models/characters/trait/ITrait";
import IActions from "@/models/characters/actions/IActions";

export const DEFAULT_CLASSIFICATION: IClassification = {
    type: "humanoid",
    subtype: "goblinoid",
    alignment: "neutral evil",
    size: "Small"
};

export const DEFAULT_STATS: IStats = {
    maxHitPoints: 7,
    currentHitPoints: 3,
    tempHitPoints: 5,
    hitDice: "2d6",
    armorClass: 15,
    speed: {
        walk: 30,
    },
    abilityScores: {
        strength: 8,
        dexterity: 14,
        constitution: 10,
        intelligence: 10,
        wisdom: 8,
        charisma: 8
    },
    savingThrows: {
        dexterity: 4,
        constitution: 2,
        intelligence: 2,
        wisdom: 1,
        charisma: 1,
        strength: 0
    },
    skills: {
        stealth: 6,
        perception: 1,
        deception: 1,
        arcana: 2,
        athletics: 0,
        history: 2,
        insight: 1,
        intimidation: 1,
        investigation: 2,
        medicine: 1,
        nature: 2,
        performance: 1,
        persuasion: 1,
        religion: 2,
        sleightHand: 6,
        survival: 1,
        animalHandling: 1,
        acrobatics: 4
    },
    senses: {
        darkvision: 60,
        passivePerception: 9
    }
};

export const DEFAULT_COMBAT: ICombat = {
    challengeRating: 0.25,
    experiencePoints: 50,
    resistances: [],
    immunities: [],
    vulnerabilities: []
};

export const DEFAULT_TRAIT: ITrait = {
    languages: ["Common", "Goblin"],
    abilities: [
        {
            name: "Nimble Escape",
            description: "The goblin can take the Disengage or Hide action as a bonus action on each of its turns."
        }
    ]
};

export const DEFAULT_ACTIONS: IActions = {
    standard: [],
    legendary: [],
    lair: []
};

export const DEFAULT_CHARACTER: Partial<ICharacter> = {
    name: "Goblin",
    classification: DEFAULT_CLASSIFICATION,
    stats: DEFAULT_STATS,
    combat: DEFAULT_COMBAT,
    traits: [DEFAULT_TRAIT],
    actions: [DEFAULT_ACTIONS],
    groups: []
}; 