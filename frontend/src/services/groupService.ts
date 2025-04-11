import { APIContentType } from "@/constants/APIContentType";
import apiClient from "./apiConfig";

const END_POINT = "/campaigns/:id/groups"

const GroupService = {

    async getAllGroups(query: {page?: number, offset?: number, label?: string, sort?: string, type: string}, idCampaingn: string) {
        try{
            const response = await apiClient(APIContentType.JSON).get(END_POINT.replace(':id', idCampaingn), {
                params: query
            });

            if(!response || !response.data || response === undefined){
                throw new Error("Invalid API response");
            }

            return response.data;
        }catch(error){
            console.error("Error fetching groups:", error);
            return [];
        }
    }

}

export default GroupService;