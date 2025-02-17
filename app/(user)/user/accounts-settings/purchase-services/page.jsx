"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import {
  relative_image_path,
  remainingDaysCalculate,
  remainingMonthsAndDays,
} from "@/helper";
import TableSkeleton from "@/app/_components/TableSkeleton/TableSkeleton";
import { useRouter } from "next/navigation";
import { getBoughtServices } from "@/app/(user)/_api/accountService";
import { useHomeContext } from "@/ContextProvider/Home.Context";
import { toast } from "react-toastify";

const Home = () => {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef([]);
  const { user } = useHomeContext();

  useEffect(() => {
    if (user?.id) {
      setIsLoading(true);
      getBoughtServices(user?.id)
        .then((response) => {
          setServices(response?.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error?.message);
          console.error("Error fetching data:", error);
        });
    }
  }, [user?.id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside any of the dropdowns
      if (
        dropdownRefs.current.every((ref) => ref && !ref.contains(event.target))
      ) {
        setActiveDropdown(null); // Close all dropdowns
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  // const handleRedirect = (id) => {
  //   // router.replace("https://service.bangla.gov.bd/services/" + id);
  //   router.replace(`${process.env.NEXT_PUBLIC_SERVICE_URL}`);
  // };

  console.log("services", services);

  return (
    <section className="w-full h-full">
      <div className="flex flex-wrap justify-between">
        <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
          Purchased Services
        </h3>
      </div>
      <div className="w-full min-h-screen  bg-white p-7 overflow-hidden rounded-md">
        <table className="w-full h-full  border-collapse rounded-md ">
          <thead className="border-b border-[#151D48]  h-10 text-12 bg-[#006A4E] text-white lg:text-16 rounded-md">
            <tr>
              <th className="text-center">SL</th>
              <th className="text-center">Name</th>
              <th className="text-center">Description</th>
              <th className="text-center">Status</th>
              <th className="text-center">Expire Date</th>
              <th className="text-center">Remaining Days</th>
              <th className="text-center">Details</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-b [&>tr]:border-gray-300 [&>tr]:text-left [&>tr]:h-auto text-12 lg:text-16">
            {isLoading && <TableSkeleton col={8} row={10}></TableSkeleton>}
            {services?.length > 0 && !isLoading
              ? services?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-3">
                        <span className="border border-gray-300 px-2 py-1 rounded-md">
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-2 text-14">
                          <Image
                            src={
                              item?.service?.logo?.length > 0
                                ? process.env.NEXT_PUBLIC_IMAGE_URL +
                                  item?.service?.logo
                                : relative_image_path("dummy_image1.jpg")
                            }
                            className="w-[5em] h-[5em]"
                            width={1000}
                            height={1000}
                            alt="Bangla"
                          />
                          <span className="flex items-center gap-3">
                            {item?.service?.name ?? ""}
                          </span>
                        </div>
                      </td>
                      <td className="text-center">
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              item?.service?.description?.length > 25
                                ? item?.service?.description?.substring(0, 25) +
                                  "..."
                                : item?.service?.description,
                          }}
                        />
                      </td>

                      <td
                        className={`text-center ${
                          remainingDaysCalculate(item?.expiry_date) > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {remainingDaysCalculate(item?.expiry_date) > 0
                          ? "Active"
                          : "Expired"}
                      </td>
                      <td className="text-center">{item?.expiry_date}</td>
                      <td className="text-center">
                        {remainingDaysCalculate(item?.expiry_date) > 0 ? (
                          <>
                            {remainingMonthsAndDays(item?.expiry_date).months >
                            0
                              ? `${
                                  remainingMonthsAndDays(item?.expiry_date)
                                    .months
                                } Months`
                              : ""}
                            {remainingMonthsAndDays(item?.expiry_date).days > 0
                              ? ` ${
                                  remainingMonthsAndDays(item?.expiry_date).days
                                } Days`
                              : ""}
                          </>
                        ) : (
                          "0"
                        )}
                      </td>
                      <td className="text-center cursor-pointer">
                        <details
                          className={`dropdown ${
                            activeDropdown === item.id ? "open" : ""
                          }`}
                          open={activeDropdown === item.id}
                          ref={(el) => (dropdownRefs.current[index] = el)}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleDropdown(item.id);
                          }}
                        >
                          <summary className="btn m-1 h-auto min-h-1 border-none bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-500 hover:text-white">
                            Options
                          </summary>
                          <ul
                            ref={(el) => (dropdownRefs.current[index] = el)}
                            className={`menu dropdown-content bg-gray-100 rounded z-[50] w-40 p-1 shadow-md right-0 absolute`}
                            style={{
                              bottom:
                                window.innerHeight -
                                  dropdownRefs.current[
                                    index
                                  ]?.getBoundingClientRect().bottom <
                                150
                                  ? "100%"
                                  : "auto",
                              top:
                                window.innerHeight -
                                  dropdownRefs.current[
                                    index
                                  ]?.getBoundingClientRect().bottom <
                                150
                                  ? "auto"
                                  : "100%",
                            }}
                          >
                            <li>
                              {item?.service?.purchase_service_link ? (
                                <>
                                  {item?.service?.purchase_service_link?.endsWith(
                                    "/"
                                  ) ? (
                                    <Link
                                      href={`${item?.service?.purchase_service_link}getLogin/${item?.order_id}`}
                                    >
                                      Service Details
                                    </Link>
                                  ) : (
                                    <Link
                                      href={`${item?.service?.purchase_service_link}/getLogin/${item?.order_id}`}
                                    >
                                      Service Details
                                    </Link>
                                  )}
                                </>
                              ) : (
                                <Link
                                  href={`${process.env.NEXT_PUBLIC_PORTAL_URL}/services/${item?.service?.id}`}
                                >
                                  Service Details
                                </Link>
                              )}
                            </li>
                            <li>
                              <Link
                                href={{
                                  pathname: `/user/accounts-settings/purchase-services/${item?.id}`,
                                }}
                                shallow
                              >
                                Purchase Info
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={{
                                  pathname: `/user/services/${item?.service_id}`,
                                }}
                                shallow
                              >
                                Upgrade Package
                              </Link>
                            </li>
                          </ul>
                        </details>
                      </td>
                    </tr>
                    
                  );
                })
              : isLoading == false && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No services found
                    </td>
                  </tr>
                )}
                
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Home;
