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

export const SearchModuleLinks = async (params: any) => {
  try {
    const services = await axiosInstance.get(`/filter-services/download`, {
      params,
    });

    return services?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

/*** file management api start here */

export const uploadFileApi = async (data: any) => {
  try {
    const services = await axiosInstance.post(`/attachment-store`, data);

    return services?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllFiles = async () => {
  try {
    const files = await axiosInstance.get(`/get-attachment`);
    return files?.data;
  } catch (error) {
    return error;
  }
};
