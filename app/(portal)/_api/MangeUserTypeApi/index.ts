"use server";
import axiosInstance from "@/lib/AxiosInstance"

export const manageUserTypeCreate = async (data: any) => {
    try {
        // console.log("api call data:",data);
        
        const response = await axiosInstance.post('/store/user-type', data,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(response);
        
        return response.data;
    } catch (error) {
        console.log(error)
    }
}