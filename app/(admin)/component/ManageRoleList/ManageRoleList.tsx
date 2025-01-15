"use client";
import Modal from "@/app/_components/Modal/Modal";
import { modelClose, modelOpen } from "@/helper";
import { useEffect, useRef, useState } from "react";
import {
  createRolePermission,
  deleteRolePermission,
  rolePermissionNameUpdate,
  singlePermissionRoleGet,
  singleRoleManageUpdate,
} from "../../_api/RoleManagementApi";
import { toast } from "react-toastify";
import ApiLoading from "../ApiLoading/ApiLoading";
import { useHomeContext } from "@/ContextProvider/Home.Context";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";

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
  const permissionManageModal = useRef<any>(null);
  const addModelForm = useRef<any>(null);
  const updateModalForm = useRef<any>(null);
  const permissionManageForm = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [permission, setPermission] = useState<any>([]);
  const [singleEdit, setSingleEdit] = useState<any>({
    id: "",
    name: "",
    name_bn: "",
    status: "",
  });
  const [singleManagePermission, setSingleManagePermission] =
    useState<any>(null);
  const [getAllPermission, setGetAllPermission] = useState<any>(null);
  const [updatedPermission, setUpdatedPermission] = useState<any>([]);

  const [submitError, setSubmitError] = useState<any>({
    name_en: "",
    name_bn: "",
  });
  const [editError, setEditError] = useState<any>({
    name_en: "",
    name_bn: "",
  });

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
      // console.log(response);

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
    } catch (error: any) {
      setIsLoading(false);
      console.log("catch block :", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    if (id) {
      const singleItem = allRolePermissionList.find(
        (item: any) => item.id === id
      );
      setSingleEdit({
        id: singleItem?.id,
        name: singleItem?.name,
        name_bn: singleItem?.name_bn,
        status: singleItem?.status,
      });
      modelOpen(updateModal);
    }
  };

  const handleSubmitEdit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    setEditError({
      name_en: "",
      name_bn: "",
    });
    const banglaName = singleEdit?.name_bn;
    const englishName = singleEdit?.name;
    const status = singleEdit?.status;

    if (!banglaName && !englishName) {
      setIsLoading(false);
      setEditError((prev: any) => ({
        ...prev,
        name_bn: "Bangla name is required",
        name_en: "English name is required",
      }));
      return;
    }

    if (!banglaName) {
      setIsLoading(false);
      setEditError((prev: any) => ({
        ...prev,
        name_bn: "Bangla name is required",
      }));
      return;
    }
    if (!englishName) {
      setIsLoading(false);
      setEditError((prev: any) => ({
        ...prev,
        name_en: "English name is required",
      }));
      return;
    }

    try {
      const payload = {
        name_bn: banglaName,
        name_en: englishName,
        status,
        id: singleEdit?.id,
      };
      // console.log({ payload });

      const res = await rolePermissionNameUpdate(payload);
      if (res?.status) {
        setIsLoading(false);
        modelClose(updateModal, updateModalForm);
        toast.success(res?.message);
      } else {
        setIsLoading(false);
        toast.error(res?.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  const handleManagePermissionEdit = async (id: string) => {
    if (id) {
      setLoading(true);
      try {
        const response = await singlePermissionRoleGet(id);
        if (response.status) {
          setLoading(false);
          console.log("single data :", response.data);
          setGetAllPermission(response?.data?.role?.user_permissions);
          setSingleManagePermission(response.data);
          if (response?.data?.role?.user_permissions?.length > 0) {
            response?.data?.role?.user_permissions?.forEach((element: any) => {
              setUpdatedPermission((prev: any) => [
                ...prev,
                element?.permission_id,
              ]);
            });
            // setUpdatedPermission(response?.data?.role?.user_permissions);
          }

          modelOpen(permissionManageModal);
        } else {
          setLoading(false);
          toast.error(response.message);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePermissionManageSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();

    const banglaName = e.target.bnName.value;
    const englishName = e.target.enName.value;

    try {
      const payload = {
        name_bn: banglaName,
        name_en: englishName,
        permissions: JSON.stringify(updatedPermission),
        role_id: singleManagePermission?.role?.id,
        user_id: user?.id,
        guard_name: "api",
      };
      console.log({ payload });

      const response = await singleRoleManageUpdate(payload);
      // console.log(response);

      if (response.status === true) {
        setIsLoading(false);
        toast.success(response.message);
        setUpdatedPermission([]);
        modelClose(permissionManageModal, permissionManageForm);
        e.target.reset();
      } else {
        // console.log("else block :", error);
        setIsLoading(false);
        toast.error(response.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: any) => {
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
          const rolePermissionDel = deleteRolePermission(id)
            .then((data) => {
              // console.log(data);

              if (data.status) {
                Swal.fire("Deleted!", data.message, "success");
              } else {
                Swal.fire("Error!", data.message, "error");
              }
            })
            .catch((err) => {
              console.log(err);
              Swal.fire("Error!", err.message, "error");
            });
        }
      });
    } else {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  // console.log({isLoading});

  // console.log({ updatedPermission, getAllPermission });

  return (
    <>
      <div className="bg-white p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-10">
          <h3 className="text-24 font-bold">Role Permission List</h3>
          <button
            onClick={() => {
              if (addModal?.current) {
                modelOpen(addModal);
              }
            }}
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
              {loading && <ApiLoading />}
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
                            onClick={() => {
                              handleManagePermissionEdit(rItem?.id);
                            }}
                            className="bg-primary text-14 text-white p-2 rounded-md"
                          >
                            Manage Permission
                          </button>

                          <div className="flex items-center justify-center">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  handleEdit(rItem?.id);
                                }}
                                className="bg-gradient-to-r from-indigo-500 to-blue-500  p-1 rounded-md text-14 text-white"
                              >
                                <CiEdit className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleDelete(rItem?.id)}
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

      {/*Permission Managed update modal start */}
      <Modal
        modalRef={permissionManageModal}
        modalForm={permissionManageForm}
        arrDataCloseEmty={setUpdatedPermission}
        title="Update Permission"
      >
        <form
          className="pt-3"
          onSubmit={handlePermissionManageSubmit}
          ref={permissionManageForm}
        >
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
                value={singleManagePermission?.role?.name_bn}
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
                value={singleManagePermission?.role?.name}
                placeholder="Enter Role Name in English"
                name="enName"
              />
            </fieldset>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <>
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
                              const isChecked = updatedPermission.includes(
                                cItem.id
                              ); // Simplified check logic
                              return (
                                <li
                                  key={cIndex}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      setUpdatedPermission((prev: any) => {
                                        if (checked) {
                                          return [...prev, cItem.id];
                                        } else {
                                          return prev.filter(
                                            (item: any) => item !== cItem.id
                                          );
                                        }
                                      });
                                    }}
                                    value={cItem.id}
                                    checked={isChecked} // Directly use isChecked
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
            </>
          </div>
          <div className="pt-6 flex justify-end">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setSubmitError(null);
                  setUpdatedPermission([]);
                  modelClose(permissionManageModal, permissionManageForm);
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

      {/* edit modal start */}
      <Modal
        modalRef={updateModal}
        modalForm={updateModalForm}
        setServiceValidation={setEditError}
        title="Update Role"
      >
        <form
          className="pt-3"
          onSubmit={handleSubmitEdit}
          ref={updateModalForm}
        >
          <div className="grid grid-cols-1  gap-2 border-b border-gray-300 pb-5 mb-5">
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
                  className="w-full outline-none text-14 py-1  rounded"
                  value={singleEdit?.name_bn}
                  onChange={(e) => {
                    setSingleEdit((prev: any) => ({
                      ...prev,
                      name_bn: e.target.value,
                    }));
                  }}
                  name="bnName"
                  placeholder="Enter Role Name in Bangla"
                />
              </fieldset>
              {editError?.name_bn && (
                <p className="text-red-500 text-12 ps-2">{editError.name_bn}</p>
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
                  className="w-full outline-none text-14 py-1  rounded"
                  value={singleEdit?.name}
                  onChange={(e) => {
                    setSingleEdit((prev: any) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                  placeholder="Enter Role Name in English"
                  name="enName"
                />
              </fieldset>
              {editError?.name_en && (
                <p className="text-red-500 text-12 ps-2">{editError.name_en}</p>
              )}
            </div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="NameEnglish"
                  className="after:content-['_*'] after:text-red-400"
                >
                  Status
                </label>
              </legend>
              <select
                name="status"
                id="status"
                value={singleEdit?.status}
                onChange={(e) => {
                  setSingleEdit((prev: any) => ({
                    ...prev,
                    status: e.target.value,
                  }));
                }}
                className="w-full outline-none text-14 py-1  rounded"
              >
                <option value="1" selected={singleEdit?.status == 1}>
                  Active
                </option>
                <option value="0" selected={singleEdit?.status == 0}>
                  Inactive
                </option>
              </select>
            </fieldset>
          </div>

          <div className="pt-6 flex justify-end">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setSubmitError(null);
                  modelClose(updateModal, updateModalForm);
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
    </>
  );
};

export default ManageRoleList;
