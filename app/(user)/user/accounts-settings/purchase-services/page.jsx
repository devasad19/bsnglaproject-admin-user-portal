"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getBoughtServices } from '../../../_api';
import Image from "next/image";


const Home = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getBoughtServices(12)
      .then((data) => (setServices(data?.data), setIsLoading(false)))
      .catch((err) => console.log(err));
  }, []);

 

  return (
    <section>
      <div className="flex flex-wrap justify-between">
        <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
          Purchased Services
        </h3>
      </div>

      {
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-full overflow-x-auto bg-white p-7 rounded-md">
            <table className="w-full">
              <thead className="border-b border-[#151D48] text-[#151D48] h-10 text-12 lg:text-16">
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Description</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Details</th>
                </tr>
              </thead>
              <tbody className="[&>tr]:border-b [&>tr]:border-[#151D48] [&>tr]:text-left [&>tr]:h-20 text-12 lg:text-16">
                {isLoading && (
                  <tr>
                    <td colSpan={6}>
                      <Skeleton width="100%" count={10} height={50} />
                    </td>
                  </tr>
                )}
                {services?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-2">
                      <div className="flex items-center gap-2 text-14">
                        <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + (item?.service?.logo ?? '')} className="w-[5em] h-[5em]" width={1000} height={1000} alt="Bangla" />
                        <span className="flex items-center gap-3">
                          {item?.service?.name ?? ''}
                        </span>
                      </div>
                    </td>
                    <td className="text-center">
                      <p dangerouslySetInnerHTML={{ __html: item?.service?.description?.length > 25 ? item?.service?.description?.substring(0, 25) + "..." : item?.service?.description }} />
                    </td>

                    <td
                      className={`text-center ${item?.status === "1" && "text-green-500"
                        } ${item?.status === "2" && "text-red-500"} ${item?.status === "3" && "text-gray-500"
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

                      <details className="dropdown">
                        <summary className="btn m-1 h-auto min-h-1 border-none bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-500 hover:text-white">Options</summary>
                        <ul className="menu dropdown-content bg-gray-100 rounded-box z-[1] w-40 p-1 shadow-md right-0">
                          <li>
                            <Link target="_blank" href={process.env.NEXT_PUBLIC_LOCAL_PORTAL_URL+'/services/'+item?.service_id}>
                              Service Details
                            </Link>
                          </li>
                          <li>
                            <Link href={{
                              pathname: `/user/services/${item?.service_id}`
                            }}
                            shallow
                            >
                              Upgrade Package
                            </Link>
                          </li>
                          <li>
                            <Link href={{
                              pathname: `/user/accounts-settings/purchase-services/${item?.service_id}`
                            }}
                              shallow
                            >
                              Purchase Info
                            </Link>
                          </li>
                        </ul>
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }

    </section>
  );
};

export default Home;