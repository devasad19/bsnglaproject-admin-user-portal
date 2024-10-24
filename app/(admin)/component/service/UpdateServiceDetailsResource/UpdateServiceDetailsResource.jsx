"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CountWords, GetFileSize, sanitizeYoutubeUrl } from "@/helper";
import { serviceDetailsResourceApi } from "@/app/(portal)/_api/ServiceApi/ServiceApi";
import { getSingleServiceDetailsResource } from "@/app/(admin)/_api";

const UpdateServiceDetailsResource = ({ id }) => {
    const router = useRouter();
    const [serviceDetailsResource, setServiceDetailsResource] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        description: "",
        mediaImages: [],
        distribution: [
            {
                label: "",
                icon: "",
            }
        ],
        user_characteristics: [
            {
                label: "",
            }
        ],
        api_characteristics: [
            {
                label: "",
            }
        ],
        user_doc: {
            label: "",
            icon: "",
            video_link: "",
            short_description: "",
            module_file: [
                {
                    label: "",
                    version: "",
                    module: ""
                }
            ],
            external_links: [
                {
                    label: "",
                    link: ""
                }
            ]
        },

        api_doc: {
            label: "",
            icon: "",
            video_link: "",
            short_description: "",
            module_file: [
                {
                    label: "",
                    version: "",
                    module: ""
                }
            ],
            external_links: [
                {
                    label: "",
                    link: ""
                }
            ]
        }
    });

    const [error, setError] = useState({
        description: {
            status: false,
            message: ""
        },

        mediaImages: {
            status: false,
            message: ""
        },

        distribution: {
            status: false,
            message: "",
        },

        userCharacter: {
            status: false,
            message: "",
        },

        apiCharacter: {
            status: false,
            message: "",
        },

        userDoc: {
            label: {
                status: false,
                message: ""
            },
            icon: {
                status: false,
                message: ""
            },
            video: {
                status: false,
                message: ""
            },
            shortDes: {
                status: false,
                message: ""
            },
            module: {
                status: false,
                message: ""
            },
            extraLink: {
                status: false,
                message: ""
            }
        },


        apiDoc: {
            label: {
                status: false,
                message: ""
            },
            icon: {
                status: false,
                message: ""
            },
            video: {
                status: false,
                message: ""
            },
            shortDes: {
                status: false,
                message: ""
            },
            module: {
                status: false,
                message: ""
            },
            extraLink: {
                status: false,
                message: ""
            }
        },

    });


    const HandleFormSubmit = async (e) => {
        e.preventDefault();


        /* console.log( 'unsanitized youtube: ',formData?.user_doc?.video_link);
        console.log( 'sanitized youtube: ',sanitizeYoutubeUrl(formData?.user_doc?.video_link)); */


        if (CountWords(formData?.description) < 10 || CountWords(formData?.description) > 100) {
            setError({ ...error, description: { status: true, message: "Description has to be 10 to 100 words." } });
        }



        const mediaFiles = [...formData?.mediaImages];

        if (mediaFiles?.length > 0) {
            mediaFiles?.map((item) => {
                if (GetFileSize(item) > 500000) {
                    setError({ ...error, mediaImages: { status: true, message: "Image size should be less than 500kb." } });
                }
            })
        }

        if (formData?.distribution?.length < 1 || formData?.distribution?.length > 10) {
            setError({ ...error, distribution: { status: true, message: "Distribution has to be 1 to 10." } });
        } else {
            formData?.distribution?.map((item) => {
                if (CountWords(item?.label) < 1 || CountWords(item?.label) > 3) {
                    setError({ ...error, distribution: { status: true, message: "Distribution label has to be 1 to 3 words." } });
                } else if (GetFileSize(item?.icon) > 80000) {
                    setError({ ...error, distribution: { status: true, message: "Distribution icon size should be less than 80kb." } });
                }
            });
        }

        if (formData?.user_characteristics?.length < 1 || formData?.user_characteristics?.length > 5) {
            setError({ ...error, userCharacter: { status: true, message: "User Characteristics has to be 1 to 5." } });
        } else {
            formData?.user_characteristics?.map((item) => {
                if (CountWords(item?.label) < 3 || CountWords(item?.label) > 5) {
                    setError({ ...error, userCharacter: { status: true, message: "User Characteristic label has to be 3 to 5 words." } });
                }
            });
        }


        if (formData?.api_characteristics?.length < 1 || formData?.api_characteristics?.length > 5) {
            setError({ ...error, apiCharacter: { status: true, message: "API Characteristics has to be 1 to 5." } });
        } else {
            formData?.api_characteristics?.map((item) => {
                if (CountWords(item?.label) < 3 || CountWords(item?.label) > 5) {
                    setError({ ...error, apiCharacter: { status: true, message: "API Characteristic label has to be 3 to 5 words." } });
                }
            });
        }

        /* user doc validation start */

        if (CountWords(formData?.user_doc?.label) < 2 || CountWords(formData?.user_doc?.label) > 4) {
            setError({ ...error, userDoc: { label: { status: true, message: "User Documentation label has to be 2 to 4 words." } } });
        }

        if (GetFileSize(formData?.user_doc?.icon) > 100000) {
            setError({ ...error, userDoc: { icon: { status: true, message: "User Documentation icon size should be less than 100kb." } } });
        }


        if (CountWords(formData?.user_doc?.short_description) < 10 || CountWords(formData?.user_doc?.short_description) > 25) {
            setError({ ...error, userDoc: { shortDes: { status: true, message: "User Documentation short description has to be 10 to 100 words." } } });
        }


        if (formData?.user_doc?.module_file?.length > 0) {
            formData?.user_doc?.module_file?.map((item) => {
                if (CountWords(item?.label) < 3 || CountWords(item?.label) > 5) {
                    setError({ ...error, userDoc: { module: { status: true, message: "User Documentation module file label has to be 3 to 5 words." } } });
                } else if (typeof item?.version != "number") {
                    setError({ ...error, userDoc: { module: { status: true, message: "User Documentation module file version should be a number." } } });
                } else if (GetFileSize(item?.module) > 500000) {
                    setError({ ...error, userDoc: { module: { status: true, message: "User Documentation module file size should be less than 500kb." } } });
                }
            })
        }

        /* api doc validation start */
        if (CountWords(formData?.api_doc?.label) < 2 || CountWords(formData?.api_doc?.label) > 4) {
            setError({ ...error, apiDoc: { label: { status: true, message: "User Documentation label has to be 2 to 4 words." } } });
        }




        if (CountWords(formData?.api_doc?.short_description) < 10) {
            setError({ ...error, apiDoc: { shortDes: { status: true, message: "User Documentation short description has to be 10 to 100 words." } } });
        }


        if (formData?.api_doc?.module_file?.length > 0) {
            formData?.api_doc?.module_file?.map((item) => {
                if (CountWords(item?.label) < 3 || CountWords(item?.label) > 5) {
                    setError({ ...error, apiDoc: { module: { status: true, message: "User Documentation module file label has to be 3 to 5 words." } } });
                } else if (typeof item?.version != "number") {
                    setError({ ...error, apiDoc: { module: { status: true, message: "User Documentation module file version should be a number." } } });
                } else if (GetFileSize(item?.module) > 500000) {
                    setError({ ...error, apiDoc: { module: { status: true, message: "User Documentation module file size should be less than 500kb." } } });
                }
            })
        }

        if (GetFileSize(formData?.api_doc?.icon) > 100000) {
            setError({ ...error, apiDoc: { icon: { status: true, message: "User Documentation icon size should be less than 100kb." } } });
        }









        setIsLoading(true);

        const payload = new FormData();

        payload.append("service_id", "1");
        payload.append("broad_description", formData.description);

        if (formData.mediaImages) {
            Array.from(formData.mediaImages).forEach((file) => {

                payload.append("media_images[]", file);
            });
        } else {
            payload.append("media_images[]", "");
        }

        payload.append("api_doc_label", formData.api_doc.label);
        payload.append("api_doc_icon", formData.api_doc.icon);
        payload.append("api_desc", formData.api_doc.short_description);
        payload.append("user_characteristics", JSON.stringify(formData.user_characteristics));
        payload.append("api_characteristics", JSON.stringify(formData.api_characteristics));
        payload.append("api_external_links", JSON.stringify(formData.api_doc.external_links));
        payload.append("api_youtube_link", formData.api_doc.video_link);
        payload.append("user_doc_label", formData.user_doc.label);
        payload.append("user_doc_icon", formData.user_doc.icon);
        payload.append("user_desc", formData.user_doc.short_description);
        payload.append("user_external_links", JSON.stringify(formData.user_doc.external_links));
        payload.append("user_youtube_link", formData.user_doc.video_link);

        formData.distribution.forEach((item, index) => {
            payload.append(`distribution_items[${index}][label]`, item.label);
            payload.append(`distribution_items[${index}][icon]`, item.icon);
        });

        formData.user_doc.module_file.forEach((item, index) => {
            payload.append(`user_modules[${index}][label]`, item.label);
            payload.append(`user_modules[${index}][version]`, item.version);
            payload.append(`user_modules[${index}][module]`, item.module);
        });
        formData.api_doc.module_file.forEach((item, index) => {
            payload.append(`api_modules[${index}][label]`, item.label);
            payload.append(`api_modules[${index}][version]`, item.version);
            payload.append(`api_modules[${index}][module]`, item.module);
        });


        const res = await serviceDetailsResourceApi(payload).catch((err) => {
            console.log(err);
        });


        if (res?.status == true) {
            toast.success(res.message);
            setIsLoading(false);
            window.location.reload();
        } else {
            toast.error(res.message);
            setIsLoading(false);
        }


    };

    useEffect(() => {
        getSingleServiceDetailsResource(id).then((response)=>{
            setServiceDetailsResource(response?.data);

            setFormData({
                ...formData,
                description: response?.data?.broad_description,
                api_doc: {
                    label: JSON.parse(response?.data?.api_doc_label),
                    icon: response?.data?.api_doc_icon,
                    short_description: response?.data?.api_desc,
                    external_links: JSON.parse(response?.data?.api_external_links),
                    video_link: response?.data?.api_youtube_link,
                    module_file: JSON.parse(response?.data?.api_modules)
                },
                /* user_doc: {
                    label: response?.data?.user_doc_label,
                    icon: response?.data?.user_doc_icon,
                    short_description: response?.data?.user_desc,
                    external_links: response?.data?.user_external_links,
                    video_link: response?.data?.user_youtube_link,
                    module_file: response?.data?.user_modules
                } */
            })
        }).catch((error)=>{
            console.log(error);
        })
    }, []);


    console.log('service details resource: ',serviceDetailsResource,formData);


    return (
        <>
            <form
                onSubmit={HandleFormSubmit}
                className="flex flex-col gap-4"
                encType="multipart/form-data"
            >
                <div>
                    <fieldset className="flex flex-col border rounded-md px-2">
                        <legend>
                            <label
                                htmlFor="description"
                                className="after:content-['_*'] after:text-red-500"
                            >
                                Description For Details Page
                            </label>
                        </legend>

                        <textarea onChange={(e) => setFormData({ ...formData, description: e.target.value })} name="description" placeholder="Enter Description" className="w-full outline-none text-14 py-1" ></textarea>

                        {/* <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{
                : "Description is ",
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
                    onChange={(event: any, editor: any) => {
                      const data = editor.getData();
                      onChange(data);
                    }}
                    data={value}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-12 px-2 pt-1">
                      {errors.description.message as string}
                    </p>
                  )}
                </>
              )}
            /> */}
                    </fieldset>

                    {
                        error?.description?.status && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {error?.description?.message}
                            </p>
                        )
                    }
                </div>
                <div>
                    <fieldset className="flex flex-col border rounded-md px-2">
                        <legend>
                            <label
                                htmlFor="mediaImages"
                                className="after:content-['_*'] after:text-red-500"
                            >
                                Media Images
                            </label>
                        </legend>

                        <input
                            onChange={(e) => setFormData({ ...formData, mediaImages: e.target.files })}
                            id="mediaImages"
                            type="file"
                            accept="image/*"
                            multiple

                        />
                    </fieldset>

                    {
                        error?.mediaImages?.status && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {error?.mediaImages?.message}
                            </p>
                        )
                    }
                </div>

                <div className="border border-gray-300 rounded">
                    <div className="bg-gray-300 flex items-center justify-between p-2">
                        <h3 className="text-primary font-semibold">Distribution</h3>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, distribution: [...formData.distribution, { label: "", icon: "" }] })}
                            className="bg-primary text-white px-4 py-2 rounded"
                        >
                            <svg
                                className="w-4 h-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                        </button>
                    </div>
                    {formData?.distribution?.map((item, index) => (
                        <div key={index} className="p-2 ">
                            <div>
                                <div className="flex gap-2">
                                    <div className="flex w-full  items-center justify-between">
                                        <fieldset className="w-full flex flex-col border rounded-md px-2">
                                            <legend>
                                                <label
                                                    htmlFor="key"
                                                    className="after:content-['_*'] after:text-red-500"
                                                >
                                                    Distribution - {index + 1}
                                                </label>
                                            </legend>

                                            <div className="flex flex-col gap-2">
                                                <div className="grid grid-cols-4">
                                                    <p>Label:</p>
                                                    <div className="col-span-3">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Label"
                                                            className="border border-black w-full px-2 outline-none"
                                                            value={item?.label}
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    distribution: formData.distribution.map(
                                                                        (dist, i) =>
                                                                            i === index ? { ...dist, label: e.target.value } : dist
                                                                    ),
                                                                });
                                                            }}


                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-4">
                                                    <p>Icon:</p>
                                                    <div className="col-span-3">
                                                        <input
                                                            type="file"
                                                            className="w-full"
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    distribution: formData.distribution.map(
                                                                        (dist, i) =>
                                                                            i === index ? { ...dist, icon: e.target.files?.[0] } : dist
                                                                    ),
                                                                });
                                                            }}


                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="mt-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (formData.distribution.length != 1) {
                                                    setFormData({
                                                        ...formData,
                                                        distribution: formData.distribution.filter(
                                                            (dist, i) => i !== index
                                                        ),
                                                    });
                                                }

                                            }}
                                            className="border border-primary bg-primary text-white mt-2 px-2 py-1 rounded"
                                        >
                                            <svg
                                                className="w-6 h-6 fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {
                        error?.distribution?.status && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {error?.distribution?.message}
                            </p>
                        )
                    }
                </div>

                <div className="border border-gray-300 rounded">
                    <div className="bg-gray-300 flex items-center justify-between p-2">
                        <h3 className="text-primary font-semibold">Service User Characteristics</h3>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, user_characteristics: [...formData.user_characteristics, { label: "" }] })}
                            className="bg-primary text-white px-4 py-2 rounded"
                        >
                            <svg
                                className="w-4 h-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                        </button>
                    </div>
                    {formData?.user_characteristics?.map((item, index) => (
                        <div key={index} className="p-2 ">
                            <div>
                                <div className="flex gap-2">
                                    <div className="flex w-full  items-center justify-between">
                                        <fieldset className="w-full flex flex-col border rounded-md px-2">
                                            <legend>
                                                <label
                                                    htmlFor="key"
                                                    className="after:content-['_*'] after:text-red-500"
                                                >
                                                    Characteristics - {index + 1}
                                                </label>
                                            </legend>

                                            <div className="flex flex-col gap-2">
                                                <div className="grid grid-cols-4">
                                                    <p>Label:</p>
                                                    <div className="col-span-3">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Label"
                                                            className="border border-black w-full px-2 mb-2 outline-none"
                                                            value={item?.label}
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    user_characteristics: formData.user_characteristics.map(
                                                                        (dist, i) =>
                                                                            i === index ? { ...dist, label: e.target.value } : dist
                                                                    ),
                                                                });
                                                            }}


                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="mt-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (formData.user_characteristics.length != 1) {
                                                    setFormData({
                                                        ...formData,
                                                        user_characteristics: formData.user_characteristics.filter(
                                                            (dist, i) => i !== index
                                                        ),
                                                    });
                                                }

                                            }}
                                            className="border border-primary bg-primary text-white mt-2 px-2 py-1 rounded"
                                        >
                                            <svg
                                                className="w-6 h-6 fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {
                        error?.userCharacter?.status && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {error?.userCharacter?.message}
                            </p>
                        )
                    }
                </div>

                <div className="border border-gray-300 rounded">
                    <div className="bg-gray-300 flex items-center justify-between p-2">
                        <h3 className="text-primary font-semibold">Service API Characteristics</h3>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, api_characteristics: [...formData.api_characteristics, { label: "" }] })}
                            className="bg-primary text-white px-4 py-2 rounded"
                        >
                            <svg
                                className="w-4 h-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                        </button>
                    </div>
                    {formData?.api_characteristics?.map((item, index) => (
                        <div key={index} className="p-2 ">
                            <div>
                                <div className="flex gap-2">
                                    <div className="flex w-full  items-center justify-between">
                                        <fieldset className="w-full flex flex-col border rounded-md px-2">
                                            <legend>
                                                <label
                                                    htmlFor="key"
                                                    className="after:content-['_*'] after:text-red-500"
                                                >
                                                    Characteristics - {index + 1}
                                                </label>
                                            </legend>

                                            <div className="flex flex-col gap-2">
                                                <div className="grid grid-cols-4">
                                                    <p>Label:</p>
                                                    <div className="col-span-3">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Label"
                                                            className="border border-black w-full px-2 mb-2 outline-none"
                                                            value={item?.label}
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    api_characteristics: formData.api_characteristics.map(
                                                                        (dist, i) =>
                                                                            i === index ? { ...dist, label: e.target.value } : dist
                                                                    ),
                                                                });
                                                            }}


                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="mt-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (formData.api_characteristics.length != 1) {
                                                    setFormData({
                                                        ...formData,
                                                        api_characteristics: formData.api_characteristics.filter(
                                                            (dist, i) => i !== index
                                                        ),
                                                    });
                                                }

                                            }}
                                            className="border border-primary bg-primary text-white mt-2 px-2 py-1 rounded"
                                        >
                                            <svg
                                                className="w-6 h-6 fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                    {
                        error?.apiCharacter?.status && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {error?.apiCharacter?.message}
                            </p>
                        )
                    }
                </div>

                <div>
                    <div className="border border-black">
                        <h3 className="border-b border-black py-3 pl-3 bg-gray-300 text-primary font-bold">
                            User Documentation
                        </h3>
                        <div className="p-3 space-y-4">

                            <div>
                                <fieldset className="flex flex-col border rounded-md px-2">
                                    <legend>
                                        <label htmlFor="user_doc_label" className="after:content-['_*'] after:text-red-500">
                                            Label
                                        </label>
                                    </legend>
                                    <input onChange={(e) => setFormData({ ...formData, user_doc: { ...formData.user_doc, label: e.target.value } })} id="user_doc_label" type="text" placeholder="Enter user doc label" className="w-full outline-none p-2" />
                                </fieldset>

                                {
                                    error?.userDoc?.label?.status && (
                                        <p className="text-red-500 text-12 px-2 pt-1">
                                            {error?.userDoc?.label?.message}
                                        </p>
                                    )
                                }
                            </div>

                            <div>
                                <fieldset className="flex flex-col border rounded-md px-2 pb-2">
                                    <legend>
                                        <label htmlFor="user_doc_icon" className="after:content-['_*'] after:text-red-500">
                                            Icon
                                        </label>
                                    </legend>
                                    <input onChange={(e) => setFormData({ ...formData, user_doc: { ...formData.user_doc, icon: e.target.files?.[0] } })} type="file" name="user_doc_icon" />
                                </fieldset>
                                {
                                    error?.userDoc?.icon?.status && (
                                        <p className="text-red-500 text-12 px-2 pt-1">
                                            {error?.userDoc?.icon?.message}
                                        </p>
                                    )
                                }
                            </div>

                            <div>
                                <fieldset className="flex flex-col border rounded-md px-2">
                                    <legend>
                                        <label
                                            htmlFor="video_link"
                                            className="after:content-['_*'] after:text-red-500"
                                        >
                                            Video Link (Youtube)
                                        </label>
                                    </legend>
                                    <input
                                        onChange={(e) => setFormData({ ...formData, user_doc: { ...formData.user_doc, video_link: sanitizeYoutubeUrl(e.target.value) } })}
                                        id="video_link"
                                        type="text"
                                        placeholder="Video Link (Youtube)"
                                        className="outline-none p-2"

                                    />
                                </fieldset>

                                {
                                    error?.userDoc?.video?.status && (
                                        <p className="text-red-500 text-12 px-2 pt-1">
                                            {error?.userDoc?.video?.message}
                                        </p>
                                    )
                                }
                            </div>

                            <div>
                                <fieldset className="flex flex-col border rounded-md px-2">
                                    <legend>
                                        <label
                                            htmlFor="ServiceName"
                                            className="after:content-['_*'] after:text-red-500"
                                        >
                                            Short Description
                                        </label>
                                    </legend>

                                    <textarea onChange={(e) => setFormData({ ...formData, user_doc: { ...formData.user_doc, short_description: e.target.value } })} name="user_doc_description" className="w-full outline-none p-2" placeholder="Enter user doc short description" ></textarea>

                                    {/* <Controller
                  name="user_doc"
                  defaultValue=""
                  rules={{
                    : "User Documents is ",
                    validate: {
                      maxWords: (value) => {
                        const wordCount = value.trim().split(/\s+/).length;
                        return (
                          wordCount <= 80 ||
                          "User Documents cannot exceed 80 words"
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
                        onChange={(event: any, editor: any) => {
                          const data = editor.getData();
                          onChange(data);
                        }}
                        data={value}
                      />
                    </>
                  )}
                /> */}
                                </fieldset>

                                {
                                    error?.userDoc?.shortDes?.status && (
                                        <p className="text-red-500 text-12 px-2 pt-1">
                                            {error?.userDoc?.shortDes?.message}
                                        </p>
                                    )
                                }
                            </div>

                            <div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                    <div className="border border-gray-300 rounded">
                                        <div className="bg-gray-300 flex items-center justify-between p-2">
                                            <h3 className="text-primary font-semibold">Modules File</h3>
                                            <button
                                                onClick={() => {
                                                    setFormData({
                                                        ...formData,
                                                        user_doc: {
                                                            ...formData.user_doc,
                                                            module_file: [...formData.user_doc.module_file, {
                                                                label: "",
                                                                version: "",
                                                                module: ""
                                                            }],
                                                        },
                                                    });
                                                }}
                                                type="button"
                                                className="bg-primary text-white px-4 py-2 rounded"
                                            >
                                                <svg
                                                    className="w-4 h-4 fill-current"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512"
                                                >
                                                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                                </svg>
                                            </button>
                                        </div>
                                        {formData?.user_doc?.module_file?.map((item, index) => (
                                            <div key={index} className="p-2 ">
                                                <div>
                                                    <div className="flex gap-2">
                                                        <div className="flex w-full  items-center justify-between">
                                                            <fieldset className="w-full flex flex-col border rounded-md px-2">
                                                                <legend>
                                                                    <label
                                                                        htmlFor="key"
                                                                        className="after:content-['_*'] after:text-red-500"
                                                                    >
                                                                        Module - {index + 1}
                                                                    </label>
                                                                </legend>

                                                                <div className="flex flex-col gap-2">
                                                                    <div className="grid grid-cols-4">
                                                                        <p>Label:</p>
                                                                        <div className="col-span-3">
                                                                            <input
                                                                                onChange={(e) => {
                                                                                    const newModuleFile = [...formData.user_doc.module_file];
                                                                                    newModuleFile[index] = {
                                                                                        ...newModuleFile[index],
                                                                                        label: e.target.value
                                                                                    };
                                                                                    setFormData({
                                                                                        ...formData,
                                                                                        user_doc: {
                                                                                            ...formData.user_doc,
                                                                                            module_file: newModuleFile
                                                                                        }
                                                                                    });
                                                                                }}
                                                                                value={item.label}
                                                                                type="text"
                                                                                placeholder="Enter Label"
                                                                                className=" border border-black w-full px-2"


                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="grid grid-cols-4">
                                                                        <p>Version:</p>
                                                                        <div className="col-span-3">
                                                                            <input
                                                                                value={item.version}
                                                                                onChange={(e) => {
                                                                                    const newModuleFile = [...formData.user_doc.module_file];
                                                                                    newModuleFile[index] = {
                                                                                        ...newModuleFile[index],
                                                                                        version: parseInt(e.target.value)
                                                                                    };
                                                                                    setFormData({
                                                                                        ...formData,
                                                                                        user_doc: {
                                                                                            ...formData.user_doc,
                                                                                            module_file: newModuleFile
                                                                                        }
                                                                                    });
                                                                                }}
                                                                                type="number"
                                                                                placeholder="Enter Version"
                                                                                className=" border border-black w-full px-2"


                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="grid grid-cols-4">
                                                                        <p>Module:</p>
                                                                        <div className="col-span-3">
                                                                            <input
                                                                                onChange={(e) => {
                                                                                    const newModuleFile = [...formData.user_doc.module_file];
                                                                                    newModuleFile[index] = {
                                                                                        ...newModuleFile[index],
                                                                                        module: e.target.files?.[0]
                                                                                    };
                                                                                    setFormData({
                                                                                        ...formData,
                                                                                        user_doc: {
                                                                                            ...formData.user_doc,
                                                                                            module_file: newModuleFile
                                                                                        }
                                                                                    });
                                                                                }}
                                                                                type="file"
                                                                                className="w-full "


                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </fieldset>
                                                        </div>
                                                        <div className="mt-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    if (formData?.user_doc?.module_file.length != 1) {
                                                                        setFormData({
                                                                            ...formData,
                                                                            user_doc: {
                                                                                ...formData.user_doc,
                                                                                module_file: formData.user_doc.module_file.filter((_, i) => i !== index),
                                                                            },
                                                                        })
                                                                    }

                                                                }}
                                                                className="border border-primary bg-primary text-white mt-2 px-2 py-1 rounded"
                                                            >
                                                                <svg
                                                                    className="w-6 h-6 fill-current"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 448 512"
                                                                >
                                                                    <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {
                                            error?.userDoc?.module?.status && (
                                                <p className="text-red-500 text-12 px-2 pt-1">
                                                    {error?.userDoc?.module?.message}
                                                </p>
                                            )
                                        }
                                    </div>
                                    <div className="border border-gray-300 rounded">
                                        <div className="bg-gray-300 flex items-center justify-between p-2">
                                            <h3 className="text-primary font-semibold">
                                                External Links
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFormData({
                                                        ...formData,
                                                        user_doc: {
                                                            ...formData.user_doc,
                                                            external_links: [
                                                                ...formData.user_doc.external_links,
                                                                {
                                                                    label: "",
                                                                    link: ""
                                                                },
                                                            ],
                                                        },
                                                    });
                                                }}
                                                className="bg-primary text-white px-4 py-2 rounded"
                                            >
                                                <svg
                                                    className="w-4 h-4 fill-current"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512"
                                                >
                                                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                                </svg>
                                            </button>
                                        </div>
                                        {formData?.user_doc?.external_links?.map((item, index) => (
                                            <div key={index} className="p-2 ">
                                                <div>
                                                    <div className="flex gap-2">
                                                        <div className="flex w-full  items-center justify-between">
                                                            <fieldset className="w-full flex flex-col border rounded-md px-2">
                                                                <legend>
                                                                    <label
                                                                        htmlFor="key"
                                                                    // className="after:content-['_*'] after:text-red-500"
                                                                    >
                                                                        Link - {index + 1}
                                                                    </label>
                                                                </legend>

                                                                <div className="flex flex-col gap-2">
                                                                    <div className="grid grid-cols-4">
                                                                        <p>Label:</p>
                                                                        <div className="col-span-3">
                                                                            <input
                                                                                onChange={(e) => {
                                                                                    const newExternalLinks = [...formData.user_doc.external_links];
                                                                                    newExternalLinks[index] = {
                                                                                        ...newExternalLinks[index],
                                                                                        label: e.target.value
                                                                                    };
                                                                                    setFormData({
                                                                                        ...formData,
                                                                                        user_doc: {
                                                                                            ...formData.user_doc,
                                                                                            external_links: newExternalLinks
                                                                                        }
                                                                                    });
                                                                                }}
                                                                                type="text"
                                                                                placeholder="Enter Label"
                                                                                className=" border border-black w-full px-2"

                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-4">
                                                                        <p>Link:</p>
                                                                        <div className="col-span-3">
                                                                            <input
                                                                                onChange={(e) => {
                                                                                    const newExternalLinks = [...formData.user_doc.external_links];
                                                                                    newExternalLinks[index] = {
                                                                                        ...newExternalLinks[index],
                                                                                        link: e.target.value
                                                                                    };
                                                                                    setFormData({
                                                                                        ...formData,
                                                                                        user_doc: {
                                                                                            ...formData.user_doc,
                                                                                            external_links: newExternalLinks
                                                                                        }
                                                                                    });
                                                                                }}
                                                                                type="text"
                                                                                placeholder="Enter Link"
                                                                                className=" border border-black w-full px-2"

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </fieldset>
                                                        </div>
                                                        <div className="mt-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    if (formData?.user_doc?.external_links?.length != 1) {
                                                                        setFormData({
                                                                            ...formData,
                                                                            user_doc: {
                                                                                ...formData.user_doc,
                                                                                external_links: formData.user_doc.external_links.filter((_, i) => i !== index),
                                                                            },
                                                                        })
                                                                    }

                                                                }}
                                                                className="border border-primary bg-primary text-white mt-2 px-2 py-1 rounded"
                                                            >
                                                                <svg
                                                                    className="w-6 h-6 fill-current"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 448 512"
                                                                >
                                                                    <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {
                                            error?.userDoc?.extraLink?.status && (
                                                <p className="text-red-500 text-12 px-2 pt-1">
                                                    {error?.userDoc?.extraLink?.message}
                                                </p>
                                            )
                                        }
                                    </div>
                                </div>


                            </div>


                        </div>
                    </div>
                </div>

                <div>
                    <div className="border border-black">
                        <h3 className="border-b border-black py-3 pl-3 bg-gray-300 text-primary font-bold">
                            API Documentation
                        </h3>
                        <div className="p-3 space-y-4">

                            <div>
                                <fieldset className="flex flex-col border rounded-md px-2">
                                    <legend>
                                        <label htmlFor="user_doc_title" className="after:content-['_*'] after:text-red-500">
                                            Label
                                        </label>
                                    </legend>
                                    <input onChange={(e) => setFormData({ ...formData, api_doc: { ...formData.api_doc, label: e.target.value } })} type="text" placeholder="Enter api doc label" className="w-full outline-none p-2" />
                                </fieldset>

                                {
                                    error?.apiDoc?.label?.status && (
                                        <p className="text-red-500 text-12 px-2 pt-1">
                                            {error?.apiDoc?.label?.message}
                                        </p>
                                    )
                                }
                            </div>

                            <div>
                                <fieldset className="flex flex-col border rounded-md px-2 pb-2">
                                    <legend>
                                        <label htmlFor="user_doc_icon" className="after:content-['_*'] after:text-red-500">
                                            Icon
                                        </label>
                                    </legend>
                                    <input onChange={(e) => setFormData({ ...formData, api_doc: { ...formData.api_doc, icon: e.target.files?.[0] } })} type="file" name="user_doc_icon" />
                                </fieldset>

                                {
                                    error?.apiDoc?.icon?.status && (
                                        <p className="text-red-500 text-12 px-2 pt-1">
                                            {error?.apiDoc?.icon?.message}
                                        </p>
                                    )
                                }
                            </div>

                            <div>
                                <fieldset className="flex flex-col border rounded-md px-2">
                                    <legend>
                                        <label
                                            htmlFor="videolink"
                                            className="after:content-['_*'] after:text-red-500"
                                        >
                                            Video Link (Youtube)
                                        </label>
                                    </legend>
                                    <input
                                        onChange={(e) => setFormData({ ...formData, api_doc: { ...formData.api_doc, video_link: sanitizeYoutubeUrl(e.target.value) } })}
                                        type="text"
                                        placeholder="Video Link (Youtube)"
                                        className="outline-none p-2"


                                    />
                                </fieldset>

                                {
                                    error?.apiDoc?.video?.status && (
                                        <p className="text-red-500 text-12 px-2 pt-1">
                                            {error?.apiDoc?.video?.message}
                                        </p>
                                    )
                                }
                            </div>

                            <div>
                                <fieldset className="flex flex-col border rounded-md px-2">
                                    <legend>
                                        <label
                                            htmlFor="ServiceName"
                                            className="after:content-['_*'] after:text-red-500"
                                        >
                                            Short Description
                                        </label>
                                    </legend>

                                    <textarea name="api_doc_short_desc" onChange={(e) => setFormData({ ...formData, api_doc: { ...formData.api_doc, short_description: e.target.value } })} className="w-full outline-none p-2" placeholder="Enter api doc short description" ></textarea>

                                    {/* <Controller
                  name="user_doc"
                  control={control}
                  defaultValue=""
                  rules={{
                    : "User Documents is ",
                    validate: {
                      maxWords: (value) => {
                        const wordCount = value.trim().split(/\s+/).length;
                        return (
                          wordCount <= 80 ||
                          "User Documents cannot exceed 80 words"
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
                        onChange={(event: any, editor: any) => {
                          const data = editor.getData();
                          onChange(data);
                        }}
                        data={value}
                      />
                    </>
                  )}
                /> */}
                                </fieldset>

                                {
                                    error?.apiDoc?.shortDes?.status && (
                                        <p className="text-red-500 text-12 px-2 pt-1">
                                            {error?.apiDoc?.shortDes?.message}
                                        </p>
                                    )
                                }
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                <div className="border border-gray-300 rounded">
                                    <div className="bg-gray-300 flex items-center justify-between p-2">
                                        <h3 className="text-primary font-semibold">Modules File</h3>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData({
                                                    ...formData,
                                                    api_doc: {
                                                        ...formData.api_doc,
                                                        module_file: [...formData.api_doc.module_file, {
                                                            label: "",
                                                            version: "",
                                                            module: ""
                                                        }],
                                                    },
                                                });
                                            }}
                                            className="bg-primary text-white px-4 py-2 rounded"
                                        >
                                            <svg
                                                className="w-4 h-4 fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                            </svg>
                                        </button>
                                    </div>
                                    {formData?.api_doc?.module_file?.map((item, index) => (
                                        <div key={index} className="p-2 ">
                                            <div>
                                                <div className="flex gap-2">
                                                    <div className="flex w-full  items-center justify-between">
                                                        <fieldset className="w-full flex flex-col border rounded-md px-2">
                                                            <legend>
                                                                <label
                                                                    htmlFor="key"
                                                                    className="after:content-['_*'] after:text-red-500"
                                                                >
                                                                    Module - {index + 1}
                                                                </label>
                                                            </legend>

                                                            <div className="flex flex-col gap-2">
                                                                <div className="grid grid-cols-4">
                                                                    <p>Label:</p>
                                                                    <div className="col-span-3">
                                                                        <input
                                                                            onChange={(e) => {
                                                                                const newModuleFile = [...formData.api_doc.module_file];
                                                                                newModuleFile[index] = {
                                                                                    ...newModuleFile[index],
                                                                                    label: e.target.value
                                                                                };
                                                                                setFormData({
                                                                                    ...formData,
                                                                                    api_doc: {
                                                                                        ...formData.api_doc,
                                                                                        module_file: newModuleFile
                                                                                    }
                                                                                });
                                                                            }}
                                                                            value={item.label}
                                                                            type="text"
                                                                            placeholder="Enter Label"
                                                                            className=" border border-black w-full px-2"


                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-4">
                                                                    <p>Version:</p>
                                                                    <div className="col-span-3">
                                                                        <input
                                                                            value={item.version}
                                                                            onChange={(e) => {
                                                                                const newModuleFile = [...formData.api_doc.module_file];
                                                                                newModuleFile[index] = {
                                                                                    ...newModuleFile[index],
                                                                                    version: parseInt(e.target.value)
                                                                                };
                                                                                setFormData({
                                                                                    ...formData,
                                                                                    api_doc: {
                                                                                        ...formData.api_doc,
                                                                                        module_file: newModuleFile
                                                                                    }
                                                                                });
                                                                            }}
                                                                            type="number"
                                                                            placeholder="Enter Version"
                                                                            className=" border border-black w-full px-2"


                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-4">
                                                                    <p>Module:</p>
                                                                    <div className="col-span-3">
                                                                        <input
                                                                            onChange={(e) => {
                                                                                const newModuleFile = [...formData.api_doc.module_file];
                                                                                newModuleFile[index] = {
                                                                                    ...newModuleFile[index],
                                                                                    module: e.target.files?.[0]
                                                                                };
                                                                                setFormData({
                                                                                    ...formData,
                                                                                    api_doc: {
                                                                                        ...formData.api_doc,
                                                                                        module_file: newModuleFile
                                                                                    }
                                                                                });
                                                                            }}
                                                                            type="file"
                                                                            className="w-full "


                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                    <div className="mt-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                if (formData?.api_doc?.module_file.length != 1) {
                                                                    setFormData({
                                                                        ...formData,
                                                                        api_doc: {
                                                                            ...formData.api_doc,
                                                                            module_file: formData.api_doc.module_file.filter((_, i) => i !== index),
                                                                        },
                                                                    })
                                                                }

                                                            }}
                                                            className="border border-primary bg-primary text-white mt-2 px-2 py-1 rounded"
                                                        >
                                                            <svg
                                                                className="w-6 h-6 fill-current"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 448 512"
                                                            >
                                                                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {
                                        error?.apiDoc?.module?.status && (
                                            <p className="text-red-500 text-12 px-2 pt-1">
                                                {error?.apiDoc?.module?.message}
                                            </p>
                                        )
                                    }
                                </div>
                                <div className="border border-gray-300 rounded">
                                    <div className="bg-gray-300 flex items-center justify-between p-2">
                                        <h3 className="text-primary font-semibold">
                                            External Links
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData({
                                                    ...formData,
                                                    api_doc: {
                                                        ...formData.api_doc,
                                                        external_links: [
                                                            ...formData.api_doc.external_links,
                                                            {
                                                                label: "",
                                                                link: ""
                                                            },
                                                        ],
                                                    },
                                                });
                                            }}
                                            className="bg-primary text-white px-4 py-2 rounded"
                                        >
                                            <svg
                                                className="w-4 h-4 fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                            </svg>
                                        </button>
                                    </div>
                                    {formData?.api_doc?.external_links?.map((item, index) => (
                                        <div key={index} className="p-2 ">
                                            <div>
                                                <div className="flex gap-2">
                                                    <div className="flex w-full  items-center justify-between">
                                                        <fieldset className="w-full flex flex-col border rounded-md px-2">
                                                            <legend>
                                                                <label
                                                                    htmlFor="key"
                                                                // className="after:content-['_*'] after:text-red-500"
                                                                >
                                                                    Link - {index + 1}
                                                                </label>
                                                            </legend>

                                                            <div className="flex flex-col gap-2">
                                                                <div className="grid grid-cols-4">
                                                                    <p>Label:</p>
                                                                    <div className="col-span-3">
                                                                        <input
                                                                            onChange={(e) => {
                                                                                const newExternalLinks = [...formData.api_doc.external_links];
                                                                                newExternalLinks[index] = {
                                                                                    ...newExternalLinks[index],
                                                                                    label: e.target.value
                                                                                };
                                                                                setFormData({
                                                                                    ...formData,
                                                                                    api_doc: {
                                                                                        ...formData.api_doc,
                                                                                        external_links: newExternalLinks
                                                                                    }
                                                                                });
                                                                            }}
                                                                            type="text"
                                                                            placeholder="Enter Label"
                                                                            className=" border border-black w-full px-2"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-4">
                                                                    <p>Link:</p>
                                                                    <div className="col-span-3">
                                                                        <input
                                                                            onChange={(e) => {
                                                                                const newExternalLinks = [...formData.api_doc.external_links];
                                                                                newExternalLinks[index] = {
                                                                                    ...newExternalLinks[index],
                                                                                    link: e.target.value
                                                                                };
                                                                                setFormData({
                                                                                    ...formData,
                                                                                    api_doc: {
                                                                                        ...formData.api_doc,
                                                                                        external_links: newExternalLinks
                                                                                    }
                                                                                });
                                                                            }}
                                                                            type="text"
                                                                            placeholder="Enter Link"
                                                                            className=" border border-black w-full px-2"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                    <div className="mt-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                if (formData?.api_doc?.external_links?.length != 1) {
                                                                    setFormData({
                                                                        ...formData,
                                                                        api_doc: {
                                                                            ...formData.api_doc,
                                                                            external_links: formData.api_doc.external_links.filter((_, i) => i !== index),
                                                                        },
                                                                    })
                                                                }

                                                            }}
                                                            className="border border-primary bg-primary text-white mt-2 px-2 py-1 rounded"
                                                        >
                                                            <svg
                                                                className="w-6 h-6 fill-current"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 448 512"
                                                            >
                                                                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {
                                        error?.userDoc?.extraLink?.status && (
                                            <p className="text-red-500 text-12 px-2 pt-1">
                                                {error?.userDoc?.extraLink?.message}
                                            </p>
                                        )
                                    }
                                </div>
                            </div>


                        </div>
                    </div>
                </div>


                <div className="flex justify-between pt-5">
                    <p className="text-14">
                        <span className="text-red-500">*</span>
                    </p>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-violet-700 text-white active:scale-90 transition-all duration-400 rounded-md"
                    >
                        {
                            isLoading ? "Loading..." : "Create"
                        }
                    </button>
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
        </>
    )
};

export default UpdateServiceDetailsResource;