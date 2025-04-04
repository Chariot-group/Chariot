"use client";
import Loading from "@/components/common/Loading";
import SearchInput from "@/components/common/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { ICampaign } from "@/models/campaigns/ICampaign";
import CampaignService from "@/services/campaignService";
import { getInitials } from "@/utils/stringUtils";
import { Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  offset?: number;
}

const CampaignListPanel = ({ offset = 8 }: Props) => {
  const currentLocale = useLocale();
  const t = useTranslations("CampaignListPanel");

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
        } else {
          setCampaigns((prev) => {
            return [...prev, ...response.data];
          });
        }
        setPage(nextPage);
      } catch (error) {
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
    <Card className="h'full shadow-md p-4">
      <CardHeader className="flex items-center justify-between gap-3">
        <CardTitle>{t("title")}</CardTitle>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("search")}
        />
      </CardHeader>
      <CardContent>
        <div
          ref={containerRef}
          className="grid grid-cols-3 gap-4 overflow-y-auto scrollbar-hide"
          style={{
            height:
              campaigns.length > 0 && cardHeight
                ? `${(Math.ceil(offset / 6) + 1) * cardHeight}px`
                : "auto",
          }}
        >
          <Link href="/campaigns/add" title={t("createTooltip")}>
            <Card
              ref={cardRef}
              className="flex flex-col items-center justify-center gap-3 aspect-square hover:border-2 hover:border-primary"
            >
              <Plus className="size-16" />
            </Card>
          </Link>
          {loading && <Loading />}
          {campaigns.length > 0 &&
            campaigns.map((campaign) => (
              <Link href="/" key={campaign._id} title={campaign.label}>
                <Card className="flex flex-col items-center justify-center gap-3 aspect-square hover:border-2 hover:border-primary">
                  <h3 className="text-4xl text-center">
                    {getInitials(campaign.label)}
                  </h3>
                </Card>
              </Link>
            ))}
          {campaigns.length === 0 && !loading && (
            <div className="row-start-2 col-span-3 flex items-top justify-center">
              <p className="text-gray-500">{t("noCampaigns")}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignListPanel;
