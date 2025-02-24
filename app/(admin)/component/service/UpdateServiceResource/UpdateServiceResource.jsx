"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import CustomEditor from "@/app/_components/CustomEditor/CustomEditor";
import { FaCheckCircle } from "react-icons/fa";
import { CountWords, replaceSpaces, replaceUnderscore } from "@/helper";
import {
  getSingleServiceResourceCodeApi,
  updateSingleServiceResourceCodeUpdate,
} from "@/app/(admin)/_api/ServiceApi";

const UpdateServiceResource = ({ id }) => {
  const router = useRouter();
  const [serviceResource, setServiceResource] = useState(null);
  const [paidStatus, setPaidStatus] = useState();
  const [selectFeatureName, setSelectFeatureName] = useState([]);
  // const [status, setStatus] = useState("");
  const [serviceImg, setServiceImg] = useState(null);
  const [resourceFileImg, setResourceFileImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showItem, setShowItem] = useState("");
  const [type, setType] = useState([]);
  const [customError, setCustomError] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const allTypes = ["Software", "Publication", "Font", "Dataset", "AI Model"];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
    getValues,
    clearErrors,
    setError,
    watch,
  } = useForm();

  const onSubmitServiceResource = async (data) => {
    setIsLoading(true);
    let newType = [];
    type?.forEach((item) => {
      const newReplaceSpaces = replaceSpaces(item);
      newType.push(newReplaceSpaces);
    });
    // console.log({ newType });
    setCustomError(null);

    // if (type.length < 1) {
    //   setIsLoading(false);
    //   setCustomError("Please select at least one type");
    //   return;
    // }

    let dataJson = JSON.stringify(newType);
    // console.log(dataJson);

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
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      // formData.append("status", status);
      formData.append("component", component);
      formData.append("distribution", distribution);
      formData.append("logo", typeof logo[0] == "string" ? "" : logo[0] ?? "");
      formData.append("paid_status", JSON.stringify(paidStatus));
      formData.append("production_status", production_status);
      formData.append("release_date", release_date);
      formData.append("type", dataJson);
      formData.append("sub_title", sub_title);
      formData.append("visit_link", visit_link || "");
      formData.append("visit_type", visit_type);
      formData.append(
        "purchase_service_link",
        data.purchase_service_link || ""
      );
      if (resource_file) {
        formData.append(
          "resource_file",
          typeof resource_file == "string" ? "" : resource_file[0] ?? ""
        );
      }
      formData.append("description_title", description_title);

      const response = await updateSingleServiceResourceCodeUpdate(
        id,
        formData
      );
      // console.log("response", response);

      if (response?.status) {
        toast.success(response?.message);
        // router.push("/admin/services");
      } else {
        // console.log("Response did not indicate success:", response);
        toast.error(response?.message);
      }
    } catch (error) {
      // console.log("Error during service update:", error);
      // toast.error("Service Update Failed");
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSingleServiceResourceCodeApi(id)
      .then((res) => {
        console.log(res?.data);
        setShowItem(res?.data?.visit_type);
        setServiceResource(res?.data);
        setValue("name", res?.data?.name || "");
        setValue("sub_title", res?.data?.sub_title || "");
        setValue("description", res?.data?.description || "");
        // setValue("type", JSON.parse(res?.data?.type));
        setValue("production_status", res?.data?.production_status || "");
        setValue("component", res?.data?.component || "");
        // setValue("distribution", res?.data?.distribution);
        setValue("logo", res?.data?.logo || "");
        setValue("release_date", res?.data?.release_date || "");
        setValue("paid_status", JSON.parse(res?.data?.paid_status) || []);
        setValue("visit_link", res?.data?.visit_link || "");
        setValue("visit_type", res?.data?.visit_type || "");
        setValue("resource_file", res?.data?.resource_file || "");
        setValue("free", JSON.parse(res?.data?.paid_status)?.free);
        setValue("pro", JSON.parse(res?.data?.paid_status)?.pro);
        setValue("status", res?.data?.status || "");
        setValue("description_title", res?.data?.description_title || "");
        const types = JSON.parse(res?.data?.type) || [];
        let newType = [];
        types?.forEach((item) => {
          const newReplaceUnderscore = replaceUnderscore(item);
          newType.push(newReplaceUnderscore);
        });
        setType(newType);

        // setType(JSON.parse(res?.data?.type));

        setPaidStatus(JSON.parse(res?.data?.paid_status));
        setValue(
          "purchase_service_link",
          res?.data?.purchase_service_link || ""
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, setValue]);

  const handleToggleType = (value) => {
    if (type.includes(value)) {
      setType((prev) => prev.filter((item) => item !== value));
    } else {
      if (type.length < 3) {
        setType((prev) => [...prev, value]);
      } else {
        toast.warning("You can select only 3 types");
      }
    }
  };

  const description = watch("description");
  const MAX_CHARACTERS = 200;
  
  useEffect(() => {
    if (description) {
      // Decode HTML entities and remove all HTML tags
      const decodedDescription = new DOMParser()
        .parseFromString(description, "text/html")
        .body.textContent || ""; // Extract only the plain text, ignoring HTML tags
  
      // Count characters
      const characters = decodedDescription.length;
      setCharCount(characters);
  
      if (characters > MAX_CHARACTERS) {
        setError("description", {
          type: "manual",
          message: "Description cannot exceed 200 characters",
        });
      } else {
        clearErrors("description");
      }
    } else {
      setCharCount(0);
      clearErrors("description");
    }
  }, [description, setError, clearErrors]);

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
                  // className="after:content-['_*'] after:text-red-500"
                >
                  Description Title
                </label>
              </legend>
              <input
                {...register(
                  "description_title"
                  //    {
                  //   required: "Description Title is required",
                  //   validate: {
                  //     maxWords: (value) => {
                  //       const wordCount = value.trim().split(/\s+/).length;
                  //       if (wordCount > 8) {
                  //         return "Description Title cannot exceed 8 words";
                  //       }
                  //     },
                  //   },
                  // }
                )}
                id="description_title"
                type="text"
                placeholder="Description Title"
                className="outline-none p-2"
              />
            </fieldset>
            {/* {errors.description_title && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.description_title.message}
              </p>
            )} */}
          </div>

          <div>
                     <fieldset className="flex flex-col border rounded-md px-2">
                       <legend>
                         <label
                           htmlFor="description"
                           className="after:content-['_*'] after:text-red-500"
                         >
                           Description
                         </label>
                       </legend>
         
                       <Controller
                         name="description"
                         control={control}
                         defaultValue=""
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
                             <div className="flex justify-between px-2 pt-1 text-sm">
                               <p
                                 className={`text-${
                                   charCount > MAX_CHARACTERS ? "red-500" : "gray-500"
                                 }`}
                               >
                                 Characters: {charCount}/{MAX_CHARACTERS}
                               </p>
                             </div>
                             {error && (
                               <p className="text-red-500 text-xs px-2 pt-1">
                                 {error.message}
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
                <label
                //  className="after:content-['_*'] after:text-red-500"
                >
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
                    {type?.includes(item) && <FaCheckCircle />}
                  </button>
                ))}
              </div>
            </fieldset>
            {/* {customError && (
              <p className="text-red-500 text-12 px-2 pt-1">{customError}</p>
            )} */}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  // className="after:content-['_*'] after:text-red-500"
                >
                  Production Status
                </label>
              </legend>

              <select
                {...register(
                  "production_status"
                  //   {
                  //   required: "Production Status is required",
                  // }
                )}
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
            {/* {errors.production_status && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.production_status.message}
              </p>
            )} */}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  // className="after:content-['_*'] after:text-red-500"
                >
                  Release Date
                </label>
              </legend>

              <input
                type="date"
                {...register(
                  "release_date"
                  //   {
                  //   required: "Release Date is required",
                  // }
                )}
                className="outline-none p-2 bg-white"
              />
            </fieldset>
            {/* {errors.release_date && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.release_date.message}
              </p>
            )} */}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  // className="after:content-['_*'] after:text-red-500"
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
            {/* {errors.logo && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.logo.message}
              </p>
            )} */}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  // className="after:content-['_*'] after:text-red-500"
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
                      if (paidStatus?.free == 1) {
                        setPaidStatus({
                          ...paidStatus,
                          free: 0,
                        });
                      } else {
                        setPaidStatus({
                          ...paidStatus,
                          free: 1,
                        });
                      }
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
                      if (paidStatus?.pro == 1) {
                        setPaidStatus({
                          ...paidStatus,
                          pro: 0,
                        });
                        return;
                      } else {
                        setPaidStatus({
                          ...paidStatus,
                          pro: 1,
                        });
                      }
                    }}
                  />
                  <label htmlFor="pro">Pro</label>
                </div>
              </div>
            </fieldset>
            {/* {errors.paid_status && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.paid_status.message}
              </p>
            )} */}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  // className="after:content-['_*'] after:text-red-500"
                >
                  Components
                </label>
              </legend>

              <input
                type="text"
                {...register(
                  "component"
                  //   {
                  //   required: "Components is required",
                  // }
                )}
                className="outline-none p-2 bg-white"
                placeholder="Enter Components"
              />
            </fieldset>
            {/* {errors.component && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.component.message}
              </p>
            )} */}
          </div>
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  // className="after:content-['_*'] after:text-red-500"
                >
                  Purchase Service Link
                </label>
              </legend>

              <input
                type="text"
                {...register(
                  "purchase_service_link"
                  //   {
                  //   required: "Components is required",
                  // }
                )}
                className="outline-none p-2 bg-white"
                placeholder="Enter Components"
              />
            </fieldset>
            {/* {errors.component && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.component.message}
              </p>
            )} */}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  // className="after:content-['_*'] after:text-red-500"
                >
                  User Access
                </label>
              </legend>

              <select
                {...register(
                  "visit_type"
                  //   {
                  //   required: "Button is required",
                  // }
                )}
                onChange={(e) => setShowItem(e.target.value)}
                className="outline-none p-2 bg-white"
              >
                <option value=""> -- Select --</option>
                <option value="Download">Download</option>
                <option value="Visit">Visit</option>
                <option value="Subscribe">Subscribe</option>
              </select>
            </fieldset>
            {/* {errors.visit_type && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.visit_type.message}
              </p>
            )} */}
          </div>
          {showItem == "Visit" || showItem == "Subscribe" ? (
            <div>
              <fieldset className="flex flex-col border rounded-md px-2">
                <legend>
                  <label
                    htmlFor="ServiceName"
                    // className="after:content-['_*'] after:text-red-500"
                  >
                    {showItem} Link
                  </label>
                </legend>

                <input
                  type="text"
                  {...register(
                    "visit_link"
                    //   {
                    //   required: "Visit Link is required",
                    // }
                  )}
                  className="w-full outline-none p-2"
                  placeholder="Enter Link"
                />
              </fieldset>
              {/* {errors.visit_link && (
                <p className="text-red-500 text-12 px-2 pt-1">
                  {errors.visit_link.message}
                </p>
              )} */}
            </div>
          ) : (
            <>
              <div>
                <fieldset className="flex flex-col border rounded-md px-2">
                  <legend>
                    <label
                      htmlFor="ServiceName"
                      // className="after:content-['_*'] after:text-red-500"
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
                {/* {errors.resource_file && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {errors.resource_file.message}
                  </p>
                )} */}
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
          <div className="flex justify-end pt-5">
            {/* <p className="text-14">
              <span className="text-red-500">*</span> Required
            </p> */}
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

export default React.memo(UpdateServiceResource);


// const MAX_WORDS = 30;
//   useEffect(() => {
//     const words = description ? description.trim().split(/\s+/).length : 0;
//     setWordCount(words);

//     if (words > MAX_WORDS) {
//       setError("description", {
//         type: "manual",
//         message: "Description cannot exceed 30 words",
//       });
//     } else {
//       clearErrors("description");
//     }
//   }, [description, setError, clearErrors]);



{/* <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="description"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Description
                </label>
              </legend>

              <Controller
                name="description"
                control={control}
                defaultValue=""
                // rules={{
                //   required: "Description is required",
                //   validate: {
                //     maxWords: (value) => {
                //       const wordCount = value.trim().split(/\s+/).length;
                //       if (wordCount > 30) {
                //         return "Description cannot exceed 30 words";
                //       }
                //       return true;
                //     },
                //   },
                // }}
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
                    <div className="flex justify-between px-2 pt-1 text-sm">
                      <p
                        className={`text-${
                          wordCount > MAX_WORDS ? "red-500" : "gray-500"
                        }`}
                      >
                        Words: {wordCount}/{MAX_WORDS}
                      </p>
                    </div>
                    {error && (
                      <p className="text-red-500 text-xs px-2 pt-1">
                        {error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </fieldset>
          </div> */}