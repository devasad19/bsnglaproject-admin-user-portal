"use client";
import {
  getProductionStatus,
  getServiceTitles,
  SearchModuleLinks,
} from "@/app/(admin)/_api/fileManagerApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import { modelOpen } from "@/helper";
import { FaFilePdf } from "react-icons/fa";
import { BsFiletypeDocx } from "react-icons/bs";
import ApiLoading from "@/app/(admin)/component/ApiLoading/ApiLoading";

const FileManagerPage = () => {
  const [productionStatus, setProductionStatus] = useState([]);
  const [servicesTitle, setServicesTitle] = useState([]);
  const [services, setServices] = useState<any>(null);
  const [userModule, setUserModule] = useState([]);
  const [userLink, setUserLink] = useState([]);
  const [result, setResult] = useState([]);
  const [resourceType, setResourceType] = useState("1");
  const updateResource = useRef(null);
  const updateResourceForm = useRef(null);
  const [loading, setLoading] = useState(false);
  const [updatedResource, setUpdatedResource] = useState<any>(null);
  const [updatedUserModules, setUpdatedUserModules] = useState<any>(null);
  const [resourceUserModules, setResourceUserModules] = useState({
    userModule: [
      {
        label: "",
        module: "",
      },
    ],
  });

  const [formData, setFormData] = React.useState({
    type: "",
    production_status: "",
    search_string: "",
    slug: "",
  });

  const fetchApiData = async () => {
    setLoading(true);
    try {
      const serviceRes = await getServiceTitles();
      const productRes = await getProductionStatus();
      setProductionStatus(productRes?.data);
      setServicesTitle(serviceRes?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  console.log({ resourceUserModules });

  const types = ["Software", "Publication", "Font", "Dataset", "AI_Model"];
  const resetForm = (e: any) => {
    e.preventDefault();
    setFormData({
      type: "",
      slug: "",
      search_string: "",
      production_status: "",
    });

    // setServices(null);
  };

  const HandleSearch = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const searchData = {
      type: formData.type,
      slug: formData.slug,
      search_string: formData.search_string,
      production_status: formData.production_status,
    };
    try {
      console.log({ searchData });

      const response = await SearchModuleLinks(searchData);
      console.log({ response });
      if (response?.status) {
        setResult(response?.data);
        setServices(response?.data);
        setUserModule(JSON.parse(response?.data) || []);
        setUserLink(JSON.parse(response?.data) || []);
        setLoading(false);
      } else {
        setLoading(false);
        setServices(null);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleUpdateDate = (id: any) => {
    if (id) {
      const singleData = services?.find((item: any) => item?.service_id == id);
      setUpdatedResource(singleData);
      const userModules = JSON.parse(singleData?.user_modules || "[]");
      setResourceUserModules({
        userModule: userModules,
      });
      setUpdatedUserModules(userModules);
      modelOpen(updateResource);
    }
  };

  return (
    <>
      <section className="container mx-auto px-2 lg:px-12 pt-[30px] relative">
        {loading && <ApiLoading />}
        <div className="border border-gray-500 p-8 rounded-lg bg-white">
          <div className="pb-7">
            <h3 className="text-20 font-semibold pb-[29px]">
              All Resources in one platform
            </h3>
            <form onSubmit={HandleSearch}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <fieldset className="border border-gray-300 p-2 rounded-md text-14">
                  <legend>
                    <label htmlFor="type">Type</label>
                  </legend>
                  <select
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value,
                      })
                    }
                    value={formData?.type}
                    name="type"
                    className="w-full bg-white outline-none"
                  >
                    <option value="-">-- Select Type --</option>
                    {types?.map((serviceType, index) => (
                      <option key={index} value={serviceType}>
                        {serviceType}
                      </option>
                    ))}
                  </select>
                </fieldset>

                <fieldset className="border border-gray-300 p-2 rounded-md text-14">
                  <legend>
                    <label htmlFor="ProductionStatus">Production Status</label>
                  </legend>
                  <select
                    value={formData?.production_status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        production_status: e.target.value,
                      })
                    }
                    name="ProductionStatus"
                    className="w-full bg-white outline-none"
                  >
                    <option value="-">-- Select Status --</option>
                    {productionStatus?.map((item: any, index) => (
                      <option key={index} value={item.id}>
                        {item.production_status}
                      </option>
                    ))}
                  </select>
                </fieldset>

                <fieldset className="border border-gray-300 p-2 rounded-md text-14">
                  <legend>
                    <label htmlFor="title">Search</label>
                  </legend>
                  <input
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        search_string: e.target.value,
                      })
                    }
                    value={formData?.search_string}
                    name="search_string"
                    type="text"
                    className="w-full outline-none"
                    placeholder="Search with name, subtitle, component name"
                  />
                </fieldset>

                <fieldset className="border border-gray-300 p-2 rounded-md text-14">
                  <legend>
                    <label htmlFor="title">Resource Name</label>
                  </legend>
                  <select
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    value={formData?.slug}
                    name="title"
                    className="w-full bg-white outline-none"
                  >
                    <option value="">-- Select Name --</option>
                    {servicesTitle?.map((item: any, index) => (
                      <option
                        // selected={services?.id == item?.id}
                        key={index}
                        value={item?.slug}
                      >
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </fieldset>

                <fieldset className="border border-gray-300 p-2 rounded-md text-14">
                  <legend>
                    <label
                      htmlFor="title"
                      className="after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                      Resource Type
                    </label>
                  </legend>
                  <select
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value)}
                    name="title"
                    className="w-full bg-white outline-none"
                  >
                    <option selected={resourceType == "1"} value="1">
                      Modules
                    </option>
                    {/* <option selected={resourceType == "2"} value="2">
                      External Links
                    </option> */}
                  </select>
                </fieldset>
              </div>

              <div className="w-full flex justify-between items-center mt-4">
                <div>
                  <p className="text-14">
                    <span className="text-red-500">*</span>

                    <span className="ml-1">Required</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={(e) => resetForm(e)}
                    className="bg-gray-500 px-4 py-2 text-white rounded text-14"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="bg-blue-700 px-4 py-2 text-white rounded text-14"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="">
            <h3 className="text-20 font-semibold border-b border-gray-500 pb-2 mb-4">
              Search Results
            </h3>

            {services ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-500 h-10">
                    <tr className="pl-2 w-full">
                      <th className="text-start">Resource name</th>
                      <th className="">Label</th>
                      <th className="">
                        {resourceType == "1" ? "Resource File" : "Visit"}
                      </th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {services?.length > 0 &&
                      services?.map((item: any, index: number) => {
                        const userModule = item?.user_modules
                          ? JSON.parse(item?.user_modules)
                          : [];
                        const userExternalLink = item?.user_external_links
                          ? JSON.parse(item?.user_external_links)
                          : [];

                        return (
                          <tr
                            key={index}
                            className="border-b border-gray-500 h-28"
                          >
                            <td className="px-3 w-full">
                              <div className="flex items-center justify-start gap-2">
                                <Image
                                  className="w-[60px]"
                                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.service?.logo}`}
                                  width={1000}
                                  height={1000}
                                  alt="Bangla"
                                />
                                <p className="text-14">{item?.service?.name}</p>
                              </div>
                            </td>
                            {resourceType == "1" && (
                              <td className="text-14 px-4">
                                {userModule?.map((item: any, index: number) => (
                                  <span key={index} className="text-14">
                                    {item?.label}
                                  </span>
                                ))}
                              </td>
                            )}
                            {/* {resourceType == "2" && (
                              <td className="text-14 px-4">
                                {userExternalLink?.map(
                                  (item: any, index: number) => (
                                    <span key={index} className="text-14">
                                      {item?.label}
                                    </span>
                                  )
                                )}
                              </td>
                            )} */}

                            {/* {resourceType == "2" && (
                              <td className="text-14 px-4 space-y-1">
                                {userExternalLink?.map(
                                  (item: any, index: number) => (
                                    <input key={index} className="w-[400px] rounded-t-sm border border-gray px-2 py-1 focus:outline-none" type="text" value={process.env.NEXT_PUBLIC_IMAGE_URL+ item?.link} />
                                  )
                                )}
                              </td>
                            )} */}
                            {resourceType == "1" && (
                              <td className="text-14 px-4 space-y-1 text-start">
                                {userModule?.map((item: any, index: number) => (
                                  <input
                                    key={index}
                                    type="text"
                                    className="w-[400px] rounded-t-sm border border-gray px-2 py-1 focus:outline-none"
                                    value={
                                      process.env.NEXT_PUBLIC_IMAGE_URL +
                                      item?.module
                                    }
                                  />
                                ))}
                              </td>
                            )}
                            <td>
                              <div className="text-14 px-4 flex flex-col items-center justify-center gap-2">
                                <button
                                  onClick={() => {
                                    handleUpdateDate(item?.service_id);
                                  }}
                                  className="bg-blue-500 text-white py-1 px-2 rounded"
                                >
                                  Edit
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-20 text-blue-500 pb-32">
                No Data found.
              </p>
            )}
          </div>
        </div>
      </section>

      <Modal
        modalRef={updateResource}
        modalForm={updateResourceForm}
        // setServiceValidation={setSubmitError}
        title="Update Resource"
      >
        <>
          <form className="pt-3">
            <div className="grid grid-cols-1  gap-2 border-b border-gray-300 pb-5 mb-5 py-2">
              <div className="border border-gray-300 rounded">
                <div className="bg-gray-300 flex items-center justify-between p-2">
                  <h3 className="text-primary font-semibold">External Links</h3>
                  <button
                    onClick={() => {
                      setResourceUserModules({
                        userModule: [
                          ...resourceUserModules.userModule,
                          {
                            label: "",
                            module: "",
                          },
                        ],
                      });
                    }}
                    type="button"
                    className="bg-primary text-white px-4 py-2 rounded"
                  >
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                  </button>
                </div>
                {resourceUserModules?.userModule?.map(
                  (item: any, index: number) => (
                    <div key={index} className="p-2 ">
                      <div>
                        <div className="flex gap-2">
                          <div className="flex w-full  items-center justify-between">
                            <fieldset className="w-full flex flex-col border rounded-md px-2 gap-2 py-3">
                              <legend>
                                <label htmlFor="key">
                                  Module - {index + 1}
                                </label>
                              </legend>
                              <div className="space-y-3">
                                <div className="flex item-center gap-2">
                                  <label htmlFor="label" className="w-[30%]">
                                    label :
                                  </label>
                                  <input
                                    type="text"
                                    value={item?.label}
                                    name="label"
                                    className="w-[60%] border border-gray-300 rounded-md p-2"
                                  />
                                </div>

                                <div className="flex items-center gap-2">
                                  <label htmlFor="module" className="w-[30%]">
                                    Module
                                  </label>
                                  <input
                                    type="file"
                                    // value={item?.module}
                                    name="label"
                                    className="w-[60%] border border-gray-300 rounded-md p-2"
                                  />
                                </div>
                                {
                                  
                                }
                                <div className="flex items-center justify-center">
                                  <div className="flex items-center gap-2">
                                  {item?.module &&
                                  item?.module.split(".").pop() == "pdf" ? (
                                    <FaFilePdf size={36} />
                                  ) : null}

                                  {item?.module &&
                                  item?.module.split(".").pop() == "docx" ? (
                                    <BsFiletypeDocx size={36} />
                                  ) : null}
                                  <p>
                                    {item?.module.split("/").pop()}
                                  </p>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                          <div className="mt-3">
                            <button
                              type="button"
                              onClick={() => {
                                const newResourceUserModules =
                                  resourceUserModules.userModule.filter(
                                    (item, i) => i !== index
                                  );
                                setResourceUserModules({
                                  userModule: newResourceUserModules,
                                });
                              }}
                              className="border border-primary bg-primary text-white mt-2 px-2 py-1 rounded"
                            >
                              <svg
                                className="w-6 h-6 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </>
      </Modal>
    </>
  );
};

export default FileManagerPage;
