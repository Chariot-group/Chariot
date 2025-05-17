import ICharacter from "@/models/characters/ICharacter";
import IActions from "@/models/npc/actions/IActions";
import IChanllenge from "@/models/npc/chanllenge/IChanllenge";
import IProfile from "@/models/npc/profile/IProfile";
import IStatsBase from "@/models/npc/stat/IStatsBase";

export default interface INpc extends ICharacter {
    actions: IActions[];
    challenge: IChanllenge;
    stats: IStatsBase;
    profile?: IProfile;
}