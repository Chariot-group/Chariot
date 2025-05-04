"use client";
import { Header } from "@/components/common/Header";
import Loading from "@/components/common/Loading";
import GroupSelector from "@/components/modules/battle/GroupSelector";
import InitiativeTracker from "@/components/modules/battle/InitiativeTracker";
import { Button } from "@/components/ui/button";
import { ICampaign } from "@/models/campaigns/ICampaign";
import { IGroup, IGroupWithRelations } from "@/models/groups/IGroup";
import CampaignService from "@/services/campaignService";
import GroupService from "@/services/groupService";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BattlePage = () => {
  const t = useTranslations("BattlePage");

  const { campaignId } = useParams();

  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [groupsLeft, setGroupsLeft] = useState<IGroup[]>([]);
  const [groupsRight, setGroupsRight] = useState<IGroup[]>([]);
  const [groupsToFight, setGroupsToFight] = useState<
    (IGroupWithRelations | null)[]
  >([null, null]);
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [fight, setFight] = useState<boolean>(true);

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

    const fetchGroups = async (groupIds: string[]) => {
      console.log(groupIds);
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

      setGroupsLeft(fetchedGroups);
      setGroupsRight(fetchedGroups);
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
      {fight ? (
        <>
          <GroupSelector
            campaignId={campaignId as string}
            groupsLeft={groupsLeft as IGroup[]}
            setGroupsLeft={setGroupsLeft}
            groupsRight={groupsRight as IGroup[]}
            setGroupsRight={setGroupsRight}
            groupsToFight={groupsToFight}
            setGroupsToFight={setGroupsToFight}
          />
          {!groupsToFight.some((group) => group === null) && (
            <div className="flex justify-center mt-4">
              <Button onClick={() => setFight(!fight)}>{t("battle")}</Button>
            </div>
          )}
        </>
      ) : (
        <>
          <InitiativeTracker groups={groupsToFight as IGroupWithRelations[]} />
          <div className="flex justify-end p-5">
            <Button variant="outline" onClick={() => setFight(!fight)}>
              {t("back")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default BattlePage;
