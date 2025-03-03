import axios from "axios";
import Cookies from "js-cookie";


const token = Cookies.get("token");


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


export const getServicePurchaseHistory = async (id,user_id) =>{
    // user/service/purchase-history/42/130
    try {
        const data = await axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/user/service/purchase-history/${user_id}/${id}`)
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







