'use client'

import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";
import { getHeroRightData, updateHeroRight } from "@/app/(admin)/_api";
import { toast } from "react-toastify";


const Home = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        buttons: [
            {
                label: "",
                icon: "",
            }
        ]
    });


    useEffect(() => {
        setLoading(true);
        getHeroRightData().then((res) => {
            console.log(res);
            setFormData(
                {
                    title: res?.title,
                    description: res?.short_des,
                    buttons: res?.buttons ? JSON.parse(res?.buttons) : [
                        {
                            label: "",
                            icon: "",
                        }
                    ]
                }
            )

        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, []);



    const HandleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);
        const form = new FormData();

        form.append("title", formData.title);
        form.append("short_des", formData.description);

        formData.buttons.map((item, index) => {
            form.append(`buttons[${index}][label]`, item.label);
            form.append(`buttons[${index}][icon]`, item.icon);
        })
        updateHeroRight(form).then((res) => {
            console.log(res);
            toast.success(res?.message);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.message);
        }).finally(() => setLoading(false));
    };


    return (
        <section className="bg-white p-4 min-h-screen rounded">
            <div className="flex justify-between items-center pb-5">
                <h3 className="text-32 font-mono font-bold text-[#151D48]">Hero Section</h3>
            </div>

            {
                loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                <form onSubmit={HandleUpdate} className="flex flex-col gap-2">
                    <div>
                        <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                            <legend>
                                <label htmlFor="title" className="bg-white px-2 text-14 after:content-['_*'] after:text-red-500">Title</label>
                            </legend>
                            <input onChange={(e) => setFormData({ ...formData, title: e.target.value })} value={formData.title} type="text" className="w-full outline-none text-14 py-1" placeholder="Enter Title" required />
                        </fieldset>
                    </div>

                    <div>
                        <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                            <legend>
                                <label htmlFor="description" className="bg-white px-2 text-14 after:content-['_*'] after:text-red-500">Description</label>
                            </legend>
                            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} name="description" id="description" placeholder="Enter Description" className="w-full outline-none text-14 py-1" required></textarea>
                        </fieldset>
                    </div>

                    <div className="flex items-center justify-between bg-gray-300 p-2 rounded">
                        <h3>Buttons</h3>
                        <button onClick={() => setFormData({ ...formData, buttons: [...formData.buttons, { label: "", icon: "" }] })} className="bg-primary p-1 rounded">
                            <FaPlus size={20} className="text-white" />
                        </button>
                    </div>

                    {
                        formData.buttons.map((item, index) => {
                            return (
                                <div key={index} className="flex gap-2">
                                    <fieldset className="border border-gray-400 rounded-md p-2 flex flex-col gap-2 w-full">
                                        <div className="grid grid-cols-12">
                                            <p className="text-14 after:content-['_*'] after:text-red-500">Label:</p>
                                            <input
                                                value={item.label}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    buttons: formData.buttons.map((btn, i) => i === index ? { ...btn, label: e.target.value } : btn)
                                                })}
                                                type="text"
                                                placeholder="Enter Label"
                                                className="col-span-10 border border-gray-400 focus:outline-none p-1 rounded"
                                            />
                                        </div>
                                        <div className="grid grid-cols-12">
                                            <p className="text-14 after:content-['_*'] after:text-red-500">Icon:</p>
                                            <input
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    buttons: formData.buttons.map((btn, i) => i === index ? { ...btn, icon: e.target.files[0] } : btn)
                                                })}
                                                type="file"
                                                className="col-span-10 border border-gray-400 focus:outline-none p-1 rounded"
                                            />
                                        </div>

                                        {
                                            typeof item.icon === "object" && (
                                                <div>
                                                    <Image
                                                        src={URL.createObjectURL(item.icon)}
                                                        width={320}
                                                        height={192}
                                                        className="w-[10em] h-[10em] rounded-md mt-3"
                                                        alt="Preview"
                                                    />
                                                </div>
                                            )
                                        }


                                        {
                                            (typeof item.icon == "string" && item.icon.length > 0) && (
                                                <div>
                                                    <Image
                                                        src={process.env.NEXT_PUBLIC_IMAGE_URL + item.icon}
                                                        width={320}
                                                        height={192}
                                                        className="w-[10em] h-[10em] rounded-md mt-3"
                                                        alt="Preview"
                                                    />
                                                </div>
                                            )
                                        }


                                    </fieldset>
                                    <div>
                                        <button onClick={() => setFormData({ ...formData, buttons: formData.buttons.filter((btn, i) => i !== index) })} className="bg-primary p-1 rounded">
                                            <FaMinus size={20} className="text-white" />
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }


                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Update
                        </button>
                    </div>

                </form>
            </div>
                )
            }


        </section>
    )
};

export default Home;