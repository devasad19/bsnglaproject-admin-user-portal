'use client';
import { uploadServiceData } from "@/app/(portal)/_api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import CustomEditor from "@/app/_components/CustomEditor/CustomEditor";

const ServiceResource = () => {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [serviceImg, setServiceImg] = useState<File | null>(null);
  const [resourceFileImg, setResourceFileImg] = useState<File | null>(null);
  const [tutorialVideo, setTutorialVideo] = useState(null);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showItem, setShowItem] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control
  } = useForm();

  const onSubmitServiceResource = async (data: any) => {

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
    formData.append("resource_file", resource_file[0] || "");

    const uploadRes = await uploadServiceData(formData);

    if (uploadRes.status === true) {
      setIsLoading(false);
      toast.success("Service Created Successfully");
      router.push("/admin/services");
      reset();
    } else {
      setIsLoading(false);
      toast.error("Service Creation Failed");
    }

    // console.log('formdata: ',formData);
    
  };
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
                type="text"
                placeholder="Resoource Name"
                className="outline-none p-2"
              />
            </fieldset>
            {errors.name && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.name.message as string}
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
                {errors.sub_title.message as string}
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
                      onChange={(event:any, editor:any) => {
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
                <option value="Application">Application</option>
                <option value="Plugin">Plugin</option>
                <option value="Mobile Apps">Mobile Apps</option>
                <option value="Datasets">Data Sets</option>
                <option value="Tools">Tools</option>
                <option value="Papers">Papers</option>
                <option value="Font">Font</option>
              </select>
            </fieldset>
            {errors.type && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.type.message as string}
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
                <option value="Live">Live</option>
                <option value="Beta">Beta</option>
                <option value="On Test">On Test</option>
              </select>
            </fieldset>
            {errors.production_status && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.production_status.message as string}
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
                  Distribution
                </label>
              </legend>

              <select
                {...register("distribution", {
                  required: "Distribution is required",
                })}
                className="outline-none p-2 bg-white"
              >
                <option value="web">Web</option>
                <option value="windows">Windows</option>
                <option value="linux">Linux</option>
                <option value="mac">Mac</option>
                <option value="ios">IOS</option>
                <option value="android">Android</option>
              </select>
            </fieldset>
            {errors.distribution && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.distribution.message as string}
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
                {errors.release_date.message as string}
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
                  />
                  <label htmlFor="pro">Pro</label>
                </div>
              </div>

              {/* <select
                    {...register('paid_status', { required: "Paid Status is required" })}
                    className="outline-none p-2 bg-white"
                  >
                    <option value="Free">Free</option>
                    <option value="Pro">Pro</option>
                  </select> */}
            </fieldset>
            {errors.paid_status && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.paid_status.message as string}
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
                {errors.component.message as string}
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
                {errors.visit_type.message as string}
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
                  {errors.visit_link.message as string}
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
                    {...register("resource_file", {
                      required: "resource_file is required",
                    })}
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
                    {errors.resource_file.message as string}
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
                <option value="1">Publish</option>
                <option value="0">UnPublish</option>
              </select>
            </fieldset>
            {errors.type && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.type.message as string}
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
  );
};

export default ServiceResource;
