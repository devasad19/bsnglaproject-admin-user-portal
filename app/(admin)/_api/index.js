import axios from "axios";
import Cookies from "js-cookie";


const token = Cookies.get("token");





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