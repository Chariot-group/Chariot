import { APIContentType } from "@/constants/APIContentType";
import apiClient from "./apiConfig";
import { IGroup } from "@/models/groups/IGroup";

const END_POINT = "/campaigns";

const GroupService = {
  async getAllGroups(
    query: {
      page?: number;
      offset?: number;
      label?: string;
      sort?: string;
      type: string;
    },
    idCampaingn: string
  ) {
    try {
      const response = await apiClient(APIContentType.JSON).get(
        `${END_POINT}/${idCampaingn}/groups`,
        {
          params: query,
        }
      );

      if (!response || !response.data || response === undefined) {
        throw new Error("Invalid API response");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching groups:", error);
      return [];
    }
  },

  async updateCharacter(id: string, data: Partial<IGroup>) {
    try {
      const response = await apiClient(APIContentType.JSON).patch(
        `/groups/${id}`,
        data
      );

      if (!response || !response.data || response === undefined) {
        throw new Error("Invalid API response");
      }

      return response.data;
    } catch (err: any) {
      console.error("API error:", err);
      return "error";
    }
  },
  async findOne(id: string) {
    try {
      const response = await apiClient(APIContentType.JSON).get(
        `/groups/${id}`
      );

      if (!response || !response.data || response === undefined) {
        throw new Error("Invalid API response");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching group:", error);
      return null;
    }
  },
};

export default GroupService;
