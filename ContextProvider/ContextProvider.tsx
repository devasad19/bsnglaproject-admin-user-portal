"use client";
import { getUserDetails } from "@/app/(admin)/_api/UserApi";
import { TUser } from "@/types/user/User";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

type TContextType = {
  setFeatureSelectedInfoAll?: any;
  featureSelectedInfoAll?: any;
  featureTotalPrice?: any;
  setFeatureTotalPrice?: any;
  user: TUser | {};
};

export const MyContext = createContext<TContextType | null>(null);

const ContextProvider = ({ children }: any) => {
  const [featureSelectedInfoAll, setFeatureSelectedInfoAll] = useState<any>([]);
  const [featureTotalPrice, setFeatureTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<TUser | {}>({});

  // useEffect(() => {
  //   setLoading(true);
  //   const token = Cookies.get("token");
  //   const user: string | undefined = Cookies.get("user");
  //   const userInfo: any = {};
  //   if (token && userInfo) {
  //     axios
  //       .get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/user/details/${userInfo?.id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log("GLobal Context :", res.data.data);
  //         setUser(res.data.data);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         // console.log(err);
  //       });
  //   }
  // }, []);

  const fetchData = async () => {
      let userData: any = Cookies.get("user");
      if (userData) {
        userData = JSON?.parse(userData);
      }
      try {
        const res = await getUserDetails(userData?.id);
        if (res?.data) {
          setUser(res.data);
        }
      } catch (error) {
        console.error("Error fetching active icons:", error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

  const contextValue: TContextType = {
    setFeatureSelectedInfoAll,
    featureSelectedInfoAll,
    setFeatureTotalPrice,
    featureTotalPrice,
    user,
  };
  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default ContextProvider;
