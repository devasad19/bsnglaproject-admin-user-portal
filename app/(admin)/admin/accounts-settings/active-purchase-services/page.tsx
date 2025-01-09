"use client";
import { getServices } from "@/app/(portal)/_api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getSoldServices } from "@/app/(admin)/_api";
import { activeSoldServiceApi } from "@/app/(admin)/_api/soldServiceApi";

const PurchaaseSoldServicePage = () => {
  const [services, setServices] = useState<any>([]);
  const [soldServices, setSoldServices] = useState<any>([]);
  const [parChaseService, setParChaseService] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const services = await getServices();

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data), setIsLoading(false);
      })
      .catch((err) => console.log(err));
    activeSoldServiceApi()
      .then((data) => {
        setSoldServices(data?.data), setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      <div className="flex flex-wrap justify-between">
        <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
          Sold Services:
        </h3>
      </div>
      <div className="w-full overflow-x-auto bg-white p-7 rounded-md">
        <table className="w-full">
          <thead className="border-b border-[#151D48] text-[#151D48] h-10 text-12 lg:text-16">
            <tr>
              <th className="text-center">SL</th>
              <th className="text-center">Name</th>
              <th className="text-center">Description</th>
              {/* <th className="text-center">Link</th> */}
              <th className="text-center">Status</th>
              <th className="text-center">Date</th>
              <th className="text-center">Details</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-b [&>tr]:border-[#151D48] [&>tr]:text-left [&>tr]:h-16 text-12 lg:text-16">
            {isLoading ? (
              <tr>
                <td colSpan={7}>
                  <Skeleton width="100%" count={10} height={50} />
                </td>
              </tr>
            ) : (
              soldServices?.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="px-3">
                    <span className="border border-gray-300 px-2 py-1 rounded-md">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-2">
                    <div className="flex items-center gap-2 text-14">
                      <span className="flex items-center gap-3">
                        <Image
                          className="w-10 h-10 rounded-md"
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${
                            item?.service?.logo ?? ""
                          }`}
                          height={1000}
                          width={1000}
                          alt="Bangla"
                        />
                        {/* {item?.name.substring(0, 15)
                          ? item?.name.substring(0, 15)
                          : item?.name.substring(0, 15) + "..."} */}
                        {item?.service?.name || " "}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          item?.service?.description?.length > 25
                            ? item?.service?.description?.substring(0, 25) +
                              "..."
                            : item?.service?.description,
                      }}
                    />
                    {/* {
                        item?.description?.length > 25 ? item?.description?.substring(0, 25) + "..." : item?.description
                      } */}
                  </td>

                  {/* <td className="text-center">{item?.visit_link ?? "N/A"}</td> */}
                  <td
                    className={`text-center ${
                      item?.status === "1" && "text-green-500"
                    } ${item?.status === "0" && "text-red-500"} ${
                      item?.status === "3" && "text-gray-500"
                    }`}
                  >
                    {item?.status === "1" && "Active"}
                    {item?.status === "0" && "Inactive"}
                    {/* {item?.status === "3" && "Archeive"} */}
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
                        pathname: `/admin/accounts-settings/purchase-services/${item?.service_id}`,
                      }}
                      className="text-14 border border-primary bg-primary hover:text-white px-2 py-1 rounded-md ms-2"
                      shallow
                    >
                      <span className="text-white">Details</span>
                    </Link>
                  </td>
                </tr>
              ))
            )}
            {/* {services?.map((item: any, index: number) => (
              <tr key={index}>
                <td className="px-2">
                  <Link
                    href={{
                      pathname: `/admin/services/${item?.id}`,
                    }}
                    className="flex items-center gap-2 text-14"
                    shallow
                  >
                    <span className="flex items-center gap-3">
                      <Image
                        className="w-10 h-10 rounded-md"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.logo ?? ''}`}
                        height={1000}
                        width={1000}
                        alt="Bangla"
                      />
                      {item?.name || " "}
                    </span>
                  </Link>
                </td>
                <td className="text-center">
                  {
                    item?.description?.length > 25 ? item?.description?.substring(0, 25) + "..." : item?.description
                  }


                </td>

                <td className="text-center">{item?.visit_link ?? "N/A"}</td>
                <td
                  className={`text-center ${item?.status === "1" && "text-green-500"
                    } ${item?.status === "0" && "text-red-500"} ${item?.status === "3" && "text-gray-500"
                    }`}
                >
                  {item?.status === "1" && "Active"}
                  {item?.status === "0" && "Inactive"}
                </td>
                <td className="text-center">
                  {new Date(item?.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="text-center cursor-pointer">
                  <Link
                    href={{
                      pathname: `/admin/accounts-settings/purchase-services/${item?.id}`,
                    }}
                    className="text-14 border border-primary bg-primary hover:text-white px-2 py-1 rounded-md ms-2"
                    shallow
                  >
                    <span className="text-white">Details</span>
                  </Link>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PurchaaseSoldServicePage;
