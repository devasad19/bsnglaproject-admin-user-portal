import { Inter } from "next/font/google";
import 'react-loading-skeleton/dist/skeleton.css'
import "./globals.css";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type ChildrenType } from "@/types/ChildrenType";
import '@smastrom/react-rating/style.css'
import  ContextProvider  from "../ContextProvider/ContextProvider";
import HomeContextProvider from "@/ContextProvider/Home.Context";
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "বাংলা",
  description: "Enhancement of Bangla Language Project",
  icons: {
    icon: "/favicon.ico",
  },
};
const RootLayout = ({ children }: ChildrenType): JSX.Element => (
  <html lang="en">
    <body className={inter.className}>
      <HomeContextProvider>
      <ContextProvider>
      <NextTopLoader showSpinner={false} color="#006A4E" />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
      {children}
      </ContextProvider>
      </HomeContextProvider>
    </body>
  </html>
);
export default RootLayout;