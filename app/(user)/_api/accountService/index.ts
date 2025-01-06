"use server";
import axiosInstance from "@/lib/AxiosInstance";

export const getBoughtServices = async (id: any) => {
  try {
    const response = await axiosInstance.get(`/user/service/purchase-list/${id}`);
    return response?.data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const getUserOrders = async (id: any) => {
  try {
    const response = await axiosInstance.get(`/user/orders/${id}`);
    return response?.data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const getInvoiceDetails = async (id: any) => {
  try {
    const response = await axiosInstance.get(
      `/citizen-invoice/get-details/${id}`
    );

    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
