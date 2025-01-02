"use client";
import { modelClose, modelOpen } from "@/helper";

import Modal from "@/app/_components/Modal/Modal";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createParentPermission,
  createSinglePermission,
  deletePermission,
} from "../../_api/PermissionManagementApi";
import { toast } from "react-toastify";

import { CiEdit } from "react-icons/ci";
import { GrView } from "react-icons/gr";
import Swal from "sweetalert2";

interface PermissionManagementListProps {
  parentPermissionData: { id: number; name: string }[];
  permissionsData: any;
}
interface Permission {
  id: number;
  name: string;
  display_name: string;
  permission_parent_id: number;
  parent?: { name: string };
  isActive: boolean;
}

const PermissionManagementList = ({
  parentPermissionData,
  permissionsData,
}: PermissionManagementListProps) => {
  const addModal = useRef<any>(null);
  const updateModal = useRef<any>(null);
  const permissionModal = useRef<any>(null);
  const permissionModalUpdate = useRef<any>(null);
  const permissionUpdateModalForm = useRef<any>(null);
  const addModelForm = useRef<any>(null);
  const permissionModalForm = useRef<any>(null);
  
  
  const [updateSinglePermission, setUpdateSinglePermission] = useState<Partial<Permission>>({});

  const [validationError, setValidationError] = useState({
    name: "",
    display_name: "",
  });
  const [updateValidationError, setUpdateValidationError] = useState({
    Up_name: "",
    Up_display_name: "",
  });

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

  const handlePermissionSubmit = async (e: any) => {
    e.preventDefault();
    setValidationError({
      name: "",
      display_name: "",
    });

    const name = e.target.name.value;
    const parent_id = e.target.parent_id.value;
    const display_name = e.target.display_name.value;
    if (name === "" || display_name === "") {
      setValidationError({
        name: "Name is Required",
        display_name: "Display Name is Required",
      });
      return;
    }

    if (name == "") {
      setValidationError({
        name: "Name is Required",
        display_name: "",
      });
      return;
    }
    if (display_name == "") {
      setValidationError({
        name: "",
        display_name: "Display Name is Required",
      });
      return;
    }

    try {
      const permissionData = {
        name,
        display_name,
        permission_parent_id: parent_id,
      };
      console.log(permissionData);

      const response = await createSinglePermission(permissionData);
      // console.log(response);

      if (response.status) {
        modelClose(permissionModal, permissionModalForm);
        e.target.reset();
        setValidationError({
          name: "",
          display_name: "",
        });

        toast.success("Permission Created Successfully");
      }
    } catch (error) {
      toast.error("Failed to Create Permission");
    }
  };

  const handlePermissionEdit = (id:string) =>{
    if(id){
      if(permissionsData.length>0){

        const updatedData = permissionsData.find((item: { id: any }) => item.id == id);
       setUpdateSinglePermission(updatedData);
       modelOpen(permissionModalUpdate,permissionUpdateModalForm);
      }else{
        toast.error("Data Not Found");
      }
    }
  }

  // delete single permission handler

  const handleDeletePermission = async (id:any)=>{
    if(id){
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
                const dataRes = deletePermission(id)
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
                  console.log(dataRes);
                  
              }
            });
    }
  }


  // handle permission update 
  const handlePermissionSubmitUpdate = async (e:any) =>{
    e.preventDefault();

    const name = e.target.up_name.value;
    const display_name = e.target.up_display_name.value;
    const parent_id = e.target.up_parent_id.value;

    if(name == "" || display_name == ""){
      setUpdateValidationError({
        Up_name: "Name is Required",
        Up_display_name: "Display Name is Required"
      });
      return;
    }

    if(name == ""){
      setUpdateValidationError({
        Up_name: "Name is Required",
        Up_display_name: ""
      });
      return;
    }

    if(display_name == ""){
      setUpdateValidationError({
        Up_name: "",
        Up_display_name: "Display Name is Required"
      });
      return;
    }


  }
// console.log({permissionsData});

  return (
    <>
      <div className="bg-white p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-10">
            <h3 className="text-24 font-bold">Permission Management</h3>
          <div className="space-x-4">
            <button
              onClick={() => modelOpen(addModal)}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Create Parent Permission
            </button>
            <button
              onClick={() => modelOpen(permissionModal)}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Create Permission
            </button>
          </div>
        </div>
        <div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-[#E1F6F9] h-12">
                    <th>#</th>
                    <th>Display Name</th>
                    <th>Permission Name</th>
                    <th>Parent Permission Name</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {permissionsData?.length > 0 ? (
                  <>
                    {permissionsData?.map((item: any, index: number) => (
                      <tr
                        key={index}
                        className="h-16 border-b border-gray-300 hover:bg-gray-100"
                      >
                        <td>{index + 1}</td>
                        <td>{item?.display_name || ""}</td>
                        <td>{item?.name || ""}</td>
                        <td>{item?.parent?.name || ""}</td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-md ${
                              item.isActive
                                ? "bg-green-500 text-white"
                                : "bg-violet-500 text-white"
                            }`}
                          >
                            {item.isActive ? "Active" : "InActive"}
                          </span>
                        </td>
                        <td className="flex items-center justify-center my-2">
                          <div className="flex flex-row gap-2">
                            <button onClick={() => handlePermissionEdit(item?.id)} className="px-2 py-1 bg-blue-500 text-white active:scale-90 transition-all duration-400 rounded-md">
                              <CiEdit />
                            </button>
                            <button
                              onClick={()=>handleDeletePermission(item?.id)}
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

      {/* start add modal parent  */}
      <Modal
        modalRef={addModal}
        modalForm={addModelForm}
        title="Create Parent Permission Name"
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
          Parent Name
            </label>
          </legend>
          <input
            type="text"
            {...register("name", { required: "Name is Required" })}
            className="w-full text-14 outline-none py-1"
            placeholder="Enter Parent Permission Display Name"
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
        title="Create Permission"
        setServiceValidation={setValidationError}
      >
        <form
          onSubmit={handlePermissionSubmit}
          className="pt-3"
          ref={permissionModalForm}
        >
          <div className="pt-3 flex flex-col gap-3">
        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
          <legend>
            <label
          htmlFor=""
          className="after:content-['_*'] after:text-red-400"
            >
          Parent Permission Name
            </label>
          </legend>
          <select
            disabled={parentPermissionData?.length > 0 ? false : true}
            name="parent_id"
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
          Display Name
            </label>
          </legend>
          <input
            type="text"
            name="display_name"
            className="w-full text-14 outline-none py-1"
            placeholder="Enter Permission Display Name"
          />
        </fieldset>
        {validationError.display_name && (
          <span className="text-red-500">
            {validationError.display_name}
          </span>
        )}
        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
          <legend>
            <label
          htmlFor=""
          className="after:content-['_*'] after:text-red-400"
            >
          Permission Name
            </label>
          </legend>
          <input
            type="text"
            name="name"
            className="w-full text-14 outline-none py-1"
            placeholder="Enter Permission Name"
          />
        </fieldset>
        {validationError.name && (
          <span className="text-red-500">{validationError.name}</span>
        )}
          </div>
          <div className="flex justify-end gap-3 mt-7">
        <button
          type="button"
          onClick={() => {
            setValidationError({
          name: "",
          display_name: "",
            });
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

      {/* permission edit modal start */}

      <Modal
        modalRef={permissionModalUpdate}
        modalForm={permissionUpdateModalForm}
        title="অনুমতির আপডেট করুন"
        setServiceValidation={setValidationError}
      >
        <form
          onSubmit={handlePermissionSubmitUpdate}
          className="pt-3"
          ref={permissionModalForm}
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
                disabled={parentPermissionData?.length > 0 ? false : true}
                name="up_parent_id"
                id=""
                className="w-full bg-white py-2"
              >
                {parentPermissionData?.map((item: any, index: number) => (
                  <option key={index} value={item.id} selected={item.id == updateSinglePermission?.permission_parent_id ? true : false}>
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
                defaultValue={updateSinglePermission?.display_name}
                name="up_display_name"
                className="w-full text-14 outline-none py-1"
                placeholder="অনুমতির প্রদর্শনী নাম লিখুন"
              />
            </fieldset>
            {updateValidationError.Up_display_name && (
              <span className="text-red-500">
                {updateValidationError.Up_display_name}
              </span>
            )}
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
                defaultValue={updateSinglePermission?.name}
                name="up_name"
                className="w-full text-14 outline-none py-1"
                placeholder="Enter Permission Name"
              />
            </fieldset>
            {updateValidationError.Up_name && (
              <span className="text-red-500">{updateValidationError.Up_name}</span>
            )}
          </div>
          <div className="flex justify-end gap-3 mt-7">
            <button
              type="button"
              onClick={() => {
                setValidationError({
                  name: "",
                  display_name: "",
                });
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
