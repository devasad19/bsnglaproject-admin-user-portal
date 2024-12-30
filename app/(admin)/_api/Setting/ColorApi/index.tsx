"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";


// create user setting icon api
export const createColor = async (data: any) => {
  try {
    const response = await axiosInstance.post("/store/color", data,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("get-setting-colors");
    return response.data;
  } catch (error) {
    console.error("API Error:", error); // Log detailed error
    return { status: false, error }
  }
};

// get all setting Colors
export const getSettingColors = async () => {
  try {
    const fetchOption = {
        next: {
          tags: ["get-setting-colors"],
        },
      };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get-all-colors`,
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

// get all active color
export const getSettingActiveColors = async () => {
  try {
    const fetchOption = {
        next: {
          tags: ["get-setting-colors"],
        },
      };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get-active/colors`,
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
export const deleteColor = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/delete/color/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        revalidateTag("get-setting-colors");
        return response.data;
      } catch (error) {
        return error;
      }
};

// update setting icon api
export const settingColorUpdate = async (data: any) => {
    try {
      
      const response = await axiosInstance.post("/update/system-color", data,{
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response);
      revalidateTag("get-setting-colors");
      return response.data;
    } catch (error) {
      return error;
    }
  };



