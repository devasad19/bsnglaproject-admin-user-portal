"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { CountWords, GetFileSize, sanitizeYoutubeUrl } from "@/helper";
import { updateSingleServiceResource } from "@/app/(admin)/_api";
import Image from "next/image";
import { FaRegTimesCircle } from "react-icons/fa";
import { relative_image_path } from "@/helper";
import CustomEditor from "@/app/_components/CustomEditor/CustomEditor";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Validation from "./Validation";

const UpdateServiceDetailsResource = ({ id, secondTab }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(secondTab);

  const [error, setError] = useState({
    description: {
      status: false,
      message: "",
    },

    mediaImages: {
      status: false,
      message: "",
    },

    infoSection: {
      status: false,
      message: "",
    },

    promotion: {
      title: {
        status: false,
        message: "",
      },
      title_bg: {
        status: false,
        message: "",
      },
      area_bg: {
        status: false,
        message: "",
      },
      left_side: {
        status: false,
        message: "",
      },
      right_side: {
        status: false,
        message: "",
      },
    },

    fourCol: {
      status: false,
      message: "",
    },

    domain_name: {
      status: false,
      message: "",
    },

    domain_link: {
      status: false,
      message: "",
    },

    distribution: {
      status: false,
      message: "",
    },

    userDoc: {
      label: {
        status: false,
        message: "",
      },
      icon: {
        status: false,
        message: "",
      },
      video: {
        status: false,
        message: "",
      },
      shortDes: {
        status: false,
        message: "",
      },
      module: {
        status: false,
        message: "",
      },
      extraLink: {
        status: false,
        message: "",
      },
    },
  });

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await Validation(formData, setError);

    if (!res) {
      const payload = new FormData();

      payload.append("service_id", id);
      payload.append("broad_description", formData.description);

      formData?.mediaImages.forEach((item, index) => {
        payload.append(`media_images[${index}]`, item);
      });

      formData?.infoSection.forEach((item, index) => {
        payload.append(`featurs_and_usages[${index}][bg_color]`, item.bg_color);
        payload.append(
          `featurs_and_usages[${index}][left_description]`,
          item.left_description
        );
        payload.append(
          `featurs_and_usages[${index}][right_description]`,
          item.right_description
        );
        payload.append(
          `featurs_and_usages[${index}][right_img]`,
          item.right_img
        );
      });

      formData?.fourCol?.forEach((item, index) => {
        payload.append(
          `distribution_card_items[${index}][item_bg]`,
          item.item_bg
        );
        payload.append(`distribution_card_items[${index}][icon]`, item.icon);
        payload.append(`distribution_card_items[${index}][title]`, item.title);
        payload.append(
          `distribution_card_items[${index}][version]`,
          item.version
        );
        payload.append(
          `distribution_card_items[${index}][release_date]`,
          item.release_date
        );
        payload.append(
          `distribution_card_items[${index}][btn_label]`,
          item.btn_label
        );
        payload.append(
          `distribution_card_items[${index}][btn_bg]`,
          item.btn_bg
        );
        payload.append(
          `distribution_card_items[${index}][brows_type]`,
          item.brows_type
        );
        payload.append(
          `distribution_card_items[${index}][brows_file]`,
          item.brows_file
        );
        payload.append(
          `distribution_card_items[${index}][brows_link]`,
          item.brows_link
        );
      });

      payload.append("promotion_title", formData?.promotion?.title);
      payload.append("prom_title_bg", formData?.promotion?.title_bg);
      payload.append("prom_area_bg", formData?.promotion?.area_bg);
      payload.append("prom_left_label", formData?.promotion?.left_side?.label);
      payload.append("prom_left_icon", formData?.promotion?.left_side?.image);
      payload.append(
        "prom_right_label",
        formData?.promotion?.right_side?.label
      );
      payload.append("prom_right_icon", formData?.promotion?.right_side?.image);

      payload.append("domain_name", formData.domain_name);
      payload.append("domain_link", formData.domain_link);

      payload.append("user_doc_label", formData.user_doc.label);
      payload.append("user_doc_icon", formData.user_doc.icon);
      payload.append("user_desc", formData.user_doc.short_description);
      payload.append(
        "user_external_links",
        JSON.stringify(formData.user_doc.external_links)
      );
      payload.append("user_youtube_link", formData.user_doc?.video?.link);
      payload.append(
        "user_youtube_thumbnail",
        formData.user_doc?.video?.thumbnail
      );
      payload.append("youtube_video_title", formData.user_doc?.video?.title);

      formData.distribution.forEach((item, index) => {
        payload.append(`distribution_items[${index}][label]`, item.label);
        payload.append(`distribution_items[${index}][icon]`, item.icon);
      });

      formData.user_doc.module_file.forEach((item, index) => {
        payload.append(`user_modules[${index}][id]`, index + 1);
        payload.append(`user_modules[${index}][label]`, item.label);
        payload.append(`user_modules[${index}][download]`, item.download);
        payload.append(`user_modules[${index}][module]`, item.module);
      });

      const res = await updateSingleServiceResource(payload, id).catch(
        (err) => {
          console.log(err);
        }
      );

      if (res?.status == true) {
        toast.success(res.message);
        router.push("/admin/services");
      } else {
        toast.error(res.message);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      toast.warn("Validation Error.");
    }
  };

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

            <CustomEditor
              onChange={(event, editor) =>
                setFormData({ ...formData, description: editor.getData() })
              }
              data={formData?.description}
            />
          </fieldset>

          {error?.description?.status && (
            <p className="text-red-500 text-12 px-2 pt-1">
              {error?.description?.message}
            </p>
          )}
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

            {formData?.mediaImages?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData?.mediaImages?.map((file, index) => {
                  if (typeof file == "string") {
                    return (
                      <div key={index} className="mt-5 relative">
                        <Image
                          src={process.env.NEXT_PUBLIC_IMAGE_URL + file}
                          alt="Bangla"
                          width={100}
                          height={100}
                          className="w-[5em] h-[5em]"
                        />
                        <button
                          className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              mediaImages: formData?.mediaImages?.filter(
                                (item) => item !== file
                              ),
                            })
                          }
                          type="button"
                        >
                          <FaRegTimesCircle className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    );
                  } else if (typeof file == "object") {
                    return (
                      <div key={index} className="mt-5 relative">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt="Bangla"
                          width={100}
                          height={100}
                          className="w-[5em] h-[5em]"
                        />
                        <button
                          className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              mediaImages: formData?.mediaImages?.filter(
                                (item) => item !== file
                              ),
                            })
                          }
                          type="button"
                        >
                          <FaRegTimesCircle className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </fieldset>

          {error?.mediaImages?.status && (
            <p className="text-red-500 text-12 px-2 pt-1">
              {error?.mediaImages?.message}
            </p>
          )}
        </div>

        <div className="border border-gray-300 rounded">
          <div className="bg-gray-300 flex items-center justify-between p-2">
            <h3 className="text-primary font-semibold">Promotion Section</h3>
          </div>

          <div>
            <fieldset className="w-full flex flex-col border rounded-md px-2 m-1">
              <legend>
                <label
                  htmlFor="promotion_title"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Title
                </label>
              </legend>
              <input
                type="text"
                id="promotion_title"
                value={formData?.promotion?.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    promotion: {
                      ...formData?.promotion,
                      title: e.target.value,
                    },
                  })
                }
                className="outline-none w-full"
                placeholder="Enter Title"
              />
            </fieldset>

            {error?.promotion?.title?.status && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {error?.promotion?.title?.message}
              </p>
            )}
          </div>

          <div>
            <fieldset className="w-full flex flex-col border rounded-md px-2 m-1">
              <legend>
                <label
                  htmlFor="title_bg"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Title Background Color
                </label>
              </legend>
              <input
                value={formData?.promotion?.title_bg}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    promotion: {
                      ...formData?.promotion,
                      title_bg: e.target.value,
                    },
                  })
                }
                type="color"
                name="title_bg"
                id="title_bg"
                className="w-full"
              />
            </fieldset>

            {error?.promotion?.title_bg?.status && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {error?.promotion?.title_bg?.message}
              </p>
            )}
          </div>

          <div>
            <fieldset className="w-full flex flex-col border rounded-md px-2 m-1">
              <legend>
                <label className="font-bold after:content-['_*'] after:text-red-500">
                  Left Side
                </label>
              </legend>

              <div className="p-2">
                <div className="flex gap-2">
                  <p>Label:</p>
                  <input
                    type="text"
                    className="outline-none border border-gray-500 rounded w-full"
                    placeholder="Enter Label"
                    value={formData?.promotion?.left_side?.label}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        promotion: {
                          ...formData?.promotion,
                          left_side: {
                            ...formData?.promotion?.left_side,
                            label: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <p>Image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        promotion: {
                          ...formData?.promotion,
                          left_side: {
                            ...formData?.promotion?.left_side,
                            image: e.target.files[0],
                          },
                        },
                      })
                    }
                  />
                </div>

                {typeof formData?.promotion?.left_side?.image == "string" && (
                  <div>
                    <img
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL +
                        formData?.promotion?.left_side?.image
                      }
                      height={100}
                      width={100}
                      alt="Bangla"
                    />
                  </div>
                )}

                {typeof formData?.promotion?.left_side?.image == "object" && (
                  <div>
                    <img
                      src={URL.createObjectURL(
                        formData?.promotion?.left_side?.image
                      )}
                      height={100}
                      width={100}
                      alt="Bangla"
                    />
                  </div>
                )}
              </div>
            </fieldset>

            {error?.promotion?.left_side?.status && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {error?.promotion?.left_side?.message}
              </p>
            )}
          </div>

          <div>
            <fieldset className="w-full flex flex-col border rounded-md px-2 m-1">
              <legend>
                <label className="font-bold after:content-['_*'] after:text-red-500">
                  Right Side
                </label>
              </legend>

              <div className="p-2">
                <div className="flex gap-2">
                  <p>Label:</p>
                  <input
                    type="text"
                    className="outline-none border border-gray-500 rounded w-full"
                    placeholder="Enter Label"
                    value={formData?.promotion?.right_side?.label}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        promotion: {
                          ...formData?.promotion,
                          right_side: {
                            ...formData?.promotion?.right_side,
                            label: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <p>Image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        promotion: {
                          ...formData?.promotion,
                          right_side: {
                            ...formData?.promotion?.right_side,
                            image: e.target.files[0],
                          },
                        },
                      })
                    }
                  />
                </div>

                {typeof formData?.promotion?.right_side?.image == "string" && (
                  <div>
                    <img
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL +
                        formData?.promotion?.right_side?.image
                      }
                      height={100}
                      width={100}
                      alt="Bangla"
                    />
                  </div>
                )}

                {typeof formData?.promotion?.right_side?.image == "object" && (
                  <div>
                    <img
                      src={URL.createObjectURL(
                        formData?.promotion?.right_side?.image
                      )}
                      height={100}
                      width={100}
                      alt="Bangla"
                    />
                  </div>
                )}
              </div>
            </fieldset>

            {error?.promotion?.right_side?.status && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {error?.promotion?.right_side?.message}
              </p>
            )}
          </div>

          <div>
            <fieldset className="w-full flex flex-col border rounded-md px-2 m-1">
              <legend>
                <label
                  htmlFor="area_background"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Area Background Color
                </label>
              </legend>
              <input
                value={formData?.promotion?.area_bg}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    promotion: {
                      ...formData?.promotion,
                      area_bg: e.target.value,
                    },
                  })
                }
                type="color"
                name="area_background"
                id="area_background"
                className="w-full"
              />
            </fieldset>

            {error?.promotion?.area_bg?.status && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {error?.promotion?.area_bg?.message}
              </p>
            )}
          </div>
        </div>

        <div className="border border-gray-300 rounded">
          <div className="bg-gray-300 flex items-center justify-between p-2">
            <h3 className="text-primary font-semibold">
              Features and Usage section
            </h3>
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  infoSection: [
                    ...formData?.infoSection,
                    {
                      bg_color: "",
                      left_description: "",
                      right_description: "",
                      right_img: "",
                    },
                  ],
                })
              }
              type="button"
              title="Add Section"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              <FaPlus />
            </button>
          </div>

          {formData?.infoSection?.map((item, index) => {
            return (
              <div key={index} className="w-full flex gap-2">
                <fieldset className="flex flex-col border rounded-md px-2 w-full">
                  <legend>
                    <label>Section {index + 1}</label>
                  </legend>

                  <div>
                    <p>Background Color:</p>
                    <input
                      value={item?.bg_color}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          infoSection: formData?.infoSection?.map((item, i) =>
                            i === index
                              ? { ...item, bg_color: e.target.value }
                              : item
                          ),
                        })
                      }
                      type="color"
                      className="w-full"
                    />

                    {error?.infoSection?.bg_color?.status && (
                      <p className="text-red-500 text-12 px-2 pt-1">
                        {error?.infoSection?.bg_color?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <p>Left Side Description:</p>
                    <CustomEditor
                      onChange={(e, editor) =>
                        setFormData({
                          ...formData,
                          infoSection: formData?.infoSection?.map((item, i) =>
                            i === index
                              ? { ...item, right_description: editor.getData() }
                              : item
                          ),
                        })
                      }
                      data={item?.right_description}
                    />

                    {error?.infoSection?.left_description?.status && (
                      <p className="text-red-500 text-12 px-2 pt-1">
                        {error?.infoSection?.left_description?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <p>Right Side Description:</p>
                    <CustomEditor
                      onChange={(e, editor) =>
                        setFormData({
                          ...formData,
                          infoSection: formData?.infoSection?.map((item, i) =>
                            i === index
                              ? { ...item, left_description: editor.getData() }
                              : item
                          ),
                        })
                      }
                      data={item?.left_description}
                    />

                    {error?.infoSection?.right_description?.status && (
                      <p className="text-red-500 text-12 px-2 pt-1">
                        {error?.infoSection?.right_description?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <p>Right Side Image:</p>
                    <input
                      type="file"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          infoSection: formData?.infoSection?.map((item, i) =>
                            i === index
                              ? { ...item, right_img: e.target.files[0] }
                              : item
                          ),
                        })
                      }
                    />

                    {error?.infoSection?.right_img?.status && (
                      <p className="text-red-500 text-12 px-2 pt-1">
                        {error?.infoSection?.right_img?.message}
                      </p>
                    )}
                  </div>

                  {typeof item?.right_img == "string" && (
                    <div>
                      <img
                        src={
                          process.env.NEXT_PUBLIC_IMAGE_URL + item?.right_img
                        }
                        height={100}
                        width={100}
                        alt="Bangla"
                      />
                    </div>
                  )}

                  {typeof item?.right_img == "object" && (
                    <div>
                      <img
                        src={URL.createObjectURL(item?.right_img)}
                        height={100}
                        width={100}
                        alt="Bangla"
                      />
                    </div>
                  )}
                </fieldset>

                <div>
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        infoSection: formData?.infoSection?.filter(
                          (item, i) => i !== index
                        ),
                      })
                    }
                    className="border border-primary bg-primary text-white mt-2 px-2 py-1 rounded"
                  >
                    <FaMinus />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border border-gray-300 rounded">
          <div className="bg-gray-300 flex items-center justify-between p-2">
            <h3 className="text-primary font-semibold">Four Column section</h3>
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  fourCol: [
                    ...formData?.fourCol,
                    {
                      item_bg: "",
                      icon: "",
                      title: "",
                      version: "",
                      release_date: "",
                      btn_label: "",
                      btn_bg: "",
                      brows_type: "",
                      brows_file: "",
                      brows_link: "",
                    },
                  ],
                })
              }
              type="button"
              title="Add Section"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              <FaPlus />
            </button>
          </div>

          {formData?.fourCol?.map((item, index) => {
            return (
              <div key={index} className="w-full flex gap-2 border border-b-gray-400 py-6">
                <fieldset className="flex flex-col border rounded-md px-2 w-full">
                  <div>
                    <p>Background Color:</p>
                    <input
                      value={item?.item_bg}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fourCol: formData?.fourCol?.map((item, i) =>
                            i === index
                              ? { ...item, item_bg: e.target.value }
                              : item
                          ),
                        })
                      }
                      type="color"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <p>Icon:</p>
                    <input
                      type="file"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fourCol: formData?.fourCol?.map((item, i) =>
                            i === index
                              ? { ...item, icon: e.target.files[0] }
                              : item
                          ),
                        })
                      }
                    />
                  </div>

                  {typeof item?.icon == "string" && (
                    <div>
                      <img
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + item?.icon}
                        height={100}
                        width={100}
                        alt="Bangla"
                      />
                    </div>
                  )}

                  {typeof item?.icon == "object" && (
                    <div>
                      <img
                        src={URL.createObjectURL(item?.icon)}
                        height={100}
                        width={100}
                        alt="Bangla"
                      />
                    </div>
                  )}

                  <div>
                    <p>Title:</p>
                    <input
                      value={item?.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fourCol: formData?.fourCol?.map((item, i) =>
                            i === index
                              ? { ...item, title: e.target.value }
                              : item
                          ),
                        })
                      }
                      type="text"
                      className="w-full outline-none border border-gray-500 px-2 rounded"
                    />
                  </div>

                  <div>
                    <p>Version:</p>
                    <input
                      value={item?.version}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fourCol: formData?.fourCol?.map((item, i) =>
                            i === index
                              ? { ...item, version: e.target.value }
                              : item
                          ),
                        })
                      }
                      type="text"
                      className="w-full outline-none border border-gray-500 px-2 rounded"
                    />
                  </div>

                  <div>
                    <p>Release Date:</p>
                    <input
                      value={item?.release_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fourCol: formData?.fourCol?.map((item, i) =>
                            i === index
                              ? { ...item, release_date: e.target.value }
                              : item
                          ),
                        })
                      }
                      type="text"
                      className="w-full outline-none border border-gray-500 px-2 rounded"
                    />
                  </div>

                  <div>
                    <p>Button Label:</p>
                    <input
                      value={item?.btn_label}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fourCol: formData?.fourCol?.map((item, i) =>
                            i === index
                              ? { ...item, btn_label: e.target.value }
                              : item
                          ),
                        })
                      }
                      type="text"
                      className="w-full outline-none border border-gray-500 px-2 rounded"
                    />
                  </div>

                  <div>
                    <p>Visit Type:</p>
                    <select
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fourCol: formData?.fourCol?.map((item, i) =>
                            i === index
                              ? { ...item, brows_type: e.target.value }
                              : item
                          ),
                        })
                      }
                      className="w-full outline-none border border-gray-500 p-2 rounded"
                    >
                      <option value="#">---Select--</option>
                      <option
                        selected={item?.brows_type == "download"}
                        value="download"
                      >
                        Download
                      </option>
                      <option
                        selected={item?.brows_type == "browse"}
                        value="browse"
                      >
                        Browse
                      </option>
                    </select>
                  </div>

                  {item?.brows_type == "download" && (
                    <>
                      <div>
                        <p>File:</p>
                        <input
                          type="file"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fourCol: formData?.fourCol?.map((item, i) =>
                                i === index
                                  ? { ...item, brows_file: e.target.files[0] }
                                  : item
                              ),
                            })
                          }
                        />
                      </div>

                      {/* {
                                                        typeof item?.brows_file == 'string' && (
                                                            <div>
                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + item?.brows_file} height={100} width={100} alt="Bangla" />
                                                            </div>
                                                        )
                                                    }

                                                    {
                                                        typeof item?.brows_file == 'object' && (
                                                            <div>
                                                                <img src={URL.createObjectURL(item?.brows_file)} height={100} width={100} alt="Bangla" />
                                                            </div>
                                                        )
                                                    } */}
                    </>
                  )}

                  {item?.brows_type == "browse" && (
                    <div>
                      <p>Link:</p>
                      <input
                        value={item?.brows_link}
                        type="text"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fourCol: formData?.fourCol?.map((item, i) =>
                              i === index
                                ? { ...item, brows_link: e.target.value }
                                : item
                            ),
                          })
                        }
                        className="w-full outline-none border border-gray-500 px-2 rounded"
                      />
                    </div>
                  )}

                  <div>
                    <p>Button Background Color:</p>
                    <input
                      value={item?.btn_bg}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fourCol: formData?.fourCol?.map((item, i) =>
                            i === index
                              ? { ...item, btn_bg: e.target.value }
                              : item
                          ),
                        })
                      }
                      type="color"
                      className="w-full"
                    />
                  </div>
                </fieldset>

                <div>
                  <button
                    onClick={() => {
                      if (formData?.fourCol?.length > 1) {
                        setFormData({
                          ...formData,
                          fourCol: formData?.fourCol?.filter(
                            (item, i) => i !== index
                          ),
                        });
                      }
                    }}
                    className="border border-primary bg-primary text-white mt-2 px-2 py-1 rounded"
                  >
                    <FaMinus />
                  </button>
                </div>
              </div>
            );
          })}

          {error?.fourCol?.status && (
            <p className="text-red-500">{error?.fourCol?.message}</p>
          )}
        </div>

        <div className="border border-gray-300 rounded">
          <div className="bg-gray-300 flex items-center justify-between p-2">
            <h3 className="text-primary font-semibold">Distribution</h3>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  distribution: [
                    ...formData.distribution,
                    { label: "", icon: "" },
                  ],
                })
              }
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
                                      i === index
                                        ? { ...dist, label: e.target.value }
                                        : dist
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
                                      i === index
                                        ? { ...dist, icon: e.target.files?.[0] }
                                        : dist
                                  ),
                                });
                              }}
                            />
                          </div>
                        </div>
                        {item?.icon?.length > 0 && (
                          <div className="mt-5 relative w-[5em] h-[5em]">
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_IMAGE_URL + item?.icon
                              }
                              alt="Bangla"
                              width={100}
                              height={100}
                              className="w-[5em] h-[5em]"
                            />
                            <button
                              className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  distribution: formData.distribution.map(
                                    (dist, i) =>
                                      i === index ? { ...dist, icon: "" } : dist
                                  ),
                                })
                              }
                              type="button"
                            >
                              <FaRegTimesCircle className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        )}

                        {typeof item?.icon == "object" && (
                          <div className="mt-5 relative w-[5em] h-[5em]">
                            <Image
                              src={URL.createObjectURL(item?.icon)}
                              alt="Bangla"
                              width={100}
                              height={100}
                              className="w-[5em] h-[5em]"
                            />
                            <button
                              className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  distribution: formData.distribution.map(
                                    (dist, i) =>
                                      i === index ? { ...dist, icon: "" } : dist
                                  ),
                                })
                              }
                              type="button"
                            >
                              <FaRegTimesCircle className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        )}
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

          {error?.distribution?.status && (
            <p className="text-red-500 text-12 px-2 pt-1">
              {error?.distribution?.message}
            </p>
          )}
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

                          {error?.domain_name?.status && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                              {error?.domain_name?.message}
                            </p>
                          )}
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

                          {error?.domain_link?.status && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                              {error?.domain_link?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
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
                    <label
                      htmlFor="user_doc_label"
                      className="after:content-['_*'] after:text-red-500"
                    >
                      Label
                    </label>
                  </legend>
                  <input
                    value={formData?.user_doc?.label}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        user_doc: {
                          ...formData.user_doc,
                          label: e.target.value,
                        },
                      })
                    }
                    id="user_doc_label"
                    type="text"
                    placeholder="Enter user doc label"
                    className="w-full outline-none p-2"
                  />
                </fieldset>

                {error?.userDoc?.label?.status && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {error?.userDoc?.label?.message}
                  </p>
                )}
              </div>

              <div>
                <fieldset className="flex flex-col border rounded-md px-2 pb-2">
                  <legend>
                    <label
                      htmlFor="user_doc_icon"
                      className="after:content-['_*'] after:text-red-500"
                    >
                      Icon
                    </label>
                  </legend>
                  <input
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        user_doc: {
                          ...formData.user_doc,
                          icon: e.target.files?.[0],
                        },
                      })
                    }
                    type="file"
                    name="user_doc_icon"
                  />

                  {formData?.user_doc?.icon?.length > 0 && (
                    <div className="mt-5 relative w-[5em] h-[5em]">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_IMAGE_URL +
                          formData?.user_doc?.icon
                        }
                        alt="Bangla"
                        width={100}
                        height={100}
                        className="w-[5em] h-[5em]"
                      />
                      <button
                        className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full"
                        onClick={(e) =>
                          setFormData({
                            ...formData,
                            user_doc: { ...formData.user_doc, icon: null },
                          })
                        }
                        type="button"
                      >
                        <FaRegTimesCircle className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}

                  {formData?.user_doc?.icon &&
                    typeof formData?.user_doc?.icon == "object" && (
                      <div className="mt-5 relative w-[5em] h-[5em]">
                        <Image
                          src={URL.createObjectURL(formData?.user_doc?.icon)}
                          alt="Bangla"
                          width={100}
                          height={100}
                          className="w-[5em] h-[5em]"
                        />
                        <button
                          className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full"
                          onClick={(e) =>
                            setFormData({
                              ...formData,
                              user_doc: { ...formData.user_doc, icon: null },
                            })
                          }
                          type="button"
                        >
                          <FaRegTimesCircle className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    )}
                </fieldset>
                {error?.userDoc?.icon?.status && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {error?.userDoc?.icon?.message}
                  </p>
                )}
              </div>

              <div>
                <fieldset className="flex flex-col border rounded-md px-2">
                  <legend>
                    <label className="after:content-['_*'] after:text-red-500">
                      Video Title
                    </label>
                  </legend>
                  <input
                    value={formData?.user_doc?.video?.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        user_doc: {
                          ...formData.user_doc,
                          video: {
                            ...formData.user_doc.video,
                            title: e.target.value,
                          },
                        },
                      })
                    }
                    type="text"
                    className="outline-none p-2"
                    placeholder="Enter video title"
                  />
                </fieldset>

                {error?.userDoc?.video?.title?.status && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {error?.userDoc?.video?.title?.message}
                  </p>
                )}
              </div>

              <div>
                <fieldset className="flex flex-col border rounded-md px-2">
                  <legend>
                    <label
                      htmlFor="video_link"
                      className="after:content-['_*'] after:text-red-500"
                    >
                      Video Link
                    </label>
                  </legend>
                  <input
                    value={formData?.user_doc?.video?.link}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        user_doc: {
                          ...formData.user_doc,
                          video: {
                            ...formData.user_doc.video,
                            link: e.target.value,
                          },
                        },
                      })
                    }
                    id="video_link"
                    type="text"
                    placeholder="Video Link"
                    className="outline-none p-2"
                  />
                </fieldset>

                {error?.userDoc?.video?.link?.status && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {error?.userDoc?.video?.link?.message}
                  </p>
                )}
              </div>

              <div>
                <fieldset className="flex flex-col border rounded-md px-2">
                  <legend>
                    <label
                      htmlFor="video_link"
                      className="after:content-['_*'] after:text-red-500"
                    >
                      Video Thumbnail
                    </label>
                  </legend>
                  <input
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        user_doc: {
                          ...formData.user_doc,
                          video: {
                            ...formData.user_doc.video,
                            thumbnail: e.target.files?.[0],
                          },
                        },
                      })
                    }
                    type="file"
                    name="video_thumbnail"
                  />
                </fieldset>

                {typeof formData?.user_doc?.video?.thumbnail == "string" && (
                  <div>
                    <img
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL +
                        formData?.user_doc?.video?.thumbnail
                      }
                      height={100}
                      width={100}
                      alt="Bangla"
                    />
                  </div>
                )}

                {typeof formData?.user_doc?.video?.thumbnail == "object" && (
                  <div>
                    <img
                      src={URL.createObjectURL(
                        formData?.user_doc?.video?.thumbnail
                      )}
                      height={100}
                      width={100}
                      alt="Bangla"
                    />
                  </div>
                )}

                {error?.userDoc?.video?.thumbnail?.status && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {error?.userDoc?.video?.thumbnail?.message}
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
                      Short Description
                    </label>
                  </legend>

                  <textarea
                    value={formData?.user_doc?.short_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        user_doc: {
                          ...formData.user_doc,
                          short_description: e.target.value,
                        },
                      })
                    }
                    name="user_doc_description"
                    className="w-full outline-none p-2"
                    placeholder="Enter user doc short description"
                  ></textarea>
                </fieldset>

                {error?.userDoc?.shortDes?.status && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {error?.userDoc?.shortDes?.message}
                  </p>
                )}
              </div>

              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <div className="border border-gray-300 rounded">
                    <div className="bg-gray-300 flex items-center justify-between p-2">
                      <h3 className="text-primary font-semibold">
                        Modules File
                      </h3>
                      <button
                        onClick={() => {
                          setFormData({
                            ...formData,
                            user_doc: {
                              ...formData.user_doc,
                              module_file: [
                                ...formData.user_doc.module_file,
                                {
                                  label: "",
                                  module: "",
                                },
                              ],
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
                                          const newModuleFile = [
                                            ...formData.user_doc.module_file,
                                          ];
                                          newModuleFile[index] = {
                                            ...newModuleFile[index],
                                            label: e.target.value,
                                          };
                                          setFormData({
                                            ...formData,
                                            user_doc: {
                                              ...formData.user_doc,
                                              module_file: newModuleFile,
                                            },
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
                                    <p>Module:</p>
                                    <div className="col-span-3">
                                      <input
                                        onChange={(e) => {
                                          const newModuleFile = [
                                            ...formData.user_doc.module_file,
                                          ];

                                          newModuleFile[index] = {
                                            ...newModuleFile[index],
                                            module: e.target.files?.[0],
                                          };

                                          setFormData({
                                            ...formData,
                                            user_doc: {
                                              ...formData.user_doc,
                                              module_file: newModuleFile,
                                            },
                                          });
                                        }}
                                        type="file"
                                        className="w-full "
                                      />
                                    </div>
                                  </div>

                                  {item?.module?.length > 0 &&
                                    (item?.module?.includes("pdf") ||
                                    item?.module?.includes("exe") ? (
                                      item?.module?.includes("pdf") ? (
                                        <div className="mt-5 relative w-[5em] h-[5em]">
                                          <Image
                                            src={relative_image_path(
                                              "pdf_file.png"
                                            )}
                                            alt="Bangla"
                                            width={100}
                                            height={100}
                                            className="w-[5em] h-[5em]"
                                          />
                                          <button
                                            className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full"
                                            onClick={() =>
                                              setFormData({
                                                ...formData,
                                                distribution:
                                                  formData.distribution.map(
                                                    (dist, i) =>
                                                      i === index
                                                        ? {
                                                            ...dist,
                                                            module: "",
                                                          }
                                                        : dist
                                                  ),
                                              })
                                            }
                                            type="button"
                                          >
                                            <FaRegTimesCircle className="w-4 h-4 text-white" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-5 relative w-[5em] h-[5em]">
                                          <Image
                                            src={relative_image_path(
                                              "exe_file.png"
                                            )}
                                            alt="Bangla"
                                            width={100}
                                            height={100}
                                            className="w-[5em] h-[5em]"
                                          />
                                          <button
                                            className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full"
                                            onClick={() =>
                                              setFormData({
                                                ...formData,
                                                distribution:
                                                  formData.distribution.map(
                                                    (dist, i) =>
                                                      i === index
                                                        ? {
                                                            ...dist,
                                                            module: "",
                                                          }
                                                        : dist
                                                  ),
                                              })
                                            }
                                            type="button"
                                          >
                                            <FaRegTimesCircle className="w-4 h-4 text-white" />
                                          </button>
                                        </div>
                                      )
                                    ) : (
                                      <div className="mt-5 relative w-[5em] h-[5em]">
                                        <Image
                                          src={
                                            process.env.NEXT_PUBLIC_IMAGE_URL +
                                            item?.module
                                          }
                                          alt="Bangla"
                                          width={100}
                                          height={100}
                                          className="w-[5em] h-[5em]"
                                        />
                                        <button
                                          className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full"
                                          onClick={() =>
                                            setFormData({
                                              ...formData,
                                              distribution:
                                                formData.distribution.map(
                                                  (dist, i) =>
                                                    i === index
                                                      ? { ...dist, module: "" }
                                                      : dist
                                                ),
                                            })
                                          }
                                          type="button"
                                        >
                                          <FaRegTimesCircle className="w-4 h-4 text-white" />
                                        </button>
                                      </div>
                                    ))}

                                  {typeof item?.module === "object" && (
                                    <div className="mt-5 relative w-[5em] h-[5em]">
                                      <Image
                                        src={
                                          item?.module instanceof Blob
                                            ? URL.createObjectURL(item.module)
                                            : "/default-image.jpg"
                                        }
                                        alt="Bangla"
                                        width={100}
                                        height={100}
                                        className="w-[5em] h-[5em]"
                                      />
                                      <button
                                        className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-full"
                                        onClick={() =>
                                          setFormData({
                                            ...formData,
                                            distribution:
                                              formData.distribution.map(
                                                (dist, i) =>
                                                  i === index
                                                    ? { ...dist, module: "" }
                                                    : dist
                                              ),
                                          })
                                        }
                                        type="button"
                                      >
                                        <FaRegTimesCircle className="w-4 h-4 text-white" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </fieldset>
                            </div>
                            <div className="mt-3">
                              <button
                                type="button"
                                onClick={() => {
                                  if (
                                    formData?.user_doc?.module_file.length != 1
                                  ) {
                                    setFormData({
                                      ...formData,
                                      user_doc: {
                                        ...formData.user_doc,
                                        module_file:
                                          formData.user_doc.module_file.filter(
                                            (_, i) => i !== index
                                          ),
                                      },
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

                    {error?.userDoc?.module?.status && (
                      <p className="text-red-500 text-12 px-2 pt-1">
                        {error?.userDoc?.module?.message}
                      </p>
                    )}
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
                                  link: "",
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
                                  <label htmlFor="key">
                                    Link - {index + 1}
                                  </label>
                                </legend>

                                <div className="flex flex-col gap-2">
                                  <div className="grid grid-cols-4">
                                    <p>Label:</p>
                                    <div className="col-span-3">
                                      <input
                                        onChange={(e) => {
                                          const newExternalLinks = [
                                            ...formData.user_doc.external_links,
                                          ];
                                          newExternalLinks[index] = {
                                            ...newExternalLinks[index],
                                            label: e.target.value,
                                          };
                                          setFormData({
                                            ...formData,
                                            user_doc: {
                                              ...formData.user_doc,
                                              external_links: newExternalLinks,
                                            },
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
                                          const newExternalLinks = [
                                            ...formData.user_doc.external_links,
                                          ];
                                          newExternalLinks[index] = {
                                            ...newExternalLinks[index],
                                            link: e.target.value,
                                          };
                                          setFormData({
                                            ...formData,
                                            user_doc: {
                                              ...formData.user_doc,
                                              external_links: newExternalLinks,
                                            },
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
                                  if (
                                    formData?.user_doc?.external_links
                                      ?.length != 1
                                  ) {
                                    setFormData({
                                      ...formData,
                                      user_doc: {
                                        ...formData.user_doc,
                                        external_links:
                                          formData.user_doc.external_links.filter(
                                            (_, i) => i !== index
                                          ),
                                      },
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

                    {error?.userDoc?.extraLink?.status && (
                      <p className="text-red-500 text-12 px-2 pt-1">
                        {error?.userDoc?.extraLink?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-5">
          <p className="text-14">
            <span className="text-red-500">* </span>
          </p>
          <button
            type="submit"
            className="px-4 py-2 bg-violet-700 text-white active:scale-90 transition-all duration-400 rounded-md"
          >
            {isLoading ? "Loading..." : "Update"}
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
  );
};

export default UpdateServiceDetailsResource;
