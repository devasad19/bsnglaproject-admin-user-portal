"use client";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useEffect, useState, useRef, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

const Callback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("অথেনটিকেটিং...");
  const stateRef = useRef(parseCookies()?.state);

  // Axios instance with base config
  const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus("অ্যাক্সেস টোকেন অনুরোধ করা হচ্ছে...");

        // Step 1: Obtain Access Token
        const tokenResponse = await axiosInstance.post(
          `${process.env.SSO_URL}/oauth/token`,
          {
            grant_type: "authorization_code",
            client_id: process.env.SSO_CLIENT_ID,
            client_secret: process.env.SSO_SECRET,
            redirect_uri: `${process.env.LDTAX_PORTAL_BASE}/callback`,
            code: code,
          }
        );

        const accessToken = tokenResponse.data.access_token;
        setCookie(null, "sso", JSON.stringify(tokenResponse.data));
        console.log(tokenResponse)
        // Step 2: Fetch User Data
        setStatus("ব্যবহারকারীর ডেটার জন্য অপেক্ষা করা হচ্ছে...");
        const userResponse = await axiosInstance.get(
          `${process.env.SSO_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const userData = userResponse.data;

        if (userData) {
          await handleSetUserToCookie(userData,accessToken);
          // router.replace('/citizen/welcome');
          if (userData?.type === 'system_user') {
            router.push('/admin');
          } else {
            router.push('/user')
          }
        }

      } catch (error) {
        console.error("Error during data fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code, router]);
 
  const handleSetUserToCookie = async (userData, accessToken) => {
    setStatus('নাগরিক তথ্য প্রক্রিয়াকরণ...');

    let userInfo;
    console.log({userData});
    
    if (userData?.user_info
      ?.type === "admin") {
      userInfo = {
        id: userData?.user_info?.id,
        name: userData?.user_info?.name,
        email: userData?.user_info?.email,
        type: userData?.user_info?.type,
      };
      // console.log("admin user: ", user);
    } else {
      userInfo = {
        id: userData?.user_info?.id,
        name: userData?.user_info?.name,
        role: userData?.user_info?.role,
        email: userData?.user_info?.email,
        phone: userData?.user_info?.phone,
        status: userData?.user_info?.status,
        photo: userData?.user_info?.photo,
        type: userData?.user_info?.type,
      };

      const isLocalhost = window.location.hostname === "localhost";
      const cookieDomain = isLocalhost ? "localhost" : ".bangla.gov.bd";
      // console.log(" user: ", userInfo);
      Cookies.set("token", accessToken, {
        domain: cookieDomain,
        path: "/",
        secure: !isLocalhost,
      });
      Cookies.set("user", JSON.stringify(userInfo), {
        domain: cookieDomain,
        path: "/",
        secure: !isLocalhost,
      });
    }
  }

  return (
    // loading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-green-600 p-8 rounded-lg text-center text-600 text-white">
        <h2 className="p-4">
          bangla project ব্যবস্থাপনা সিস্টেম ব্যবস্থাপনায় আপনাকে স্বাগতম
        </h2>
        <p className="animate-pulse opacity-1">{status}</p>
        <p className="animate-pulse opacity-1"></p>
      </div>
    </div>
    // ) : null
  );
};



const page = ()=>{
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Callback/>
    </Suspense>
  )
}
export default page;