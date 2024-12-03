import axios from "axios";
import Cookies from "js-cookie";


const token = Cookies.get("token");


export const changePassword = async (payload) => {
    try {
        const data = await axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/citizen/password-update`, payload)
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

export const updateCitizenData = async (payload) => {
    try {
        const data = await axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/citizen/update`, payload)
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


export const getCitizenData = async (id) => {
    try {
        const data = await axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/citizen/user/${id}`)
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


export const getDashboardStats = async (id) => {
    try {
        const data = await axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/user/dashboard/service-count/${id}`)
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


export const getServiceFeedBacks = async (id) => {
    try {
        const data = await axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/user/feedbacks/${id}`)
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