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
import { getUserTypest } from "../../_api/MangeUserTypeApi";
import Modal from "@/app/_components/Modal/Modal";
import { toast } from "react-toastify";
import Link from "next/link";
import TableSkeleton from "@/app/_components/TableSkeleton/TableSkeleton";

const Home = (): JSX.Element => {
  const [citizen, setCitizen] = useState([]);
  const [citizenTypes, setCitizenTypes] = useState([]);
  const userTypesUpdateForm = useRef<HTMLFormElement>(null);
  const userTypeModal = useRef<any>(null);
  const [userEditId, setUserEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateUser, setUpdateUser] = useState<any>(null);
  const [isFetch, setIsFetch] = useState(false);

  const fetchCitizenTypes = async () => {
    try {
      const response = await getUserTypest();
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
      const users = citizen.find((item: any) => item?.id === id);
      setUpdateUser(users);
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

  return (
    <>
      <section className="bg-white rounded-lg p-4 shadow-lg">
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
              {citizen?.length > 0 ? (
                citizen?.map((item: any, index: any) => (
                  <tr key={index} className="h-16 border-b border-gray-300">
                    <td className="px-3">
                      <span className="border border-gray-300 px-2 py-1 rounded-md">
                        {index + 1}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <div className="flex flex-col text-left">
                          <img
                            className="rounded-full"
                            width="50"
                            height="50"
                            src={relative_image_path("demo_profile.png")}
                            alt=""
                          />
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
                      {item?.citizen_info?.status === 0
                        ? "Pending"
                        : "Approved"}
                    </td>
                    <td>{item?.status === 1 ? "Active" : "Inactive"}</td>
                    <td className="px-2">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => handleEditUser(item?.id)}
                          className="bg-blue-500 text-white rounded p-2"
                        >
                          <FaRegEdit />
                        </button>

                        <button className="ml-2 bg-red-500 text-white rounded p-2">
                          <FaTrashAlt />
                        </button>
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
        </div>
      </section>

      {/* user update model */}
      <Modal
        modalRef={userTypeModal}
        modalForm={userTypesUpdateForm}
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
                id=""
                className="w-full bg-white py-2"
                disabled={isLoading ? true : false}
              >
                {citizenTypes?.map((item: any, index: any) => {
                  return (
                    <option
                      key={index}
                      value={item?.id}
                      selected={
                        updateUser?.citizen_type_id === item?.id ? true : false
                      }
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
                <option value={1}>Active</option>
                <option value={0}>Directive</option>
              </select>
            </fieldset>
          </div>
          <div className="flex justify-end gap-3 mt-7">
            <button
              type="button"
              onClick={() => {
                modelClose(userTypeModal, userTypesUpdateForm);
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
