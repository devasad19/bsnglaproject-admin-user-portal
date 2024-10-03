"use client";
import { serviceDetailsResourceApi } from "@/app/(portal)/_api/ServiceApi/ServiceApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomEditor from "@/app/_components/CustomEditor/CustomEditor";

/* interface FormData {
  description: string;
  media_image: File;
  support_address: string;
  externalLinks: { label: string; link: string }[];
  api_doc: string;
  user_doc: string;
  module: { label: string; image: File }[];
  videolink: string;
} */



const ServiceDetailsResource = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    description: "",
    mediaImages: [],
    distribution: [
      {
        label: "",
        icon: "",
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
  // const [status, setStatus] = useState("");
  // const [serviceImg, setServiceImg] = useState<File | null>(null);
  // const [tutorialVideo, setTutorialVideo] = useState(null);
  // const [links, setLinks] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [showItem, setShowItem] = useState([]);
  /* const [modulesItem, setModulesItem] = useState<string[]>([""]);
  const [externalLinks, setExternalLinks] = useState<string[]>([""]);
  const [mediaImages, setMediaImages] = useState<FileList | null>(null);
  const [distribution, setDistribution] = useState<string[]>([""]); */

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


  const HandleFormSubmit = async (e: any) => {
    e.preventDefault();

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
    payload.append("api_modules", JSON.stringify(formData.api_doc.module_file));
    payload.append("api_external_links", JSON.stringify(formData.api_doc.external_links));
    payload.append("api_youtube_link", formData.api_doc.video_link);
    payload.append("user_doc_label", formData.user_doc.label);
    payload.append("user_doc_icon", formData.user_doc.icon);
    payload.append("user_desc", formData.user_doc.short_description);
    payload.append("user_modules", JSON.stringify(formData.user_doc.module_file));
    payload.append("user_external_links", JSON.stringify(formData.user_doc.external_links));
    payload.append("user_youtube_link", formData.user_doc.video_link);
    payload.append("distribution_items", JSON.stringify(formData.distribution));
    



    /* const data = {
      service_id: 1,
      broad_description: formData.description,
      api_doc_label: formData.api_doc.label,
      api_doc_icon: formData.api_doc.icon,
      api_desc: formData.api_doc.short_description,
      api_modules: null,
      api_external_links: null,
      api_youtube_link: formData.api_doc.video_link,
      user_doc_label: formData.user_doc.label,
      user_doc_icon: formData.user_doc.icon,
      user_desc: formData.user_doc.short_description,
      user_modules: null,
      user_external_links: null,
      user_youtube_link: formData.user_doc.video_link,
      media_images: formData.mediaImages,
      distribution_items: null
    }; */

    const res = await serviceDetailsResourceApi(payload).catch((err) => {
      console.log(err);
    });

    // console.log('submitted form data: ',data);
    console.log('response from service details api: ',res);
    
    
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

            <textarea onChange={(e) => setFormData({ ...formData, description: e.target.value })} name="description" placeholder="Enter Description"></textarea>

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
          {formData?.distribution?.map((item: any, index: any) => (
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
                                    (dist: any, i: any) =>
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
                                    (dist: any, i: any) =>
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
                        if(formData.distribution.length != 1){
                          setFormData({
                            ...formData,
                            distribution: formData.distribution.filter(
                              (dist: any, i: any) => i !== index
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

                <textarea onChange={(e) => setFormData({ ...formData, user_doc: { ...formData.user_doc, short_description: e.target.value } })} name="user_doc_description" className="w-full outline-none p-2" placeholder="Enter user doc short description"></textarea>

                {/* <Controller
                  name="user_doc"
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
                    </>
                  )}
                /> */}
              </fieldset>

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
                  {formData?.user_doc?.module_file?.map((item:any, index: any) => (
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
                                          module: e.target.value
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
                                      module_file: formData.user_doc.module_file.filter((_, i:any) => i !== index),
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
                  {formData?.user_doc?.external_links?.map((item, index: any) => (
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
                                      external_links: formData.user_doc.external_links.filter((_, i:any) => i !== index),
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

                <textarea name="api_doc_short_desc" onChange={(e) => setFormData({ ...formData, api_doc: { ...formData.api_doc, short_description: e.target.value } })} ></textarea>

                {/* <Controller
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
                    </>
                  )}
                /> */}
              </fieldset>

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
                  {formData?.api_doc?.module_file?.map((item:any, index: any) => (
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
                                          module: e.target.value
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
                                      module_file: formData.api_doc.module_file.filter((_, i:any) => i !== index),
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
                  {formData?.api_doc?.external_links?.map((item, index: any) => (
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
                                      external_links: formData.api_doc.external_links.filter((_, i:any) => i !== index),
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
