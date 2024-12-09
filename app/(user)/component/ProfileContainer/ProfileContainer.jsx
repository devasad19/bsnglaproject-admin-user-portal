"use client";

import { useState } from "react";
import Image from "next/image";
import { relative_image_path } from "@/helper";
import { toast } from "react-toastify";
import { updateCitizenData } from "../../_api";
import { FaCamera, FaRegEdit } from "react-icons/fa";


const ProfileContainer = ({ citizen }) => {
    const [edit, setEdit] = useState(false);
    const [formInputs, setFormInputs] = useState({
        username: citizen?.name,
        email: citizen?.email,
        phone: citizen?.phone,
        photo: citizen?.photo,
    });


    const HandleUpdate = async () => {
        const form = new FormData();
        form.append("id", citizen?.id);
        form.append("name", formInputs.username);
        form.append("email", formInputs.email);
        form.append("phone", formInputs.phone);
        form.append("photo", formInputs.photo);

        console.log('payload: ', form);

        const response = await updateCitizenData(form).then((res) => res).catch((err) => console.log(err));

        setEdit(false);

        if (response.status == true) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };


    // console.log('forminputs: ', formInputs?.photo == null);


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
                            className="flex items-center gap-2 border border-primary px-2 py-1 lg:px-4 lg:py-2 rounded-md text-primary text-14"
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
                            {
                                formInputs?.photo != null ? (
                                    typeof formInputs.photo == 'object' ? (
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
                                )
                            }

                            {
                                edit && (
                                    <div onClick={() => document.getElementById('my_modal_1').showModal()} className="hidden absolute top-0 left-0 w-full h-full group-hover:flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer">
                                        <button>
                                            <FaCamera size={20} className="text-white" />
                                        </button>
                                    </div>
                                )
                            }

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
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg pb-5">Select Image</h3>
                    <div className="flex justify-center pb-5">
                        <input onChange={(e) => setFormInputs({ ...formInputs, photo: e.target.files[0] })} type="file" name="photo" id="photo" />
                    </div>

                    <div className="flex justify-center items-center">
                        {
                            formInputs?.photo && typeof formInputs?.photo == 'object' && (
                                <Image
                                    className="w-20 h-20 rounded-full"
                                    width={1000}
                                    height={1000}
                                    src={URL.createObjectURL(formInputs?.photo)}
                                    alt="Profile Picture"
                                />
                            )
                        }
                    </div>

                    <div className="modal-action mt-0 flex items-center justify-end">
                        <form method="dialog" className="space-x-2">
                            <button className="bg-red-500 text-white px-4 py-1 rounded">Cancel</button>
                            <button className="bg-blue-500 text-white px-4 py-1 rounded">
                                Upload
                            </button>
                        </form>
                    </div>

                </div>
            </dialog>
        </>
    )
};

export default ProfileContainer;