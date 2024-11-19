"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CountWords, GetFileSize, sanitizeYoutubeUrl } from "@/helper";
import { serviceDetailsResourceApi } from "@/app/(portal)/_api/ServiceApi/ServiceApi";
import { getSingleServiceDetailsResource, updateSingleServiceResource } from "@/app/(admin)/_api";
import Image from "next/image";
import { FaRegTimesCircle } from "react-icons/fa";
import { relative_image_path } from "@/helper";

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
        paid_package_infos: [
            {
                label: "",
            }
        ],
        domain_name: '',
        domain_link: '',
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

        setIsLoading(true);

        const payload = new FormData();

        payload.append("service_id", id);
        payload.append("broad_description", formData.description);


        payload.append('paid_package_infos', JSON.stringify(formData.paid_package_infos));


        formData?.mediaImages.forEach((item, index)=>{
            payload.append(`media_images[${index}]`, item);
        });
        

        payload.append("domain_name", formData.domain_name);
        payload.append("domain_link", formData.domain_link);

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


        const res = await updateSingleServiceResource(payload, id).catch((err) => {
            console.log(err);
        });


        if (res?.status == true) {
            toast.success(res.message);
            getSingleServiceDetailsResource(id).then((response) => {
                setServiceDetailsResource(response?.data);
                setFormData({
                    ...formData,
                    description: response?.data?.broad_description,
                    mediaImages: JSON.parse(response?.data?.media_images) ?? [],
                    distribution: JSON.parse(response?.data?.distribution_items) ?? [
                        {
                            label: "",
                            icon: "",
                        }
                    ],
                    user_characteristics: JSON.parse(response?.data?.user_characteristics) ?? [
                        {
                            label: "",
                        }
                    ],
                    api_characteristics: JSON.parse(response?.data?.api_characteristics) ?? [
                        {
                            label: "",
                        }
                    ],
                    api_doc: {
                        label: response?.data?.api_doc_label ?? '',
                        icon: response?.data?.api_doc_icon ?? '',
                        short_description: response?.data?.api_desc ?? '',
                        external_links: JSON.parse(response?.data?.api_external_links) ?? [
                            {
                                label: "",
                                link: ""
                            }
                        ],
                        video_link: response?.data?.api_youtube_link ?? '',
                        module_file: JSON.parse(response?.data?.api_modules) ?? [
                            {
                                label: "",
                                version: "",
                                module: ""
                            }
                        ]
                    },
                    user_doc: {
                        label: response?.data?.user_doc_label ?? '',
                        icon: response?.data?.user_doc_icon ?? '',
                        short_description: response?.data?.user_desc ?? '',
                        external_links: JSON.parse(response?.data?.user_external_links) ?? [
                            {
                                label: "",
                                link: ""
                            }
                        ],
                        video_link: response?.data?.user_youtube_link ?? '',
                        module_file: JSON.parse(response?.data?.user_modules) ?? [
                            {
                                label: "",
                                version: "",
                                module: ""
                            }
                        ]
                    }
                });
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
                router.push("/admin/services");
            });
            
        } else {
            toast.error(res.message);
            setIsLoading(false);
        }


    };

    useEffect(() => {
        getSingleServiceDetailsResource(id).then((response) => {
            setServiceDetailsResource(response?.data?.details);

            console.log('user character: ',response?.data?.details);

            setFormData({
                ...formData,
                description: response?.data?.details?.broad_description,
                mediaImages: JSON.parse(response?.data?.details?.media_images) ?? [],
                distribution: JSON.parse(response?.data?.details?.distribution_items) ?? [
                    {
                        label: "",
                        icon: "",
                    }
                ],
                user_characteristics: JSON.parse(response?.data?.details?.user_characteristics) ?? [
                    {
                        label: "",
                    }
                ],
                api_characteristics: JSON.parse(response?.data?.details?.api_characteristics) ?? [
                    {
                        label: "",
                    }
                ],
                paid_package_infos: JSON.parse(response?.data?.details?.paid_package_infos) ?? [
                    {
                        label: "",
                        price: "",
                    }
                ],
                domain_name: response?.data?.details?.domain_name ?? '',
                domain_link: response?.data?.details?.domain_link ?? '',
                api_doc: {
                    label: response?.data?.details?.api_doc_label ?? '',
                    icon: response?.data?.details?.api_doc_icon ?? '',
                    short_description: response?.data?.details?.api_desc ?? '',
                    external_links: JSON.parse(response?.data?.details?.api_external_links) ?? [
                        {
                            label: "",
                            link: ""
                        }
                    ],
                    video_link: response?.data?.details?.api_youtube_link ?? '',
                    module_file: JSON.parse(response?.data?.details?.api_modules) ?? [
                        {
                            label: "",
                            version: "",
                            module: ""
                        }
                    ]
                },
                user_doc: {
                    label: response?.data?.details?.user_doc_label ?? '',
                    icon: response?.data?.details?.user_doc_icon ?? '',
                    short_description: response?.data?.details?.user_desc ?? '',
                    external_links: JSON.parse(response?.data?.details?.user_external_links) ?? [
                        {
                            label: "",
                            link: ""
                        }
                    ],
                    video_link: response?.data?.details?.user_youtube_link ?? '',
                    module_file: JSON.parse(response?.data?.details?.user_modules) ?? [
                        {
                            label: "",
                            version: "",
                            module: ""
                        }
                    ]
                }
            });
        }).catch((error) => {
            console.log(error);
        });
    }, []);


    // console.log('form data: ', formData);


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

                        <textarea value={formData?.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} name="description" placeholder="Enter Description" className="w-full outline-none text-14 py-1" rows={4} ></textarea>
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
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    mediaImages: [
                                        ...formData?.mediaImages,
                                        ...Array.from(e.target.files),
                                    ],
                                });
                            }}
                            id="mediaImages"
                            type="file"
                            accept="image/*"
                            multiple

                        />

                        {
                            formData?.mediaImages?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {
                                        formData?.mediaImages?.map((file, index) => {

                                            if (typeof file == 'string') {
                                                return (
                                                    <div key={index} className="mt-5 relative">
                                                        <Image
                                                            src={process.env.NEXT_PUBLIC_IMAGE_URL + file}
                                                            alt='Bangla'
                                                            width={100}
                                                            height={100}
                                                            className="w-[5em] h-[5em]"
                                                        />
                                                        <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={() => setFormData({ ...formData, mediaImages: formData?.mediaImages?.filter((item) => item !== file) })} type="button">
                                                            <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                        </button>
                                                    </div>
                                                )
                                            } else if (typeof file == 'object') {
                                                return (
                                                    <div key={index} className="mt-5 relative">
                                                        <Image
                                                            src={URL.createObjectURL(file)}
                                                            alt='Bangla'
                                                            width={100}
                                                            height={100}
                                                            className="w-[5em] h-[5em]"
                                                        />
                                                        <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={() => setFormData({ ...formData, mediaImages: formData?.mediaImages?.filter((item) => item !== file) })} type="button">
                                                            <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                        </button>
                                                    </div>
                                                )
                                            }

                                        })
                                    }
                                </div>
                            )
                        }
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
                                                    <p>Link:</p>
                                                    <div className="col-span-3">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Link"
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
                                                {
                                                    item?.icon?.length > 0 && (
                                                        <div className="mt-5 relative w-[5em] h-[5em]">
                                                            <Image
                                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + item?.icon}
                                                                alt='Bangla'
                                                                width={100}
                                                                height={100}
                                                                className="w-[5em] h-[5em]"
                                                            />
                                                            <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={() => setFormData({ ...formData, distribution: formData.distribution.map((dist, i) => i === index ? { ...dist, icon: "" } : dist) })} type="button">
                                                                <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                            </button>
                                                        </div>
                                                    )
                                                }

                                                {
                                                    typeof item?.icon == "object" && (
                                                        <div className="mt-5 relative w-[5em] h-[5em]">
                                                            <Image
                                                                src={URL.createObjectURL(item?.icon)}
                                                                alt='Bangla'
                                                                width={100}
                                                                height={100}
                                                                className="w-[5em] h-[5em]"
                                                            />
                                                            <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={() => setFormData({ ...formData, distribution: formData.distribution.map((dist, i) => i === index ? { ...dist, icon: "" } : dist) })} type="button">
                                                                <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                            </button>
                                                        </div>
                                                    )
                                                }

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


                <div className="border border-gray-300 rounded">
                    <div className="bg-gray-300 flex items-center justify-between p-2">
                        <h3 className="text-primary font-semibold">Paid Package Infos</h3>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, paid_package_infos: [...formData.paid_package_infos, { label: "" }] })}
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
                    {formData?.paid_package_infos?.map((item, index) => (
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
                                                                    paid_package_infos: formData.paid_package_infos.map(
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
                                                if (formData.paid_package_infos.length != 1) {
                                                    setFormData({
                                                        ...formData,
                                                        paid_package_infos: formData.paid_package_infos.filter(
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



                <div className="border border-gray-300 rounded">
                    <div className="bg-gray-300 flex items-center justify-between p-2">
                        <h3 className="text-primary font-semibold">Visit Link</h3>
                    </div>
                    <div className="p-2 ">
                            <div>
                                <div className="flex gap-2">
                                    <div className="flex w-full  items-center justify-between">
                                        <fieldset className="w-full flex flex-col border rounded-md px-2">

                                            <div className="flex flex-col gap-2">
                                                <div className="grid grid-cols-4">
                                                    <p>Domain Name:</p>
                                                    <div className="col-span-3">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter domain"
                                                            className="border border-black w-full px-2 mb-2 outline-none"
                                                            value={formData?.domain_name}
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    domain_name: e.target.value,
                                                                });
                                                            }}


                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-4">
                                                    <p>Domain Link:</p>
                                                    <div className="col-span-3">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter url"
                                                            className="border border-black w-full px-2 mb-2 outline-none"
                                                            value={formData?.domain_link}
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    domain_link: e.target.value,
                                                                });
                                                            }}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </div>


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
                                    <input value={formData?.user_doc?.label} onChange={(e) => setFormData({ ...formData, user_doc: { ...formData.user_doc, label: e.target.value } })} id="user_doc_label" type="text" placeholder="Enter user doc label" className="w-full outline-none p-2" />
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

                                    {
                                        formData?.user_doc?.icon?.length > 0 && (
                                            <div className="mt-5 relative w-[5em] h-[5em]">
                                                <Image
                                                    src={process.env.NEXT_PUBLIC_IMAGE_URL + formData?.user_doc?.icon}
                                                    alt='Bangla'
                                                    width={100}
                                                    height={100}
                                                    className="w-[5em] h-[5em]"
                                                />
                                                <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={(e) => setFormData({ ...formData, user_doc: { ...formData.user_doc, icon: null } })} type="button">
                                                    <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                </button>
                                            </div>
                                        )
                                    }

                                    {
                                        formData?.user_doc?.icon && typeof formData?.user_doc?.icon == 'object' && (
                                            <div className="mt-5 relative w-[5em] h-[5em]">
                                                <Image
                                                    src={URL.createObjectURL(formData?.user_doc?.icon)}
                                                    alt='Bangla'
                                                    width={100}
                                                    height={100}
                                                    className="w-[5em] h-[5em]"
                                                />
                                                <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={(e) => setFormData({ ...formData, user_doc: { ...formData.user_doc, icon: null } })} type="button">
                                                    <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                </button>
                                            </div>
                                        )
                                    }
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
                                        onChange={(e) => setFormData({ ...formData, user_doc: { ...formData.user_doc, video_link: e.target.value } })}
                                        id="video_link"
                                        type="text"
                                        placeholder="Video Link (Youtube)"
                                        className="outline-none p-2"
                                        value={formData?.user_doc?.video_link}

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

                                    <textarea value={formData?.user_doc?.short_description} onChange={(e) => setFormData({ ...formData, user_doc: { ...formData.user_doc, short_description: e.target.value } })} name="user_doc_description" className="w-full outline-none p-2" placeholder="Enter user doc short description" ></textarea>
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
                                                                                        version: e.target.value
                                                                                    };
                                                                                    setFormData({
                                                                                        ...formData,
                                                                                        user_doc: {
                                                                                            ...formData.user_doc,
                                                                                            module_file: newModuleFile
                                                                                        }
                                                                                    });
                                                                                }}
                                                                                type="text"
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

                                                                    {
                                                                        item?.module?.length > 0 && (
                                                                            item?.module?.includes('pdf') || item?.module?.includes('exe') ? (
                                                                                item?.module?.includes('pdf') ? (
                                                                                    <div className="mt-5 relative w-[5em] h-[5em]">
                                                                                        <Image
                                                                                            src={relative_image_path('pdf_file.png')}
                                                                                            alt='Bangla'
                                                                                            width={100}
                                                                                            height={100}
                                                                                            className="w-[5em] h-[5em]"
                                                                                        />
                                                                                        <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={() => setFormData({ ...formData, distribution: formData.distribution.map((dist, i) => i === index ? { ...dist, module: "" } : dist) })} type="button">
                                                                                            <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                                                        </button>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="mt-5 relative w-[5em] h-[5em]">
                                                                                        <Image
                                                                                            src={relative_image_path('exe_file.png')}
                                                                                            alt='Bangla'
                                                                                            width={100}
                                                                                            height={100}
                                                                                            className="w-[5em] h-[5em]"
                                                                                        />
                                                                                        <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={() => setFormData({ ...formData, distribution: formData.distribution.map((dist, i) => i === index ? { ...dist, module: "" } : dist) })} type="button">
                                                                                            <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                                                        </button>
                                                                                    </div>
                                                                                )

                                                                            ) : (
                                                                                <div className="mt-5 relative w-[5em] h-[5em]">
                                                                                    <Image
                                                                                        src={process.env.NEXT_PUBLIC_IMAGE_URL + item?.module}
                                                                                        alt='Bangla'
                                                                                        width={100}
                                                                                        height={100}
                                                                                        className="w-[5em] h-[5em]"
                                                                                    />
                                                                                    <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={() => setFormData({ ...formData, distribution: formData.distribution.map((dist, i) => i === index ? { ...dist, module: "" } : dist) })} type="button">
                                                                                        <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                                                    </button>
                                                                                </div>
                                                                            )

                                                                        )
                                                                    }

                                                                    {
                                                                        typeof item?.module === 'object' && (
                                                                            <div className="mt-5 relative w-[5em] h-[5em]">
                                                                                <Image
                                                                                    src={item?.module instanceof Blob ? URL.createObjectURL(item.module) : '/default-image.jpg'}
                                                                                    alt='Bangla'
                                                                                    width={100}
                                                                                    height={100}
                                                                                    className="w-[5em] h-[5em]"
                                                                                />
                                                                                <button
                                                                                    className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full"
                                                                                    onClick={() => setFormData({
                                                                                        ...formData,
                                                                                        distribution: formData.distribution.map((dist, i) =>
                                                                                            i === index ? { ...dist, module: "" } : dist
                                                                                        )
                                                                                    })}
                                                                                    type="button"
                                                                                >
                                                                                    <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                                                </button>
                                                                            </div>
                                                                        )
                                                                    }

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
                                                                                value={item.label}

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
                                                                                value={item.link}

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
                                    <input value={formData?.api_doc?.label} onChange={(e) => setFormData({ ...formData, api_doc: { ...formData.api_doc, label: e.target.value } })} type="text" placeholder="Enter api doc label" className="w-full outline-none p-2" />

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

                                    {
                                        formData?.api_doc?.icon?.length > 0 && (
                                            <div className="mt-5 relative w-[5em] h-[5em]">
                                                <Image
                                                    src={process.env.NEXT_PUBLIC_IMAGE_URL + formData?.api_doc?.icon}
                                                    alt='Bangla'
                                                    width={100}
                                                    height={100}
                                                    className="w-[5em] h-[5em]"
                                                />
                                                <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={(e) => setFormData({ ...formData, api_doc: { ...formData.api_doc, icon: null } })} type="button">
                                                    <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                </button>
                                            </div>
                                        )
                                    }

                                    {
                                        formData?.api_doc?.icon && typeof formData?.api_doc?.icon == 'object' && (
                                            <div className="mt-5 relative w-[5em] h-[5em]">
                                                <Image
                                                    src={URL.createObjectURL(formData?.api_doc?.icon)}
                                                    alt='Bangla'
                                                    width={100}
                                                    height={100}
                                                    className="w-[5em] h-[5em]"
                                                />
                                                <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={(e) => setFormData({ ...formData, api_doc: { ...formData.api_doc, icon: null } })} type="button">
                                                    <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                </button>
                                            </div>
                                        )
                                    }
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
                                        onChange={(e) => setFormData({ ...formData, api_doc: { ...formData.api_doc, video_link: e.target.value } })}
                                        type="text"
                                        placeholder="Video Link (Youtube)"
                                        className="outline-none p-2"
                                        value={formData?.api_doc?.video_link}
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

                                    <textarea value={formData?.api_doc?.short_description} name="api_doc_short_desc" onChange={(e) => setFormData({ ...formData, api_doc: { ...formData.api_doc, short_description: e.target.value } })} className="w-full outline-none p-2" placeholder="Enter api doc short description" ></textarea>
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
                                    {formData?.api_doc?.module_file?.map((item, index) => {
                                        return (
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
                                                                                        version: e.target.value
                                                                                    };
                                                                                    setFormData({
                                                                                        ...formData,
                                                                                        api_doc: {
                                                                                            ...formData.api_doc,
                                                                                            module_file: newModuleFile
                                                                                        }
                                                                                    });
                                                                                }}
                                                                                type="text"
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

                                                                    {
                                                                        item?.module?.length > 0 && (
                                                                            item?.module?.includes('pdf') || item?.module?.includes('exe') ? (
                                                                                item?.module?.includes('pdf') ? (
                                                                                    <div className="mt-5 relative w-[5em] h-[5em]">
                                                                                        <Image
                                                                                            src={relative_image_path('pdf_file.png')}
                                                                                            alt='Bangla'
                                                                                            width={100}
                                                                                            height={100}
                                                                                            className="w-[5em] h-[5em]"
                                                                                        />
                                                                                        <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={() => setFormData({ ...formData, distribution: formData.distribution.map((dist, i) => i === index ? { ...dist, module: "" } : dist) })} type="button">
                                                                                            <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                                                        </button>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="mt-5 relative w-[5em] h-[5em]">
                                                                                        <Image
                                                                                            src={relative_image_path('exe_file.png')}
                                                                                            alt='Bangla'
                                                                                            width={100}
                                                                                            height={100}
                                                                                            className="w-[5em] h-[5em]"
                                                                                        />
                                                                                        <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={() => setFormData({ ...formData, distribution: formData.distribution.map((dist, i) => i === index ? { ...dist, module: "" } : dist) })} type="button">
                                                                                            <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                                                        </button>
                                                                                    </div>
                                                                                )

                                                                            ) : (
                                                                                <div className="mt-5 relative w-[5em] h-[5em]">
                                                                                    <Image
                                                                                        src={process.env.NEXT_PUBLIC_IMAGE_URL + item?.module}
                                                                                        alt='Bangla'
                                                                                        width={100}
                                                                                        height={100}
                                                                                        className="w-[5em] h-[5em]"
                                                                                    />
                                                                                    <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={() => setFormData({ ...formData, distribution: formData.distribution.map((dist, i) => i === index ? { ...dist, module: "" } : dist) })} type="button">
                                                                                        <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                                                    </button>
                                                                                </div>
                                                                            )

                                                                        )
                                                                    }

                                                                    {
                                                                        typeof item?.module == 'object' && (
                                                                            <div className="mt-5 relative w-[5em] h-[5em]">
                                                                                <Image
                                                                                    src={URL.createObjectURL(item?.module)}
                                                                                    alt='Bangla'
                                                                                    width={100}
                                                                                    height={100}
                                                                                    className="w-[5em] h-[5em]"
                                                                                />
                                                                                <button className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full" onClick={() => setFormData({ ...formData, distribution: formData.distribution.map((dist, i) => i === index ? { ...dist, module: "" } : dist) })} type="button">
                                                                                    <FaRegTimesCircle className="w-4 h-4 text-white" />
                                                                                </button>
                                                                            </div>
                                                                        )
                                                                    }
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
                                        )
                                    })}

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
                                                                            value={item.label}
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
                                                                            value={item.link}
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
                            isLoading ? "Loading..." : "Update"
                        }
                    </button>
                </div>
            </form>


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

export default UpdateServiceDetailsResource;