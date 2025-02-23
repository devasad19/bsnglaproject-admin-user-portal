"use server";
import axiosInstance from "@/lib/AxiosInstance";

// get all user types

export const getAllPublishActiveServices = async (params:any) => {
  try {
    const response = await axiosInstance.get(
      "/admin/get-publish-services",{
        params
      }
    );
    // console.log(response);

    return response?.data;
  } catch (error) {
    return error;
  }
};

export const updatePublishActiveServices = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      `/admin/get-services-dynamic-order`,{
        service_position: data
      }
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};

// delete  user  api
