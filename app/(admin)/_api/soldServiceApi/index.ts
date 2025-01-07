"use server";
import axiosInstance from "@/lib/AxiosInstance";

// create user Type api


export const soldServiceApi = async () =>{
    try {
        const response = await axiosInstance.get("/admin/sold-serivces", {
        headers: {
            "Content-Type": "application/json",
        },
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const activeSoldServiceApi = async () =>{
    try {
        const response = await axiosInstance.get(`/admin/active-sold-serivces`, {
        headers: {
            "Content-Type": "application/json",
        },
        });
        return response.data;
    } catch (error) {
        return error;
    }
}
