import axiosInstance from "./apiInstance";

class ApiStore{

    test=async()=>{

        try{
            const response=await axiosInstance.get("/test");
            return response.data;
        }catch(error){
            console.error("Error in API Store test method:", error);
            throw error;
        }
    }

}

export default new ApiStore();