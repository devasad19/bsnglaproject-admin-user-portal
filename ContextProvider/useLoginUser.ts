import { getUserDetails } from "@/app/(admin)/_api/UserApi";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface userStateProps {
  user: any;
  setUser: any;
}

export default function useLoginUser(): userStateProps {
  const [user, setUser] = useState<any>({});

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

  return { user, setUser };
}
