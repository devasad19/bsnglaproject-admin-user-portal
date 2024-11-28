"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getServices } from "@/app/(portal)/_api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { deleteService } from '../../_api/index';

const Home = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [type, settype] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getServices()
      .then((data) => (setServices(data), setIsLoading(false)))
      .catch((err) => console.log(err));
  }, [refetch]);


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

          const serviceDeleteData = deleteService(id).then((data) => {
            if (data) {
              setRefetch(!refetch);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else {
              Swal.fire("Error!", "Something went wrong.", "error");
            }
          }).catch((err) => {
            console.log(err);
          });
        }
      });
    }
  };


  const UpdateServicePublishStatus = async (id, status) => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/service/publish-unpublish/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      }
    ).then((res) => res.json()).catch((err) => {
      console.log(err);
    });


    if (result?.status === true) {
      toast.success("Service status updated successfully");
      setRefetch(!refetch);
    } else {
      console.error("Update failed:", result?.message);
    }
  }

  console.log('services: ',services);

  return (
    <>
      <section>
        <div className="flex flex-wrap justify-between">
          <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
            Service List
          </h3>
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
        <div className="w-full overflow-x-auto bg-white  rounded-md">
          <table className="w-full">
            <thead className="border-b border-gray-200  bg-primary text-white  h-10 text-12 md:text-15">
              <tr>
                <th className="text-sm text-center px-2">SL</th>
                <th className="text-sm text-center px-2">Name</th>
                <th className="text-sm text-center">Sub Title</th>
                <th className="text-sm text-center">Type</th>
                <th className="text-sm text-center">Production Status</th>
                <th className="text-sm text-center">Paid Status</th>
                <th className="text-sm text-center">Publish/Unpublish</th>
                <th className="text-sm text-center">Action</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-gray-200 [&>tr]:text-left [&>tr]:h-16 text-12 lg:text-16 ">
              {isLoading && (
                <tr>
                  <td colSpan={7}>
                    <Skeleton width="100%" count={10} height={50} />
                  </td>
                </tr>
              )}
              {services?.length > 0
                ? services?.map((item, index) => {
                  const paidStatus = JSON?.parse(item?.paid_status || "{}");
                  return (
                    <tr key={index}>
                    <td className="px-3">
                      <span className="border border-gray-300 px-2 py-1 rounded-md">
                        {index + 1}
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
                      <td className="text-center border-r border-gray-200">
                        {item?.sub_title?.length > 35
                          ? item?.sub_title?.substring(0, 25) + "..."
                          : item?.sub_title}
                      </td>
                      <td className="text-center border-r border-gray-200">
                        { type.toString() }
                      </td>

                      <td className="text-center border-r border-gray-200">
                        {item?.production_status || ""}
                      </td>
                      <td className="text-center border-r border-gray-200">
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
                      <td className="text-center border-r border-gray-200">
                        {
                          item?.completion_status == 3 ? (
                            <button
                              onClick={() => UpdateServicePublishStatus(item?.id, item?.status == 1 ? 0 : 1)}
                              className={`text-white px-2 py-1 rounded transition-all duration-300 w-[60%] ${item?.status == 1
                                ? "bg-green-700"
                                : "bg-yellow-500"
                                }`}
                            >
                              {item?.status == 1 ? "Publish" : "UnPublish"}
                            </button>
                          ) : (
                            <button className="bg-white border border-red-500 text-red-500 text-sm px-2 py-1 w-[70%] rounded">
                              Incomplete
                            </button>
                          )
                        }

                      </td>
                      <td className="">
                        <div className="w-full flex items-center justify-center gap-2">
                          <>
                            {
                              item?.completion_status == 3 && (
                                <Link
                                  href={{
                                    pathname: `/admin/services/${item?.id}`,
                                  }}
                                  shallow
                                  className="px-2 py-1  bg-green-500 text-white active:scale-90 transition-all duration-400 rounded-md"
                                >
                                  View
                                </Link>
                              )
                            }


                            <Link
                              href={{
                                pathname: `/admin/services/edit/${item?.id}`,
                              }}
                              className="px-2 py-1  bg-blue-500 text-white active:scale-90 transition-all duration-400 rounded-md"
                            >
                              { item?.completion_status == 3 ? "Edit" : "Update"}
                            </Link>

                            {
                              item?.completion_status == 3 && (
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
                              )
                            }
                          </>
                        </div>
                      </td>
                    </tr>
                  );
                })
                : ""}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Home;