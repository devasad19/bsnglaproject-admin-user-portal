"use client"
import { getServices } from '@/app/(portal)/_api';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import {  useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';

const PurchaaseServicePage = () =>{
    const [services, setServices] = useState<any>([]);
    const [parChaseService, setParChaseService] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const services = await getServices();

  useEffect(() => {
    setIsLoading(true);
    getServices()
      .then((data) => (setServices(data), setIsLoading(false)))
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    try {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/all/payments?page=${1}&limit=${10}`).then((res) => {
        setParChaseService(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log({parChaseService});
  return (
    <section>
    <div className="flex flex-wrap justify-between">
      <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
       Purchase Service List by users
      </h3>
    </div>
    <div className="w-full overflow-x-auto bg-white p-7 rounded-md">
      <table className="w-full">
        <thead className="border-b border-[#151D48] text-[#151D48] h-10 text-12 lg:text-16">
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Description</th>
            <th className="text-center">Link</th>
            <th className="text-center">Status</th>
            <th className="text-center">Date</th>
            <th className="text-center">Details</th>
          </tr>
        </thead>
        <tbody className="[&>tr]:border-b [&>tr]:border-[#151D48] [&>tr]:text-left [&>tr]:h-16 text-12 lg:text-16">
        {isLoading && (
                <tr>
                  <td colSpan={6}>
                    <Skeleton width="100%" count={10} height={50} />
                  </td>
                </tr>
              )}
          {services?.map((item:any, index:number) => (
            <tr key={index}>
              <td className="px-2">
                <Link
                  href={{
                    pathname: `/user/services/${item?.id}`,
                  }}
                  className="flex items-center gap-2 text-14"
                  shallow
                >
                  <span className="flex items-center gap-3">
                    <Image
                      className="w-10 h-10 rounded-md"
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.img}`}
                      height={1000}
                      width={1000}
                      alt="Bangla"
                    />
                    {/* {item?.name.substring(0, 15)
                        ? item?.name.substring(0, 15)
                        : item?.name.substring(0, 15) + "..."} */}
                    {item?.name || " "}
                  </span>
                </Link>
              </td>
              <td className="text-center">
                {
                  item?.des?.length>25 ? item?.des?.substring(0, 25) + "..." : item?.des
                }
                
                
              </td>

              <td className="text-center">{item?.link}</td>
              <td
                className={`text-center ${
                  item?.status === "1" && "text-green-500"
                } ${item?.status === "2" && "text-red-500"} ${
                  item?.status === "3" && "text-gray-500"
                }`}
              >
                {item?.status === "1" && "Active"}
                {item?.status === "2" && "Inactive"}
                {item?.status === "3" && "Archeive"}
              </td>
              <td className="text-center">
                {new Date(item?.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td className="text-center cursor-pointer">
                {/* <Link
                  href={{
                    pathname: `/services/${item?.id}`,
                  }}
                  className="text-14 border border-primary bg-primary hover:text-white px-2 py-1 rounded-md"
                  shallow
                >
                  <span className="text-white">Service Details</span>
                </Link> */}
                <Link
                  href={{
                    pathname: `/user/accounts-settings/purchase-services/${item?.id}`,
                  }}
                  className="text-14 border border-primary bg-primary hover:text-white px-2 py-1 rounded-md ms-2"
                  shallow
                >
                  <span className="text-white">Details</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
  )
}

export default PurchaaseServicePage
