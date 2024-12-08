import axios from "axios";
import Cookies from "js-cookie";


const token = Cookies.get("token");


export const getDashboardStats = async () => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard/feature-count`)
      .then((res) => {
        return res?.data?.data;
      }).catch((err) => {
        console.log(err);
      });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};


export const updatePortalMenu = async (payload) => {
  try {
    const data = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/update/menu-item`, payload)
      .then((res) => {
        return res?.data;
      }).catch((err) => {
        console.log(err);
      });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getSingleMenu = async (id) => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/signle/portal/menu/${id}`)
      .then((res) => {
        return res?.data;
      }).catch((err) => {
        console.log(err);
      });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};


export const getPortalMenu = async () => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/portal/menus`)
      .then((res) => {
        return res?.data?.data;
      }).catch((err) => {
        console.log(err);
      });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserTypes = async () => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/get-user-types`)
      .then((res) => {
        return res?.data?.data;
      }).catch((err) => {
        console.log(err);
      });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};


export const deletePortalMenu = async (id) => {
  try {
    const data = await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/portal/menu/delete/${id}`)
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


export const createPortalMenu = async (payload) => {
  try {
    const data = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/store/portal/menu`, payload)
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
}


export const updateHeroRight = async (payload) => {
  try {
    const data = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/store/slider-right-content/1`, payload)
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


export const getHeroRightData = async () => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/get/slider-right-content`)
      .then((res) => {
        return res?.data?.data;
      }).catch((err) => {
        console.log(err);
      });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};


export const updateFooterRight = async (payload) => {
  try {
    const data = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/store/footer/right-content`, payload)
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


export const getFooterRightData = async () => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/footer/single/right-content`)
      .then((res) => {
        return res?.data?.data;
      }).catch((err) => {
        console.log(err);
      });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};



export const updateFooterMiddle = async (id, payload) => {
  try {
    const data = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/update/footer/middle-content`, payload)
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



export const getFooterMiddleData = async () => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/footer/middle-content`)
      .then((res) => {
        return res?.data?.data;
      }).catch((err) => {
        console.log(err);
      });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};


export const upDateFooterLeft = async (payload) => {
  try {
    const data = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/footer/left/update/data`, payload)
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

export const getFooterLeftData = async () => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/footer/left-content`)
      .then((res) => {
        return res?.data?.data;
      }).catch((err) => {
        console.log(err);
      });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateSlider = async (id, payload) => {
  console.log("before hitting api: ", payload, id);
  try {
    const data = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/update/slider/${id}`, payload)
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

export const getSingleSlider = async (id) => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/slider/${id}`)
      .then((res) => {
        return res?.data;
      }).catch((err) => {
        console.log(err);
      });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};


export const DeleteSlider = async (id) => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/slider/delete/${id}`)
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

export const getAdminFeedBacks = async () => {
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

export const getUserFeedBacks = async (id) => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/feedbacks/${id}`)
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

export const getActiveServices = async () => {
  try {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/active/services`)
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