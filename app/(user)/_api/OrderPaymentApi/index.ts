import axios from "axios";

export const upgradePackage = async (orderInfo:any)=>{
    try {
      const order = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update-package`,
        orderInfo
      );
      return order.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }


  export const billingAddressPostApi = async (billingAddressInfo:any)=>{
    try {
      const billingAddress = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/order/billing-address/save`,
        billingAddressInfo
      );
      return billingAddress.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }


  export const paymentPostApi = async (paymentInfo:any)=>{
    try {
      const paymentRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/payment/save`,paymentInfo);
      return paymentRes.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }