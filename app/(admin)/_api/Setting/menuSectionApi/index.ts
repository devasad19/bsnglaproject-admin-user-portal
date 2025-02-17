"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

// create user setting icon api
export const updateMenuSection = async (data: any) => {
  try {
    const response = await axiosInstance.post("/headersUpdate/1", data);

    return response.data;
  } catch (error) {
    console.log("error", error);

    return { status: false, error };
  }
};
export const getMenuSection = async () => {
  try {
    const response = await axiosInstance.get("/headersList");
    return response.data;
  } catch (error) {
    console.log("error", error);

    return { status: false, error };
  }
};
