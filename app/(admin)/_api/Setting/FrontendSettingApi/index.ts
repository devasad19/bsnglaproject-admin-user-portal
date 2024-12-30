"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";


// create user setting icon api
export const createLogo = async (data: any) => {
  try {
    const response = await axiosInstance.post("/manage-system-logo", data);
    revalidateTag("get-logo");
    return response.data;
  } catch (error) {
    console.error("API Error:", error); // Log detailed error
    return { status: false, error }
  }
};

// get all setting Colors
export const getLogo = async () => {
  try {
    const fetchOption = {
        next: {
          tags: ["-logetgo"],
        },
      };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get-system-content`,
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

