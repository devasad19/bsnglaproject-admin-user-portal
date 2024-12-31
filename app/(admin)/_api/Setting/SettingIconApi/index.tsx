"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";


// create user setting icon api
export const createIcon = async (data: any) => {
  try {
    const response = await axiosInstance.post("/store/icon", data);
    revalidateTag("get-setting-icon");
    return response.data;
  } catch (error) {
    // console.error("API Error:", error); // Log detailed error
    return { status: false, error }
  }
};

// get all setting icon
export const getSettingIcon = async () => {
  try {
    const fetchOption = {
        next: {
          tags: ["get-setting-icon"],
        },
      };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get-all-icons`,
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
export const getActiveSettingIcon = async () => {
  try {
    const fetchOption = {
        next: {
          tags: ["get-setting-icon"],
        },
      };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get-active/icons`,
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

// delete setting icon api
export const deleteIcon = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/delete/icon/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        revalidateTag("get-setting-icon");
        return response.data;
      } catch (error) {
        return error;
      }
};

// update setting icon api
export const settingIconUpdate = async (data: any) => {
    try {
      
      const response = await axiosInstance.post("/update/system-icon", data);
      // console.log(response);
      revalidateTag("get-setting-icon");
      return response.data;
    } catch (error) {
      return error;
    }
  };



