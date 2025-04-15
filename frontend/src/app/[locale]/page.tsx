import GroupsCampaignsPanel from "@/components/modules/campaigns/GroupsCampaignsPanel";

export default function Home() {
  return (
    <div className="flex flex-row">
      <div className="w-[70%] p-6 h-[50vh]">
        <GroupsCampaignsPanel idCampaign="67fcb61e1e90f27ba2e07b5d" />
      </div>
    </div>
  );
}
