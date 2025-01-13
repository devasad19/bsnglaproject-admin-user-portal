"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const getCitizenData = async (id: any) => {
  try {
    const fetchOption = {
      next: {
        tags: ["get-user"],
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/citizen/user/${id}`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    return error;
  }
};



export const updateCitizenProfile = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`/citizen/update`, payload);
    revalidateTag("get-user");
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateCitizenTypeInfo = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`/citizen-type/update`, payload);

    revalidateTag("get-user");
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Change password
export const changePassword = async (payload: any) => {
  try {
    const response = await axiosInstance.post(
      `/citizen/password-update`,
      payload
    );
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
