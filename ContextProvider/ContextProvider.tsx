"use client"
import { TUser } from '@/types/user/User';
import axios from 'axios';
import Cookies from 'js-cookie';
import { cookies } from 'next/headers';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

type TContextType ={
  
  setFeatureSelectedInfoAll?:any;
  featureSelectedInfoAll?:any;
  featureTotalPrice?:any;
  setFeatureTotalPrice?:any;
  user:TUser | {}

}


export const MyContext = createContext<TContextType | undefined>(undefined);

 const ContextProvider = ({children}:any)=> {
  const [featureSelectedInfoAll, setFeatureSelectedInfoAll] = useState<any>([]);
  const [featureTotalPrice, setFeatureTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<TUser | {}>({});

  useEffect(() => {
    setLoading(true);
    const token = Cookies.get("token");
    const user:string | undefined =  Cookies.get("user");
    // const userInfo = JSON.parse(user ?? "");
    const userInfo = {};
    if (token && userInfo) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/details/${userInfo?.id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("GLobal Context :",res.data.data);
        setUser(res.data.data);
        setLoading(false);
      }).catch((err) => {
        setLoading(false);
        // console.log(err);
      })
    }
  }, []);

    const contextValue:TContextType ={
        setFeatureSelectedInfoAll,
        featureSelectedInfoAll,
        setFeatureTotalPrice,
        featureTotalPrice,
        user
    }
  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  )
}

export default ContextProvider
