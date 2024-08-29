"use client"
import React, { useState } from 'react'
import { createContext } from 'react'

type TContextType ={
  
  setFeatureSelectedInfoAll?:any;
  featureSelectedInfoAll?:any;
  featureTotalPrice?:any;
  setFeatureTotalPrice?:any

}


export const MyContext = createContext<TContextType | undefined>(undefined);

 const ContextProvider = ({children}:any)=> {
  const [featureSelectedInfoAll, setFeatureSelectedInfoAll] = useState<any>([]);
  const [featureTotalPrice, setFeatureTotalPrice] = useState<number>(0);

    const contextValue:TContextType ={
        setFeatureSelectedInfoAll,
        featureSelectedInfoAll,
        setFeatureTotalPrice,
        featureTotalPrice
    }
  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  )
}

export default ContextProvider
