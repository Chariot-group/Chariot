import INpc from "@/models/npc/INpc";
import NpcAbilityScores from "@/components/modules/characters/modals/panels/characteristics/sections/npc/NpcAbilityScores";
import NpcBattle from "@/components/modules/characters/modals/panels/characteristics/sections/npc/NpcBattle";
import Profile from "@/components/modules/characters/modals/panels/characteristics/sections/npc/Profile";
import StandardActions from "@/components/modules/characters/modals/panels/characteristics/sections/npc/StandardActions";
import LegendaryActions from "@/components/modules/characters/modals/panels/characteristics/sections/npc/LegendaryActions";
import LairActions from "@/components/modules/characters/modals/panels/characteristics/sections/npc/LairActions";

interface Props {
    npc : INpc;
    updateNpc: (npc: INpc) => void;
    isUpdate: boolean;
}
export default function NpcCharacteristic({ npc, updateNpc, isUpdate }: Props) {
    return (
        <div className="flex flex-row gap-3 h-[90%] overflow-auto">
            <NpcAbilityScores npc={npc} isUpdate={isUpdate} updateNpc={updateNpc} />
            <div className="flex flex-col gap-3 w-1/6 h-full">
                {/* PV */}
                <NpcBattle updateNpc={updateNpc} isUpdate={isUpdate} npc={npc} />
                {/* Profile */}
                <Profile updateNpc={updateNpc} isUpdate={isUpdate} npc={npc} />
            </div>
            <div className="h-full border border-ring">
            </div>
            <div className="flex flex-col gap-3 w-4/6 h-full">
                <h2 className="text-xl font-bold">Actions</h2>
                <div className="flex flex-row gap-3 w-full h-full">
                    <div className="flex flex-col gap-3 w-1/3 h-full">
                        <StandardActions updateNpc={updateNpc} isUpdate={isUpdate} npc={npc} />
                    </div>
                    <div className="h-full border border-ring">
                    </div>
                    <div className="flex flex-col gap-3 w-1/3 h-full">
                        <LegendaryActions updateNpc={updateNpc} isUpdate={isUpdate} npc={npc} />
                    </div>
                    <div className="h-full border border-ring">
                    </div>
                    <div className="flex flex-col gap-3 w-1/3 h-full">
                        <LairActions updateNpc={updateNpc} isUpdate={isUpdate} npc={npc} />
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}