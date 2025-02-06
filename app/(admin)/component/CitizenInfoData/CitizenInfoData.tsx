"use client";
import { relative_image_path } from "@/helper";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera, FaRegEdit } from "react-icons/fa";
import {
  getSingleCitizenUserNotNull,
  updateCitizenUserStatus,
} from "../../_api";
import { toast } from "react-toastify";

const CitizenInfoData = ({ id }: { id: string }) => {
  const [singleUser, setSingleUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  console.log({ id });

  const fetchCitizenTypes = async () => {
    setIsLoading(true);

    try {
      if (id) {
        const fetchUser = await getSingleCitizenUserNotNull(id);
        if (fetchUser.status) {
          setSingleUser(fetchUser?.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error(fetchUser?.message);
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCitizenTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isFetch]);
  // console.log({ user });

  const handleApprove = async () => {
    if (singleUser) {
      try {
        const updateInfo = {
          user_id: singleUser.id,
          citizen_type_id: singleUser.citizen_info?.citizen_type?.id,
          status: 1,
        };
        const response = await updateCitizenUserStatus(updateInfo);
        if (response.status) {
          toast.success("User Approved Successfully");
          setIsFetch(!isFetch);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  console.log({ singleUser });
  

  return (
    <div>
      <section>
        <div className="bg-white w-full p-4 rounded-md shadow-lg pb-8">
          <div className="flex flex-wrap items-center gap-4 border border-gray-300 p-4 rounded-md overflow-hidden mb-5">
            <div className="relative group">
              {singleUser?.photo ? (
                <Image
                  className="w-20 h-20 rounded-full"
                  width={1000}
                  height={1000}
                  src={process.env.NEXT_PUBLIC_IMAGE_URL + singleUser?.photo}
                  alt="Profile Picture"
                />
              ) : (
                <Image
                  className="w-20 h-20 rounded-full"
                  width={1000}
                  height={1000}
                  src={relative_image_path("dummy_image1.jpg")}
                  alt="Profile Picture"
                />
              )}

              <div className="hidden absolute top-0 left-0 w-full h-full group-hover:flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer">
                <button>
                  <FaCamera size={20} className="text-white" />
                </button>
              </div>
            </div>

            <div className="text-gray-500">
              <p>username</p>
              <p>email: {singleUser?.email || ""}</p>
            </div>
          </div>
          <div className="border border-gray-300 p-4 rounded-md mb-5">
            <h3 className="text-20 font-mono font-bold text-[#151D48] pb-3 overflow-hidden">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
              <div>
                <p className={`text-gray-500 text-14 `}>Name:</p>
                <p className="text-gray-700">{singleUser?.name || ""}</p>
              </div>
              <div>
                <p
                  className={`text-gray-500 text-14 
                  `}
                >
                  Phone:
                </p>

                <p className="text-gray-700">{singleUser?.phone || ""}</p>
              </div>
              <div>
                <p className={`text-gray-500 text-14`}>Email:</p>

                <p className="text-gray-700">{singleUser?.email || ""}</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 p-4 rounded-md mb-2">
            <h3 className="text-20 font-mono font-bold text-[#151D48] pb-3 overflow-hidden">
              Requested Citizen Info
            </h3>

            <div className="">
              <div className="grid grid-cols-1 gap-2 pb-3">
                <div className="flex flex-col  gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 text-14">
                      Citizen Type:
                      <span className="text-gray-800 text-16 ms-3">
                        {singleUser?.citizen_info?.citizen_type?.name_en ?? ""}
                      </span>
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-16 text-black font-bold">
                        Status :
                      </span>
                      <button
                        className={` text-white text-14 font-medium px-2 py-1 rounded ${
                          singleUser?.citizen_info?.status === 1
                            ? "bg-primary"
                            : "bg-blue-500"
                        }`}
                      >
                        {singleUser?.citizen_info?.status === 1
                          ? "Approved"
                          : "Pending"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="flex flex-col  gap-2">
                  <p className="text-gray-500 text-14 after:content-['_*'] after:text-red-500">
                    Team size (max persons)
                  </p>
                  <input
                    disabled={true}
                    value={singleUser?.citizen_info?.team_size}
                    type="number"
                    className="outline-none border border-gray-300 px-2 py-1 rounded"
                    placeholder="Enter Team Size"
                  />
                </div>
                <div className="flex flex-col  gap-2">
                  <p className="text-gray-500 text-14 "> Organization url</p>
                  <input
                    disabled={true}
                    value={singleUser?.citizen_info?.company_url}
                    type="text"
                    className="outline-none border border-gray-300 px-2 py-1 rounded"
                    placeholder="Enter Company URL"
                  />
                </div>
              </div>

              {singleUser?.citizen_info?.citizen_type?.slug === "govt_user" && (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div className="flex flex-col  gap-2">
                      <p className="text-gray-500 text-14 after:content-['_*'] after:text-red-500">
                      Organization Name
                      </p>
                      <input
                        disabled={true}
                        value={singleUser?.citizen_info?.organization_name
                        }
                        type="text"
                        className="outline-none border border-gray-300 px-2 py-1 rounded"
                        placeholder="Enter Team Size"
                      />
                    </div>
                    <div className="flex flex-col  gap-2">
                      <p className="text-gray-500 text-14 ">
                        Department Of Ministry
                      </p>
                      <input
                        disabled={true}
                        value={singleUser?.citizen_info?.ministry_department}
                        type="text"
                        className="outline-none border border-gray-300 px-2 py-1 rounded"
                        placeholder="Enter Company URL"
                      />
                    </div>
                    <div className="flex flex-col  gap-2">
                      <p className="text-gray-500 text-14 ">job position</p>
                      <input
                        disabled={true}
                        value={singleUser?.citizen_info?.job_position}
                        type="text"
                        className="outline-none border border-gray-300 px-2 py-1 rounded"
                        placeholder="Enter Company URL"
                      />
                    </div>
                    <div className="flex flex-col  gap-2">
                      <p className="text-gray-500 text-14 ">Grade</p>
                      <input
                        disabled={true}
                        value={singleUser?.citizen_info?.grade}
                        type="text"
                        className="outline-none border border-gray-300 px-2 py-1 rounded"
                        placeholder="Enter Company URL"
                      />
                    </div>
                  </div>
                
                  <div>
                    <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                      <legend>
                        <label className="text-gray-500 text-12">
                          Office Email
                        </label>
                      </legend>

                      <input
                        disabled={true}
                        value={singleUser?.citizen_info?.office_email}
                        type="email"
                        className="w-full outline-none text-14 py-1"
                        placeholder="Enter Office Email"
                      />
                    </fieldset>
                  </div>
                  <div>
                    <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                      <legend>
                        <label className="text-gray-500 text-12">
                         Office Address
                        </label>
                      </legend>

                      <textarea 
                        disabled={true}
                        value={singleUser?.citizen_info?.office_address}
                        className="w-full outline-none text-14 py-1"
                        placeholder="Enter Office Address">

                      </textarea>
                    </fieldset>
                  </div>
                  <div>
                    <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                      <legend>
                        <label className="text-gray-500 text-12">
                          IP Address
                        </label>
                      </legend>

                      <input
                        disabled={true}
                        value={singleUser?.citizen_info?.ip_address}
                        type="text"
                        className="w-full outline-none text-14 py-1"
                        placeholder=" Enter IP Address"
                      />
                    </fieldset>
                  </div>
                </>
              )}

              {singleUser?.citizen_type?.slug === "researcher" && (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div className="flex flex-col  gap-2">
                      <p className="text-gray-500 text-14 after:content-['_*'] after:text-red-500">
                        Name Of Ministry
                      </p>
                      <input
                        disabled={true}
                        value={singleUser?.citizen_info?.ministry_name}
                        type="number"
                        className="outline-none border border-gray-300 px-2 py-1 rounded"
                        placeholder="Enter Team Size"
                      />
                    </div>
                    <div className="flex flex-col  gap-2">
                      <p className="text-gray-500 text-14 ">Research Topic</p>
                      <input
                        disabled={true}
                        value={singleUser?.citizen_info?.research_topic}
                        type="text"
                        className="outline-none border border-gray-300 px-2 py-1 rounded"
                        placeholder="Enter Company URL"
                      />
                    </div>
                    <div className="flex flex-col  gap-2">
                      <p className="text-gray-500 text-14 ">Research Title</p>
                      <input
                        disabled={true}
                        value={singleUser?.citizen_info?.research_title}
                        type="text"
                        className="outline-none border border-gray-300 px-2 py-1 rounded"
                        placeholder="Enter Company URL"
                      />
                    </div>
                    <div className="flex flex-col  gap-2">
                      <p className="text-gray-500 text-14 ">Research Code</p>
                      <input
                        disabled={true}
                        value={singleUser?.citizen_info?.research_code}
                        type="text"
                        className="outline-none border border-gray-300 px-2 py-1 rounded"
                        placeholder="Enter Company URL"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {singleUser?.citizen_info?.status == 0 && (
            <>
              <div className="flex items-end justify-end mt-4">
                <button
                  onClick={() => {
                    handleApprove();
                  }}
                  className={` text-white text-16 font-medium px-5 py-2 rounded bg-primary`}
                >
                  Approve
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CitizenInfoData;
