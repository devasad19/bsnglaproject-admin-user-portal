'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { relative_image_path } from "@/helper";
import Image from "next/image";
const Button = dynamic(() => import("@/app/_components/Button/Button"), {
  ssr: false,
});
import { getCitizenList } from "../../_api";


const Home = (): JSX.Element => {
  const [citizen, setCitizen] = useState([]);


  useEffect(() => {
    getCitizenList().then((response) => {
      setCitizen(response?.data)
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  // console.log('all citizen: ', citizen);

  return (
    <section className="bg-white rounded-lg p-4 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#E1F6F9] h-8">
              <th>SI</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {
              citizen?.map((item: any, index: any) => {
                return (
                  <tr key={index} className="h-16 border-b border-gray-300">
                    <td className="">
                      <span className="ml-2">{ item?.id }</span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <div className="flex flex-col text-left">
                          <span className="ml-2 text-13">{ item?.name }</span>
                          <span className="ml-2 text-[11px] text-[#868686]">
                          { item?.email }
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{ item?.phone }</td>
                    {/* <td className="font-medium text-13">5</td> */}
                    <td>{ item?.status === 1 ? 'Active' : 'Inactive' }</td>
                    <td>
                      <Button
                        bg={"#3b82f6"}
                        text={"View Details"}
                        btnSize={"sm"}
                        textSize={"md"}
                      />
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
        {/* <div className="pt-10 flex justify-center">
          <div className="flex items-center gap-2">
            <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 bg-primary text-white">
              Prev
            </button>
            <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 bg-primary text-white">
              1
            </button>
            <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
              2
            </button>
            <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
              3
            </button>
            <span>...</span>
            <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
              8
            </button>
            <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
              9
            </button>
            <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
              10
            </button>
            <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 bg-primary text-white">
              Next
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Home;
