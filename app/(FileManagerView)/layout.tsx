
import { ChildrenType } from "@/types/ChildrenType";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Layout = ({ children }: ChildrenType): JSX.Element => {
  let user;
  const userinfo = cookies().get("user");
  if (!userinfo) {
    redirect(process.env.NEXT_PUBLIC_PORTAL_URL + "/signin");
  }
  return (
    <>
      <section className="2xl:container 2xl:mx-auto flex">
        <section className="bg-white w-full max-h-screen overflow-auto">
          {children}
        </section>
      </section>
    </>
  );
};
export default Layout;