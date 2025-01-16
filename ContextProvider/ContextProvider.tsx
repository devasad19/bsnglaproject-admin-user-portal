"use client";
import { getUserDetails } from "@/app/(admin)/_api/UserApi";
import { TUser } from "@/types/user/User";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

type TContextType = {
  setFeatureSelectedInfoAll?: any;
  featureSelectedInfoAll?: any;
  featureTotalPrice?: any;
  setFeatureTotalPrice?: any;
  user: TUser | {};
  refresh: boolean;
  setRefresh: any;
};

export const MyContext = createContext<TContextType | undefined>(undefined);

const ContextProvider = ({ children }: any) => {
  const [featureSelectedInfoAll, setFeatureSelectedInfoAll] = useState<any>([]);
  const [featureTotalPrice, setFeatureTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<TUser | {}>({});
  const [refresh, setRefresh] = useState<boolean>(false);

  

  const fetchData = async () => {
    let userData: any = Cookies.get("user");
    if (userData) {
      userData = JSON?.parse(userData);
    }
    try {
      if (userData?.id) {
        const response = await getUserDetails(userData?.id);
        setUser(response.data.data);
      } else {
        toast.error("User not found");
        setUser({});
      }
    } catch (error: any) {
      setUser({});
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const contextValue: TContextType = {
    setFeatureSelectedInfoAll,
    featureSelectedInfoAll,
    setFeatureTotalPrice,
    featureTotalPrice,
    user,
    setRefresh,
    refresh
  };
  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default ContextProvider;
