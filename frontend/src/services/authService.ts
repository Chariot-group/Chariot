import { APIContentType } from "@/constants/APIContentType";
import apiClient from "./apiConfig";

const moduleUrl = "/auth/login";

const AuthService = {
  async login(query: {
    email: string;
    password: string;
  }) {
    try {
      const response = await apiClient(APIContentType.JSON).post(moduleUrl, query);

      if (!response || !response.data || response === undefined) {
        throw new Error("Invalid API response");
      }

      return response.data;
    } catch (err: any) {
      console.error("API error:", err);
      return err.response?.data;
    }
  },

  async profile(id: string) {
    try {
      const response = await apiClient(APIContentType.JSON).get(`/users/${id}`);

      if (!response || !response.data || response === undefined) {
        throw new Error("Invalid API response");
      }

      return response.data;
    } catch (err: any) {
      console.error("API error:", err);
      return err.response?.data;
    }
  },
};

export default AuthService;