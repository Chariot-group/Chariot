"use client";
import { Header } from "@/components/common/Header";
import Loading from "@/components/common/Loading";
import InitiativeTracker from "@/components/modules/battle/InitiativeTracker";
import { ICampaign } from "@/models/campaigns/ICampaign";
import { IGroupWithRelations } from "@/models/groups/IGroup";
import CampaignService from "@/services/campaignService";
import GroupService from "@/services/groupService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BattlePage = () => {
  const { campaignId } = useParams();

  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [groups, setGroups] = useState<IGroupWithRelations[]>([]);

  useEffect(() => {
    if (!campaignId) {
      return;
    }

    const fetchCampaign = async () => {
      const res = await CampaignService.findOne(campaignId?.toString());
      if (res) {
        setCampaign(res.data);
      }
    };

    const fetchGroups = async () => {
      const groupIds = ["67fcb61e1e90f27ba2e0762c", "67fcb61e1e90f27ba2e07602"];

      const fetchedGroups: IGroupWithRelations[] = [];

      for (const id of groupIds) {
        const res = await GroupService.findOne(id);
        if (res) {
          fetchedGroups.push(res.data);
        }
      }

      setGroups(fetchedGroups);
    };

    fetchGroups();

    setLoading(true);
    fetchCampaign();
    setLoading(false);
  }, [campaignId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header campaign={campaign} />
      <InitiativeTracker groups={groups} />
    </div>
  );
};

export default BattlePage;
