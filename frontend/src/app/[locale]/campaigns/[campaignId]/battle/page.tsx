"use client";
import { Header } from "@/components/common/Header";
import Loading from "@/components/common/Loading";
import GroupSelector from "@/components/modules/battle/GroupSelector";
import InitiativeTracker from "@/components/modules/battle/InitiativeTracker";
import { ICampaign } from "@/models/campaigns/ICampaign";
import { IGroup, IGroupWithRelations } from "@/models/groups/IGroup";
import CampaignService from "@/services/campaignService";
import GroupService from "@/services/groupService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BattlePage = () => {
  const { campaignId } = useParams();

  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [groupsToFight, setGroupsToFight] = useState<
    (IGroupWithRelations | null)[]
  >([null, null]);
  const [groupIds, setGroupIds] = useState<string[]>([]);

  useEffect(() => {
    console.log("groupsToFight groups:", groupsToFight);
    console.log(
      " every:",
      groupsToFight.every((group) => group !== null)
    );
    console.log(
      " some:",
      groupsToFight.some((group) => group === null)
    );

    if (!campaignId) {
      return;
    }

    const fetchCampaign = async () => {
      const res = await CampaignService.findOne(campaignId?.toString());
      if (res) {
        setCampaign(res.data);
      }
    };

    const fetchGroups = async (groupIds: string[]) => {
      // const groupIds = ["67fcb61e1e90f27ba2e0762c", "67fcb61e1e90f27ba2e07602"];
      if (!groupIds || groupIds.length !== 2) {
        return;
      }

      const fetchedGroups: IGroup[] = [];

      for (const id of groupIds) {
        const res = await GroupService.findOne(id);
        if (res) {
          fetchedGroups.push(res.data);
        }
      }

      setGroups(fetchedGroups);
    };

    fetchGroups(groupIds);

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
      {groupsToFight.length === 2 &&
        groupsToFight.every((group) => group !== null) && (
          <InitiativeTracker groups={groupsToFight as IGroupWithRelations[]} />
        )}
      {groupsToFight.some((group) => group === null) && (
        <GroupSelector
          campaignId={campaignId as string}
          groups={groups as IGroup[]}
          setGroups={setGroups}
          groupsToFight={groupsToFight}
          setGroupsToFight={setGroupsToFight}
        />
      )}
    </div>
  );
};

export default BattlePage;
