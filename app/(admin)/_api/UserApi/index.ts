"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const getUserDetails = async (id: any) => {
    try {
      const response = await axiosInstance.get(`/user/details/${id}`,  {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // revalidateTag("get-permissions");
      return response.data;
    } catch (error) {
      // console.log(error);
      return {
        status:false,
        error:error
      }
    }
  };
