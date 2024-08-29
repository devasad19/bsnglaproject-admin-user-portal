// export const revalidate = 3600;
"use client";
import Image from "next/image";
import { relative_image_path } from "@/helper";
import { useEffect, useState } from "react";
import { getFeaturesByServiceId, getSingleService } from "@/app/(portal)/_api";
const Home = ({ params: { id } }) => {
  const [service, setService] = useState({});
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log("id", id);
  useEffect(() => {
    setIsLoading(true);
    getSingleService(id)
      .then((data) => (setIsLoading(false), setService(data)))
      .catch((err) => console.log(err));
    getFeaturesByServiceId(id).then(
      (data) => (setIsLoading(false), setFeatures(data?.data))
    );
  }, [id]);
  console.log({ service, features });
  const maxPlanLength = Math.max(
    ...features.map((fItem) => JSON.parse(fItem.plans || "[]").length)
  );
  console.log({ maxPlanLength });

  return (
    <section>
      <div className="flex flex-col lg:flex-row gap-2 bg-white p-4 rounded mb-5">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${service?.img || ""}`}
          className="w-16 h-16 lg:h-[5em] lg:w-[5em] pb-2"
          width={1000}
          height={1000}
          alt="Bangla"
        />
        <div>
          <h3 className="text-20 font-medium"> {service?.name}</h3>
          <p>{service?.des}</p>
        </div>
      </div>
      <div className="max-[768px]:w-[165vw] lg:w-auto flex justify-center items-center overflow-x-auto">
        <div className="w-full lg:w-[70%] flex  bg-white p-4">
          <div className="min-h-[20vh] w-full">
            <table className="w-full">
              <thead className="w-full bg-primary py-4 text-white">
                <tr className="text-center">
                  <th className="py-4">Feature Name</th>
                  <th colSpan={5} className="py-4">
                    Plan
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((fItem, index) => {
                  let plans = JSON.parse(fItem.plans || "[]");

                  return (
                    <tr key={index}>
                      <td className="text-center w-[35%] py-6 border border-l border-gray-200">
                        <div>
                          <h1 className="text-16 font-semibold">
                            {fItem?.name}
                          </h1>
                        </div>
                      </td>
                      {plans.map((pItem, planIndex) => {
                        return (
                          <td
                            key={planIndex}
                            className="border border-gray-200 w-12 h-12"
                          >
                            <div className="text-center">
                              <h1 className="text-16 font-semibold">
                                {pItem?.limit + " " + fItem?.unit}
                              </h1>
                            </div>
                          </td>
                        );
                      })}
                      {Array.from({ length: maxPlanLength - plans.length }).map(
                        (_, emptyIndex) => (
                          <td
                            key={`empty-${emptyIndex}`}
                            className="border border-gray-200 w-12 h-12"
                          ></td>
                        )
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

{
  /* <div className="">
            <h1>Plans</h1>
            <div className="w-full grid grid-cols-3 bg-white p-3">
              <div className="min-h-[20vh] grid grid-rows-6 border border-blue-500 bg-blue-100 rounded-2xl text-14">
                <div className="flex justify-center items-center">
                  <p className="font-semibold text-center">Premium</p>
                </div>
                <div className="p-4 border-b border-gray-300">
                  <p className="text-center">Monthly Email Sends</p>
                </div>
                <div className="p-4 border-b border-gray-300">
                  <p className="text-center">Monthly Email Sends</p>
                </div>
                <div className="p-4 border-b border-gray-300">
                  <p className="text-center">Monthly Email Sends</p>
                </div>
                <div className="p-4 border-b border-gray-300 flex justify-center">
                  <p className="text-center">
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                  </p>
                </div>
                <div className="p-4 border-b border-gray-300 flex justify-center">
                  <p className="text-center">
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                  </p>
                </div>
                <div className="p-4 py-6 border-b border-gray-300 flex justify-center items-center">
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    RUNNING
                  </button>
                </div>
              </div>
             
            </div>
          </div> */
}
