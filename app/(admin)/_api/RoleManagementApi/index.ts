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
    revalidateTag("get-role-permissions");
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
    return error;
  }
};

export const getAllRolePermission = async () => {
  try {
    const fetchOption = {
      next: {
        tags: ["get-role-permissions"],
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/roles`,
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


export const rolePermissionNameUpdate = async (data: any) => {
  try {
    
    const response = await axiosInstance.post("/role/update", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response);
    
    revalidateTag("get-role-permissions");

    return response.data;
  } catch (error) {
    return error;
  }
};

export const singlePermissionRoleGet =async (id: any) => {
  try {
    const response = await axiosInstance.get(`/edit/permissions-by-role/${id}`);
    return response?.data;
  } catch (error) {
    return error;
  }
}


export const singleRoleManageUpdate = async (data: any) => {
  try {
    const response = await axiosInstance.post("/update-role-permissions", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response);

    revalidateTag("get-role-permissions");

    return response.data;
  } catch (error) {
    return error;
  }
};


