"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { permission } from "process";
// create user Type api

// create single Parent Permission api
export const createParentPermission = async (data: any) => {
  try {
    const response = await axiosInstance.post("/permission-parents", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("get-parent-permissions");
    return response.data;
  } catch (error) {
    throw new Error("Failed to Create Parent Permission data");
  }
};

// create single permission api

export const createSinglePermission = async (data: any) => {
  try {
    const response = await axiosInstance.post("/permissions", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("get-permissions");
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to Create Permission data");
  }
};

// get all Parent Permissions api
export const getAllParentPermission = async () => {
  try {
    const fetchOption = {
      next: {
        tags: ["get-parent-permissions"],
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/permission-parents`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {}
};

// get all permissions api
export const getAllPermission = async () => {
  try {
    const fetchOption = {
      next: {
        tags: ["get-permissions"],
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/permissions`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {}
};

// get single user type
export const getUserType = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/user-type/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// update user type api

export const manageUserTypeUpdate = async (data: any) => {
  try {
    const response = await axiosInstance.post("/update/user-type", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response);

    revalidateTag("get-user-types");

    return response.data;
  } catch (error) {
    return error;
  }
};

// delete user type api
export const deleteUserType = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/delete/user-type/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("get-user-types");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateUserPermission = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      "/update/user-type/permissions",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
