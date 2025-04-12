export interface IGroup {
    _id: string;
    label: string;
    description: string;
    characters: string[];
    campaigns: string[];
    deletedAt: null | Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}