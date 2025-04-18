import { ICampaign } from "../campaigns/ICampaign";

export interface IUser {
    _id: string,
    username: string,
    email: string,
    campaigns: ICampaign[]
}