import axios from "axios";
import Cookies from "js-cookie";


const token = Cookies.get("token");


export const getSoldServices = async () => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/admin/services`)
      .then((res) => {
        return res?.data;
      }).catch((err) => {
        console.log(err);
        return err;
      });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};


export const deleteService = async (id) => {
  try {
    const data = await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/service-all/delete/${id}`)
      .then((res) => {
        return res;
      }).catch((err) => {
        console.log(err);
        return err;
      });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};