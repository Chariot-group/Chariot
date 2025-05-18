import INpc from "@/models/npc/INpc";

interface Props {
    npc: INpc;
}
export default function NpcModalDetails( { npc }: Props ) {
    return (
        <div>{npc.name} - npc</div>
    );
}