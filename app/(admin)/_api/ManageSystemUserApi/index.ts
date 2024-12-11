"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
// create user Type api
// export const manageUserTypeCreate = async (data: any) => {
//   try {
//     const response = await axiosInstance.post("/store/user-type", data, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     revalidateTag("get-user-types");
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };



// get all user types
export const getAllSystemUser = async () => {
  try {
    const fetchOption = {
        next: {
          tags: ["get-all-system-user"],
        },
      };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/system/users`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {}
};


export const createUserApi = async (userData:any) => {
  try {
    const user = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/create`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    revalidateTag("get-all-system-user");
    return user.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// get single user type
export const getUserType = async (id:number) => {
  try {
    const response = await axiosInstance.get(`/user-type/${id}`,{
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
}

export const updateUserPermission = async (data: any) => {
  try {
    const response = await axiosInstance.post("/update/user-type/permissions", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}



