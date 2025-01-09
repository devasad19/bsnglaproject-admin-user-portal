"use client";
import { createContext, useContext } from "react";
import useLoginUser from "./useLoginUser";
interface HomeContextType {
  // Define the shape of your context here
  // For example:
  user: any;
  login: () => void;
}

const HomeContext = createContext<HomeContextType | null>(null);

export default function HomeContextProvider({ children }: any) {
  /***********************************/
  /* use this pattern  */
const loginUser = useLoginUser();


  return (
    <HomeContext.Provider
      value={
        {
        ...loginUser,
        } as any
      }
    >
      {children}
    </HomeContext.Provider>
  );
}

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHomeContext must be used within a Bangla backend ContextProvider");
  }

  return useContext(HomeContext);
}
