"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ICampaign } from "@/models/campaigns/ICampaign";
import CampaignService from "@/services/campaignService";
import { Search, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { use, useCallback, useEffect, useRef, useState } from "react";

interface Props {
  offset?: number;
}

const CampaignListPanel = ({ offset = 8 }: Props) => {
  const t = useTranslations("CampaignListPanel");

  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cardRef = useRef<HTMLDivElement | null>(null); //Ref pour mesurer la hauteur de la carte
  const [cardHeight, setCardHeight] = useState(0);

  const fetchCampaigns = useCallback(
    async (nextPage = 1) => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await CampaignService.getAllCampaigns({
          page: nextPage,
          offset,
        });
        setCampaigns((prev) => [...prev, ...response.data]);
        setPage(nextPage);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns(1);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loading) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 1) {
        fetchCampaigns(page + 1);
      }
    };

    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [page, fetchCampaigns]);

  const getInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return words
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <Card className="h-full shadow-md p-4">
      <CardHeader className="flex items-center justify-between gap-3">
        <CardTitle>{t("title")}</CardTitle>
        <div className="relative">
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder={t("search")}
            className="pr-10 w-64"
          />
          <Search className="size-5 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </CardHeader>
      <CardContent>
        <div
          ref={containerRef}
          className="grid grid-cols-3 gap-4 overflow-y-auto"
          style={{
            height: cardHeight
              ? `${(Math.ceil(offset / 3) + 1) * cardHeight}px`
              : "auto",
          }}
        >
          <Link href="/campaigns/add" title={t("createTooltip")}>
            <Card
              ref={cardRef}
              className="flex flex-col items-center justify-center gap-3 mb-2 aspect-square"
            >
              <Plus className="size-16" />
            </Card>
          </Link>
          {campaigns.map((campaign) => (
            <Link href="/" key={campaign._id} title={campaign.label}>
              <Card className="flex flex-col items-center justify-center gap-3 mb-2 aspect-square">
                <h3 className="text-7xl text-center">
                  {getInitials(campaign.label)}
                </h3>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignListPanel;
