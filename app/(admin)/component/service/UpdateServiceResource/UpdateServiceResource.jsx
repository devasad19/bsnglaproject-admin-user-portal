"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import CustomEditor from "@/app/_components/CustomEditor/CustomEditor";
import {
  getSingleServiceResource,
  updateServiceResource,
} from "@/app/(admin)/_api";
import { FaCheckCircle } from "react-icons/fa";
import { CountWords } from "@/helper";

const UpdateServiceResource = ({ id }) => {
  const router = useRouter();
  const [serviceResource, setServiceResource] = useState(null);
  const [paidStatus, setPaidStatus] = useState();
  // const [status, setStatus] = useState("");
  const [serviceImg, setServiceImg] = useState(null);
  const [resourceFileImg, setResourceFileImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showItem, setShowItem] = useState("");
  const [type, setType] = useState([]);
  const allTypes = [
    "Application",
    "Plugin",
    "Mobile Apps",
    "Tools",
    "Papers",
    "Font",
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
    getValues,
    setError,
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
      // type,
      visit_link,
      visit_type,
      resource_file,
      status,
      description_title,
    } = data;

    // console.log('description count: ',errors);

    /* if(CountWords(description) > 30) {
            setIsLoading(false);
            setError("description", { type: "manual", message: "Description cannot exceed 30 words" });
            return;
        }

        if(CountWords(name) > 3) {
            setIsLoading(false);
            setError("name", { type: "manual", message: "Name cannot exceed 3 words" });
            return;
        }


        if(CountWords(description_title) > 10){
            setIsLoading(false);
            setError("description_title", { type: "manual", message: "Description title cannot exceed 10 words" });
            return;
        }


        if(type.length > 3){
            setIsLoading(false);
            setError("type", { type: "manual", message: "You can select only 3 types" });
            return;
        }

        if(production_status.length < 1){
            setIsLoading(false);
            setError("production_status", { type: "manual", message: "Production status is required" });
            return;
        }

        if(release_date.length < 1){
            setIsLoading(false);
            setError("release_date", { type: "manual", message: "Release date is required" });
            return;
        }

        if(logo.length < 1 && !logo[0]){
            setIsLoading(false);
            setError("logo", { type: "manual", message: "Logo is required" });
            return;
        }

        if(paidStatus?.free == 0 && paidStatus?.pro == 0){
            setIsLoading(false);
            setError("paid_status", { type: "manual", message: "Paid status is required" });
            return;
        }

        if(component.length < 1){
            setIsLoading(false);
            setError("component", { type: "manual", message: "Component is required" });
            return;
        }

        if(visit_type.length < 1){
            setIsLoading(false);
            setError("visit_type", { type: "manual", message: "Visit type is required" });
            return;
        }

        if(visit_type == 'download' && resource_file.length < 1){
            setIsLoading(false);
            setError("resource_file", { type: "manual", message: "Resource file is required" });
            return;
        } */

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    // formData.append("status", status);
    formData.append("component", component);
    formData.append("distribution", distribution);
    formData.append("logo", typeof logo[0] == "string" ? "" : logo[0]);
    formData.append("paid_status", JSON.stringify(paidStatus));
    formData.append("production_status", production_status);
    formData.append("release_date", release_date);
    formData.append("type", type);
    formData.append("sub_title", sub_title);
    formData.append("visit_link", visit_link || "");
    formData.append("visit_type", visit_type);
    formData.append(
      "resource_file",
      typeof resource_file == "string" ? "" : resource_file[0]
    );
    formData.append("description_title", description_title);

    console.log("form data: ", formData);

    const response = await updateServiceResource(formData, id)
      .then((res) => {
        if (res?.status == true) {
          toast.success("Service Updated Successfully");
          router.push("/admin/services");
        } else {
          toast.error("Service Update Failed");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getSingleServiceResource(id)
      .then((res) => {
        setServiceResource(res?.data);
        setValue("name", res?.data?.name);
        setValue("sub_title", res?.data?.sub_title);
        setValue("description", res?.data?.description);
        // setValue("type", JSON.parse(res?.data?.type));
        setValue("production_status", res?.data?.production_status);
        setValue("component", res?.data?.component);
        // setValue("distribution", res?.data?.distribution);
        setValue("logo", res?.data?.logo);
        setValue("release_date", res?.data?.release_date);
        setValue("paid_status", JSON.parse(res?.data?.paid_status));
        setValue("visit_link", res?.data?.visit_link);
        setValue("visit_type", res?.data?.visit_type);
        setValue("resource_file", res?.data?.resource_file);
        setValue("free", JSON.parse(res?.data?.paid_status)?.free);
        setValue("pro", JSON.parse(res?.data?.paid_status)?.pro);
        setValue("status", res?.data?.status);
        setValue("description_title", res?.data?.description_title);

        setType(JSON.parse(res?.data?.type));

        setPaidStatus(JSON.parse(res?.data?.paid_status));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleToggleType = (value) => {
    if (type.includes(value)) {
      setType((prev) => prev.filter((item) => item !== value));
    } else {
      setType((prev) => [...prev, value]);
    }
  };

  // console.log('service status: ',type);

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
                        return "Description cannot exceed 5 words";
                      }
                      return true;
                    },
                  },
                })}
                type="text"
                placeholder="Service Name"
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
                  Description Title
                </label>
              </legend>
              <input
                {...register("description_title", {
                  required: "Description Title is required",
                  validate: {
                    maxWords: (value) => {
                      const wordCount = value.trim().split(/\s+/).length;
                      if (wordCount > 8) {
                        return "Description Title cannot exceed 8 words";
                      }
                    },
                  },
                })}
                id="description_title"
                type="text"
                placeholder="Description Title"
                className="outline-none p-2"
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
                      if (wordCount > 30) {
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
                <label className="after:content-['_*'] after:text-red-500">
                  Type
                </label>
              </legend>

              <div className="flex flex-wrap gap-2">
                {allTypes.map((item, index) => (
                  <button
                    key={index}
                    className={`px-4 py-1 rounded cursor-pointer ${
                      type.includes(item)
                        ? "bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleType(item);
                    }}
                  >
                    {item}
                    {type.includes(item) && <FaCheckCircle />}
                  </button>
                ))}
              </div>
            </fieldset>
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
                <option
                  selected={serviceResource?.production_status == "Live"}
                  value="Live"
                >
                  Live
                </option>
                <option
                  selected={serviceResource?.production_status == "Beta"}
                  value="Beta"
                >
                  Beta
                </option>
                <option
                  selected={serviceResource?.production_status == "On Test"}
                  value="On Test"
                >
                  On Test
                </option>
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

              {serviceImg && (
                <Image
                  src={URL.createObjectURL(serviceImg)}
                  width={320}
                  height={192}
                  className="w-[10em] h-[10em] rounded-md mt-3"
                  alt="Preview"
                />
              )}
              {!serviceImg && serviceResource?.logo && (
                <div className="pt-3">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_IMAGE_URL + serviceResource?.logo
                    }
                    className="w-[10em] h-[10em]"
                    width={1000}
                    height={1000}
                    alt="Bangla"
                  />
                </div>
              )}
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
                    checked={paidStatus?.free == 1}
                    onChange={() => {
                      setPaidStatus({
                        free: 1,
                        pro: 0,
                      });
                    }}
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
                    checked={paidStatus?.pro == 1}
                    onChange={() => {
                      setPaidStatus({
                        free: 0,
                        pro: 1,
                      });
                    }}
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

                  {resourceFileImg && (
                    <Image
                      src={URL.createObjectURL(resourceFileImg)}
                      width={320}
                      height={192}
                      className="w-[10em] h-[10em] rounded-md mt-3"
                      alt="Preview"
                    />
                  )}

                  {!resourceFileImg && serviceResource?.resource_file && (
                    <div className="pt-3">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_IMAGE_URL +
                          serviceResource?.resource_file
                        }
                        className="w-[10em] h-[10em]"
                        width={1000}
                        height={1000}
                        alt="Bangla"
                      />
                    </div>
                  )}
                </fieldset>
                {errors.resource_file && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {errors.resource_file.message}
                  </p>
                )}
              </div>
            </>
          )}
          {/* <div>
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
                                {...register("status")}
                                className="outline-none p-2 bg-white"
                            >
                                <option selected={getValues("status") == "1"} value="1">Publish</option>
                                <option selected={getValues("status") == "0"} value="0">UnPublish</option>
                            </select>
                        </fieldset>
                        {errors.status && (
                            <p className="text-red-500 text-12 px-2 pt-1">
                                {errors.status.message}
                            </p>
                        )}
                    </div> */}
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
                Update
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
              {/* Loading Text */}
              <p className="text-gray-700 font-medium">Loading...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateServiceResource;
