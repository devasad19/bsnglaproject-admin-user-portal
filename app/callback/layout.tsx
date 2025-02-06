import "@/app/globals.css";
import { ReactNode } from "react";


export const metadata = {
  title: 'বাংলা প্রকল্প ব্যবস্থাপনা সিস্টেম',
  icons: {
    icon: '/assets/images/favicon.png',
  },
};

export default function RootLayout({ children }:{children:ReactNode}) {
 return (
    <section>{children}</section>
  )
}