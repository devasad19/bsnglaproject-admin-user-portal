"use client";
import { serviceDetailsResourceApi } from "@/app/(portal)/_api/ServiceApi/ServiceApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomEditor from "@/app/_components/CustomEditor/CustomEditor";

interface FormData {
  description: string;
  media_image: File;
  support_address: string;
  externalLinks: { label: string; link: string }[];
  api_doc: string;
  user_doc: string;
  module: { label: string; image: File }[];
  videolink: string;
}


const ServiceDetailsResource = () => {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [serviceImg, setServiceImg] = useState<File | null>(null);
  const [tutorialVideo, setTutorialVideo] = useState(null);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showItem, setShowItem] = useState([]);
  const [modulesItem, setModulesItem] = useState<string[]>([""]);
  const [externalLinks, setExternalLinks] = useState<string[]>([""]);
  const [mediaImages, setMediaImages] = useState<FileList | null>(null);
  const [distribution, setDistribution] = useState<string[]>([""]);

  /* const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<FormData>(); */

  /* const onSubmitServiceDetailsResource = async (data: any) => {
    const {
      description,
      module,
      media_image,
      support_address,
      api_doc,
      user_doc,
      externalLinks,


    } = data;


    const formData = new FormData();
    formData.append("service_id", "1");
    formData.append("broad_description", description);

    if (mediaImages) {
      Array.from(mediaImages).forEach((file) => {

        formData.append("media_images[]", file);
      });
    } else {
      formData.append("media_images[]", "");
    }
    let modules: any = [];
    module.forEach((item: any) => {
      const { label, image } = item;
      console.log("mudules imageds:", image[0]);
      modules.push({ label: label, image: image[0] });
    });


    // for (let i = 0; i < module.length; i++) {
    //   formData.append('modules[]', module[i]);
    // }

    console.log("Update2 modules:", modules);

    formData.append("modules", modules);
    formData.append("external_links", JSON.stringify(externalLinks));
    formData.append("support_address", support_address);
    formData.append("api_docs", api_doc);
    formData.append("user_docs", user_doc);

    const res = await serviceDetailsResourceApi(formData).catch((err) => {
      console.log(err);
    });

    console.log('response from service details api: ',res);
    
  }; */


  return (
    <>
      <form
        // onSubmit={handleSubmit(onSubmitServiceDetailsResource)}
        className="flex flex-col gap-4"
      >
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

            {/* <Controller
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
        </div>
        <div>
          <fieldset className="flex flex-col border rounded-md px-2">
            <legend>
              <label
                htmlFor="ServiceName"
                className="after:content-['_*'] after:text-red-500"
              >
                Media Images
              </label>
            </legend>

            <input
              {...register("media_image", {
                required: "Logo is required",
              })}
              id="file"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setMediaImages(e.target.files);
                }
              }}
              accept="image/*"
              multiple
            />
          </fieldset>
          {errors.media_image && (
            <p className="text-red-500 text-12 px-2 pt-1">
              {errors.media_image.message as string}
            </p>
          )}
        </div>

        <div className="border border-gray-300 rounded">
          <div className="bg-gray-300 flex items-center justify-between p-2">
            <h3 className="text-primary font-semibold">Distribution</h3>
            <button
              type="button"
              onClick={() => {
                setDistribution([...distribution, ""]);
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
          {distribution?.map((item, index) => (
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
                              {...register(`module.${index}.label`, {
                                required: "Label is required",
                              })}
                              placeholder="Enter Label"
                              className=" border border-black w-full px-2"
                            />
                            {errors.module?.[index]?.label && (
                              <p className="text-red-500 text-sm px-2 pt-1">
                                {errors.module[index]?.label?.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-4">
                          <p>Icon:</p>
                          <div className="col-span-3">
                            <input
                              type="file"
                              {...register(`module.${index}.image`, {
                                required: "Module is required",
                              })}
                              className="w-full "
                            />
                            {errors.module?.[index]?.image && (
                              <p className="text-red-500 text-sm px-2 pt-1">
                                {errors.module[index]?.image?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (distribution?.length != 1) {
                          setDistribution(() => {
                            return distribution.filter(
                              (item, index2) => index !== index2
                            );
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
                    <label htmlFor="user_doc_title" className="after:content-['_*'] after:text-red-500">
                      Label
                    </label>
                  </legend>
                  <input type="text" placeholder="Enter user doc label" className="w-full outline-none p-2" />
                </fieldset>
              </div>

              <div>
                <fieldset className="flex flex-col border rounded-md px-2 pb-2">
                  <legend>
                    <label htmlFor="user_doc_icon" className="after:content-['_*'] after:text-red-500">
                      Icon
                    </label>
                  </legend>
                  <input type="file" name="user_doc_icon" />
                </fieldset>
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
                    {...register("videolink", {
                      required: "Video Link is required",
                    })}
                    type="text"
                    placeholder="Video Link (Youtube)"
                    className="outline-none p-2"
                  />
                </fieldset>
                {errors.videolink && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {errors.videolink.message as string}
                  </p>
                )}
              </div>

              <fieldset className="flex flex-col border rounded-md px-2">
                <legend>
                  <label
                    htmlFor="ServiceName"
                    className="after:content-['_*'] after:text-red-500"
                  >
                    Short Description
                  </label>
                </legend>

                <Controller
                  name="user_doc"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "User Documents is required",
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
                      {errors.user_doc && (
                        <p className="text-red-500 text-12 px-2 pt-1">
                          {errors.user_doc.message as string}
                        </p>
                      )}
                    </>
                  )}
                />
              </fieldset>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="border border-gray-300 rounded">
                  <div className="bg-gray-300 flex items-center justify-between p-2">
                    <h3 className="text-primary font-semibold">Modules File</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setModulesItem([...modulesItem, ""]);
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
                  {modulesItem?.map((item, index) => (
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
                                      type="text"
                                      {...register(`module.${index}.label`, {
                                        required: "Label is required", // Validation rule
                                      })}
                                      placeholder="Enter Label"
                                      className=" border border-black w-full px-2"
                                    />
                                    {errors.module?.[index]?.label && (
                                      <p className="text-red-500 text-sm px-2 pt-1">
                                        {errors.module[index]?.label?.message}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="grid grid-cols-4">
                                  <p>Version:</p>
                                  <div className="col-span-3">
                                    <input
                                      type="text"
                                      {...register(`module.${index}.label`, {
                                        required: "Label is required", // Validation rule
                                      })}
                                      placeholder="Enter Version"
                                      className=" border border-black w-full px-2"
                                    />
                                    {errors.module?.[index]?.label && (
                                      <p className="text-red-500 text-sm px-2 pt-1">
                                        {errors.module[index]?.label?.message}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="grid grid-cols-4">
                                  <p>Module:</p>
                                  <div className="col-span-3">
                                    <input
                                      type="file"
                                      {...register(`module.${index}.image`, {
                                        required: "Module is required", // Validation rule
                                      })}
                                      className="w-full "
                                    />
                                    {errors.module?.[index]?.image && (
                                      <p className="text-red-500 text-sm px-2 pt-1">
                                        {errors.module[index]?.image?.message}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* <input
                                type="file"
                                id={`module${index}`}
                                {...register(`module.${index}`)}
                                placeholder="Enter Url Key"
                                className="outline-none p-2 "
                              /> */}
                            </fieldset>
                          </div>
                          <div className="mt-3">
                            <button
                              type="button"
                              onClick={() => {
                                if (modulesItem.length !== 1) {
                                  setModulesItem(() => {
                                    return modulesItem.filter(
                                      (item, index2) => index !== index2
                                    );
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
                </div>
                <div className="border border-gray-300 rounded">
                  <div className="bg-gray-300 flex items-center justify-between p-2">
                    <h3 className="text-primary font-semibold">
                      External Links
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setExternalLinks([...externalLinks, ""]);
                      }}
                      /* onClick={() => {
                        setModulesItem([...modulesItem, ""]);
                      }} */
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
                  {externalLinks?.map((item, index) => (
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
                                  Link - {index + 1}
                                </label>
                              </legend>

                              <div className="flex flex-col gap-2">
                                <div className="grid grid-cols-4">
                                  <p>Label:</p>
                                  <div className="col-span-3">
                                    <input
                                      type="text"
                                      {...register(
                                        `externalLinks.${index}.label`,
                                        {
                                          required: "Label is required", // Validation rule
                                        }
                                      )}
                                      placeholder="Enter Label"
                                      className=" border border-black w-full px-2"
                                    />
                                    {errors.externalLinks?.[index]?.label && (
                                      <p className="text-red-500 text-sm px-2 pt-1">
                                        {
                                          errors.externalLinks[index]?.label
                                            ?.message
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {/* Display validation message for Label */}

                                <div className="grid grid-cols-4">
                                  <p>Link:</p>
                                  <div className="col-span-3">
                                    <input
                                      type="text"
                                      {...register(
                                        `externalLinks.${index}.link`,
                                        {
                                          required: "Link is required", // Validation rule
                                        }
                                      )}
                                      placeholder="Enter Link"
                                      className=" border border-black w-full px-2"
                                    />
                                    {errors.externalLinks?.[index]?.link && (
                                      <p className="text-red-500 text-sm px-2 pt-1">
                                        {
                                          errors.externalLinks[index]?.link
                                            ?.message as string
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {/* Display validation message for Link */}
                              </div>

                              {/* <input
                                type="file"
                                id={`module${index}`}
                                {...register(`module.${index}`)}
                                placeholder="Enter Url Key"
                                className="outline-none p-2 "
                              /> */}
                            </fieldset>
                          </div>
                          <div className="mt-3">
                            <button
                              type="button"
                              onClick={() => {
                                if (externalLinks?.length != 1) {
                                  setExternalLinks(() => {
                                    return externalLinks.filter(
                                      (item, index2) => index !== index2
                                    );
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
                  <input type="text" placeholder="Enter user doc label" className="w-full outline-none p-2" />
                </fieldset>
              </div>

              <div>
                <fieldset className="flex flex-col border rounded-md px-2 pb-2">
                  <legend>
                    <label htmlFor="user_doc_icon" className="after:content-['_*'] after:text-red-500">
                      Icon
                    </label>
                  </legend>
                  <input type="file" name="user_doc_icon" />
                </fieldset>
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
                    type="text"
                    placeholder="Video Link (Youtube)"
                    className="outline-none p-2"
                  />
                </fieldset>
              </div>

              <fieldset className="flex flex-col border rounded-md px-2">
                <legend>
                  <label
                    htmlFor="ServiceName"
                    className="after:content-['_*'] after:text-red-500"
                  >
                    Short Description
                  </label>
                </legend>

                <Controller
                  name="user_doc"
                  // control={control}
                  defaultValue=""
                  rules={{
                    required: "User Documents is required",
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
                      {/* {errors.user_doc && (
                        <p className="text-red-500 text-12 px-2 pt-1">
                          {errors.user_doc.message as string}
                        </p>
                      )} */}
                    </>
                  )}
                />
              </fieldset>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="border border-gray-300 rounded">
                  <div className="bg-gray-300 flex items-center justify-between p-2">
                    <h3 className="text-primary font-semibold">Modules File</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setModulesItem([...modulesItem, ""]);
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
                  {modulesItem?.map((item, index) => (
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
                                      type="file"
                                      className="w-full "
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* <input
                                type="file"
                                id={`module${index}`}
                                {...register(`module.${index}`)}
                                placeholder="Enter Url Key"
                                className="outline-none p-2 "
                              /> */}
                            </fieldset>
                          </div>
                          <div className="mt-3">
                            <button
                              type="button"
                              onClick={() => {
                                if (modulesItem.length !== 1) {
                                  setModulesItem(() => {
                                    return modulesItem.filter(
                                      (item, index2) => index !== index2
                                    );
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
                </div>
                <div className="border border-gray-300 rounded">
                  <div className="bg-gray-300 flex items-center justify-between p-2">
                    <h3 className="text-primary font-semibold">
                      External Links
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setExternalLinks([...externalLinks, ""]);
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
                  {externalLinks?.map((item, index) => (
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
                                  Link - {index + 1}
                                </label>
                              </legend>

                              <div className="flex flex-col gap-2">
                                <div className="grid grid-cols-4">
                                  <p>Label:</p>
                                  <div className="col-span-3">
                                    <input
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
                                if (externalLinks?.length != 1) {
                                  setExternalLinks(() => {
                                    return externalLinks.filter(
                                      (item, index2) => index !== index2
                                    );
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
                </div>
              </div>


            </div>
          </div>
        </div>


        <div className="flex justify-between pt-5">
          <p className="text-14">
            <span className="text-red-500">*</span> Required
          </p>
          <button
              type="submit"
              className="px-4 py-2 bg-violet-700 text-white active:scale-90 transition-all duration-400 rounded-md"
            >
              Create
            </button>
        </div>
      </form>
    </>
  );
};

export default ServiceDetailsResource;
