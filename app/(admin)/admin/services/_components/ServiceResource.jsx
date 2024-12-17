"use client";
import dynamic from "next/dynamic";
import { uploadServiceData } from "@/app/(portal)/_api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
const CustomEditor = dynamic(() => import("@/app/_components/CustomEditor/CustomEditor"), {
  ssr: false,
});
import { FaCheckCircle } from "react-icons/fa";

const ServiceResource = () => {
  const router = useRouter();
  const [serviceImg, setServiceImg] = useState(null);
  const [resourceFileImg, setResourceFileImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showItem, setShowItem] = useState("");
  const [type, setType] = useState([]);
  const [typeError, setTypeError] =useState({
    title:'',
    message:''
  })

  const allTypes = ['Software', 'Publication', 'Font', 'Dataset', 'AI Model'];

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
    control,
  } = useForm();

  const onSubmitServiceResource = async (data) => {
    // setIsLoading(true);
    const {
      component,
      description,
      logo,
      name,
      production_status,
      release_date,
      visit_link,
      visit_type,
      resource_file,
      description_title
    } = data;

    let paid_status = {
      free: data.free ? 1 : 0,
      pro: data.pro ? 1 : 0,
    };

    // console.log('resource file img:', resourceFileImg.size);
console.log(type?.length);

    if (name.length < 3) {
      setIsLoading(false);
      setError("name", { type: "manual", message: "Service name must be at least 3 characters long" });
      return;
    } else if (description.length < 3) {
      setIsLoading(false);
      setError("description", { type: "manual", message: "Service description must be at least 3 characters long" });
      return;
    } else if (type?.length < 1) {
      setIsLoading(false);
      setError("type", { type: "manual", message: "Please select at least one type" });
      return;
    } else if (production_status.length < 1) {
      setIsLoading(false);
      setError("production_status", { type: "manual", message: "Please select production status" });
      return;
    } else if (release_date.length < 1) {
      setIsLoading(false);
      setError("release_date", { type: "manual", message: "Please select release date" });
      return;
    } else if (logo.length < 1) {
      setIsLoading(false);
      setError("logo", { type: "manual", message: "Please upload a logo" });
      return;
    } else if (logo[0].size > 500000) { // 1MB
      setIsLoading(false);
      setError("logo", { type: "manual", message: "Logo size must be less than 500kb" });
      return;
    } else if (paid_status.free === 0 && paid_status.pro === 0) {
      setIsLoading(false);
      setError("paid_status", { type: "manual", message: "Please select at least one paid status" });
      return;
    } else if (component.length < 1) {
      setIsLoading(false);
      setError("component", { type: "manual", message: "Please select component" });
      return;
    } else if (visit_type.length < 1) {
      setIsLoading(false);
      setError("visit_type", { type: "manual", message: "Please select visit type" });
      return;
    } else if (visit_type == 'download' && resource_file.length < 1) {
      setIsLoading(false);
      setError("resource_file", { type: "manual", message: "Please upload a resource file" });
      return;
    } else if (visit_type == 'download' && resourceFileImg.size > 500000) {
      setIsLoading(false);
      setError("resource_file", { type: "manual", message: "Resource file size must be less than 500kb" });
      return;
    } else if (visit_type == 'link' && visit_link.length < 1) {
      setIsLoading(false);
      setError("visit_link", { type: "manual", message: "Please enter visit link" });
      return;
    } else if (visit_type == 'Subscribe' && visit_link.length < 1) {
      setIsLoading(false);
      setError("visit_link", { type: "manual", message: "Please enter visit link" });
      return;
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("component", component);
      formData.append("logo", logo[0]);
      formData.append("paid_status", JSON.stringify(paid_status));
      formData.append("production_status", production_status);
      formData.append("release_date", release_date);
      formData.append("visit_link", visit_link || "");
      formData.append("visit_type", visit_type);
      formData.append("completion_status", '1');
      formData.append("resource_file", resource_file[0] || "");
      formData.append("description_title", description_title);
      formData.append("status", 1);
      formData.append("type", JSON.stringify(type));
      const uploadRes = await uploadServiceData(formData);

      if (uploadRes.status === true) {
        setIsLoading(false);
        toast.success("Service Created Successfully");
        // router.push("/admin/services");
        window.location.href = "/admin/services";
        reset();
      } else {
        setIsLoading(false);
        toast.error("Service Creation Failed");
      }
    }
  };

  const handleToggleType = (value) => {

    if (type.includes(value)) {
      setType((prev) => prev?.filter((item) => item !== value));

    } else {
      if (type.length < 3) {
        setType((prev) => [...prev, value]);
      } else {
        toast.warning("You can select only 3 types");
      }

    }

  };

  
  

  return (
    <>
      <div className="relative">
        <form onSubmit={handleSubmit(onSubmitServiceResource)} className="flex flex-col gap-3">
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Service Name
                </label>
              </legend>
              <input
                {...register("name", {
                  required: "Name is required",
                  validate: {
                    wordCount: (value) => {
                      const wordCount = value.trim().split(/\s+/).length;
                      if (wordCount > 5) {
                        return "Description must have at least 5 words";
                      }
                      return true;
                    },
                  },
                })}
                type="text"
                placeholder="Service Name"
                className="outline-none p-2"
                required
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
                  Description Title
                </label>
              </legend>
              <input
                {...register("description_title", {
                  required: "Description Title is required",
                  validate: {
                    maxWords: (value) => {
                      const wordCount = value.trim().split(/\s+/).length;
                      if(wordCount > 8) {
                        return "Description cannot exceed 8 words";
                      }
                      return true;
                    },
                  },
                })}
                id="description_title"
                type="text"
                placeholder="Description Title"
                className="outline-none p-2"
                required
              />
            </fieldset>
            {errors.description_title && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.description_title.message}
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
                      if(wordCount > 30) {
                        return "Description cannot exceed 30 words";
                      }
                      return true;
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
            </fieldset>
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md p-2">
              <legend>
                <label className="after:content-['_*'] after:text-red-500">Type</label>
              </legend>

              <div className="flex flex-wrap gap-2">
                {allTypes.map((item, index) => (
                  <button
                    key={index}
                    className={`px-4 py-1 rounded cursor-pointer ${type.includes(item)
                      ? "bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleType(item);
                    }}
                  >
                    {item}
                    {
                      type.includes(item) && (
                        <FaCheckCircle />
                      )
                    }
                  </button>
                ))}
              </div>
            </fieldset>
            {
              errors.type && (
                <p className="text-red-500 text-12 px-2 pt-1">
                  {errors.type.message}
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
                {errors.production_status.message}
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
                  User Access
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
                    {...register("resource_file", {
                      required: "Resource File is required",
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
                    size={500000}
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

      </div>
    </>
  );
};

export default ServiceResource;
