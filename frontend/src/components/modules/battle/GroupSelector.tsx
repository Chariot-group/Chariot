import { Button } from "@/components/ui/button";
import React from "react";
import GroupListPanel from "../groups/GroupListPanel";
import { IGroup, IGroupWithRelations } from "@/models/groups/IGroup";
import { Group } from "lucide-react";
import GroupService from "@/services/groupService";

interface Props {
  campaignId: string; // ID de la campagne
  groups: IGroup[]; // Liste des groupes à afficher
  setGroups: React.Dispatch<React.SetStateAction<IGroup[]>>; // Setter de la liste des groupes
  groupsToFight: (IGroupWithRelations | null)[]; // Liste des groupes à afficher
  setGroupsToFight: React.Dispatch<
    React.SetStateAction<(IGroupWithRelations | null)[]>
  >; // Setter de la liste des groupes
}

const GroupSelector = ({
  campaignId,
  groups,
  setGroups,
  groupsToFight,
  setGroupsToFight,
}: Props) => {
  const handleGroupSelected = async (group: IGroup | null, index: 0 | 1) => {
    await GroupService.findOne(group?._id || "").then((res) => {
      if (res) {
        const groupWithRelations = res.data;
        setGroupsToFight((prev) => {
          const newGroups = [...prev];
          newGroups[index] = groupWithRelations;
          return newGroups;
        });
      }
    });
  };

  return (
    <div className="mt-12 flex flex-col w-full gap-4 items-center">
      <h1 className="text-2xl ">
        Choisisser les deux groupes qui vont s’affronter
      </h1>
      <div className="flex flex-row">
        <div>
          <GroupListPanel
            reverse
            groups={groups}
            setGroups={setGroups}
            groupSelected={
              groupsToFight[0]
                ? {
                    ...groupsToFight[0],
                    characters: groupsToFight[0].characters.map((c) => c._id),
                    campaigns: groupsToFight[0].campaigns.map((c) => c._id),
                  }
                : null
            }
            setGroupSelected={(group) => handleGroupSelected(group, 0)}
            idCampaign={campaignId}
          />
        </div>
        <div>vs</div>
        <div>
          <GroupListPanel
            reverse
            groups={groups}
            setGroups={setGroups}
            groupSelected={
              groupsToFight[1]
                ? {
                    ...groupsToFight[1],
                    characters: groupsToFight[1].characters.map((c) => c._id),
                    campaigns: groupsToFight[1].campaigns.map((c) => c._id),
                  }
                : null
            }
            setGroupSelected={(group) => handleGroupSelected(group, 1)}
            idCampaign={campaignId}
          />
        </div>
      </div>
      <Button>Commencer le combat</Button>
    </div>
  );
};

export default GroupSelector;
