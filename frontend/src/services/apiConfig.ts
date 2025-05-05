import { APIContentType } from "@/constants/APIContentType";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL;

const apiClient = (contentType: string) => {
  if (!url) {
    throw new Error("API URL is not defined");
  }
  const instance = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": contentType || APIContentType.JSON,
    },
    withCredentials: true,
  });

  return instance;
};

export default apiClient;
