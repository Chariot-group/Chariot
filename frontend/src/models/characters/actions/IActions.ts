import IAction from "./sub/IAction";

export default interface IActions {
    standard: IAction[];
    legendary: IAction[];
    lair: IAction[];
}