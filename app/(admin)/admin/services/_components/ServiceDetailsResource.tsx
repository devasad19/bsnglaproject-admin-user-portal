"use client";
import { serviceDetailsResourceApi } from "@/app/(portal)/_api/ServiceApi/ServiceApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomEditor from "@/app/_components/CustomEditor/CustomEditor";

const ServiceDetailsResource = () => {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [serviceImg, setServiceImg] = useState<File | null>(null);
  const [tutorialVideo, setTutorialVideo] = useState(null);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showItem, setShowItem] = useState([]);
  const [modulesItem, setModulesItem] = useState<string[]>([]);
  const [externalLinks, setExternalLinks] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const onSubmitServiceDetailsResource = async (data: any) => {
    console.log(data);
    // service_id,broad_description,modules,media_images,support_address,api_docs,user_docs
    const {
      description,
      module,
      media_image,
      support_address,
      api_doc,
      user_doc,
    } = data;
    console.log(media_image);
    console.log(module);
    const formData = new FormData();
    formData.append("service_id", "1");
    formData.append("broad_description", description);
    console.log("media_image1", media_image);
    // console.log("media_image2", mediaImages);
    console.log("module :", module[0] || "");
    
    
    

    // if (mediaImages) {
    //   Array.from(mediaImages).forEach((file) => {
    //     formData.append("media_images[]", file);
    //   });
    // } else {
    //   formData.append("media_images[]", "");
    // }
    formData.append("support_address", support_address);
    formData.append("api_docs", api_doc);
    formData.append("user_docs", user_doc);
    // formData.append("modules[]", module[0] || "");

    const res = await serviceDetailsResourceApi(formData);
    console.log({ res });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitServiceDetailsResource)}
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
                    onChange={(event: any, editor: any) => {
                      const data = editor.getData();
                      onChange(data);
                    }}
                    data={value}
                  />
                  {error && <p>{error.message}</p>}
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

        {/* <div className="my-3">
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
                        <input
                          type="file"
                          id={`module${index}`}
                          {...register(`module.${index}`)}
                          placeholder="Enter Url Key"
                          className="outline-none p-2 "
                          // onChange={(e) => setLink(e.target.value)}
                        />
                      </fieldset>
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setModulesItem(() => {
                            return modulesItem.filter(
                              (item, index2) => index !== index2
                            );
                          });
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
        </div> */}

        {/* <div>
          <fieldset className="flex flex-col border rounded-md px-2">
            <legend>
              <label
                htmlFor="modules"
                className="after:content-['_*'] after:text-red-500"
              >
                Modules (file)
              </label>
            </legend>

            <input
              {...register("logo", {
                required: "Logo is required",
              })}
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
              {errors.logo.message as string}
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
                Media Images
              </label>
            </legend>

            <input
              {...register("media_image", {
                required: "Logo is required",
              })}
              id="file"
              type="file"
              // onChange={(e) => {
              //   if (e.target.files && e.target.files[0]) {
              //     setMediaImages(e.target.files);
              //   }
              // }}
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

        <div>
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
              {errors.support_address.message as string}
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
                API Documentation
              </label>
            </legend>

            <Controller
              name="api_doc"
              control={control}
              defaultValue=""
              rules={{
                required: "Api Document is required",
                validate: {
                  maxWords: (value) => {
                    const wordCount = value.trim().split(/\s+/).length;
                    return (
                      wordCount <= 80 || "Api Documents cannot exceed 80 words"
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
                  {error && <p>{error.message}</p>}
                </>
              )}
            />

            {/* <textarea
              {...register("api_doc", {
                required: "Api Document is required",
                validate: {
                  maxWords: (value) => {
                    const wordCount = value.trim().split(/\s+/).length;
                    return (
                      wordCount <= 80 || "Api Documents cannot exceed 80 words"
                    );
                  },
                },
              })}
              id=""
              className="outline-none p-2"
              placeholder="API documentation"
            ></textarea> */}
          </fieldset>
          {/* {errors.api_doc && (
            <p className="text-red-500 text-12 px-2 pt-1">
              {errors.api_doc.message as string}
            </p>
          )} */}
        </div>
        <div>
          <div className="border border-black">
            <h3 className="border-b border-black py-3 pl-3 bg-gray-300 text-primary font-bold">
              User Documentation
            </h3>
            <div className="p-3 space-y-4">
              <fieldset className="flex flex-col border rounded-md px-2">
                <legend>
                  <label
                    htmlFor="ServiceName"
                    className="after:content-['_*'] after:text-red-500"
                  >
                    API Guideline(full description)
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
                      {error && <p>{error.message}</p>}
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
                                  <input
                                    type="text"
                                    placeholder="Enter Label"
                                    className="col-span-3 border border-black w-full px-2"
                                  />
                                </div>
                                <div className="grid grid-cols-4">
                                  <p>Module:</p>
                                  <input type="file" />
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
                                setModulesItem(() => {
                                  return modulesItem.filter(
                                    (item, index2) => index !== index2
                                  );
                                });
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
                                  <input
                                    type="text"
                                    placeholder="Enter Label"
                                    className="col-span-3 border border-black w-full px-2"
                                  />
                                </div>
                                <div className="grid grid-cols-4">
                                  <p>link:</p>
                                  <input
                                    type="text"
                                    placeholder="Enter Link"
                                    className="col-span-3 border border-black w-full px-2"
                                  />
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
                                setExternalLinks(() => {
                                  return externalLinks.filter(
                                    (item, index2) => index !== index2
                                  );
                                });
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
                      required: "Support Address is required",
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
            </div>
          </div>
          {/* <fieldset className="flex flex-col border rounded-md px-2">
            <legend>
              <label
                htmlFor="ServiceName"
                className="after:content-['_*'] after:text-red-500"
              >
                User Documentation
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
                      wordCount <= 80 || "User Documents cannot exceed 80 words"
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
                  {error && <p>{error.message}</p>}
                </>
              )}
            />
          </fieldset> */}
        </div>

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
    </>
  );
};

export default ServiceDetailsResource;
