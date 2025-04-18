import { Button } from "@/components/ui/button";
import React from "react";
import GroupListPanel from "../groups/GroupListPanel";
import { IGroup, IGroupWithRelations } from "@/models/groups/IGroup";
import { Group } from "lucide-react";
import GroupService from "@/services/groupService";

interface Props {
  campaignId: string; // ID de la campagne
  groupsLeft: IGroup[]; // Liste des groupes à afficher
  setGroupsLeft: React.Dispatch<React.SetStateAction<IGroup[]>>; // Setter de la liste des groupes
  groupsRight: IGroup[]; // Liste des groupes à afficher
  setGroupsRight: React.Dispatch<React.SetStateAction<IGroup[]>>; // Setter de la liste des groupes
  groupsToFight: (IGroupWithRelations | null)[]; // Liste des groupes à afficher
  setGroupsToFight: React.Dispatch<
    React.SetStateAction<(IGroupWithRelations | null)[]>
  >; // Setter de la liste des groupes
}

const GroupSelector = ({
  campaignId,
  groupsLeft,
  setGroupsLeft,
  groupsRight,
  setGroupsRight,
  groupsToFight,
  setGroupsToFight,
}: Props) => {
  const handleGroupSelected = async (group: IGroup | null, index: 0 | 1) => {
    // Ne rien faire si l'autre groupe sélectionné a le même _id
    const otherIndex = index === 0 ? 1 : 0;
    const otherGroup = groupsToFight[otherIndex];
    if (group?._id && group._id === otherGroup?._id) return;

    const res = await GroupService.findOne(group?._id || "");
    if (res) {
      const groupWithRelations = res.data;
      setGroupsToFight((prev) => {
        const newGroups = [...prev];
        newGroups[index] = groupWithRelations;
        return newGroups;
      });
    }
  };

  return (
    <div className="mt-12 flex flex-col w-full gap-4 items-center">
      <h1 className="text-2xl ">
        Choisisser les deux groupes qui vont s’affronter
      </h1>
      <div className="flex flex-row items-center justify-around w-1/2">
        <div>
          <GroupListPanel
            addable={false}
            context
            groups={groupsLeft}
            setGroups={setGroupsLeft}
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
            disabledGroups={
              groupsToFight[1]
                ? [
                    {
                      ...groupsToFight[1],
                      characters: groupsToFight[1].characters.map((c) => c._id),
                      campaigns: groupsToFight[1].campaigns.map((c) => c._id),
                    },
                  ]
                : []
            }
          />
        </div>
        <p className="text-6xl">vs</p>
        <div>
          <GroupListPanel
            addable={false}
            context
            groups={groupsRight}
            setGroups={setGroupsRight}
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
            disabledGroups={
              groupsToFight[0]
                ? [
                    {
                      ...groupsToFight[0],
                      characters: groupsToFight[0].characters.map((c) => c._id),
                      campaigns: groupsToFight[0].campaigns.map((c) => c._id),
                    },
                  ]
                : []
            }
          />
        </div>
      </div>
    </div>
  );
};

export default GroupSelector;
