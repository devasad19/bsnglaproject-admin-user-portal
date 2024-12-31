"use client";
import Modal from "@/app/_components/Modal/Modal";
import { modelClose, modelOpen } from "@/helper";
import { useRef, useState } from "react";
import { createRolePermission } from "../../_api/RoleManagementApi";
import { toast } from "react-toastify";
import ApiLoading from "../ApiLoading/ApiLoading";
import { useHomeContext } from "@/ContextProvider/Home.Context";
import { CiEdit } from "react-icons/ci";

type TManageRoleProps = {
  allParentPermissionList: any;
  allRolePermissionList: any[];
};

const ManageRoleList = ({
  allParentPermissionList,
  allRolePermissionList,
}: TManageRoleProps) => {
  const homeContext = useHomeContext();
  const user = homeContext?.user;
  const addModal = useRef<any>(null);
  const updateModal = useRef<any>(null);
  const protectedModal = useRef<any>(null);

  const addModelForm = useRef<any>(null);
  const updateModalForm = useRef<any>(null);
  const protectedModalForm = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [permission, setPermission] = useState<any>([]);
  const [submitError, setSubmitError] = useState<any>({
    name_en: "",
    name_bn: "",
  });

  // console.log({ user });

  const handleRolePermission = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError({
      name_en: "",
      name_bn: "",
    });
    const banglaName = e.target.bnName.value;
    const englishName = e.target.enName.value;

    if (!banglaName && !englishName) {
      setIsLoading(false);
      setSubmitError((prev: any) => ({
        ...prev,
        name_bn: "Bangla name is required",
        name_en: "English name is required",
      }));
      return;
    }

    if (!banglaName) {
      setIsLoading(false);
      setSubmitError((prev: any) => ({
        ...prev,
        name_bn: "Bangla name is required",
      }));
      return;
    }
    if (!englishName) {
      setIsLoading(false);
      setSubmitError((prev: any) => ({
        ...prev,
        name_en: "English name is required",
      }));
      return;
    }

    try {
      const payload = {
        name_bn: banglaName,
        name_en: englishName,
        user_id: user?.id,
        guard_name: "api",
        permissions: JSON.stringify(permission),
      };

      console.log(payload);

      const response = await createRolePermission(payload);
      console.log(response);

      if (response.status === true) {
        setIsLoading(false);
        toast.success(response.message);
        modelClose(addModal, addModelForm);
        e.target.reset();
        setSubmitError({
          name_en: "",
          name_bn: "",
        });
      } else {
        // console.log("else block :", error);
        setIsLoading(false);
        toast.error(response.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("catch block :", error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-10">
          <h3 className="text-24 font-bold">Role Permission List</h3>
          <button
            onClick={() => modelOpen(addModal)}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Create Role Permission
          </button>
        </div>
        <div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-[#E1F6F9] h-12">
                  <th>#</th>
                  <th>Role Name (English)</th>
                  <th>Role Name(Bangla)</th>
                  <th>Created By</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allRolePermissionList?.length > 0 ? (
                  allRolePermissionList.map((rItem: any, index: number) => (
                    <tr
                      key={index}
                      className="h-16 border-b border-gray-300 hover:bg-gray-100"
                    >
                      <td>{index + 1}</td>
                      <td>{rItem?.name || ""}</td>
                      <td>{rItem?.name_bn ?? ""}</td>
                      <td>{rItem?.user?.name ?? ""}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-md ${
                            rItem.status == 1
                              ? "bg-green-500 text-white"
                              : "bg-violet-500 text-white"
                          }`}
                        >
                          {rItem.status == 1 ? "active" : "inactive"}
                        </span>
                      </td>
                      <td className="flex items-center justify-center my-2">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => modelOpen(updateModal)}
                            className="bg-primary text-14 text-white p-2 rounded-md"
                          >
                            Manage Permission
                          </button>

                          <div className="flex items-center justify-center">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => modelOpen(updateModal)}
                                className="bg-gradient-to-r from-indigo-500 to-blue-500  p-1 rounded-md text-14 text-white"
                              >
                                <CiEdit className="w-4 h-4" />
                              </button>

                              <button
                                // onClick={() => handleDelete(item?.id)}
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
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* add modal start one disable*/}
      <Modal
        modalRef={addModal}
        modalForm={addModelForm}
        setServiceValidation={setSubmitError}
        title="Create Role"
      >
        <>
          <form
            className="pt-3"
            ref={addModelForm}
            onSubmit={handleRolePermission}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 border-b border-gray-300 pb-5 mb-5">
              <div>
                <fieldset className="flex flex-col border rounded-md px-2">
                  <legend>
                    <label
                      htmlFor="NameBangla"
                      className="after:content-['_*'] after:text-red-400"
                    >
                      Role Name (Bangla)
                    </label>
                  </legend>
                  <input
                    type="text"
                    id="NameBangla"
                    className="w-full outline-none text-14 py-1"
                    name="bnName"
                    placeholder="Enter Role Name in Bangla"
                  />
                </fieldset>
                {submitError?.name_bn && (
                  <p className="text-red-500 text-12 ps-2">
                    {submitError.name_bn}
                  </p>
                )}
              </div>
              <div>
                <fieldset className="flex flex-col border rounded-md px-2">
                  <legend>
                    <label
                      htmlFor="NameEnglish"
                      className="after:content-['_*'] after:text-red-400"
                    >
                      Role Name (English)
                    </label>
                  </legend>
                  <input
                    type="text"
                    id="NameEnglish"
                    name="enName"
                    className="w-full outline-none text-14 py-1"
                    placeholder="Enter Role Name in English"
                  />
                </fieldset>
                {submitError?.name_en && (
                  <p className="text-red-500 text-12 ps-2">
                    {submitError.name_en}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {allParentPermissionList?.length > 0 ? (
                allParentPermissionList?.map((pItem: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-md"
                    >
                      <div>
                        <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                          {pItem?.name ?? ""}
                        </h3>
                      </div>
                      <ul className="p-2">
                        {pItem?.permissions?.length > 0 ? (
                          pItem?.permissions?.map(
                            (cItem: any, cIndex: number) => {
                              return (
                                <li
                                  key={cIndex}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    onChange={() => {
                                      setPermission((prev: any[]) => [
                                        ...prev,
                                        cItem?.id,
                                      ]);
                                    }}
                                  />
                                  <label htmlFor="">
                                    {cItem?.display_name ?? ""}
                                  </label>
                                </li>
                              );
                            }
                          )
                        ) : (
                          <></>
                        )}
                      </ul>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            <div className="pt-6 flex justify-end">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setSubmitError(null);
                    modelClose(addModal, addModelForm);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-3 rounded-md"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
          {isLoading && <ApiLoading />}
        </>
      </Modal>

      {/* update modal start */}
      <Modal
        modalRef={updateModal}
        modalForm={updateModalForm}
        title="Update Role"
      >
        <form className="pt-3" ref={updateModalForm}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 border-b border-gray-300 pb-5 mb-5">
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="NameBangla"
                  className="after:content-['_*'] after:text-red-400"
                >
                  Role Name (Bangla)
                </label>
              </legend>
              <input
                type="text"
                id="NameBangla"
                className="w-full outline-none text-14 py-1 bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300 rounded"
                disabled={true}
                name="bnName"
                placeholder="Enter Role Name in Bangla"
              />
            </fieldset>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="NameEnglish"
                  className="after:content-['_*'] after:text-red-400"
                >
                  Role Name (English)
                </label>
              </legend>
              <input
                type="text"
                id="NameEnglish"
                className="w-full outline-none text-14 py-1 bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300 rounded"
                disabled={true}
                placeholder="Enter Role Name in English"
                name="enName"
              />
            </fieldset>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-6 flex justify-end">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setSubmitError(null);
                  modelClose(addModal, addModelForm);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-3 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </Modal>
      {/* update modal end */}
    </>
  );
};

export default ManageRoleList;
