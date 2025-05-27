import INpc from "@/models/npc/INpc";
import Speed from "@/components/modules/characters/modals/panels/stats/sections/npc/NpcSpeedSection";
import Languages from "@/components/modules/characters/modals/panels/stats/sections/npc/NpcLanguagesSection";
import Skills from "@/components/modules/characters/modals/panels/stats/sections/npc/NpcSkillsSection";
import Senses from "@/components/modules/characters/modals/panels/stats/sections/npc/NpcSensesSection";
import Details from "@/components/modules/characters/modals/panels/stats/sections/npc/NpcDetailsSection";

interface Props {
    npc: INpc;
    isUpdate: boolean;
    updateNpc: (npc: INpc) => void;
}
export default function NpcStats({ npc, isUpdate, updateNpc }: Props) {
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