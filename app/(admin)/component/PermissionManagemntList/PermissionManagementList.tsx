"use client";
import { modelClose, modelOpen } from "@/helper";

import Modal from "@/app/_components/Modal/Modal";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { createParentPermission } from "../../_api/PermissionManagementApi";
import { toast } from "react-toastify";

import { CiEdit } from "react-icons/ci";
import { GrView } from "react-icons/gr";

interface PermissionManagementListProps {
  parentPermissionData: { id: number; name: string }[];
}

const PermissionManagementList = ({
  parentPermissionData,
}: PermissionManagementListProps) => {
  const addModal = useRef<any>(null);
  const updateModal = useRef<any>(null);
  const permissionModal = useRef<any>(null);
  // const protectedModal = useRef<any>(null);
  console.log(parentPermissionData);
  const addModelForm = useRef<any>(null);
  const permissionModalForm = useRef<any>(null);
  // const updateModalForm = useRef<any>(null);
  // const protectedModalForm = useRef<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>();

  const AddUser = (): void => {
    console.log("add user");
  };

  const UpdateUser = (): void => {
    console.log("update user");
  };

  const onParentSubmitHandle = async (data: { name: string }) => {
    try {
      const response = await createParentPermission(data);
      if (response.status) {
        modelClose(addModal, addModelForm);
        reset();
        toast.success("Permission Created Successfully");
      }
    } catch (error) {
      toast.error("Failed to Create Permission");
    }
  };
  return (
    <>
      <div className="bg-white p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-10">
          <h3 className="text-24 font-bold">অনুমতি পরিচালনা</h3>
          <div className="space-x-4">
            <button
              onClick={() => modelOpen(addModal)}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              প্যারেন্ট অনুমতির নাম তৈরি করুন
            </button>
            <button
              onClick={() => modelOpen(permissionModal)}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              অনুমতি তৈরি করুন
            </button>
          </div>
        </div>
        <div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-[#E1F6F9] h-12">
                  <th>#</th>
                  <th>প্রদর্শনী নাম</th>
                  <th>অনুমতি নাম</th>
                  <th>প্প্যারেন্ট অনুমতির নাম</th>
                  <th>স্ট্যাটাস</th>
                  <th>অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-16 border-b border-gray-300 hover:bg-gray-100">
                  <td>1</td>
                  <td>Demo Role</td>
                  <td>Demo Role bangla</td>
                  <td>Demo producer</td>
                  <td>
                    <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                      সক্রিয়
                    </span>
                  </td>
                  <td className="flex items-center justify-center my-2">
                    <div className="flex flex-row gap-2">
                      <button className="px-2 py-1  bg-blue-500 text-white active:scale-90 transition-all duration-400 rounded-md">
                        <CiEdit />
                      </button>
                      <button
                        onClick={() => {
                          confirm("Are you sure?");
                        }}
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
                <tr className="h-16 border-b border-gray-300 hover:bg-gray-100">
                  <td>2</td>
                  <td>Demo Role</td>
                  <td>Demo Role bangla</td>
                  <td>Demo producer</td>
                  <td>
                    <span className="bg-violet-500 text-white px-2 py-1 rounded-md">
                      নিষ্ক্রিয়
                    </span>
                  </td>
                  <td className="flex items-center justify-center my-2">
                    <div className="flex flex-col gap-2">
                      {/* <Modal
                        id={"3"}
                        trigger={"সংশোধন"}
                        title={"অনুমতি সংশোধন"}
                        subFunc={UpdateUser}
                        subFuncTitle={"সংরক্ষণ করুন"}
                      >
                        <div className="pt-3 flex flex-col gap-3">
                          <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                            <legend>
                              <label
                                htmlFor=""
                                className="after:content-['_*'] after:text-red-400"
                              >
                                প্যারেন্ট অনুমতির নাম
                              </label>
                            </legend>
                            <select
                              name=""
                              id=""
                              className="w-full bg-white py-2"
                            >
                              <option value="1">parent 1</option>
                              <option value="2">parent 2</option>
                              <option value="3">parent 3</option>
                            </select>
                          </fieldset>
                          <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                            <legend>
                              <label
                                htmlFor=""
                                className="after:content-['_*'] after:text-red-400"
                              >
                                প্রদর্শনী নাম
                              </label>
                            </legend>
                            <input
                              type="text"
                              className="w-full text-14 outline-none py-1"
                              placeholder="অনুমতির প্রদর্শনী নাম লিখুন"
                            />
                          </fieldset>
                          <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                            <legend>
                              <label
                                htmlFor=""
                                className="after:content-['_*'] after:text-red-400"
                              >
                                অনুমতি নাম
                              </label>
                            </legend>
                            <input
                              type="text"
                              className="w-full text-14 outline-none py-1"
                              placeholder="Enter Permission Name"
                            />
                          </fieldset>
                        </div>
                      </Modal> */}
                      <button
                        onClick={() => {
                          confirm("Are you sure?");
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                      >
                        মুছে ফেলুন
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* start add modal parent  */}
      <Modal
        modalRef={addModal}
        modalForm={addModelForm}
        title="প্যারেন্ট অনুমতির নাম তৈরি করুন"
      >
        <form
          onSubmit={handleSubmit(onParentSubmitHandle)}
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
                  প্যারেন্ট নাম
                </label>
              </legend>
              <input
                type="text"
                {...register("name", { required: "Name is Required" })}
                className="w-full text-14 outline-none py-1"
                placeholder="প্যারেন্ট অনুমতির প্রদর্শনী নাম লিখুন"
              />
            </fieldset>
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

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

      {/* permission add modal start */}
      <Modal
        modalRef={permissionModal}
        modalForm={permissionModalForm}
        title="প্যারেন্ট অনুমতির নাম তৈরি করুন"
      >
        <form className="pt-3" ref={permissionModalForm}>
          <div className="pt-3 flex flex-col gap-3">
            <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
              <legend>
                <label
                  htmlFor=""
                  className="after:content-['_*'] after:text-red-400"
                >
                  প্যারেন্ট অনুমতির নাম
                </label>
              </legend>
              <select
                disabled={parentPermissionData?.length > 0 ? false : true}
                name=""
                id=""
                className="w-full bg-white py-2"
              >
                {parentPermissionData?.map((item: any, index: number) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
              <legend>
                <label
                  htmlFor=""
                  className="after:content-['_*'] after:text-red-400"
                >
                  প্রদর্শনী নাম
                </label>
              </legend>
              <input
                type="text"
                className="w-full text-14 outline-none py-1"
                placeholder="অনুমতির প্রদর্শনী নাম লিখুন"
              />
            </fieldset>
            <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
              <legend>
                <label
                  htmlFor=""
                  className="after:content-['_*'] after:text-red-400"
                >
                  অনুমতি নাম
                </label>
              </legend>
              <input
                type="text"
                className="w-full text-14 outline-none py-1"
                placeholder="Enter Permission Name"
              />
            </fieldset>
          </div>
          <div className="flex justify-end gap-3 mt-7">
            <button
              type="button"
              onClick={() => {
                modelClose(permissionModal, permissionModalForm);
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

export default PermissionManagementList;
