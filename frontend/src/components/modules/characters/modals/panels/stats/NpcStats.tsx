import INpc from "@/models/npc/INpc";
import Speed from "./sections/npc/Speed";
import Languages from "./sections/npc/Languages";
import Skills from "./sections/npc/Skills";
import Senses from "./sections/npc/Senses";
import Details from "./sections/npc/Details";

interface Props {
    npc: INpc;
    isUpdate: boolean;
    updateNpc: (npc: INpc) => void;
}
export default function PlayerStats({ npc, isUpdate, updateNpc }: Props) {
    return (
        <div className="flex flex-row gap-3 h-full h-[90%] overflow-auto">
            <div className="flex flex-col gap-3 w-1/6 h-full">
                <Details updateNpc={updateNpc} isUpdate={isUpdate} npc={npc} />
                <Speed updateNpc={updateNpc} isUpdate={isUpdate} npc={npc} />
                <Languages updateNpc={updateNpc} isUpdate={isUpdate} npc={npc} />
            </div>
            <div className="flex flex-col gap-3 w-1/6 h-full">
                <Skills updateNpc={updateNpc} isUpdate={isUpdate} npc={npc} />
                <Senses updateNpc={updateNpc} isUpdate={isUpdate} npc={npc} />
            </div>
        </div>
    );
}