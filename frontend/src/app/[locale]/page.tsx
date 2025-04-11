"use client"
import GroupListPanel from "@/components/modules/groups/GroupListPanel";
import { IGroup } from "@/models/groups/IGroup";
import { useState } from "react";

export default function Home() {

  const [group, setGroupSelected] = useState<IGroup | null>(null);

  return (
    <div className="flex flex-row">
      <div className="w-1/4 h-[100vh]">
        <GroupListPanel offset={15} pathTitle="title.default" idCampaign={"67f8edf28b4d04f3d0c07aed"} groupSelected={group} setGroupSelected={setGroupSelected} />
      </div>
      <div className="w-1/4 h-[100vh] bg-card">
        <GroupListPanel reverse={true} containIn={["67f8edf28b4d04f3d0c07a15"]} grabbled={true} pathTitle="title.main" offset={15} idCampaign={"67f8edf28b4d04f3d0c07aed"} groupSelected={group} setGroupSelected={setGroupSelected} />
      </div>
      <div className="w-1/4 h-[100vh]">
        <GroupListPanel grabbled={true} containIn={["67f8edf28b4d04f3d0c07aee", "67f8edf28b4d04f3d0c07ae4", "67f8edf28b4d04f3d0c07ac9", "67f8edf28b4d04f3d0c07abc", "67f8edf28b4d04f3d0c07aba", "67f8edf28b4d04f3d0c07a95"]} pathTitle="title.archive" addable={false} offset={15} idCampaign={"67f8edf28b4d04f3d0c07aed"} groupSelected={group} setGroupSelected={setGroupSelected} />
      </div>
      <div className="w-1/4 h-[100vh] bg-card">
        <GroupListPanel reverse={true} containIn={["67f8edf28b4d04f3d0c07a38", "67f8edf28b4d04f3d0c07a59", "67f8edf28b4d04f3d0c07a65", "67f8edf28b4d04f3d0c07a74"]} pathTitle="title.pnj" addable={false} offset={15} idCampaign={"67f8edf28b4d04f3d0c07aed"} groupSelected={group} setGroupSelected={setGroupSelected} />
      </div>
    </div>
  );
}

