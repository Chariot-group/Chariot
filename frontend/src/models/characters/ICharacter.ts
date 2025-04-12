import IActions from "./actions/IActions";
import IClassification from "./classification/IClassification";
import ICombat from "./combat/ICombat";
import IStats from "./stat/IStats";
import ITrait from "./trait/ITrait";

export default interface ICharacter {
    _id: string;
    name: string;
    classification: IClassification;
    stats: IStats;
    combat: ICombat
    traits: ITrait[];
    actions: IActions[];
    groups: string[];
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}