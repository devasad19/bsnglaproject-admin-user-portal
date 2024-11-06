'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { getSingleSlider } from "@/app/(admin)/_api";



const Home = ({ params: { id } }) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        image: null,
        url: "",
        captionText: "",
        buttonText: "",
        status: "",
    });


    useEffect(() => {
        getSingleSlider(id).then((res) => {
            setData(res.data);
        }).catch((err) => console.log(err)).finally(() => setLoading(false));
    },[id]);
    console.log('banner: ', data);
    return (
        <section className="bg-white p-4 rounded min-h-screen">
            <div className=" w-full inline-flex flex-col lg:flex-row justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href={{
                            pathname: "/admin/setting/banner",
                        }}
                        shallow
                    >
                        <svg
                            className="w-6 h-6 fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                        </svg>
                    </Link>

                    <h3 className="text-32 font-mono font-bold text-[#151D48]">
                        Edit Slider
                    </h3>
                </div>
            </div>

            <div>
                <form
                    className="grid grid-cols-1 gap-2"
                >
                    <div>
                        <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                            <legend>
                                <label
                                    htmlFor="slider_image"
                                    className="text-14  bg-white px-2"
                                >
                                    Change Slider Image:
                                </label>
                            </legend>
                            <input
                                type="file"
                                id="slider_image"
                                className="p-2 w-full"
                            />
                        </fieldset>
                        {/* {errors.slider_image && (
                            <span className="text-red-500 text-12 px-2 pt-1">
                                This field is required
                            </span>
                        )} */}
                    </div>
                    <div>
                        <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                            <legend>
                                <label
                                    htmlFor="link"
                                    className="text-14 bg-white px-2"
                                >
                                    Url:
                                </label>
                            </legend>
                            <input
                                id="link"
                                placeholder="Enter Slider url"
                                className="outline-none text-14 p-2 w-full"
                            ></input>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                            <legend>
                                <label
                                    htmlFor="slider_description"
                                    className="text-14 bg-white px-2"
                                >
                                    Caption Text:
                                </label>
                            </legend>
                            <input
                                id="slider_description"
                                placeholder="Enter Slider Description"
                                className="outline-none text-14 p-2 w-full"
                            ></input>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                            <legend>
                                <label
                                    htmlFor="caption_button"
                                    className="text-14 bg-white px-2"
                                >
                                    Caption Button Text:
                                </label>
                            </legend>
                            <input
                                id="caption_button"
                                placeholder="Enter caption button text"
                                className="outline-none text-14 p-2 w-full"
                            ></input>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                            <legend>
                                <label
                                    htmlFor="slider_status"
                                    className="text-14 p-2 bg-white"
                                >
                                    Select Slider Status:
                                </label>
                            </legend>
                            <select
                                id="slider_status"
                                className="text-14 p-2 bg-white"
                            >
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                            </select>
                        </fieldset>
                    </div>
                    <div className="pt-6 flex justify-end">
                        <div className="flex items-center gap-4">
                            <Link href={{
                                pathname: "/admin/setting/banner",
                            }} shallow>
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-3 rounded-md"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>


        </section>
    )
};

export default Home;