'use client';
import { useState } from "react";
import UpdateServiceResource from '../../../../component/service/UpdateServiceResource/UpdateServiceResource';
import UpdateBanglaResource from '../../../../component/service/UpdateBanglaResource/UpdateBanglaResource';
import UpdateServiceDetailsResource from '../../../../component/service/UpdateServiceDetailsResource/UpdateServiceDetailsResource';

const Home = ({params: {id}}) => {
  const [tab, setTab] = useState(0);

  return (
    <section className="pb-10">
      <div>
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
                      <UpdateServiceResource id={id} />
                    </>
                  )}
                  {tab == 1 && (
                    <>
                      <UpdateServiceDetailsResource id={id} />
                    </>
                  )}
                  {tab == 2 && (
                    <>
                      <UpdateBanglaResource id={id} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};
export default Home;