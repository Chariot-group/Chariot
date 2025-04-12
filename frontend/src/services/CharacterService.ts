import { APIContentType } from "@/constants/APIContentType";
import apiClient from "./apiConfig";

const END_POINT = "/groups";

const CharacterService = {
  async getAllCharacters(query: {
    page?: number;
    offset?: number;
    name?: string;
    sort?: string;
  }, idGroup: string) {
    try {
      const response = await apiClient(APIContentType.JSON).get(`${END_POINT}/${idGroup}/characters`, {
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

export default CharacterService;