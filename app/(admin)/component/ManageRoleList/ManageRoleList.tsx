"use client";
import Modal from "@/app/_components/Modal/Modal";
import { modelClose, modelOpen } from "@/helper";
import { useRef, useState } from "react";
import { createRolePermission } from "../../_api/RoleManagementApi";
import { toast } from "react-toastify";
import ApiLoading from "../ApiLoading/ApiLoading";
import { useHomeContext } from "@/ContextProvider/Home.Context";

type TManageRoleProps = {
  allParentPermissionList: any;
};

const ManageRoleList = ({ allParentPermissionList }: TManageRoleProps) => {
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

  console.log({ user });

  const handleRolePermission = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError({
      name_en: "",
      name_bn: "",
    });
    const banglaName = e.target.bnName.value;
    const englishName = e.target.enName.value;

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
                  <th>Producer</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-16 border-b border-gray-300 hover:bg-gray-100">
                  <td>1</td>
                  <td>Demo Role</td>
                  <td>Demo Role bangla</td>
                  <td>Demo producer</td>
                  <td>
                    <span className="bg-green-500 text-white px-2 py-1 text-14 rounded-md">
                      active : Inactive
                    </span>
                  </td>
                  <td className="flex items-center justify-center my-2">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => modelOpen(updateModal)}
                        className="bg-primary text-14 text-white p-2 rounded-md"
                      >
                        Update
                      </button>

                      <div className="flex gap-2">
                        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 rounded-md text-14 text-white">
                          Edit Permission
                        </button>
                        {/* <Modal
                        id={"2"}
                        trigger={"অনুমতি সংশোধন"}
                        title={"অনুমতি প্রদান পরিচালনা করুন"}
                        subFunc={UpdateUser}
                        subFuncTitle={"Update"}
                      >
                        <div className="pt-3">
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
                        </div>
                      </Modal> */}

                        <button
                          onClick={() => {
                            confirm("Are you sure?");
                          }}
                          className="bg-red-500 text-white px-2 py-1 text-14 rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* add modal start one disable*/}
      <Modal modalRef={addModal} modalForm={addModelForm} title="Create Role">
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
                  {submitError?.name_en && (
                    <p className="text-red-500 text-12 ps-2">
                      {submitError.name_en}
                    </p>
                  )}
                </fieldset>
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

      {/* add modal start one disable*/}
      {/* <Modal
        modalRef={addModal}
        modalForm={addModelForm}
        title="ভুমিকা তৈরি করুন"
      >
        <form className="pt-3" ref={addModelForm}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 border-b border-gray-300 pb-5 mb-5">
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="NameBangla"
                  className="after:content-['_*'] after:text-red-400"
                >
                  ভুমিকা নাম (বাংলা)
                </label>
              </legend>
              <input
                type="text"
                id="NameBangla"
                className="w-full outline-none text-14 py-1"
                placeholder="ভুমিকার নাম লিখুন"
              />
            </fieldset>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="NameBangla"
                  className="after:content-['_*'] after:text-red-400"
                >
                  ভুমিকা নাম (ইংরেজি)
                </label>
              </legend>
              <input
                type="text"
                id="NameBangla"
                className="w-full outline-none text-14 py-1"
                placeholder="Enter Name of The Role"
              />
            </fieldset>
          </div>
          <div className="pt-6 flex justify-end">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="btn"
                onClick={() => {
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
        </form>
      </Modal> */}
      {/* add modal end */}

      {/* update modal start */}
      <Modal
        modalRef={updateModal}
        modalForm={updateModalForm}
        title="ভুমিকা সংশোধন"
      >
        <form className="pt-3" ref={updateModalForm}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 border-b border-gray-300 pb-5 mb-5">
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="NameBangla"
                  className="after:content-['_*'] after:text-red-400"
                >
                  ভুমিকা নাম (বাংলা)
                </label>
              </legend>
              <input
                type="text"
                id="NameBangla"
                className="w-full outline-none text-14 py-1"
                placeholder="ভুমিকার নাম লিখুন"
              />
            </fieldset>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="NameBangla"
                  className="after:content-['_*'] after:text-red-400"
                >
                  ভুমিকা নাম (ইংরেজি)
                </label>
              </legend>
              <input
                type="text"
                id="NameBangla"
                className="w-full outline-none text-14 py-1"
                placeholder="Enter Name of The Role"
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
        </form>
      </Modal>
      {/* update modal end */}
    </>
  );
};

export default ManageRoleList;
