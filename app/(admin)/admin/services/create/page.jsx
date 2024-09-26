"use client";
import { useState } from "react";
import ServiceResource from "../_components/ServiceResource";
import ServiceDetailsResource from "../_components/ServiceDetailsResource";
import BanglaResource from "../_components/BanglaResource";

const Home = () => {
  const [tab, setTab] = useState(0);
  return (
    <>
      <section className="pb-10">
        <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
          Create New Service
        </h3>
        <div className="flex justify-center w-full">
          <div className="bg-white p-4 w-full lg:w-[80%] overflow-hidden">
            <div className="flex flex-col gap-3">
              <h1 className="text-20 font-mono font-bold text-[#151D48]">
                Service Details
              </h1>

              <div>
                <div className="grid  grid-cols-1 lg:grid-cols-3 gap-2 pb-5">
                  <button
                    type="button"
                    onClick={() => setTab(0)}
                    className={`text-white px-4 py-2 rounded ${
                      tab == 0 ? "bg-primary" : "bg-primary/50"
                    }`}
                  >
                    Service Resource
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab(1)}
                    className={`text-white px-4 py-2 rounded ${
                      tab == 1 ? "bg-primary" : "bg-primary/50"
                    }`}
                  >
                    Service Details Resource
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab(2)}
                    className={`text-white px-4 py-2 rounded ${
                      tab == 2 ? "bg-primary" : "bg-primary/50"
                    }`}
                  >
                    Bangla Resource
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {tab == 0 && (
                    <>
                      <ServiceResource />
                    </>
                  )}
                  {tab == 1 && (
                    <>
                      <ServiceDetailsResource />
                    </>
                  )}
                  {tab == 2 && (
                    <>
                      <BanglaResource />
                    </>
                  )}
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
