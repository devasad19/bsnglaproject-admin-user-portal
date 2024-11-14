"use client";

import { useState } from "react";
import Image from "next/image";
import { relative_image_path } from "@/helper";
import { toast } from "react-toastify";
import { updateCitizenData } from "../../_api";


const ProfileContainer = ({citizen}) => {
    const [edit, setEdit] = useState(false);
    const [formInputs, setFormInputs] = useState({
        username: citizen?.name,
        email: citizen?.email,
        phone: citizen?.phone,
    });


    const HandleUpdate = async () => {
        const form = new FormData();
        form.append("id", citizen?.id);
        form.append("name", formInputs.username);
        form.append("email", formInputs.email);
        form.append("phone", formInputs.phone);

        const response = await updateCitizenData(form).then((res) => res).catch((err) => console.log(err));
        
        setEdit(false);

        if(response.status == true){
            toast.success(response.message);
        }else {
            toast.error(response.message);
        }
    };


    return (
        <section>
            <div className=" w-full p-4 rounded flex flex-wrap justify-between items-center pb-5">
                <h3 className="text-24 lg:text-32 font-mono font-bold text-[#151D48]">
                    My Profile
                </h3>
                {!edit && (
                    <button
                        onClick={() => setEdit(true)}
                        className="flex items-center gap-2 border border-primary px-2 py-1 lg:px-4 lg:py-2 rounded-md text-primary text-14"
                    >
                        <span>
                            <svg
                                className="w-4 h-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                            </svg>
                        </span>
                        <span>Edit</span>
                    </button>
                )}
            </div>
            <div className="bg-white w-full p-4 rounded-md shadow-lg">
                <div className="flex flex-wrap items-center gap-4 border border-gray-300 p-4 rounded-md overflow-hidden mb-5">
                    <Image
                        className="w-20 h-20 rounded-full"
                        width={1000}
                        height={1000}
                        src={relative_image_path("dummy_image1.jpg")}
                        alt="Profile Picture"
                    />
                    <div className="text-gray-500">
                        <p>{formInputs?.username}</p>
                        <p>{formInputs?.email}</p>
                    </div>
                </div>
                <div className="border border-gray-300 p-4 rounded-md mb-5">
                    <h3 className="text-20 font-mono font-bold text-[#151D48] pb-3 overflow-hidden">
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
                        <div>
                            <p className="text-gray-500 text-14">Name:</p>

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
                            <p className="text-gray-500 text-14">Phone:</p>
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
                            <p className="text-gray-500 text-14">Email:</p>
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
                        User Type: Citizen User
                    </h3>
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
            </div>
        </section>
    )
};

export default ProfileContainer;