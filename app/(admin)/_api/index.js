import axios from "axios";
import Cookies from "js-cookie";


const token = Cookies.get("token");


export const getAdminPurchaseServiceDetails = async (id) => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-service-orders/${id}`)
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



export const getCitizenList = async () => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/citizen/users`)
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


export const updateServiceBanglaResource = async (payload, id) => {
  try {
    const res = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/bn-resource/update/service/${id}`,
        payload
      )
      .then((res) => {
        return res?.data;
      }).catch((err) => {
        console.log(err);
        return err;
      });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getServiceBanglaResource = async (id) => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/bn-service-resource/${id}`)
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

export const getSingleServiceDetailsResource = async (id) => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/service-details/${id}`)
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


export const updateServiceResource = async (payload, id) => {
  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/service/${id}`,
      payload
    )
    .then((res) => {
      return res?.data;
    }).catch((err) => {
      console.log(err);
      return err;
    });
  return res;
};

export const updateSingleServiceResource = async (payload, id) => {
  console.log('before hitting api: ',payload, id);
  try{
    const res = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/update/service-details-resource/${id}`,
        payload
      )
      .then((res) => {
        return res?.data;
      }).catch((err) => {
        console.log(err);
        return err;
      });
    return res;
  } catch(err){
    console.log(err);
  }
};

export const getSingleServiceResource = async (id) => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/service/${id}`)
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

export const getUserFeedBacks = async () => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/admin/feedbacks`)
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