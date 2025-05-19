import IPlayer from "@/models/player/IPlayer";
import Details from "./sections/Details";
import Speed from "./sections/Speed";
import Languages from "./sections/Languages";
import Skills from "./sections/Skills";
import Senses from "./sections/Senses";
import Classes from "./sections/Classes";

interface Props {
    player: IPlayer;
    isUpdate: boolean;
    updatePlayer: (player: IPlayer) => void;
}
export default function Stats({ player, isUpdate, updatePlayer }: Props) {
    return (
        <div className="flex flex-row gap-3 h-full h-[90%] overflow-auto">
            <div className="flex flex-col gap-3 w-1/6 h-full">
                <Details updatePlayer={updatePlayer} isUpdate={isUpdate} player={player} />
                <Speed updatePlayer={updatePlayer} isUpdate={isUpdate} player={player} />
                <Languages updatePlayer={updatePlayer} isUpdate={isUpdate} player={player} />
            </div>
            <div className="flex flex-col gap-3 w-1/6 h-full">
                <Skills updatePlayer={updatePlayer} isUpdate={isUpdate} player={player} />
                <Senses updatePlayer={updatePlayer} isUpdate={isUpdate} player={player} />
            </div>
            <div className="flex flex-col gap-3 h-full border border-ring">
            </div>
            <div className="flex flex-col gap-3 w-4/6 h-full">
                <Classes updatePlayer={updatePlayer} isUpdate={isUpdate} player={player} />
            </div>
        </div>
    );
}