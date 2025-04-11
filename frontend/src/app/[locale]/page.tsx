"use client"
import GroupListPanel from "@/components/modules/groups/GroupListPanel";
import { IGroup } from "@/models/groups/IGroup";
import { useState } from "react";

export default function Home() {

  const [group, setGroupSelected] = useState<IGroup | null>(null);

  return (
    <div className="flex flex-row">
      <div className="w-1/4 h-[100vh]">
        <GroupListPanel offset={15} idCampaign={"67f8edf28b4d04f3d0c07aed"} groupSelected={group} setGroupSelected={setGroupSelected} />
      </div>
      <div className="w-1/4 h-[100vh] bg-card">
        <GroupListPanel reverse={true} grabbled={true} type="main" offset={15} idCampaign={"67f8edf28b4d04f3d0c07aed"} groupSelected={group} setGroupSelected={setGroupSelected} />
      </div>
      <div className="w-1/4 h-[100vh]">
        <GroupListPanel grabbled={true} type="archived" addable={false} offset={15} idCampaign={"67f8edf28b4d04f3d0c07aed"} groupSelected={group} setGroupSelected={setGroupSelected} />
      </div>
      <div className="w-1/4 h-[100vh] bg-card">
        <GroupListPanel reverse={true} type="npc" addable={false} offset={15} idCampaign={"67f8edf28b4d04f3d0c07aed"} groupSelected={group} setGroupSelected={setGroupSelected} />
      </div>
    </div>
  );
}

