export interface ICampaign {
  _id: string;
  label: string;
  description: string;
  groups: {
    main: string[];
    npc: string[];
    archived: string[];
    _id: string;
  };
  deletedAt: null | Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
