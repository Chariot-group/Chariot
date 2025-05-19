import IPlayer from "@/models/player/IPlayer";
import Resistances from "./sections/Resistances";
import Immunities from "./sections/Immunities";
import Vulnerabilities from "./sections/Vulnerabilities";
import Abilities from "./sections/Abilities";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}  
export default function Plus({ player, isUpdate, updatePlayer }: Props) {
    return (
        <div className="flex flex-row gap-3 h-full h-[90%] overflow-auto">
            <div className="flex flex-col gap-3 w-1/6 h-full">
                <Resistances isUpdate={isUpdate} updatePlayer={updatePlayer} player={player} />
                <Immunities isUpdate={isUpdate} updatePlayer={updatePlayer} player={player} />
                <Vulnerabilities isUpdate={isUpdate} updatePlayer={updatePlayer} player={player} />
            </div>
            <div className="flex flex-col border border-ring h-full">
            </div>
            <div className="flex flex-col gap-3 w-5/6 h-full">
                <Abilities isUpdate={isUpdate} updatePlayer={updatePlayer} player={player} />
            </div>
        </div>
    )

}