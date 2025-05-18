import { Card } from "@/components/ui/card";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { useState } from "react";
import IStats from "@/models/player/stats/IStats";

interface Props {
    stats: IStats;
}
export default function abilityScores({ stats }: Props) {

    const [strengthST, setStrengthST] = useState<number>(stats.savingThrows.strength);
    const [dexterityST, setDexterityST] = useState<number>(stats.savingThrows.dexterity);
    const [constitutionST, setConstitutionST] = useState<number>(stats.savingThrows.constitution);
    const [intelligenceST, setIntelligenceST] = useState<number>(stats.savingThrows.intelligence);
    const [wisdomST, setWisdomST] = useState<number>(stats.savingThrows.wisdom);
    const [charismaST, setCharismaST] = useState<number>(stats.savingThrows.charisma);
    
    const [strengthAS, setStrengthAS] = useState<number>(stats.abilityScores.strength);
    const [dexterityAS, setDexterityAS] = useState<number>(stats.abilityScores.dexterity);
    const [constitutionAS, setConstitutionAS] = useState<number>(stats.abilityScores.constitution);
    const [intelligenceAS, setIntelligenceAS] = useState<number>(stats.abilityScores.intelligence);
    const [wisdomAS, setWisdomAS] = useState<number>(stats.abilityScores.wisdom);
    const [charismaAS, setCharismaAS] = useState<number>(stats.abilityScores.charisma);

    return (
        <div className="flex flex-col gap-3 w-1/6 h-full">
            {/* Stats */}
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs color="card" label="Force" value={strengthAS} id={"strengthAS"} type={"number"} placeholder={"Force"} setValue={setStrengthAS} />
                <Champs color="card" label="Jet de sauvegarde" value={strengthST} id={"strengthST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={setStrengthST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs color="card" label="Dextérité" value={dexterityAS} id={"dexterityAS"} type={"number"} placeholder={"Dextérité"} setValue={setDexterityAS} />
            <Champs color="card" label="Jet de sauvegarde" value={dexterityST} id={"dexterityST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={setDexterityST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs color="card" label="Constitution" value={constitutionAS} id={"constitutionAS"} type={"number"} placeholder={"Constitution"} setValue={setConstitutionAS} />
                <Champs color="card" label="Jet de sauvegarde" value={constitutionST} id={"constitutionST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={setConstitutionST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs color="card" label="Intelligence" value={intelligenceAS} id={"intelligenceAS"} type={"number"} placeholder={"Intelligence"} setValue={setIntelligenceAS} />
                <Champs color="card" label="Jet de sauvegarde" value={intelligenceST} id={"intelligenceST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={setIntelligenceST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs color="card" label="Sagesse" value={wisdomAS} id={"wisdomAS"} type={"number"} placeholder={"Sagesse"} setValue={setWisdomAS} />
                <Champs color="card" label="Jet de sauvegarde" value={wisdomST} id={"wisdomST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={setWisdomST} />
            </Card>
            <Card className="bg-card p-4 flex flex-col bg-background">
                <Champs color="card" label="Charisme" value={charismaAS} id={"charismaAS"} type={"number"} placeholder={"Force"} setValue={setCharismaAS} />
                <Champs color="card" label="Jet de sauvegarde" value={charismaST} id={"charismaST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={setCharismaST} />
            </Card>
        </div>
    );

}