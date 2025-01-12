"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { relative_image_path } from "@/helper";
import { toast } from "react-toastify";

import { FaCamera, FaRegEdit } from "react-icons/fa";
import { updateCitizenData } from "../../_api/user";
import UserApiLoading from "../UserAPiLoading/UserApiLoading";

const ProfileContainer = ({ citizen, userTypes, grade }) => {
  console.log({citizen});
  
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formInputs, setFormInputs] = useState({
    username: citizen?.name,
    email: citizen?.email,
    phone: citizen?.phone,
    photo: citizen?.photo,
    type: userTypes?.find(
      (item) => item?.id == citizen?.citizen_info?.citizen_type_id
    )?.name_en,
    teamSize: citizen?.citizen_info?.team_size ?? "",
    companyUrl: citizen?.citizen_info?.company_url ?? "",
    govt: {
      name_of_ministry: citizen?.citizen_info?.ministry_name ?? "",
      department_of_ministry: citizen?.citizen_info?.ministry_department ?? "",
      job_position: citizen?.citizen_info?.job_position ?? "",
      grade: citizen?.citizen_info?.grade ?? "",
    },
    researcher: {
      name_of_ministry: citizen?.citizen_info?.ministry_name ?? "",
      research_topic: citizen?.citizen_info?.research_topic ?? "",
      research_title: citizen?.citizen_info?.research_title ?? "",
      research_code: citizen?.citizen_info?.research_code ?? "",
    },
  });
  useEffect(()=>{
    setFormInputs({
      username: citizen?.name,
      email: citizen?.email,
      phone: citizen?.phone,
      photo: citizen?.photo,
      type: userTypes?.find(
        (item) => item?.id == citizen?.citizen_info?.citizen_type_id
      )?.name_en,
      teamSize: citizen?.citizen_info?.team_size ?? "",
      companyUrl: citizen?.citizen_info?.company_url ?? "",
      govt: {
        name_of_ministry: citizen?.citizen_info?.ministry_name ?? "",
        department_of_ministry: citizen?.citizen_info?.ministry_department ?? "",
        job_position: citizen?.citizen_info?.job_position ?? "",
        grade: citizen?.citizen_info?.grade ?? "",
      },
      researcher: {
        name_of_ministry: citizen?.citizen_info?.ministry_name ?? "",
        research_topic: citizen?.citizen_info?.research_topic ?? "",
        research_title: citizen?.citizen_info?.research_title ?? "",
        research_code: citizen?.citizen_info?.research_code ?? "",
      },
    })
  },[citizen, userTypes])

  const [userType, setUserType] = useState(
    userTypes?.find(
      (item) => item?.id == citizen?.citizen_info?.citizen_type_id
    )
  );
  const HandleUpdate = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("id", citizen?.id ?? "");
    form.append("name", formInputs.username ?? "");
    form.append("email", formInputs.email ?? "");
    form.append("phone", formInputs.phone ?? "");
    form.append("photo", formInputs.photo ?? "");
    form.append("citizen_type_id", userType?.id ?? "");
    form.append("team_size", formInputs.teamSize ?? "");
    form.append("company_url", formInputs.companyUrl ?? "");
    form.append("ministry_name", formInputs?.govt?.name_of_ministry ?? "");
    form.append(
      "ministry_department",
      formInputs?.govt?.department_of_ministry ?? ""
    );
    form.append("job_position", formInputs?.govt?.job_position ?? "");
    form.append("grade", formInputs?.govt?.grade ?? "");
    form.append("research_topic", formInputs?.researcher?.research_topic ?? "");
    form.append("research_title", formInputs?.researcher?.research_title ?? "");
    form.append("research_code", formInputs?.researcher?.research_code ?? "");

    try {
      const response = await updateCitizenData(form);
      setEdit(false);
      if (response.status == true) {
        setLoading(false);
        // console.log("user profile update response: ", response);
        toast.success(response.message);
        const user = {
          id: response.data.id,
          name: response.data.name,
          role: response.data.role,
          email: response.data.email,
          phone: response.data.phone,
          status: response.data.status,
          photo: response.data.photo ?? null,
          type: response.data.type,
        };

        const userinfo = JSON.stringify(user);
        document.cookie = `user=${userinfo};path=/;max-age=31536000;SameSite=Strict;Secure;`;

        // window.location.reload();
      } else {
        setLoading(false);
        toast.error(response.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const HandleUserType = (id) => {
    const userType = userTypes.find((item) => item.id == id);
    setUserType(userType);
    setFormInputs((prev) => ({ ...prev, type: userType?.slug }));
  };

  return (
    <>
      <section>
        <div className=" w-full p-4 rounded flex flex-wrap justify-between items-center pb-5">
          <h3 className="text-24 lg:text-32 font-mono font-bold text-[#151D48]">
            My Profile
          </h3>
          {!edit && (
            <button
              onClick={() => setEdit(true)}
              className="flex items-center gap-2 border border-primary px-2 py-1 lg:px-4 lg:py-2 rounded-md text-primary text-14 bg-white"
            >
              <span>
                <FaRegEdit size={20} className="fill-current" />
              </span>
              <span>Edit</span>
            </button>
          )}
        </div>
        <div className="bg-white w-full p-4 rounded-md shadow-lg">
          <div className="flex flex-wrap items-center gap-4 border border-gray-300 p-4 rounded-md overflow-hidden mb-5">
            <div className="relative group">
              {formInputs?.photo != null ? (
                typeof formInputs.photo == "object" ? (
                  <Image
                    className="w-20 h-20 rounded-full"
                    width={1000}
                    height={1000}
                    src={URL.createObjectURL(formInputs.photo)}
                    alt="Profile Picture"
                  />
                ) : (
                  <Image
                    className="w-20 h-20 rounded-full"
                    width={1000}
                    height={1000}
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + formInputs.photo}
                    alt="Profile Picture"
                  />
                )
              ) : (
                <Image
                  className="w-20 h-20 rounded-full"
                  width={1000}
                  height={1000}
                  src={relative_image_path("dummy_image1.jpg")}
                  alt="Profile Picture"
                />
              )}

              {edit && (
                <div
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                  className="hidden absolute top-0 left-0 w-full h-full group-hover:flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
                >
                  <button>
                    <FaCamera size={20} className="text-white" />
                  </button>
                </div>
              )}
            </div>

            <div className="text-gray-500">
              <p>{formInputs?.username}</p>
              <p>{formInputs?.email}</p>
            </div>
          </div>
          <div className="border border-gray-300 p-4 rounded-md mb-5">
            <h3 className="text-20 font-mono font-bold text-[#151D48] pb-3 overflow-hidden">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
              <div>
                <p
                  className={`text-gray-500 text-14 ${
                    edit && "after:content-['_*'] after:text-red-500"
                  }`}
                >
                  Name:
                </p>

                {edit ? (
                  <input
                    type="text"
                    value={formInputs?.username}
                    onChange={(e) =>
                      setFormInputs({ ...formInputs, username: e.target.value })
                    }
                    className="outline-none border border-gray-300 px-2 py-1 rounded"
                  />
                ) : (
                  <p className="text-gray-700">{formInputs?.username}</p>
                )}
              </div>
              <div>
                <p
                  className={`text-gray-500 text-14 ${
                    edit && "after:content-['_*'] after:text-red-500"
                  }`}
                >
                  Phone:
                </p>
                {edit ? (
                  <input
                    type="text"
                    value={formInputs?.phone}
                    onChange={(e) =>
                      setFormInputs({ ...formInputs, phone: e.target.value })
                    }
                    className="outline-none border border-gray-300 px-2 py-1 rounded"
                  />
                ) : (
                  <p className="text-gray-700">{formInputs?.phone}</p>
                )}
              </div>
              <div>
                <p
                  className={`text-gray-500 text-14 ${
                    edit && "after:content-['_*'] after:text-red-500"
                  }`}
                >
                  Email:
                </p>
                {edit ? (
                  <input
                    type="text"
                    value={formInputs?.email}
                    onChange={(e) =>
                      setFormInputs({ ...formInputs, email: e.target.value })
                    }
                    className="outline-none border border-gray-300 px-2 py-1 rounded"
                  />
                ) : (
                  <p className="text-gray-700">{formInputs?.email}</p>
                )}
              </div>
            </div>
          </div>
          <div className="border border-gray-300 p-4 rounded-md mb-2">
            <h3 className="text-20 font-mono font-bold text-[#151D48] pb-3 overflow-hidden">
              Other Information
            </h3>

            <div className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 pb-3">
                <div className="flex flex-col  gap-2">
                  <p className="text-gray-500 text-14">User Type:</p>

                  {edit ? (
                    <select
                      onChange={(e) => {
                        HandleUserType(e.target.value);
                      }}
                      defaultValue={citizen?.citizen_info?.citizen_type_id}
                      name=""
                      id=""
                      className="outline-none border border-gray-300 px-2 py-1 rounded h-10"
                    >
                      <option value="">--select--</option>
                      {userTypes?.map((item, index) => {
                        return (
                          <option key={index} value={item?.id}>
                            {item?.name_en}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    formInputs?.type ? formInputs?.type : "N/A"
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="flex flex-col  gap-2">
                  <p className="text-gray-500 text-14 after:content-['_*'] after:text-red-500">
                    Team Size (max persons):
                  </p>
                  <input
                    disabled={!edit}
                    value={formInputs?.teamSize}
                    onChange={(e) =>
                      setFormInputs({ ...formInputs, teamSize: e.target.value })
                    }
                    type="number"
                    className="outline-none border border-gray-300 px-2 py-1 rounded"
                    placeholder="Enter Team Size"
                  />
                </div>
                <div className="flex flex-col  gap-2">
                  <p className="text-gray-500 text-14 ">Company URL:</p>
                  <input
                    disabled={!edit}
                    value={formInputs?.companyUrl}
                    onChange={(e) =>
                      setFormInputs({
                        ...formInputs,
                        companyUrl: e.target.value,
                      })
                    }
                    type="text"
                    className="outline-none border border-gray-300 px-2 py-1 rounded"
                    placeholder="Enter Company URL"
                  />
                </div>
              </div>

              {formInputs?.type == "govt_user" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <div>
                    <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                      <legend>
                        <label className="text-gray-500 text-12">
                          Name of Ministry
                        </label>
                      </legend>

                      <input
                        disabled={!edit}
                        value={formInputs?.govt?.name_of_ministry}
                        onChange={(e) =>
                          setFormInputs({
                            ...formInputs,
                            govt: {
                              ...formInputs.govt,
                              name_of_ministry: e.target.value,
                            },
                          })
                        }
                        type="text"
                        className="w-full outline-none text-14 py-1"
                        placeholder="Enter Name of Ministry"
                      />
                    </fieldset>
                  </div>
                  <div>
                    <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                      <legend>
                        <label className="text-gray-500 text-12">
                          Department of Ministry
                        </label>
                      </legend>

                      <input
                        disabled={!edit}
                        value={formInputs?.govt?.department_of_ministry}
                        onChange={(e) =>
                          setFormInputs({
                            ...formInputs,
                            govt: {
                              ...formInputs.govt,
                              department_of_ministry: e.target.value,
                            },
                          })
                        }
                        type="text"
                        className="w-full outline-none text-14 py-1"
                        placeholder="Enter Department of Ministry"
                      />
                    </fieldset>
                  </div>
                  <div>
                    <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                      <legend>
                        <label className="text-gray-500 text-12">
                          Job Position
                        </label>
                      </legend>

                      <input
                        disabled={!edit}
                        value={formInputs?.govt?.job_position}
                        onChange={(e) =>
                          setFormInputs({
                            ...formInputs,
                            govt: {
                              ...formInputs.govt,
                              job_position: e.target.value,
                            },
                          })
                        }
                        type="text"
                        className="w-full outline-none text-14 py-1"
                        placeholder="Enter Job Position"
                      />
                    </fieldset>
                  </div>
                  <div>
                    <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                      <legend>
                        <label className="text-gray-500 text-12">Grade</label>
                      </legend>

                      <select
                        defaultValue={formInputs?.govt?.grade}
                        disabled={!edit}
                        onChange={(e) =>
                          setFormInputs({
                            ...formInputs,
                            govt: { ...formInputs.govt, grade: e.target.value },
                          })
                        }
                        name=""
                        id=""
                        className="outline-none px-2 py-1 rounded bg-white"
                      >
                        <option value="">--select--</option>
                        {grade.map((item, index) => {
                          return (
                            <option value={item.value} key={index}>
                              {item.title}
                            </option>
                          );
                        })}
                      </select>
                    </fieldset>
                  </div>
                </div>
              )}

              {formInputs?.type == "researcher" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <div>
                    <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                      <legend>
                        <label className="text-gray-500 text-12">
                          Name of Ministry
                        </label>
                      </legend>

                      <input
                        disabled={!edit}
                        value={formInputs?.govt?.name_of_ministry}
                        onChange={(e) =>
                          setFormInputs({
                            ...formInputs,
                            researcher: {
                              ...formInputs.researcher,
                              name_of_ministry: e.target.value,
                            },
                          })
                        }
                        type="text"
                        className="w-full outline-none text-14 py-1"
                        placeholder="Enter Name of Ministry"
                      />
                    </fieldset>
                  </div>
                  <div>
                    <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                      <legend>
                        <label className="text-gray-500 text-12">
                          Research Topic
                        </label>
                      </legend>

                      <input
                        disabled={!edit}
                        value={formInputs?.researcher?.research_topic}
                        onChange={(e) =>
                          setFormInputs({
                            ...formInputs,
                            researcher: {
                              ...formInputs.researcher,
                              research_topic: e.target.value,
                            },
                          })
                        }
                        type="text"
                        className="w-full outline-none text-14 py-1"
                        placeholder="Enter Research Topic"
                      />
                    </fieldset>
                  </div>
                  <div>
                    <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                      <legend>
                        <label className="text-gray-500 text-12">
                          Research Title
                        </label>
                      </legend>

                      <input
                        disabled={!edit}
                        value={formInputs?.researcher?.research_title}
                        onChange={(e) =>
                          setFormInputs({
                            ...formInputs,
                            researcher: {
                              ...formInputs.researcher,
                              research_title: e.target.value,
                            },
                          })
                        }
                        type="text"
                        className="w-full outline-none text-14 py-1"
                        placeholder="Enter Research Title"
                      />
                    </fieldset>
                  </div>
                  <div>
                    <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                      <legend>
                        <label className="text-gray-500 text-12">
                          Research Code
                        </label>
                      </legend>

                      <input
                        disabled={!edit}
                        value={formInputs?.researcher?.research_code}
                        onChange={(e) =>
                          setFormInputs({
                            ...formInputs,
                            researcher: {
                              ...formInputs.researcher,
                              research_code: e.target.value,
                            },
                          })
                        }
                        type="text"
                        className="w-full outline-none text-14 py-1"
                        placeholder="Enter Research Code"
                      />
                    </fieldset>
                  </div>
                </div>
              )}
            </div>
          </div>

          {edit && (
            <div className="flex justify-end gap-4 pt-6">
              <button
                onClick={() => setEdit(false)}
                className="bg-gray-200 text-gray-700 border border-gray-400 rounded text-14 lg:text-16 px-2 py-1 lg:px-4 lg:py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => HandleUpdate()}
                className="bg-primary text-white border border-primary rounded text-14 lg:text-16 px-2 py-1 lg:px-4 lg:py-2"
              >
                Save
              </button>
            </div>
          )}

          {loading && <UserApiLoading />}
        </div>
      </section>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg pb-5">Select Image</h3>
          <div className="flex justify-center pb-5">
            <input
              onChange={(e) =>
                setFormInputs({ ...formInputs, photo: e.target.files[0] })
              }
              type="file"
              name="photo"
              id="photo"
            />
          </div>

          <div className="flex justify-center items-center">
            {formInputs?.photo && typeof formInputs?.photo == "object" && (
              <Image
                className="w-20 h-20 rounded-full"
                width={1000}
                height={1000}
                src={URL.createObjectURL(formInputs?.photo)}
                alt="Profile Picture"
              />
            )}
          </div>

          <div className="modal-action mt-0 flex items-center justify-end">
            <form method="dialog" className="space-x-2">
              <button className="bg-red-500 text-white px-4 py-1 rounded">
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-1 rounded">
                Upload
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ProfileContainer;
