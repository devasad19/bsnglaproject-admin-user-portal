import { Inter } from "next/font/google";
import 'react-loading-skeleton/dist/skeleton.css'
import "./globals.css";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type ChildrenType } from "@/types/ChildrenType";
// import '@smastrom/react-rating/style.css'
import  ContextProvider  from "../ContextProvider/ContextProvider";
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
      <ContextProvider>
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
    </body>
  </html>
);
export default RootLayout;