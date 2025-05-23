import INpc from "@/models/npc/INpc";
import Speed from "@/components/modules/characters/modals/panels/stats/sections/npc/Speed";
import Languages from "@/components/modules/characters/modals/panels/stats/sections/npc/Languages";
import Skills from "@/components/modules/characters/modals/panels/stats/sections/npc/Skills";
import Senses from "@/components/modules/characters/modals/panels/stats/sections/npc/Senses";
import Details from "@/components/modules/characters/modals/panels/stats/sections/npc/Details";

interface Props {
    npc: INpc;
    isUpdate: boolean;
    updateNpc: (npc: INpc) => void;
}
export default function PlayerStats({ npc, isUpdate, updateNpc }: Props) {
    return (
        <div className="flex flex-row gap-3 h-[90%] overflow-auto">
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