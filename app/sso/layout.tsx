import { ReactNode } from "react";

export const metadata = {
    title: 'bangla project মেনেজমেন্ট ব্যবস্থাপনা সিস্টেম',
    icons: {
      icon: '/assets/images/favicon.png',
    },
  };
  
  export default function RootLayout({ children }:{children: ReactNode}) {
   return (
      <section>{children}</section>
    )
  }