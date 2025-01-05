"use server";
import axiosInstance from "@/lib/AxiosInstance";

export const getBoughtServices = async (id: any) => {
  try {
    const response = await axiosInstance.get(`user/services/${id}`);
    return response?.data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};
