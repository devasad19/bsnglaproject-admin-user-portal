import axios from "axios";
import Cookies from "js-cookie";


const token = Cookies.get("token");


export const getServicePurchaseHistory = async (id) =>{
    try {
        const data = await axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/user/service/purchase-list/${id}`)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getInvoiceDetails = async (id)=>{
    try {
        const data = await axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/citizen-invoice/get-details/${id}`)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};


export const getUserOrders = async (id) => {
    try {
        const data = await axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/user/orders/${id}`)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};


export const getBoughtServices = async (id) => {
    try {
        const data = await axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/user/services/${id}`)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};