'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm, Controller, } from "react-hook-form";
import { toast } from "react-toastify";
import { uploadServiceData } from "@/app/(portal)/_api";
import CustomEditor from "@/app/_components/CustomEditor/CustomEditor";
import { getSingleServiceResource, updateServiceResource } from "@/app/(admin)/_api";



const UpdateServiceResource = ({ id }) => {
    const router = useRouter();
    const [serviceResource, setServiceResource] = useState(null);
    const [paidStatus, setPaidStatus] = useState();
    const [status, setStatus] = useState("");
    const [serviceImg, setServiceImg] = useState(null);
    const [resourceFileImg, setResourceFileImg] = useState(null);
    const [tutorialVideo, setTutorialVideo] = useState(null);
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showItem, setShowItem] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control,
        setValue
    } = useForm();


    const onSubmitServiceResource = async (data) => {
        setIsLoading(true);

        const {
            component,
            description,
            distribution,
            logo,
            name,
            production_status,
            release_date,
            sub_title,
            type,
            visit_link,
            visit_type,
            resource_file,
        } = data;


        console.log('inside submit function: ',data);

        let paid_status = {
            free: data.free ? 1 : 0,
            pro: data.pro ? 1 : 0,
        };

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("component", component);
        formData.append("distribution", distribution);
        formData.append("logo", logo[0]);
        formData.append("paid_status", JSON.stringify(paid_status));
        formData.append("production_status", production_status);
        formData.append("release_date", release_date);
        formData.append("type", type);
        formData.append("sub_title", sub_title);
        formData.append("visit_link", visit_link || "");
        formData.append("visit_type", visit_type);
        formData.append("resource_file", resource_file ? resource_file[0] : "");



        const response = await updateServiceResource(formData, id);


        console.log('service update response: ',response);

        /* const uploadRes = await uploadServiceData(formData);

        if (uploadRes.status === true) {
            setIsLoading(false);
            toast.success("Service Created Successfully");
            router.push("/admin/services");
            reset();
        } else {
            setIsLoading(false);
            toast.error("Service Creation Failed");
        } */

        // console.log('formdata: ',formData);
    };


    useEffect(() => {
        getSingleServiceResource(id).then((res) => {
            setServiceResource(res?.data);
            setValue("name", res?.data?.name);
            setValue("sub_title", res?.data?.sub_title);
            setValue("description", res?.data?.description);
            setValue("type", res?.data?.type);
            setValue("production_status", res?.data?.production_status);
            setValue("component", res?.data?.component);
            // setValue("distribution", res?.data?.distribution);
            setValue("logo", res?.data?.logo);
            setValue("release_date", res?.data?.release_date);
            setValue("paid_status", JSON.parse(res?.data?.paid_status));
            setValue("visit_link", res?.data?.visit_link);
            setValue("visit_type", res?.data?.visit_type);
            setValue("resource_file", res?.data?.resource_file);

            setPaidStatus(JSON.parse(res?.data?.paid_status));
        }).catch((error) => {
            console.log(error);
        });
    }, []);



    console.log('data: ',serviceResource);



    return (
        <>
            <div className="relative">
                <form onSubmit={handleSubmit(onSubmitServiceResource)}>
                    <div>
                        <fieldset className="flex flex-col border rounded-md px-2">
                            <legend>
                                <label
                                    htmlFor="ServiceName"
                                    className="after:content-['_*'] after:text-red-500"
                                >
                                    Resoource Name
                                </label>
                            </legend>
                            <input
                                {...register("name", {
                                    required: "Name is required",
                                    validate: {
                                        wordCount: (value) => {
                                            const wordCount = value.trim().split(/\s+/).length;
                                            if (wordCount < 3) {
                                                return "Description must have at least 3 words";
                                            } else if (wordCount > 8) {
                                                return "Description cannot exceed 8 words";
                                            }
                                            return true;
                                        },
                                    },
                                })}
                                // value={serviceResource?.name}
                                type="text"
                                placeholder="Resoource Name"
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
                                    Resoource Sub Title
                                </label>
                            </legend>
                            <input
                                {...register("sub_title", {
                                    required: "Sub Title is required",
                                    validate: {
                                        maxWords: (value) => {
                                            const wordCount = value.trim().split(/\s+/).length;
                                            return (
                                                wordCount <= 10 || "Description cannot exceed 10 words"
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
                                        {errors.description && (
                                            <p className="text-red-500 text-12 px-2 pt-1">
                                                {errors.description.message}
                                            </p>
                                        )}
                                    </>
                                )}
                            />

                            {/* <textarea
                {...register("description", {
                  required: "description is required",
                  validate: {
                    maxWords: (value) => {
                      const wordCount = value.trim().split(/\s+/).length;
                      return (
                        wordCount <= 80 || "Description cannot exceed 80 words"
                      );
                    },
                  },
                })}
                id=""
                className="outline-none p-2"
                placeholder="Description"
              ></textarea> */}
                        </fieldset>
                        {/* {errors.description && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.description.message as string}
              </p>
            )} */}
                    </div>

                    <div>
                        <fieldset className="flex flex-col border rounded-md px-2">
                            <legend>
                                <label
                                    htmlFor="ServiceName"
                                    className="after:content-['_*'] after:text-red-500"
                                >
                                    Type
                                </label>
                            </legend>

                            <select
                                {...register("type", {
                                    required: "Type is required",
                                })}
                                className="outline-none p-2 bg-white"
                            >
                                <option selected={ serviceResource?.type == 'Application' } value="Application">Application</option>
                                <option selected={ serviceResource?.type == 'Plugin' } value="Plugin">Plugin</option>
                                <option selected={ serviceResource?.type == 'Mobile Apps' } value="Mobile Apps">Mobile Apps</option>
                                <option selected={ serviceResource?.type == 'Datasets' } value="Datasets">Data Sets</option>
                                <option selected={ serviceResource?.type == 'Tools' } value="Tools">Tools</option>
                                <option selected={ serviceResource?.type == 'Papers' } value="Papers">Papers</option>
                                <option selected={ serviceResource?.type == 'Font' } value="Font">Font</option>
                            </select>
                        </fieldset>
                        {errors.type && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {errors.type.message}
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
                                    Production Status
                                </label>
                            </legend>

                            <select
                                {...register("production_status", {
                                    required: "Production Status is required",
                                })}
                                className="outline-none p-2 bg-white"
                            >
                                <option selected={ serviceResource?.production_status == 'Live' } value="Live">Live</option>
                                <option selected={ serviceResource?.production_status == 'Beta' } value="Beta">Beta</option>
                                <option selected={ serviceResource?.production_status == 'On Test' } value="On Test">On Test</option>
                            </select>
                        </fieldset>
                        {errors.production_status && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {errors.production_status.message}
                            </p>
                        )}
                    </div>
                    {/* <div>
                        <fieldset className="flex flex-col border rounded-md px-2">
                            <legend>
                                <label
                                    htmlFor="ServiceName"
                                    className="after:content-['_*'] after:text-red-500"
                                >
                                    Distribution
                                </label>
                            </legend>

                            <select
                                {...register("distribution", {
                                    required: "Distribution is required",
                                })}
                                className="outline-none p-2 bg-white"
                            >
                                <option selected={ serviceResource?.distribution == 'web' } value="web">Web</option>
                                <option selected={ serviceResource?.distribution == 'windows' } value="windows">Windows</option>
                                <option selected={ serviceResource?.distribution == 'linux' } value="linux">Linux</option>
                                <option selected={ serviceResource?.distribution == 'mac' } value="mac">Mac</option>
                                <option selected={ serviceResource?.distribution == 'ios' } value="ios">IOS</option>
                                <option selected={ serviceResource?.distribution == 'android' } value="android">Android</option>
                            </select>
                        </fieldset>
                        {errors.distribution && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {errors.distribution.message}
                            </p>
                        )}
                    </div> */}

                    <div>
                        <fieldset className="flex flex-col border rounded-md px-2">
                            <legend>
                                <label
                                    htmlFor="ServiceName"
                                    className="after:content-['_*'] after:text-red-500"
                                >
                                    Release Date
                                </label>
                            </legend>

                            <input
                                type="date"
                                {...register("release_date", {
                                    required: "Release Date is required",
                                })}
                                className="outline-none p-2 bg-white"
                            />
                        </fieldset>
                        {errors.release_date && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {errors.release_date.message}
                            </p>
                        )}
                    </div>

                    {serviceImg && (
                        <Image
                            src={URL.createObjectURL(serviceImg)}
                            width={320}
                            height={192}
                            className="w-80 h-48 rounded-md"
                            alt="Preview"
                        />
                    )}
                    <div>
                        <fieldset className="flex flex-col border rounded-md px-2">
                            <legend>
                                <label
                                    htmlFor="ServiceName"
                                    className="after:content-['_*'] after:text-red-500"
                                >
                                    Logo
                                </label>
                            </legend>

                            <input
                                {...register("logo")}
                                id="file"
                                type="file"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setServiceImg(e.target.files[0]);
                                    }
                                }}
                                // accept="video/mp4, video/ogg, video/avi"
                                accept="image/*"
                            />
                        </fieldset>
                        {errors.logo && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {errors.logo.message}
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
                                    Paid Status
                                </label>
                            </legend>
                            <div className="flex gap-2 p-2">
                                <div className="space-x-2">
                                    <input
                                        type="checkbox"
                                        {...register("free")}
                                        id=""
                                        className="w-4 h-4"
                                        value={"Free"}
                                        checked={ paidStatus?.free == 1 }
                                    />
                                    <label htmlFor="free">Free</label>
                                </div>
                                <div className="space-x-2">
                                    <input
                                        type="checkbox"
                                        {...register("pro")}
                                        id=""
                                        className="w-4 h-4"
                                        value={"Pro"}
                                        checked={ paidStatus?.pro == 1 }
                                    />
                                    <label htmlFor="pro">Pro</label>
                                </div>
                            </div>
                        </fieldset>
                        {errors.paid_status && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {errors.paid_status.message}
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
                                    Components
                                </label>
                            </legend>

                            <input
                                type="text"
                                {...register("component", {
                                    required: "Components is required",
                                })}
                                className="outline-none p-2 bg-white"
                                placeholder="Enter Components"
                            />
                        </fieldset>
                        {errors.component && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {errors.component.message}
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
                                    user access
                                </label>
                            </legend>

                            <select
                                {...register("visit_type", {
                                    required: "Button is required",
                                })}
                                onChange={(e) => setShowItem(e.target.value)}
                                id=""
                                className="outline-none p-2 bg-white"
                            >
                                <option value="Download">Download</option>
                                <option value="Visit">Visit</option>
                                <option value="Subscribe">Subscribe</option>
                            </select>
                        </fieldset>
                        {errors.visit_type && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {errors.visit_type.message}
                            </p>
                        )}
                    </div>
                    {showItem == "Visit" || showItem == "Subscribe" ? (
                        <div>
                            <fieldset className="flex flex-col border rounded-md px-2">
                                <legend>
                                    <label
                                        htmlFor="ServiceName"
                                        className="after:content-['_*'] after:text-red-500"
                                    >
                                        {showItem} Link
                                    </label>
                                </legend>

                                <input
                                    type="text"
                                    {...register("visit_link", {
                                        required: "Visit Link is required",
                                    })}
                                    className="w-full outline-none p-2"
                                    placeholder="Enter Link"
                                />
                            </fieldset>
                            {errors.visit_link && (
                                <p className="text-red-500 text-12 px-2 pt-1">
                                    {errors.visit_link.message}
                                </p>
                            )}
                        </div>
                    ) : (
                        <>
                            {resourceFileImg && (
                                <Image
                                    src={URL.createObjectURL(resourceFileImg)}
                                    width={320}
                                    height={192}
                                    className="w-80 h-48 rounded-md"
                                    alt="Preview"
                                />
                            )}
                            <div>
                                <fieldset className="flex flex-col border rounded-md px-2">
                                    <legend>
                                        <label
                                            htmlFor="ServiceName"
                                            className="after:content-['_*'] after:text-red-500"
                                        >
                                            Resource Download
                                        </label>
                                    </legend>

                                    <input
                                        {...register("resource_file")}
                                        id="file"
                                        type="file"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setResourceFileImg(e.target.files[0]);
                                            }
                                        }}
                                        // accept="video/mp4, video/ogg, video/avi"
                                        accept="image/*"
                                    />
                                </fieldset>
                                {errors.resource_file && (
                                    <p className="text-red-500 text-12 px-2 pt-1">
                                        {errors.resource_file.message}
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                    <div>
                        <fieldset className="flex flex-col border rounded-md px-2">
                            <legend>
                                <label
                                    htmlFor="ServiceName"
                                    className="after:content-['_*'] after:text-red-500"
                                >
                                    Status
                                </label>
                            </legend>

                            <select
                                {...register("status", {
                                    required: "Type is required",
                                })}
                                className="outline-none p-2 bg-white"
                            >
                                <option selected={ serviceResource?.status == "1" } value="1">Publish</option>
                                <option selected={ serviceResource?.status == "0" } value="0">UnPublish</option>
                            </select>
                        </fieldset>
                        {errors.type && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {errors.type.message}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-between pt-5">
                        <p className="text-14">
                            <span className="text-red-500">*</span> Required
                        </p>
                        {isLoading ? (
                            <button
                                type="button"
                                className="px-4 py-2 bg-violet-700 text-white active:scale-90 transition-all duration-400 rounded-md flex items-center space-x-2"
                            >
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                <span>Loading...</span>
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
                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                        <div className="flex flex-col items-center space-y-4">
                            {/* Loading Spinner */}
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
                            {/* Loading Text */}
                            <p className="text-gray-700 font-medium">Loading...</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
};

export default UpdateServiceResource;