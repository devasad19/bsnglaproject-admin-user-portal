"use client";
import {
  getMenuSection,
  updateMenuSection,
} from "@/app/(admin)/_api/Setting/menuSectionApi";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { toast } from "react-toastify";

const MenuSectionList = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    backgroundImage: "" as any,
    iconSectionField: [
      {
        link: "",
        icon: "" as any,
      },
    ],
  });

  const fetchGetMenuSection = async () => {
    setLoading(true);
    try {
      const response = await getMenuSection();
      console.log({ response });
      if (response.status) {
        setFormData({
          title: response.data.header_title,
          subTitle: response.data.header_sub_title,
          backgroundImage: response.data.banner_background_image || "",
          iconSectionField: response.data.header_image
            ? JSON.parse(response.data.header_image)?.map((item: any) => ({
                link: item.link,
                icon: item.icon,
              }))
            : [],
        });
        setLoading(false);
      }
    } catch (error) {
      console.error({ error });
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchGetMenuSection();
  }, []);

  // console.log({ formData });

  const handleSectionAdd = () => {
    if (formData?.iconSectionField?.length >= 5) {
      toast.warning("You can't add more than 5 section");
      return;
    }
    setFormData({
      ...formData,
      iconSectionField: [
        ...formData.iconSectionField,
        {
          link: "",
          icon: "" as any,
        },
      ],
    });
  };

  const handleUpdateMenu = async (e: any) => {
    e.preventDefault();
    // console.log({ formData });
    setIsLoading(true);

    const payload = new FormData();
    payload.append("header_title", formData.title);
    payload.append("header_sub_title", formData.subTitle);
    payload.append("banner_background_image", formData.backgroundImage);
    formData.iconSectionField.forEach((item, index) => {
      payload.append(`banner_item[${index}][link]`, item.link || "");
      payload.append(`banner_item[${index}][icon]`, item.icon);
    });
    const formDataObject: Record<string, any> = {};
    payload.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);
    try {
      const response: any = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/headersUpdate/1`,
        payload,
        {
          headers: {
            // Don't set "Content-Type" manually
          },
        }
      );
      if (response?.status) {
        setIsLoading(false);
        toast.success(response?.message);
      } else {
        setIsLoading(false);
        toast.error(response?.message);
      }
    } catch (error: any) {
      console.error({ error });
      setIsLoading(false);
      toast.error(error?.message);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-white py-10 px-16">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-20 font-bold">Menu List</h1>
        </div>
        <form onSubmit={handleUpdateMenu}>
          <fieldset className="flex flex-col border border-gray-400 rounded px-2">
            <legend>
              <label
                htmlFor="title1"
                className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500"
              >
                Title
              </label>
            </legend>
            <input
              type="text"
              value={formData?.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter title"
              className="w-full outline-none text-14 py-1"
              required
            />
          </fieldset>
          <fieldset className="flex flex-col border border-gray-400 rounded px-2">
            <legend>
              <label
                htmlFor="title1"
                className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500"
              >
                Sub Title
              </label>
            </legend>
            <input
              type="text"
              value={formData?.subTitle}
              onChange={(e) =>
                setFormData({ ...formData, subTitle: e.target.value })
              }
              placeholder="Enter Sub title"
              className="w-full outline-none text-14 py-1"
              required
            />
          </fieldset>
          <fieldset className="flex flex-col border border-gray-400 rounded px-2 py-2">
            <legend>
              <label
                htmlFor="title1"
                className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500"
              >
                Background Image
              </label>
            </legend>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFormData({
                    ...formData,
                    backgroundImage: e.target.files[0],
                  });
                }
              }}
              placeholder="Enter Sub title"
              className="w-full outline-none text-14 py-1"
            />
            {formData?.backgroundImage ? (
              typeof formData?.backgroundImage === "string" ? (
                <Image
                  src={
                    process.env.NEXT_PUBLIC_IMAGE_URL +
                    formData?.backgroundImage
                  }
                  alt="bg"
                  width={50}
                  height={50}
                  className="w-24 h-24 "
                />
              ) : (
                <Image
                  src={URL.createObjectURL(formData.backgroundImage)}
                  alt="bg"
                  width={50}
                  height={50}
                  className="w-24 h-24 "
                />
              )
            ) : (
              <Image
                src={
                  process.env.NEXT_PUBLIC_IMAGE_URL +
                  (process.env.NEXT_PUBLIC_DEFAULT_IMAGE as string)
                }
                alt="bg"
                width={50}
                height={50}
                className="w-24 h-24 "
              />
            )}
          </fieldset>
          <div className="border border-gray-300 rounded mt-5">
            <div className="bg-gray-300 flex items-center justify-between p-2">
              <h3 className="text-primary font-semibold">Icon Section</h3>
              <button
                onClick={() => handleSectionAdd()}
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
            {formData?.iconSectionField?.map((item, index) => (
              <div key={index} className="p-2 ">
                <div>
                  <div className="flex gap-2">
                    <div className="flex w-full  items-center justify-between">
                      <fieldset className="w-full flex flex-col border rounded-md px-2 py-2">
                        <legend>
                          <label
                            htmlFor="key"
                            className="after:content-['_*'] after:text-red-500"
                          >
                            Section - {index + 1}
                          </label>
                        </legend>

                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            <label className="w-[20%]">Link:</label>
                            <div className="w-[70%]">
                              <input
                                type="text"
                                placeholder="Enter Link"
                                className="border border-black w-full px-2 outline-none"
                                value={item.link}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    iconSectionField:
                                      formData?.iconSectionField?.map((dist, i) =>
                                        i === index
                                          ? { ...dist, link: e.target.value }
                                          : dist
                                      ),
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              <p className="w-[20%]">Icon:(80 X 80)</p>
                              <div className="w-[70%] flex items-center gap-2">
                                <input
                                  type="file"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      setFormData({
                                        ...formData,
                                        iconSectionField:
                                          formData.iconSectionField.map(
                                            (dist, i) =>
                                              i === index
                                                ? {
                                                    ...dist,
                                                    icon: e.target.files
                                                      ? e.target.files[0]
                                                      : dist.icon,
                                                  }
                                                : dist
                                          ),
                                      });
                                    }
                                  }}
                                  className="w-full"
                                />
                              </div>
                            </div>

                            {item?.icon ? (
                              typeof item?.icon === "string" ? (
                                <Image
                                  src={
                                    process.env.NEXT_PUBLIC_IMAGE_URL +
                                    item?.icon
                                  }
                                  alt="bg"
                                  width={50}
                                  height={50}
                                  className="w-16 h-16 "
                                />
                              ) : (
                                <Image
                                  src={URL.createObjectURL(item.icon)}
                                  alt="bg"
                                  width={50}
                                  height={50}
                                  className="w-16 h-16 "
                                />
                              )
                            ) : (
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_IMAGE_URL +
                                  (process.env
                                    .NEXT_PUBLIC_DEFAULT_IMAGE as string)
                                }
                                alt="bg"
                                width={50}
                                height={50}
                                className="w-16 h-16"
                              />
                            )}
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={() => {
                          setFormData({
                            ...formData,
                            iconSectionField: formData.iconSectionField.filter(
                              (item, i) => i !== index
                            ),
                          });
                        }}
                        type="button"
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
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded mt-5"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default MenuSectionList;
