"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { modelClose, modelOpen, relative_image_path } from "@/helper";
import Image from "next/image";
const Button = dynamic(() => import("@/app/_components/Button/Button"), {
  ssr: false,
});
import { getCitizenList, updateCitizenTypes } from "../../_api";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import {
  getUserTypesActives,
  getUserTypest,
} from "../../_api/MangeUserTypeApi";
import Modal from "@/app/_components/Modal/Modal";
import { toast } from "react-toastify";
import Link from "next/link";
import TableSkeleton from "@/app/_components/TableSkeleton/TableSkeleton";
import Pagination from "@/app/_components/Pagination/Pagination";

const Home = (): JSX.Element => {
  const [citizen, setCitizen] = useState([]);
  const [citizenTypes, setCitizenTypes] = useState([]);
  const userTypesUpdateForm = useRef<HTMLFormElement>(null);
  const userTypeModal = useRef<any>(null);
  const [userEditId, setUserEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateUser, setUpdateUser] = useState<any>({
    citizen_type_id: "",
    status: "",
  });
  const [userFilter, setUserFilter] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [searchByName, setSearchByName] = useState("");

  // pagination start
  const itemsPerPage = 8; // Customize items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(userFilter?.length / itemsPerPage);

  // Get items for the current page
  const displayedItems = userFilter?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers for pagination
  const handlePreviousClick = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSearch = (e: any) => {
    const value = e.target.value; // Get input value directly
    setSearchByName(value);

    if (value.trim().length > 0) {
      const filteredUser = citizen?.filter(
        (item: any) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase())
      );
      // console.log({filteredUser});
      if (filteredUser.length > 0) {
        setUserFilter(filteredUser);
        setCurrentPage(1);
      } else {
        setUserFilter([]);
        setCurrentPage(1);
      }
    } else {
      setUserFilter(citizen); // Reset to full list if search is empty
    }
  };

  const fetchCitizenTypes = async () => {
    try {
      const response = await getUserTypesActives();
      setCitizenTypes(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCitizenAll = async () => {
    try {
      setIsLoading(true);
      const response = await getCitizenList();
      setCitizen(response?.data);
      setUserFilter(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCitizenAll();
    fetchCitizenTypes();
  }, [isFetch]);

  // console.log({isLoading});

  const handleEditUser = (id: any) => {
    if (id) {
      setUserEditId(id);
      modelOpen(userTypeModal);
      const users: any = citizen.find((item: any) => item?.id === id);
      setUpdateUser({
        citizen_type_id: users?.citizen_type_id,
        status: users?.status,
      });
    }
  };

  const handleUserTypeSubmit = async (e: any) => {
    e.preventDefault();
    const status = e.target.status.value;
    const userType = e.target.user_type.value;
    try {
      const typeUpdateData = {
        id: userEditId,
        citizen_type_id: userType,
        status: status,
      };
      // console.log({ typeUpdateData });
      const res = await updateCitizenTypes(typeUpdateData);
      // console.log({ res });

      if (res?.status) {
        setIsFetch(!isFetch);
        modelClose(userTypeModal, userTypesUpdateForm);
        toast.success("user type updated successfully");
        // userTypeModal.current.style.display = 'none';
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };

  console.log({ citizen,displayedItems });
  // console.log({citizenTypes});

  return (
    <>
      <section className="bg-white w-full  rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="mb-4 text-24 font-bold">Citizens List</h3>
          <div className="bg-white rounded-md shadow-md text-[#515151] flex items-center gap-2 px-2 py-1 lg:py-0">
            <label htmlFor="userSearch">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </label>
            <input
              id="userSearch"
              type="text"
              onChange={handleSearch}
              value={searchByName}
              placeholder="Search By Name or Email"
              className="outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#E1F6F9] h-8">
                <th>SL</th>
                <th>Image</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Citizen Type</th>
                <th>Citizen Request</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {isLoading && <TableSkeleton col={8} row={10}></TableSkeleton>}
              {displayedItems?.length > 0 ? (
                displayedItems?.map((item: any, index: any) => (
                  <tr key={index} className="h-16 border-b border-gray-300">
                    <td className="px-3">
                      <span className="border border-gray-300 px-2 py-1 rounded-md">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <div className="flex flex-col text-left">
                          {item?.photo ? (
                            <Image
                              className="rounded-full w-[50px] h-[50px]"
                              width={50}
                              height={50}
                              src={
                                process.env.NEXT_PUBLIC_IMAGE_URL + item?.photo
                              }
                              alt="user"
                            />
                          ) : (
                            <Image
                              className="rounded-full w-[50px] h-[50px]"
                              width={50}
                              height={50}
                              src={relative_image_path("demo_profile.png")}
                              alt="user"
                            />
                          )}
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
                    <td>{item?.citizen_type?.name_en ?? ""}</td>
                    <td className="font-medium text-13">
                      <span
                        className={`px-2 py-1 rounded-md ${
                          item?.citizen_info?.status === 0
                            ? "bg-yellow-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {item?.citizen_info?.status === 0
                          ? "Pending"
                          : "Approved"}
                      </span>
                      {/* {item?.citizen_info?.status === 0
                        ? "Pending"
                        : "Approved"} */}
                    </td>
                    <td>
                      <span
                        className={`${
                          item?.status == 0 ? "text-red-500" : "text-primary"
                        }`}
                      >
                        {item?.status == 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-2">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => handleEditUser(item?.id)}
                          className="bg-blue-500 text-white rounded p-2"
                        >
                          <FaRegEdit />
                        </button>

                        {/* <button className="ml-2 bg-red-500 text-white rounded p-2">
                          <FaTrashAlt />
                        </button> */}
                      </div>

                      {item?.citizen_info && (
                        <div className="flex items-center justify-center py-1">
                          <Link
                            href={`/admin/citizen-info/${item?.id}`}
                            className="py-1 px-2 bg-[#2F93DF] text-white rounded text-12"
                          >
                            Citizen Info
                          </Link>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {isLoading === false && (
                    <tr>
                      <td colSpan={8} className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
          <Pagination
          handlePreviousClick={handlePreviousClick}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          handleNextClick={handleNextClick}
          displayedItems={displayedItems}
          handlePageClick={(page: number) => setCurrentPage(page)}
        />
        </div>
      </section>

      {/* user update model */}
      <Modal
        modalRef={userTypeModal}
        modalForm={userTypesUpdateForm}
        setServiceValidation={setUpdateUser}
        title="প্যারেন্ট অনুমতির নাম তৈরি করুন"
      >
        <form
          onSubmit={handleUserTypeSubmit}
          className="pt-3"
          ref={userTypesUpdateForm}
        >
          <div className="pt-3 flex flex-col gap-3">
            <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
              <legend>
                <label
                  htmlFor=""
                  className="after:content-['_*'] after:text-red-400"
                >
                  Citizen Types
                </label>
              </legend>
              <select
                name="user_type"
                value={updateUser?.citizen_type_id}
                onChange={(e) => {
                  setUpdateUser({
                    ...updateUser,
                    citizen_type_id: e.target.value,
                  });
                }}
                className="w-full bg-white py-2"
                disabled={isLoading ? true : false}
              >
                {citizenTypes?.map((item: any, index: any) => {
                  console.log({ item });

                  return (
                    <option
                      key={index}
                      value={item?.id}
                      selected={updateUser?.citizen_type_id == item?.id}
                    >
                      {item?.name_en}
                    </option>
                  );
                })}
              </select>
            </fieldset>
            <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
              <legend>
                <label
                  htmlFor=""
                  className="after:content-['_*'] after:text-red-400"
                >
                  Status
                </label>
              </legend>
              <select name="status" id="" className="w-full bg-white py-2">
                <option value={1} selected={updateUser?.status == 1}>
                  Active
                </option>
                <option value={0} selected={updateUser?.status == 0}>
                  Inactive
                </option>
              </select>
            </fieldset>
          </div>
          <div className="flex justify-end gap-3 mt-7">
            <button
              type="button"
              onClick={() => {
                modelClose(userTypeModal, userTypesUpdateForm);
                setUpdateUser(null);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Home;
