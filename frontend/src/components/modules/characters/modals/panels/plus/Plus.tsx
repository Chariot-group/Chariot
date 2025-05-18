import IPlayer from "@/models/player/IPlayer";
import Resistances from "./sections/Resistances";
import Immunities from "./sections/Immunities";
import Vulnerabilities from "./sections/Vulnerabilities";
import Abilities from "./sections/Abilities";

interface Props {
    player: IPlayer;
}  
export default function Plus({ player }: Props) {
    return (
        <div className="flex flex-row gap-3 h-full h-[90%] overflow-auto">
            <div className="flex flex-col gap-3 w-1/6 h-full">
                <Resistances affinities={player.affinities} />
                <Immunities affinities={player.affinities} />
                <Vulnerabilities affinities={player.affinities} />
            </div>
            <div className="flex flex-col border border-ring h-full">
            </div>
            <div className="flex flex-col gap-3 w-5/6 h-full">
                <Abilities player={player} />
            </div>
        </div>
    )

}