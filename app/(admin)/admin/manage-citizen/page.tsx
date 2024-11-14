'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { relative_image_path } from "@/helper";
import Image from "next/image";
const Button = dynamic(() => import("@/app/_components/Button/Button"), {
  ssr: false,
});
import { getCitizenList } from "../../_api";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";


const Home = (): JSX.Element => {
  const [citizen, setCitizen] = useState([]);


  useEffect(() => {
    getCitizenList().then((response) => {
      setCitizen(response?.data)
    }).catch((error) => {
      console.log(error);
    });
  }, []);


  return (
    <section className="bg-white rounded-lg p-4 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#E1F6F9] h-8">
              <th>SL</th>
              <th>Image</th>
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
                  <td className="px-3">
                    <span className="border border-gray-300 px-2 py-1 rounded-md">
                      {index + 1}
                    </span>
                  </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <div className="flex flex-col text-left">
                           <img className="rounded-full" width="50" height="50" src={relative_image_path('demo_profile.png')} alt="" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <div className="flex flex-col text-left">
                          <span className="ml-2 text-13">{item?.name}</span>
                          <span className="ml-2 text-[11px] text-[#868686]">
                            {item?.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{item?.phone}</td>
                    {/* <td className="font-medium text-13">5</td> */}
                    <td>{item?.status === 1 ? 'Active' : 'Inactive'}</td>
                    <td>
                      <button className="bg-blue-500 text-white rounded p-2">
                        <FaRegEdit />
                      </button>

                      <button className="ml-2 bg-red-500 text-white rounded p-2">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Home;
