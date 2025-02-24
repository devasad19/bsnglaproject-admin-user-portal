"use client";
import { useState } from "react";

import UpdateServiceResource from "../service/UpdateServiceResource/UpdateServiceResource";
import UpdateBanglaResource from "../service/UpdateBanglaResource/UpdateBanglaResource";
// import UpdateServiceDetailsResource from "../service/UpdateServiceDetailsResource/UpdateServiceDetailsResource";
 import UpdateServiceDetailsResourceNew from "../service/UpdateServiceDetailsResource/UpdateServiceDetailsResourceNew";
import { FaBackward } from "react-icons/fa";

const ServiceEditContainer = ({ id, secondTab,allColors,allIcons }) => {
  // console.log("secondTab", secondTab);
  
  const [tab, setTab] = useState(0);
  return (
    <section className="pb-10">
      <div>
        <button onClick={() => window.history.back()} className="text-primary flex items-center gap-2">
          <FaBackward className=" "/> Back
        </button>
        <h1 className="text-32 font-mono font-bold text-[#151D48] pb-5">
          Edit Service
        </h1>
      </div>
      <div className="flex justify-center w-full">
        <div className="bg-white p-4 w-full lg:w-[80%] overflow-hidden rounded">
          <div className="flex flex-col gap-3">
            <h1 className="text-20 font-mono font-bold text-[#151D48]">
              Service Details
            </h1>

            <div>
              <div className="grid  grid-cols-1 lg:grid-cols-2 gap-2 pb-5">
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
                {/* <button
                  type="button"
                  onClick={() => setTab(2)}
                  className={`text-white px-4 py-2 rounded ${
                    tab == 2 ? "bg-primary" : "bg-primary/50"
                  }`}
                >
                  Bangla Resource
                </button> */}
              </div>

              <div className="flex flex-col gap-4">
                {tab == 0 && (
                  <>
                    <UpdateServiceResource id={id} />
                  </>
                )}
                {tab == 1 && (
                  <>
                  <UpdateServiceDetailsResourceNew id={id}
                      secondTab={secondTab} setTab={setTab} allColors={allColors} allIcons={allIcons}/>
                  </>
                )}
                {/* {tab == 2 && (
                  <>
                    <UpdateBanglaResource id={id} />
                  </>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceEditContainer;
