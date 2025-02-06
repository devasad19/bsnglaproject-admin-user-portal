// 'use client'
// import { setCookie } from "nookies";
// import { useRouter, redirect } from "next/navigation";

// const SSO = (props) => {

//     const router = useRouter();

//     let state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
//     setCookie(null,'state',state);

//     let paramObj = {
//             'client_id': `${process.env.SSO_CLIENT_ID}`,
//             'redirect_uri': `${process.env.LDTAX_PORTAL_BASE}/callback`,
//             'response_type': 'code',
//             'scope': 'view-user',
//             'state': state
//         };

//     const objString = new URLSearchParams(paramObj).toString();

//     redirect(`${process.env.SSO_URL}/oauth/authorize?${objString}`);

// }

// export default SSO;

"use client";
import { setCookie } from "nookies";
import { useRouter, redirect } from "next/navigation";
import { useEffect } from "react";

const SSO = () => {
  const router = useRouter();

  useEffect(() => {
    const state =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    setCookie(null, "state", state);

    const params = new URLSearchParams({
      client_id: process.env.SSO_CLIENT_ID as string,
      redirect_uri: `${process.env.LDTAX_PORTAL_BASE}/callback`,
      response_type: "code",
      scope: "view-user",
      state: state,
    });

    // redirect(`${process.env.SSO_URL}/oauth/authorize?${params.toString()}`);
    router.push(`${process.env.SSO_URL}/oauth/authorize?${params.toString()}`);
  }, [router]);

  return null;
};

export default SSO;
