import IPlayer from "@/models/player/IPlayer";
import Details from "./sections/Details";
import Speed from "./sections/Speed";
import Languages from "./sections/Languages";
import Skills from "./sections/Skills";
import Senses from "./sections/Senses";
import Classes from "./sections/Classes";

interface Props {
    player: IPlayer;
}
export default function Stats({ player }: Props) {
    return (
        <div className="flex flex-row gap-3 h-full h-[90%] overflow-auto">
            <div className="flex flex-col gap-3 w-1/6 h-full">
                <Details stats={player.stats} player={player} />
                <Speed speed={player.stats.speed} />
                <Languages stats={player.stats} />
            </div>
            <div className="flex flex-col gap-3 w-1/6 h-full">
                <Skills skills={player.stats.skills} />
                <Senses stats={player.stats} />
            </div>
            <div className="flex flex-col gap-3 h-full border border-ring">
            </div>
            <div className="flex flex-col gap-3 w-4/6 h-full">
                <Classes player={player} />
            </div>
        </div>
    );
}