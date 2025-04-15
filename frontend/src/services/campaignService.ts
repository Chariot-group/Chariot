import { APIContentType } from "@/constants/APIContentType";
import apiClient from "./apiConfig";

const moduleUrl = "/campaigns";

const CampaignService = {
  async getAllCampaigns(query: {
    page?: number;
    offset?: number;
    label?: string;
    sort?: string;
  }) {
    try {
      const response = await apiClient(APIContentType.JSON).get(moduleUrl, {
        params: query,
      });

      if (!response || !response.data || response === undefined) {
        throw new Error("Invalid API response");
      }

      return response.data;
    } catch (err: any) {
      console.error("API error:", err);
      return "error";
    }
  },
};

export default CampaignService;
