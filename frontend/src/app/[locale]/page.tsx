"use client"
import GroupListPanel from "@/components/modules/groups/GroupListPanel";
import { IGroup } from "@/models/groups/IGroup";
import { useState } from "react";

export default function Home() {

  const [group, setGroupSelected] = useState<IGroup | null>(null);

  return (
    <div className="flex flex-row">
      <div className="w-1/4 h-[100vh]">
        <GroupListPanel offset={15} pathTitle="title.default" idCampaign={"67f3b87778c8af6eab094ca9"} groupSelected={group} setGroupSelected={setGroupSelected} />
      </div>
      <div className="w-1/4 h-[100vh] bg-card">
        <GroupListPanel reverse={true} grabbled={true} pathTitle="title.main" offset={15} idCampaign={"67f3b87778c8af6eab094ca9"} groupSelected={group} setGroupSelected={setGroupSelected} />
      </div>
      <div className="w-1/4 h-[100vh]">
        <GroupListPanel grabbled={true} pathTitle="title.archive" addable={false} offset={15} idCampaign={"67f3b87778c8af6eab094ca9"} groupSelected={group} setGroupSelected={setGroupSelected} />
      </div>
      <div className="w-1/4 h-[100vh] bg-card">
        <GroupListPanel reverse={true} pathTitle="title.pnj" addable={false} offset={15} idCampaign={"67f3b87778c8af6eab094ca9"} groupSelected={group} setGroupSelected={setGroupSelected} />
      </div>
    </div>
  );
}

