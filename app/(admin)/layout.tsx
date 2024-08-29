import Sidebar from "./component/Sidebar";
import { ChildrenType } from "@/types/ChildrenType";

const Layout = ({ children }: ChildrenType): JSX.Element => {
  return (
    <>
      <section className="2xl:container 2xl:mx-auto flex">
        <Sidebar />
        <section className="bg-slate-100 w-full p-4 max-h-screen overflow-auto">
          {children}
        </section>
      </section>
    </>
  );
};
export default Layout;