"use client";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteService } from "../../_api";
import { CiEdit } from "react-icons/ci";
import { GrView } from "react-icons/gr";

import { replaceUnderscore } from "@/helper";
import {
  deleteServiceCodeApi,
  getServices,
  publishUnpublishService,
} from "../../_api/ServiceApi";
import { useEffect, useState } from "react";
import ServerPagination from "@/app/_components/ServerPagination/ServerPagination";
import { useRouter, useSearchParams } from "next/navigation";
import TableSkeleton from "@/app/_components/TableSkeleton/TableSkeleton";
import useDebounce from "@/hooks";

const ServiceListContainer = () => {
  const page = useSearchParams().get("page");
  const [services, setServices] = useState([]);
  const router = useRouter();
  // const [page, setPage] = useState();
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState();
  const [searchByName, setSearchByName] = useState("");
  const [refetch, setRefetch] = useState(false);

  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);
  const searchTerm = useDebounce(searchByName);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit,
        name: searchTerm,
      };
      const response = await getServices(params);
      console.log({ response });
      if (response?.status) {
        setServices(response?.data);
        setCurrentPage(response?.meta?.page);
        setLimit(response?.meta?.limit);
        setTotal(response?.meta?.total_page);
        setLoading(false);
      } else {
        setServices([]);
        setCurrentPage(1);
        setLimit(10);
        setTotal(0);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  // console.log({currentPage});

  useEffect(() => {
    fetchServices();
  }, [currentPage, limit, refetch, searchTerm]);
  console.log({ searchTerm });

  const handleDelete = (id) => {
    if (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const serviceDeleteData = deleteServiceCodeApi(id)
            .then((data) => {
              if (data) {
                setRefetch(!refetch);
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                // window.location.reload();
              } else {
                Swal.fire("Error!", "Something went wrong.", "error");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  };

  const UpdateServicePublishStatus = async (id, status) => {
    // console.log(id, status);

    try {
      const response = await publishUnpublishService(id, status);
      // console.log(response);

      if (response?.status === true) {
        setRefetch(!refetch);
        toast.success("Service status updated successfully");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleRedirect = (id) => {
    router.replace(`${process.env.NEXT_PUBLIC_PORTAL_URL}/services/` + id);
  };

  return (
    <section>
      <div className="flex flex-wrap justify-between pb-1">
        <h3 className="text-32 font-mono font-bold text-[#151D48]">
          Service List
        </h3>
      </div>
      <div className="py-2 flex flex-wrap justify-between pb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="border border-gray-300 px-2 py-1 rounded-md"
            placeholder="Search by Service name"
            value={searchByName}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchByName(e.target.value);
            }}
          />
        </div>
        <div>
          <Link
            href={{
              pathname: "/admin/services/create",
            }}
            shallow
            className="flex items-center gap-2 bg-primary hover:border hover:border-primary rounded-md text-white hover:text-primary hover:bg-white text-14 px-2 py-1 lg:px-4 lg:py-2"
          >
            <span>
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </span>
            <span>Create Service</span>
          </Link>
        </div>
      </div>
      <div className="w-full overflow-x-auto bg-white  rounded-md pb-3">
        <table className="w-full">
          <thead className="border-b border-gray-200  bg-primary text-white  h-10 text-12 md:text-15">
            <tr>
              <th className="text-sm text-center px-2">SL</th>
              <th className="text-sm text-center px-2">Name</th>
              <th className="text-sm text-center">Type</th>
              <th className="text-sm text-center">Production Status</th>
              <th className="text-sm text-center">Paid Status</th>
              <th className="text-sm text-center">Publish/Unpublish</th>
              <th className="text-sm text-center">Action</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-b [&>tr]:border-gray-200 [&>tr]:text-left [&>tr]:h-16 text-12 lg:text-16 ">
            {loading ? (
              <TableSkeleton col={7} row={10} />
            ) : (
              <>
                {services?.length > 0 ? (
                  services?.map((item, index) => {
                    const paidStatus = JSON?.parse(item?.paid_status || "{}");
                    let types = [];
                    try {
                      types = JSON?.parse(item?.type) || [];
                    } catch (error) {
                      console.error("Error parsing type:", error);
                    }
                    let newTypes = [];
                    if (Array.isArray(types)) {
                      types.forEach((element) => {
                        const dataEle = replaceUnderscore(element);
                        newTypes.push(dataEle);
                      });
                    }
                    return (
                      <tr key={index}>
                        <td className="px-3">
                          <span className="border border-gray-300 px-2 py-1 rounded-md">
                            {(currentPage - 1) * limit + index + 1}
                          </span>
                        </td>
                        <td className="px-2 border-r border-gray-200">
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
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.logo}`}
                                height={1000}
                                width={1000}
                                alt="Bangla"
                              />
                              {item?.name || " "}
                            </span>
                          </Link>
                        </td>
                        <td className="text-center border-r border-gray-200 px-1">
                          {newTypes.toString()}
                        </td>

                        <td className="text-center border-r border-gray-200">
                          {item?.production_status || ""}
                        </td>
                        <td className="text-center border-r border-gray-200 px-1">
                          <div className="flex items-center gap-2">
                            {paidStatus?.free == 1 ? (
                              <button className="bg-[#2F93DF] px-1 py-1 lg:px-2 lg:py-1 text-sm text-white  rounded ">
                                Free
                              </button>
                            ) : (
                              ""
                            )}
                            {paidStatus?.pro == 1 && (
                              <button className="bg-[#1AB17A] px-1 py-1 lg:px-2 lg:py-1 text-sm text-white  rounded ">
                                Pro
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="text-center border-r border-gray-200 px-2">
                          {/* {item?.completion_status == 3 ? (
                        <>
                          <button
                            onClick={() =>
                              UpdateServicePublishStatus(
                                item?.id,
                                item?.status == 1 ? 0 : 1
                              )
                            }
                            className={`relative w-14 h-6 rounded-full transition-colors duration-300 ${
                              item?.status == 1 ? "bg-green-500" : "bg-gray-400"
                            }`}
                          >
                            <span
                              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                                item?.status == 1 ? "translate-x-8" : ""
                              }`}
                            ></span>
                          </button>
                        </>
                      ) : (
                        <button className="bg-white border border-red-500 text-red-500 text-center text-sm w-[6em] py-1 rounded">
                          Incomplete
                        </button>
                      )} */}
                          <button
                            onClick={() =>
                              UpdateServicePublishStatus(
                                item?.id,
                                item?.status == 1 ? 0 : 1
                              )
                            }
                            className={`relative w-14 h-6 rounded-full transition-colors duration-300 ${
                              item?.status == 1 ? "bg-green-500" : "bg-gray-400"
                            }`}
                          >
                            <span
                              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                                item?.status == 1 ? "translate-x-8" : ""
                              }`}
                            ></span>
                          </button>
                        </td>
                        <td className="px-1">
                          <div className="w-full flex  items-center justify-center gap-2">
                            <>
                              {/* {item?.completion_status == 3 && (
                            <button
                              onClick={() => {
                                handleRedirect(item?.id);
                              }}
                              shallow
                              className="px-2 py-1 bg-primary  text-white active:scale-90 transition-all duration-400 rounded-md"
                            >
                              <GrView className="text-white w-4 h-4" />
                            </button>
                          )} */}
                              <button
                                onClick={() => {
                                  handleRedirect(item?.id);
                                }}
                                shallow
                                className="px-2 py-1 bg-primary  text-white active:scale-90 transition-all duration-400 rounded-md"
                              >
                                <GrView className="text-white w-4 h-4" />
                              </button>
                              <Link
                                href={{
                                  pathname: `/admin/services/edit/${item?.id}`,
                                }}
                                className="px-2 py-1  bg-blue-500 text-white active:scale-90 transition-all duration-400 rounded-md"
                              >
                                {item?.completion_status == 3 ? (
                                  <>
                                    <CiEdit />
                                  </>
                                ) : (
                                  <>
                                    <CiEdit />
                                  </>
                                )}
                              </Link>
                              <button
                                onClick={() => handleDelete(item?.id)}
                                className="p-1  bg-red-500 text-white active:scale-90 transition-all duration-400 rounded-md"
                              >
                                <svg
                                  className="w-4 h-4 fill-current"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                </svg>
                              </button>

                              {/* {item?.completion_status == 3 && (
                              <button
                                onClick={() => handleDelete(item?.id)}
                                className="p-1  bg-red-500 text-white active:scale-90 transition-all duration-400 rounded-md"
                              >
                                <svg
                                  className="w-4 h-4 fill-current"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                </svg>
                              </button>
                            )} */}
                            </>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No data found
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
        {total > 1 && (
          <ServerPagination
            page={currentPage}
            setPage={setCurrentPage}
            showPage={total}
            //  setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
};
export default ServiceListContainer;
