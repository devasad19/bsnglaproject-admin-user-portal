"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

//1. create service api
export const createService = async (data: any) => {
  try {
    const response = await axiosInstance.post("/store/service", data, {});
    revalidateTag("get-service");
    // console.log(response.data);
    return response?.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

//2. get all Services
export const getServices = async (params: any) => {
  try {
    const res = await axiosInstance.get("/services", {
      params,
    });
    return res?.data;
  } catch (error) {}
};

// 3. get single service details Resource
export const getSingleServiceDetailsResource = async (id: any) => {
  try {
    const response = await axiosInstance.get(`/service-details/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};

// 4. update single service details Resource First tab
export const updateSingleServiceResourceCodeUpdate = async (
  id: any,
  data: any
) => {
  try {
    const response = await axiosInstance.post(`/service/${id}`, data, {});
    // console.log(response);
    revalidateTag("get-service");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("API Error:", error); // Log detailed error
    return { status: false, error };
  }
};

//update single service details resource Second Tab
export const updateSingleServiceDetailsResource = async (
  payload: any,
  id: any
) => {
  // console.log("before hitting api: ", payload, id);
  try {
    const response = await axiosInstance.post(
      `/update/service-details-resource/${id}`,
      payload
    );
    revalidateTag("get-service");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error); // Log detailed error
    return { status: false, error };
  }
};

// get single Service
export const getSingleService = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/service/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

//4. update Service

export const updateService = async (id: any, data: any) => {
  try {
    const response = await axiosInstance.post(`/service/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response);

    revalidateTag("get-service");

    return response.data;
  } catch (error) {
    return error;
  }
};

//get single service Reource code
export const getSingleServiceResourceCodeApi = async (id: any) => {
  try {
    const response = await axiosInstance.get(`/service/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};
//delete service code api
export const deleteServiceCodeApi = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/service-all/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("get-service");
    return response.data;
  } catch (error) {
    return error;
  }
};

//publish unpublish service
export const publishUnpublishService = async (id: number, status: any) => {
  try {
    const response = await axiosInstance.post(
      `service/publish-unpublish/${id}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response);
    revalidateTag("get-service");
    return response.data;
  } catch (error) {
    return error;
  }
};

// const result = await fetch(
//   `${process.env.NEXT_PUBLIC_API_URL}/service/publish-unpublish/${id}`,
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ status: status }),
//   }
// )
//   .then((res) => res.json())
//   .catch((err) => {
//     console.log(err);
//   });
