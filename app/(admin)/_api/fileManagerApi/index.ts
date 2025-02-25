"use server";
import axiosInstance from "@/lib/AxiosInstance";

export const getProductionStatus = async () => {
  try {
    const services = await axiosInstance.get(`/get-service-production-status`);
    return services?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getServiceTitles = async () => {
  try {
    const services = await axiosInstance.get(`/get-service-titles`);

    return services?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};


export const SearchModuleLinks = async (params:any) => {
    try {
      const services = await axiosInstance.get(`/filter-services/download`,{
        params
      })
       
      return services?.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };