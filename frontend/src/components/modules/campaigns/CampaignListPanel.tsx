"use client";
import Loading from "@/components/common/Loading";
import SearchInput from "@/components/common/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useToast } from "@/hooks/useToast";
import { ICampaign } from "@/models/campaigns/ICampaign";
import CampaignService from "@/services/campaignService";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  offset?: number;
  selectedCampaign: ICampaign | null;
  setSelectedCampaign: (campaign: ICampaign | null) => void;
  addable?: boolean;
}

const CampaignListPanel = ({
  offset = 8,
  selectedCampaign,
  setSelectedCampaign,
  addable = true,
}: Props) => {
  const currentLocale = useLocale();
  const t = useTranslations("CampaignListPanel");

  const { error } = useToast();

  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

  //Pagination
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  //Ref pour le scroll infini
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null); //Ref pour mesurer la hauteur des cards
  const [cardHeight, setCardHeight] = useState(0);

  const fetchCampaigns = useCallback(
    async (search: string, nextPage = 1, reset = false) => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await CampaignService.getAllCampaigns({
          page: nextPage,
          offset,
          label: search,
        });
        if (reset) {
          setCampaigns(response.data);
          setSelectedCampaign(response.data[0] || null);
        } else {
          setCampaigns((prev) => {
            return [...prev, ...response.data];
          });
        }
        setPage(nextPage);
      } catch (err) {
        error(t("error"));
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  useInfiniteScroll(containerRef, fetchCampaigns, page, loading, search);

  //Mesurer la hauteur des cards
  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    setCampaigns([]);
    fetchCampaigns(search, 1, true);
  }, [currentLocale, search]);

  return (
    <div className="w-full h-full flex flex-col">
      <CardHeader className="flex-none h-auto items-center gap-3">
        <CardTitle className="text-foreground font-bold">
          {t("title")}
        </CardTitle>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("search")}
        />
        {addable && (
          <Link className="w-full" href="/campaigns/add" title={t("create")}>
            <Card
              ref={cardRef}
              className="bg-primary justify-center flex p-2 gap-3 border-ring hover:border-2 hover:border-primary shadow-md"
            >
              <span className="text-background font-bold">{t("create")}</span>
            </Card>
          </Link>
        )}
      </CardHeader>
      <CardContent
        ref={containerRef}
        className="flex-1 h-auto overflow-auto scrollbar-hide"
      >
        <div className="flex flex-col gap-3">
          {loading && <Loading />}
          {campaigns.length > 0 &&
            campaigns.map((campaign) => (
              <Card
                key={campaign._id}
                className={`flex p-2 gap-3 border-ring shadow-md hover:border-2 bg-background ${
                  selectedCampaign?._id === campaign._id ? "border-2" : "border"
                }`}
                onClick={() => setSelectedCampaign(campaign)}
              >
                <span className="text-foreground font-bold">
                  {campaign.label}
                </span>
              </Card>
            ))}
          {campaigns.length === 0 && !loading && (
            <div className="row-start-2 col-span-3 flex items-top justify-center">
              <p className="text-gray-500">{t("noCampaigns")}</p>
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
};

export default CampaignListPanel;
