import { APIContentType } from "@/constants/APIContentType";
import apiClient from "@/services/apiConfig";

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

  async resetPassword(email: string, locale: string) {
    try {
      const response = await apiClient(APIContentType.JSON).patch(`/auth/reset-password`, {
        email,
        locale,
      });

      if (!response || !response.data || response === undefined) {
        throw new Error("Invalid API response");
      }

      return response.data;
    } catch (err: any) {
      console.error("API error:", err);
      return err.response?.data;
    }
  },

  async changePassword(id: string, otp: string, newPassword: string, confirmPassword: string) {
    try {
      const response = await apiClient(APIContentType.JSON).patch(`/auth/${id}/change-password`, {
        otp,
        newPassword,
        confirmPassword,
      });

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