import { APIContentType } from "@/constants/APIContentType";
import axios from "axios";
import { toast } from "react-toastify";

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
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
    
      const errorMessage = error.response?.data?.message || error.message || "Une erreur est survenue.";
      
      toast.error(errorMessage);

      await logErrorToBackend(error);

      return Promise.reject(error);
    }
  );

  return instance;
};


const logErrorToBackend = async (error: any) => {
  try {
    await axios.post("/api/logError", {
      message: error.message,
      stack: error.stack,
      type: error.name,
    });
  } catch (e) {
    console.error("Impossible d'envoyer l'erreur au serveur.", e);
  }
};


export default apiClient;
