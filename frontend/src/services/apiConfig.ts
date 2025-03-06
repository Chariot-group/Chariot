import { APIContentType } from "@/constants/APIContentType";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL;

console.log("url", url);

const apiClient = (contentType: string) => {
  const instance = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": contentType || APIContentType.JSON,
    },
  });

  return instance;
};

export default apiClient;
