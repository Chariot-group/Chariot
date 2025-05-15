import IAction from "@/models/characters/actions/sub/IAction";

export default interface IActions {
    standard: IAction[];
    legendary: IAction[];
    lair: IAction[];
}