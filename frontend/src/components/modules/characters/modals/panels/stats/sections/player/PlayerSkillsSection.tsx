import { Card } from "@/components/ui/card";
import { useState } from "react";
import IPlayer from "@/models/player/IPlayer";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { useTranslations } from "next-intl";

interface Props {
  player: IPlayer;
  isUpdate: boolean;
  updatePlayer: (player: IPlayer) => void;
}
export default function PlayerSkillsSection({ player, isUpdate, updatePlayer }: Props) {
  const t = useTranslations("CharacterDetailsPanel");

  const [athletics, setAthletics] = useState<number>(player.stats.skills.athletics);
  const [acrobatics, setAcrobatics] = useState<number>(player.stats.skills.acrobatics);
  const [sleightHand, setSleightHand] = useState<number>(player.stats.skills.sleightHand);
  const [stealth, setStealth] = useState<number>(player.stats.skills.stealth);
  const [arcana, setArcana] = useState<number>(player.stats.skills.arcana);
  const [history, setHistory] = useState<number>(player.stats.skills.history);
  const [investigation, setInvestigation] = useState<number>(player.stats.skills.investigation);
  const [nature, setNature] = useState<number>(player.stats.skills.nature);
  const [religion, setReligion] = useState<number>(player.stats.skills.religion);
  const [animalHandling, setAnimalHandling] = useState<number>(player.stats.skills.animalHandling);
  const [insight, setInsight] = useState<number>(player.stats.skills.insight);
  const [medicine, setMedicine] = useState<number>(player.stats.skills.medicine);
  const [perception, setPerception] = useState<number>(player.stats.skills.perception);
  const [survival, setSurvival] = useState<number>(player.stats.skills.survival);
  const [deception, setDeception] = useState<number>(player.stats.skills.deception);
  const [intimidation, setIntimidation] = useState<number>(player.stats.skills.intimidation);
  const [performance, setPerformance] = useState<number>(player.stats.skills.performance);
  const [persuasion, setPersuasion] = useState<number>(player.stats.skills.persuasion);

  const changeAthletics = (value: any) => {
    setAthletics(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          athletics: parseInt(value),
        },
      },
    });
  };
  const changeAcrobatics = (value: any) => {
    setAcrobatics(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          acrobatics: parseInt(value),
        },
      },
    });
  };
  const changeSleightHand = (value: any) => {
    setSleightHand(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          sleightHand: parseInt(value),
        },
      },
    });
  };
  const changeStealth = (value: any) => {
    setStealth(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          stealth: parseInt(value),
        },
      },
    });
  };
  const changeArcana = (value: any) => {
    setArcana(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          arcana: parseInt(value),
        },
      },
    });
  };
  const changeHistory = (value: any) => {
    setHistory(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          history: parseInt(value),
        },
      },
    });
  };
  const changeInvestigation = (value: any) => {
    setInvestigation(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          investigation: parseInt(value),
        },
      },
    });
  };
  const changeNature = (value: any) => {
    setNature(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          nature: parseInt(value),
        },
      },
    });
  };
  const changeReligion = (value: any) => {
    setReligion(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          religion: parseInt(value),
        },
      },
    });
  };
  const changeAnimalHandling = (value: any) => {
    setAnimalHandling(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          animalHandling: parseInt(value),
        },
      },
    });
  };
  const changeInsight = (value: any) => {
    setInsight(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          insight: parseInt(value),
        },
      },
    });
  };
  const changeMedicine = (value: any) => {
    setMedicine(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          medicine: parseInt(value),
        },
      },
    });
  };
  const changePerception = (value: any) => {
    setPerception(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          perception: parseInt(value),
        },
      },
    });
  };
  const changeSurvival = (value: any) => {
    setSurvival(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          survival: parseInt(value),
        },
      },
    });
  };
  const changeDeception = (value: any) => {
    setDeception(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          deception: parseInt(value),
        },
      },
    });
  };
  const changeIntimidation = (value: any) => {
    setIntimidation(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          intimidation: parseInt(value),
        },
      },
    });
  };
  const changePerformance = (value: any) => {
    setPerformance(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          performance: parseInt(value),
        },
      },
    });
  };
  const changePersuasion = (value: any) => {
    setPersuasion(value);
    updatePlayer({
      ...player,
      stats: {
        ...player.stats,
        skills: {
          ...player.stats.skills,
          persuasion: parseInt(value),
        },
      },
    });
  };

  return (
    <Card className="p-4 flex flex-col bg-background">
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.athletics")}
        value={athletics}
        id={"athletics"}
        type={"number"}
        placeholder={t("skills.athletics")}
        setValue={changeAthletics}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.acrobatics")}
        value={acrobatics}
        id={"acrobatics"}
        type={"number"}
        placeholder={t("skills.acrobatics")}
        setValue={changeAcrobatics}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.stealth")}
        value={stealth}
        id={"stealth"}
        type={"number"}
        placeholder={t("skills.stealth")}
        setValue={changeStealth}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.sleightHand")}
        value={sleightHand}
        id={"sleightHand"}
        type={"number"}
        placeholder={t("skills.sleightHand")}
        setValue={changeSleightHand}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.arcana")}
        value={arcana}
        id={"arcana"}
        type={"number"}
        placeholder={t("skills.arcana")}
        setValue={changeArcana}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.history")}
        value={history}
        id={"history"}
        type={"number"}
        placeholder={t("skills.history")}
        setValue={changeHistory}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.investigation")}
        value={investigation}
        id={"investigation"}
        type={"number"}
        placeholder={t("skills.investigation")}
        setValue={changeInvestigation}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.nature")}
        value={nature}
        id={"nature"}
        type={"number"}
        placeholder={t("skills.nature")}
        setValue={changeNature}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.religion")}
        value={religion}
        id={"religion"}
        type={"number"}
        placeholder={t("skills.religion")}
        setValue={changeReligion}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.animalHandling")}
        value={animalHandling}
        id={"animalHandling"}
        type={"number"}
        placeholder={t("skills.animalHandling")}
        setValue={changeAnimalHandling}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.insight")}
        value={insight}
        id={"insight"}
        type={"number"}
        placeholder={t("skills.insight")}
        setValue={changeInsight}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.medicine")}
        value={medicine}
        id={"medicine"}
        type={"number"}
        placeholder={t("skills.medicine")}
        setValue={changeMedicine}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.perception")}
        value={perception}
        id={"perception"}
        type={"number"}
        placeholder={t("skills.perception")}
        setValue={changePerception}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.survival")}
        value={survival}
        id={"survival"}
        type={"number"}
        placeholder={t("skills.survival")}
        setValue={changeSurvival}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.deception")}
        value={deception}
        id={"deception"}
        type={"number"}
        placeholder={t("skills.deception")}
        setValue={changeDeception}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.intimidation")}
        value={intimidation}
        id={"intimidation"}
        type={"number"}
        placeholder={t("skills.intimidation")}
        setValue={changeIntimidation}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.performance")}
        value={performance}
        id={"performance"}
        type={"number"}
        placeholder={t("skills.performance")}
        setValue={changePerformance}
      />
      <Champs
        isActive={isUpdate}
        color="card"
        label={t("skills.persuasion")}
        value={persuasion}
        id={"persuasion"}
        type={"number"}
        placeholder={t("skills.persuasion")}
        setValue={changePersuasion}
      />
    </Card>
  );
}
