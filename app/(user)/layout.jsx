import HomeContextProvider from "@/ContextProvider/Home.Context";
import Sidebar from "./component/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const Layout = async ({ children }) => {
  let user;
  const userinfo = cookies().get("user");
  if (!userinfo) {
    redirect(process.env.NEXT_PUBLIC_PORTAL_URL + "/signin");
  }


  return (
    <HomeContextProvider>
    <section className="2xl:container 2xl:mx-auto flex">
      <Sidebar />
      <div className="bg-slate-100 w-full p-4 max-h-screen overflow-auto">
        {children}
      </div>
    </section>
    </HomeContextProvider>
  );
};

export default Layout;
