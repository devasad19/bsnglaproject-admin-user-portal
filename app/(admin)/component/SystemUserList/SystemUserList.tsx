"use client";
import { modelClose, modelOpen, relative_image_path } from "@/helper";
import Image from "next/image";
import Modal from "@/app/_components/Modal/Modal";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  createUserApi,
  deleteUser,
  updateUser,
} from "../../_api/ManageSystemUserApi";
import Swal from "sweetalert2";
import ApiLoading from "../ApiLoading/ApiLoading";

const SystemUserList = ({ users, rolesList }: any) => {
  const addUserModal = useRef(null);
  const addUserForm = useRef(null);
  const updateUserModal = useRef(null);
  const updateUserForm = useRef(null);
  const[loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState<any>({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "",
    id: "",
  });
  console.log({ users });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const userHandleSubmit = async (data: any) => {
    try {
      const { name, email, phone, role, password, c_password } = data;
      const submitValue = {
        name,
        email,
        phone,
        role_id: role,
        // status: 1,
        password,
        password_confirmation: c_password,
      };
      // console.log({ submitValue });
      
      const resUser = await createUserApi(submitValue);
      // console.log({ resUser });

      if (resUser.status) {
        toast.success(resUser.message, { autoClose: 2000 });
        reset();
        modelClose(addUserModal, addUserForm);
      } else {
        toast.error(resUser.message, { autoClose: 2000 });
      }
    } catch (err: any) {
      toast.error(err.message, { autoClose: 2000 });
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
          const serviceDeleteData = deleteUser(id)
            .then((data: any) => {
              if (data) {
                // setRefetch(!refetch);
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                // window.location.reload();
              } else {
                Swal.fire("Error!", "Something went wrong.", "error");
              }
            })
            .catch((err: any) => {
              console.log(err);
            });
        }
      });
    }
  };

  const handleEdit = (id: any) => {
    if (id) {
      const finedUser = users.find((item: any) => item.id == id);
      console.log({ finedUser });
      setFormValue({
        name: finedUser?.name,
        email: finedUser?.email,
        phone: finedUser?.phone,
        role: finedUser?.role_id,
        status: finedUser?.status,
        id: finedUser?.id,
      });
      modelOpen(updateUserModal);
    }
  };

  const handleEditSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formValue.name);
    formData.append("email", formValue.email);
    formData.append("phone", formValue.phone);
    formData.append("role_id", formValue.role);
    formData.append("status", formValue.status);
    formData.append("id", formValue.id);

    try {
      const response = await updateUser(formData);
      console.log({ response });
      if (response.status) {
        setLoading(false);
        toast.success(response.message, { autoClose: 2000 });
        modelClose(updateUserModal, updateUserForm);
      } else {
        setLoading(false);
        toast.error(response.message, { autoClose: 2000 });
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message, { autoClose: 2000 });
    } finally {
      setLoading(false);
      // modelClose(updateUserModal, updateUserForm);
    }
  };

  // console.log({formValue});

  return (
    <>
      <section>
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <div className="flex flex-col lg:flex-row justify-between pb-5">
            <div className="flex gap-4 pb-5 lg:pb-0">
              <button className="px-2 py-1 lg:px-4 lg:py-2 bg-[#E1F6F9] text-black active:scale-90 transition-all duration-400 rounded-md">
                All Users
              </button>
              {/* <button className="px-2 py-1 lg:px-4 lg:py-2  text-black active:scale-90 transition-all duration-400 rounded-md">
                  Admin
                </button> */}
            </div>
            <div className="flex flex-col items-center lg:flex-row gap-4">
              {/* <form className="bg-white rounded-md shadow-md text-[#515151] flex items-center gap-2 px-2 py-1 lg:py-0">
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
                  placeholder="Search for your keyword"
                  className="outline-none"
                />
              </form> */}
              <div>
                <button
                  onClick={() => modelOpen(addUserModal)}
                  className="btn btn-sm btn-secondary"
                >
                  Add USer
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#E1F6F9] h-8">
                  <th>SL</th>
                  <th>User Name</th>
                  <th>Phone</th>
                  <th>Designation</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {users?.length > 0 ? (
                  users.map((item: any, index: any) => (
                    <tr key={index} className="h-16 border-b border-gray-300">
                      <td className="px-3">
                        <span className="border border-gray-300 px-2 py-1 rounded-md">
                          {index + 1}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center justify-center">
                          <Image
                            src={relative_image_path("profileImage.png")}
                            className="w-[2.125em] h-[2.125em] rounded-full"
                            width={1000}
                            height={1000}
                            alt="Bangla"
                          />
                          <div className="flex flex-col text-left">
                            <span className="ml-2 text-13">{item?.name}</span>
                            <span className="ml-2 text-[11px] text-[#868686]">
                              {item?.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{item?.phone}</td>
                      <td>{item?.role?.name || ""}</td>
                      <td className={`font-medium text-13 ${item?.status == 0 ? "text-red-500" : "text-green-500"}`}>
                        {item?.status == 1 ? "Active" : "Inactive"}
                      </td>
                      <td>
                        <button
                          onClick={() => handleEdit(item?.id)}
                          className="p-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300"
                        >
                          <svg
                            className="w-5 h-5 fill-[#A4A4A4]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                          className="p-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ml-2"
                        >
                          <svg
                            className="w-5 h-5 fill-[#A4A4A4]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* <div className="pt-10 flex justify-center">
                <div className="flex items-center gap-2">
                  <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 bg-primary text-white">
                    Prev
                  </button>
                  <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 bg-primary text-white">
                    1
                  </button>
                  <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                    2
                  </button>
                  <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                    3
                  </button>
                  <span>...</span>
                  <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                    8
                  </button>
                  <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                    9
                  </button>
                  <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                    10
                  </button>
                  <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 bg-primary text-white">
                    Next
                  </button>
                </div>
              </div> */}
          </div>
        </div>
      </section>

      {/* modal insert start */}
      <Modal
        modalForm={addUserForm}
        modalRef={addUserModal}
        title={" Add User"}
      >
        <form
          onSubmit={handleSubmit(userHandleSubmit)}
          className="pt-3 space-y-3"
          ref={addUserForm}
        >
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label htmlFor="name">Name</label>
              </legend>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full outline-none"
                placeholder="User Name"
              />
            </fieldset>
            {errors.name && (
              <span className="text-red-500 text-12 px-2 pt-1">
                This field is required
              </span>
            )}
          </div>
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label htmlFor="email">Email</label>
              </legend>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full outline-none"
                placeholder="example@example.com"
              />
            </fieldset>
            {errors.email && (
              <span className="text-red-500 text-12 px-4 pt-1">
                This field is required
              </span>
            )}
          </div>
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label htmlFor="name">Phone</label>
              </legend>
              <input
                type="phone"
                {...register("phone", { required: true })}
                className="w-full outline-none"
                placeholder="+8801..."
              />
            </fieldset>
            {errors.phone && (
              <span className="text-red-500 text-12 px-4 pt-1">
                This field is required
              </span>
            )}
          </div>
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label htmlFor="name">Role</label>
              </legend>
              <select
                {...register("role", { required: true })}
                className="bg-white py-1"
                disabled={rolesList.length < 1}
              >
                <option value="" className="text-gray-400">
                  --Select Role--
                </option>
                {rolesList?.map((item: any, index: any) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </fieldset>
            {errors.role && (
              <span className="text-red-500 text-12 px-4 pt-1">
                This field is required
              </span>
            )}
          </div>
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label htmlFor="name">Password</label>
              </legend>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full outline-none"
              />
            </fieldset>
            {errors.password && (
              <span className="text-red-500 text-12 px-4 pt-1">
                This field is required
              </span>
            )}
          </div>
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label htmlFor="name">Confirm Password</label>
              </legend>
              <input
                type="password"
                {...register("c_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full outline-none"
              />
            </fieldset>
            {errors.c_password && (
              <span className="text-red-500 text-12 px-4 pt-1">
                {errors.c_password.message as string}
              </span>
            )}
          </div>
          <div className="pt-6 flex justify-end">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  modelClose(addUserModal, addUserForm);
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
      </Modal>

      {/* update model here */}

      <Modal
        modalForm={updateUserForm}
        modalRef={updateUserModal}
        title={"Update User"}
      >
        <form
          onSubmit={handleEditSubmit}
          className="pt-3 space-y-3"
          ref={updateUserModal}
        >
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label htmlFor="name">Name</label>
              </legend>
              <input
                type="text"
                value={formValue.name}
                onChange={(e) =>
                  setFormValue({ ...formValue, name: e.target.value })
                }
                className="w-full outline-none"
                placeholder="User Name"
              />
            </fieldset>
            {/* {errors.name && (
              <span className="text-red-500 text-12 px-2 pt-1">
                This field is required
              </span>
            )} */}
          </div>
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label htmlFor="email">Email</label>
              </legend>
              <input
                type="email"
                value={formValue.email}
                onChange={(e) =>
                  setFormValue({ ...formValue, email: e.target.value })
                }
                className="w-full outline-none"
                placeholder="example@example.com"
              />
            </fieldset>
            {/* {errors.email && (
              <span className="text-red-500 text-12 px-4 pt-1">
                This field is required
              </span>
            )} */}
          </div>
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label htmlFor="name">Phone</label>
              </legend>
              <input
                type="phone"
                value={formValue.phone}
                onChange={(e) =>
                  setFormValue({ ...formValue, phone: e.target.value })
                }
                className="w-full outline-none"
                placeholder="+8801..."
              />
            </fieldset>
            {/* {errors.phone && (
              <span className="text-red-500 text-12 px-4 pt-1">
                This field is required
              </span>
            )} */}
          </div>
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label htmlFor="name">Role</label>
              </legend>
              <select
                value={formValue.role}
                onChange={(e) =>
                  setFormValue({ ...formValue, role: e.target.value })
                }
                className="bg-white py-1"
                disabled={rolesList.length < 1}
              >
                <option value="" className="text-gray-400">
                  --Select Role--
                </option>
                {rolesList?.map((item: any, index: any) => (
                  <option
                    key={index}
                    value={item.id}
                    selected={item.id == formValue.role}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label htmlFor="name">Status</label>
              </legend>
              <select
                value={formValue.status}
                onChange={(e) =>
                  setFormValue({ ...formValue, status: e.target.value })
                }
                className="bg-white py-1"
              >
                <option value="1" selected={formValue.status == 1}>
                  Active
                </option>
                <option value="0" selected={formValue.status == 0}>
                  InActive
                </option>
              </select>
            </fieldset>
            {/* {errors.role && (
              <span className="text-red-500 text-12 px-4 pt-1">
                This field is required
              </span>
            )} */}
          </div>

          <div className="pt-6 flex justify-end">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  modelClose(updateUserModal, updateUserForm);
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
          {
            loading && <ApiLoading/>
          }
        </form>
      </Modal>
    </>
  );
};

export default SystemUserList;
