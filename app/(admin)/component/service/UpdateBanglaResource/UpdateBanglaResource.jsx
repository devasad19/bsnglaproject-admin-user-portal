'use client';
import { serviceBanglaResourceApi } from "@/app/(portal)/_api/ServiceApi/ServiceApi";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { toast } from "react-toastify";
import CustomEditor from "@/app/_components/CustomEditor/CustomEditor";
import { getServiceBanglaResource, updateServiceBanglaResource } from "@/app/(admin)/_api";



const UpdateBanglaResource = ({ id }) => {
    const router = useRouter();
    const [status, setStatus] = useState("");
    const [serviceImg, setServiceImg] = useState(null);
    const [tutorialVideo, setTutorialVideo] = useState(null);
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showItem, setShowItem] = useState("");
    const [banglaResource, setBanglaResource] = useState();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control,
        setValue
    } = useForm();

    const onSubmitBanglaResource = async (data) => {
        setIsLoading(true);
        const {
            name,
            sub_title,
            description,
            component,
            broad_description,
            support_address,
        } = data;

        const dataFormat = {
            service_id: id,
            sub_title,
            name,
            description,
            broad_description,
            support_address,
        };

        // const res = await serviceBanglaResourceApi(dataFormat);

        const res = await updateServiceBanglaResource(dataFormat, banglaResource?.id);

        if (res.status) {
            setIsLoading(false);
            toast.success(res.message);
            reset();
        } else {
            setIsLoading(false);
            toast.error("Something went wrong");
        }
    };


    useEffect(() => {
        getServiceBanglaResource(id).then((res) => {
            setBanglaResource(res?.data);
            setValue("name", res?.data?.name);
            setValue("sub_title", res?.data?.sub_title);
            setValue("description", res?.data?.description);
            setValue("broad_description", res?.data?.broad_description);


        }).catch((err) => {
            console.log(err);
        });
    }, []);

    console.log('Bangla Resource: ', banglaResource);


    return (
        <>
            <div className="relative">
                <form onSubmit={handleSubmit(onSubmitBanglaResource)}>
                    <div>
                        <fieldset className="flex flex-col border rounded-md px-2">
                            <legend>
                                <label
                                    htmlFor="ServiceName"
                                    className="after:content-['_*'] after:text-red-500"
                                >
                                    Resource Name
                                </label>
                            </legend>
                            <input
                                {...register("name", {
                                    required: "Name is required",
                                    validate: {
                                        wordCount: (value) => {
                                            const wordCount = value.trim().split(/\s+/).length;
                                            if (wordCount < 3) {
                                                return "Resource Name must have at least 3 words";
                                            } else if (wordCount > 8) {
                                                return "Resource Name cannot exceed 8 words";
                                            }
                                            return true;
                                        },
                                    },
                                })}
                                type="text"
                                placeholder="Resource Name"
                                className="outline-none p-2"
                            />
                        </fieldset>
                        {errors.name && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <fieldset className="flex flex-col border rounded-md px-2">
                            <legend>
                                <label
                                    htmlFor="ServiceName"
                                    className="after:content-['_*'] after:text-red-500"
                                >
                                    Resource Sub Title
                                </label>
                            </legend>
                            <input
                                {...register("sub_title", {
                                    required: "Sub Title is required",
                                    validate: {
                                        maxWords: (value) => {
                                            const wordCount = value.trim().split(/\s+/).length;
                                            return (
                                                wordCount <= 10 ||
                                                "Resource sub title cannot exceed 10 words"
                                            );
                                        },
                                    },
                                })}
                                id="sub_tile"
                                type="text"
                                placeholder="Resoource Sub Title"
                                className="outline-none p-2"
                            />
                        </fieldset>
                        {errors.sub_title && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {errors.sub_title.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <fieldset className="flex flex-col border rounded-md px-2">
                            <legend>
                                <label
                                    htmlFor="ServiceName"
                                    className="after:content-['_*'] after:text-red-500"
                                >
                                    Description
                                </label>
                            </legend>

                            <Controller
                                name="description"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Description is required",
                                    validate: {
                                        maxWords: (value) => {
                                            const wordCount = value.trim().split(/\s+/).length;
                                            return (
                                                wordCount <= 80 || "Description cannot exceed 80 words"
                                            );
                                        },
                                    },
                                }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <CustomEditor
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                onChange(data);
                                            }}
                                            data={value}
                                        />
                                        {error && <p>{error.message}</p>}
                                    </>
                                )}
                            />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="flex flex-col border rounded-md px-2">
                            <legend>
                                <label
                                    htmlFor="ServiceName"
                                    className="after:content-['_*'] after:text-red-500"
                                >
                                    Description For Details Page
                                </label>
                            </legend>

                            <Controller
                                name="broad_description"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Broad_description is required",
                                    validate: {
                                        maxWords: (value) => {
                                            const wordCount = value.trim().split(/\s+/).length;
                                            return (
                                                wordCount <= 80 || "Description cannot exceed 80 words"
                                            );
                                        },
                                    },
                                }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <CustomEditor
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                onChange(data);
                                            }}
                                            data={value}
                                        />
                                        {error && <p>{error.message}</p>}
                                    </>
                                )}
                            />
                        </fieldset>
                    </div>

                    {/* <div>
                        <fieldset className="flex flex-col border rounded-md px-2">
                            <legend>
                                <label
                                    htmlFor="ServiceName"
                                    className="after:content-['_*'] after:text-red-500"
                                >
                                    Support Address
                                </label>
                            </legend>
                            <input
                                {...register("support_address", {
                                    required: "Support Address is required",
                                })}
                                type="text"
                                placeholder="Support Address"
                                className="outline-none p-2"
                            />
                        </fieldset>
                        {errors.support_address && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {errors.support_address.message}
                            </p>
                        )}
                    </div> */}

                    <div className="flex justify-between pt-5">
                        <p className="text-14">
                            <span className="text-red-500">*</span> Required
                        </p>
                        {isLoading ? (
                            <button
                                type="button"
                                className="px-4 py-2 bg-violet-700 text-white active:scale-90 transition-all duration-400 rounded-md"
                            >
                                Loading...
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="px-4 py-2 bg-violet-700 text-white active:scale-90 transition-all duration-400 rounded-md"
                            >
                                Create
                            </button>
                        )}
                    </div>
                </form>
            </div>
            {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                    <div className="flex flex-col items-center space-y-4">
                        <svg
                            className="animate-spin h-12 w-12 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>
                        <p className="text-gray-700 font-medium">Loading...</p>
                    </div>
                </div>
            )}
        </>
    )
};

export default UpdateBanglaResource;