"use client";
import Modal from "@/app/_components/Modal/Modal";
import { modelClose, modelOpen } from "@/helper";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createIcon,
  deleteIcon,
  settingIconUpdate,
} from "../../_api/Setting/SettingIconApi";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";

const SystemIconList = ({ systemIconData }: any) => {
  const addModal = useRef<any>(null);
  const addModelForm = useRef<any>(null);
  const updateModal = useRef<any>(null);
  const updateModelForm = useRef<any>(null);
  const [iconData, setIconData] = useState<any>();
  const [updateIconData, setUpdateIconData] = useState<any>();
  const [updateSingleIconInfo, setUpdateSingleIconInfo] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleIconSubmit = async (data: any) => {
    const { name } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("icon", iconData);
    formData.append("status", "1");

    try {
      const response = await createIcon(formData);
      if (response?.status) {
        toast.success("Icon Created Successfully");
        modelClose(addModal, addModelForm);
        reset();
      } else {
        toast.error("Icon Created Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error)?.message);
    }
  };

  const handleDelete = async (id: number) => {
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
          const iconResponse = deleteIcon(id)
            .then((data) => {
              if (data) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
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

  const handleIconEdit = async (id: number) => {
    if (id) {
      const updatedInfo = systemIconData?.find((item: any) => item.id === id);
      setUpdateSingleIconInfo(updatedInfo);
      modelOpen(updateModal);
    }
  };

  const handleIconUpdateSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const status = e.target.status.value;
    const formData = new FormData();
    formData.append("id", updateSingleIconInfo?.id);
    formData.append("name", name);
    formData.append("status", status);
    formData.append("icon", updateIconData);
    try {
      const response = await settingIconUpdate(formData);
      if (response?.status) {
        toast.success("Icon Updated Successfully");
        modelClose(updateModal, updateModelForm);
        setUpdateSingleIconInfo(null);
        setUpdateIconData(null);
        e.target.reset();
      } else {
        toast.error("Icon Updated Failed");
      }
    } catch (error) {
      toast.error((error as Error)?.message);
    }
  };

  return (
    <>
      <div className="bg-white p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-10">
          <h3 className="text-24 font-bold">সিস্টেম আইকন তালিকা</h3>
          <div className="space-x-4">
            <button
              onClick={() => modelOpen(addModal)}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              সিস্টেম আইকন তৈরি করুন
            </button>
          </div>
        </div>
        <div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-[#E1F6F9] h-12">
                  <th>#</th>
                  <th>আইকন নাম</th>
                  <th>আইকন ছবি</th>
                  <th>স্ট্যাটাস</th>
                  <th>অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {systemIconData?.length > 0 ? (
                  <>
                    {systemIconData?.map((item: any, index: number) => (
                      <tr
                        key={index}
                        className="h-16 border-b border-gray-300 hover:bg-gray-100"
                      >
                        <td>{index + 1}</td>
                        <td>{item?.name || ""}</td>
                        <td>
                          {item?.icon && (
                            <Image
                              className="w-[50px] h-[50px] object-cover"
                              src={
                                `${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.icon}` ||
                                ""
                              }
                              width={50}
                              height={50}
                              alt="icon"
                            />
                          )}
                        </td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-md ${
                              item.status == 1
                                ? "bg-green-500 text-white"
                                : "bg-violet-500 text-white"
                            }`}
                          >
                            {item.status == 1 ? "সক্রিয়" : "নিষ্ক্রিয়"}
                          </span>
                        </td>
                        <td className="flex items-center justify-center my-2">
                          <div className="flex flex-row gap-2">
                            <button
                              onClick={() => handleIconEdit(item?.id)}
                              className="px-2 py-1 bg-blue-500 text-white active:scale-90 transition-all duration-400 rounded-md"
                            >
                              <CiEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(item?.id)}
                              className="bg-red-500 text-white px-2 py-1 rounded-md"
                            >
                              <svg
                                className="w-4 h-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      Data Not Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        modalRef={addModal}
        modalForm={addModelForm}
        title=" সিস্টেম আইকন তৈরি করুন"
      >
        <form
          onSubmit={handleSubmit(handleIconSubmit)}
          className="pt-3"
          ref={addModelForm}
        >
          <div className="pt-3 flex flex-col gap-3">
            <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
              <legend>
                <label
                  htmlFor=""
                  className="after:content-['_*'] after:text-red-400"
                >
                  আইকন নাম
                </label>
              </legend>
              <input
                type="text"
                {...register("name", { required: "Name is Required" })}
                className="w-full text-14 outline-none py-1"
                placeholder="আইকন নাম লিখুন"
              />
            </fieldset>
            {errors.name && (
              <span className="text-red-500">
                {errors.name.message as String}
              </span>
            )}
          </div>
          <div className="pt-3 flex flex-col gap-3">
            <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
              <legend>
                <label
                  htmlFor=""
                  className="after:content-['_*'] after:text-red-400"
                >
                  আইকন ছবি
                </label>
              </legend>
              <input
                type="file"
                {...register("icon", { required: "Icon is Required" })}
                onChange={(e) => {
                  if (e.target.files) {
                    setIconData(e.target.files[0]);
                  }
                }}
                className="w-full text-14 outline-none py-1"
                placeholder="আইকন ছবি লিখুন"
              />
            </fieldset>
            {errors.icon && (
              <span className="text-red-500">
                {errors.icon.message as String}
              </span>
            )}
          </div>
          {iconData && (
            <div className="pt-3 flex flex-col gap-3">
              <Image
                className="w-[50px] h-[50px]"
                src={URL.createObjectURL(iconData)}
                width={50}
                height={50}
                alt="icon"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-7">
            <button
              type="button"
              onClick={() => {
                modelClose(addModal, addModelForm);
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

      {/* update modal */}
      <Modal
        modalRef={updateModal}
        modalForm={updateModelForm}
        setPreviewSrc={setUpdateIconData}
        title=" সিস্টেম আইকন তৈরি করুন"
      >
        <form
          onSubmit={handleIconUpdateSubmit}
          className="pt-3"
          ref={updateModelForm}
        >
          <div className="pt-3 flex flex-col gap-3">
            <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
              <legend>
                <label
                  htmlFor=""
                  className="after:content-['_*'] after:text-red-400"
                >
                  আইকন নাম
                </label>
              </legend>
              <input
                type="text"
                defaultValue={updateSingleIconInfo?.name}
                name="name"
                className="w-full text-14 outline-none py-1"
                placeholder="আইকন নাম লিখুন"
              />
            </fieldset>
          </div>
          <div className="pt-3 flex flex-col gap-3">
            <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
              <legend>
                <label
                  htmlFor=""
                  className="after:content-['_*'] after:text-red-400"
                >
                  Status
                </label>
              </legend>
              <select
                name="status"
                className="w-full text-14 outline-none py-1"
              >
                <option
                  value="1"
                  selected={updateSingleIconInfo?.status == "1"}
                >
                  Active
                </option>
                <option
                  value="0"
                  selected={updateSingleIconInfo?.status == "0"}
                >
                  Inactive
                </option>
              </select>
            </fieldset>
          </div>
          <div className="pt-3 flex flex-col gap-3">
            <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
              <legend>
                <label
                  htmlFor=""
                  className="after:content-['_*'] after:text-red-400"
                >
                  আইকন ছবি
                </label>
              </legend>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setUpdateIconData(e.target.files[0]);
                  }
                }}
                className="w-full text-14 outline-none py-1"
                placeholder="আইকন ছবি লিখুন"
              />
            </fieldset>
          </div>
          {updateIconData ? (
            <div className="pt-3 flex flex-col gap-3">
              <Image
                className="w-[50px] h-[50px] object-cover"
                src={URL.createObjectURL(updateIconData)}
                width={50}
                height={50}
                alt="icon"
              />
            </div>
          ) : (
            updateSingleIconInfo?.icon && (
              <div className="pt-3 flex flex-col gap-3">
                <Image
                  className="w-[50px] h-[50px]"
                  src={
                    `${process.env.NEXT_PUBLIC_IMAGE_URL}${updateSingleIconInfo?.icon}` ||
                    ""
                  }
                  width={50}
                  height={50}
                  alt="icon"
                />
              </div>
            )
          )}

          {iconData && (
            <div className="pt-3 flex flex-col gap-3">
              <Image
                className="w-[50px] h-[50px]"
                src={URL.createObjectURL(iconData)}
                width={50}
                height={50}
                alt="icon"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-7">
            <button
              type="button"
              onClick={() => {
                setUpdateIconData(null);
                setUpdateIconData(null);
                modelClose(updateModal, updateModelForm);
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

export default SystemIconList;
