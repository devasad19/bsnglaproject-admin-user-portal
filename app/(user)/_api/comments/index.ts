"use server";
import axiosInstance from "@/lib/AxiosInstance";

export const getUserFeedBacks = async (id:any) => {
    try {
      const response = await axiosInstance.get(`/user/feedbacks/${id}`);  
      return response?.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
