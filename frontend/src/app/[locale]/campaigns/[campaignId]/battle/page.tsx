"use client";
import { Header } from "@/components/common/Header";
import { ICampaign } from "@/models/campaigns/ICampaign";
import CampaignService from "@/services/campaignService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BattlePage = () => {
  const { campaignId } = useParams();

  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

    setLoading(true);
    fetchCampaign();
    setLoading(false);
  }, [campaignId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header campaign={campaign} />
    </div>
  );
};

export default BattlePage;
