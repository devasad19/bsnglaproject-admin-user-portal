import ServiceResource from "../_components/ServiceResource";
import ServiceResourceNew from "../_components/ServiceResourceNew";

const Home = () => {
  return (
    <>
      <section className="pb-10">
        <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
          Create New Service
        </h3>
        <div className="flex justify-center w-full">
          <div className="bg-white p-4 w-full lg:w-[80%] overflow-hidden">
            <div className="flex flex-col gap-3">

              <div>
                <div className="flex flex-col gap-4">
                  {/* <ServiceResource /> */}
                  <ServiceResourceNew/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
