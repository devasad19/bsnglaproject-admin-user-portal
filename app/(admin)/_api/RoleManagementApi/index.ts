"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";





// create single roles api

export const createRolePermission = async (data: any) => {
  try {
    const response = await axiosInstance.post("/roles", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // revalidateTag("get-permissions");
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      status:false,
      error:error
    }
  }
};

// get all  Permissions with Parent api
export const getAllPermissionWithParent = async () => {
  try {
    const fetchOption = {
      next: {
        tags: ["get-parentWith-permissions"],
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/permissions-with-parent`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};


