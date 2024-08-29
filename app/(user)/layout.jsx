import Sidebar from "./component/Sidebar";
const Layout = async ({ children }) => {
 
  return (
    <section className="2xl:container 2xl:mx-auto flex">
      <Sidebar />
      <div className="bg-slate-100 w-full p-4 max-h-screen overflow-auto">
        {children}
      </div>
    </section>
  );
};

export default Layout;
