import IPlayer from "@/models/player/IPlayer";
import AbilityScores from "./sections/AbilityScores";
import Appearance from "./sections/Appareance";
import Background from "./sections/Background";
import Battle from "./sections/Battle";
import Profile from "./sections/Profile";
import Treasure from "./sections/Treasure";

interface Props {
    player : IPlayer;
}
export default function characteristic({ player }: Props) {
    return (
        <div className="flex flex-row gap-3 h-full h-[90%] overflow-auto">
            <AbilityScores stats={player.stats} />
            <div className="flex flex-col gap-3 w-1/6 h-full">
                {/* PV */}
                <Battle stats={player.stats} />
        
                {/* Profile + Progression */}
                <Profile progression={player.progression} profile={player.profile} />
                                    
                {/* Appareance */}
                <Appearance appearance={player.appearance} stats={player.stats} />
            </div>
            <div className="flex flex-col gap-3 w-4/6 h-full">
                {/* Background */}
                <Background background={player.background} />
                            
                {/* Treasure */}
                <Treasure treasure={player.treasure} />
            </div>
        </div>
    )
}