import INpc from "@/models/npc/INpc";
import { Champs } from "./PlayerModalDetails";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ICharacter from "@/models/characters/ICharacter";
import { XIcon } from "lucide-react";
import Spells from "./panels/spells/Spells";
import Plus from "./panels/plus/Plus";
import NpcCharacteristic from "./panels/characteristics/NpcCharacteristic";
import NpcStats from "./panels/stats/NpcStats";

interface Props {
    npc: INpc;
    onClose: () => void;
    updateNpc: (npc: ICharacter) => void;
    isUpdate: boolean;
}
export default function NpcModalDetails( { npc, onClose, updateNpc, isUpdate }: Props ) {

    const t = useTranslations("CharacterDetailsPanel");
    
    const [panel, setPanel] = useState<"characteristics" | "stats" | "spells" | "plus">("characteristics");
    
    const [name, setName] = useState<string>(npc.name);

    const [npcCurrent, setNpcCurrent] = useState<INpc>(npc);

    const update = (npc: ICharacter) => {
        updateNpc(npc);
        setNpcCurrent(npc as INpc);
    }
    
    const changeName = (name: string) => {
        setName(name);
        updateNpc({
            ...npc,
            name: name
        });
    };

    return (
        <Card className="h-full w-full p-4 flex flex-col gap-2">
            <div className="flex flex-row justify-between gap-3 h-[10%]">
                <div className="flex flex-row items-center gap-2">
                    <Champs label="Nom" value={name} id={"name"} type={"text"} placeholder={"Nom"} isActive={isUpdate} setValue={changeName} />
                    <Badge >{t(npc.kind)}</Badge>
                </div>
                
                <div className="flex flex-row items-center gap-3">
                    <span className={`hover:underline underline-offset-2 cursor-pointer ${panel === "characteristics" && 'underline'}`} onClick={() => setPanel("characteristics")}>Charactéristique</span>
                    <span className={`hover:underline underline-offset-2 cursor-pointer ${panel === "stats" && 'underline'}`} onClick={() => setPanel("stats")}>Stats</span>
                    <span className={`hover:underline underline-offset-2 cursor-pointer ${panel === "spells" && 'underline'}`} onClick={() => setPanel("spells")}>Sorts</span>
                    <span className={`hover:underline underline-offset-2 cursor-pointer ${panel === "plus" && 'underline'}`} onClick={() => setPanel("plus")}>Plus</span>
                </div>
                <XIcon onClick={onClose} className="cursor-pointer" />
            </div>
            {panel === "characteristics" && <NpcCharacteristic isUpdate={isUpdate} updateNpc={update} npc={npcCurrent} />}
            {panel === "stats" && <NpcStats isUpdate={isUpdate} updateNpc={update} npc={npcCurrent} />}
            {panel === "spells" && <Spells isUpdate={isUpdate} updateCharacter={update} character={npcCurrent} />}
            {panel === "plus" && <Plus isUpdate={isUpdate} updateCharacter={update} character={npcCurrent} />}
        </Card>
    );
}
