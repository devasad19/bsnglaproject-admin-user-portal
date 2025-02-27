"use client";
import dynamic from "next/dynamic";
import { uploadServiceData } from "@/app/(portal)/_api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
const CustomEditor = dynamic(
  () => import("@/app/_components/CustomEditor/CustomEditor"),
  {
    ssr: false,
  }
);
import { FaCheckCircle } from "react-icons/fa";
import { replaceSpaces } from "@/helper";
import { createService } from "@/app/(admin)/_api/ServiceApi";
import { openFileManager } from "@/utilis/FileManagerFun";

const ServiceResourceNew = () => {
  const router = useRouter();
  const [serviceImg, setServiceImg] = useState<File | null>(null);
  const [resourceFileImg, setResourceFileImg] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showItem, setShowItem] = useState("");
  const [type, setType] = useState<string[]>([]);
  const [customError, setCustomError] = useState<any>(null);
  const [wordCount, setWordCount] = useState(0);

  const allTypes = ["Software", "Publication", "Font", "Dataset", "AI Model"];

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
    control,
    watch,
    clearErrors,
  } = useForm();

  // const description = watch("description");
  const [charCount, setCharCount] = useState(0); // Track character count
  const description = watch("description");
  const MAX_CHARACTERS = 200;

  useEffect(() => {
    // Decode HTML entities and count characters
    const decodedDescription = description
      ? new DOMParser().parseFromString(description, "text/html").body
          .textContent
      : "";
    const characters = decodedDescription ? decodedDescription.length : 0;

    console.log({ characters });

    setCharCount(characters);

    if (characters > MAX_CHARACTERS) {
      setError("description", {
        type: "manual",
        message: "Description cannot exceed 200 characters",
      });
    } else {
      clearErrors("description");
    }
  }, [description, setError, clearErrors]);

  const onSubmitServiceResource = async (data: any) => {
    setIsLoading(true);
    let newType: any = [];
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
      description_title,
      purchase_service_link,
    } = data;

    // console.log({visit_link});
    // return;

    let paid_status = {
      free: data.free ? 1 : 0,
      pro: data.pro ? 1 : 0,
    };

    // console.log('resource file img:', resourceFileImg.size);
    // console.log({ data });
    // return;

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("component", component);
      formData.append("logo", logo[0] || "");
      formData.append("paid_status", JSON.stringify(paid_status));
      formData.append("production_status", production_status);
      formData.append("release_date", release_date);
      formData.append("visit_link", visit_link || "");
      formData.append("visit_type", visit_type);
      formData.append("completion_status", "1");
      formData.append("resource_file", resource_file[0] || "");
      formData.append("description_title", description_title);
      formData.append("status", "1");
      formData.append("purchase_service_link", purchase_service_link || "");
      formData.append("type", JSON.stringify(newType));

      const response: any = await createService(formData);
      console.log(response);
      if (response.status) {
        setIsLoading(false);
        reset();
        toast.success("Service Created Successfully");
        router.push("/admin/services");
      } else {
        setIsLoading(false);
        toast.error(response.message);
      }
      // setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleType = (value: string) => {
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
        <form
          onSubmit={handleSubmit(onSubmitServiceResource)}
          className="flex flex-col gap-3"
        >
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
                  //className="after:content-['_*'] after:text-red-500"
                >
                  Description Title
                </label>
              </legend>
              <input
                {...register(
                  "description_title"
                  //   {
                  //   required: "Description Title is required",
                  //   validate: {
                  //     maxWords: (value) => {
                  //       const wordCount = value.trim().split(/\s+/).length;
                  //       if (wordCount > 8) {
                  //         return "Description cannot exceed 8 words";
                  //       }
                  //       return true;
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
                {errors.description_title.message as string}
              </p>
            )} */}
          </div>

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
                // className="after:content-['_*'] after:text-red-500"
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
                    {type.includes(item) && <FaCheckCircle />}
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
                  //className="after:content-['_*'] after:text-red-500"
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
                <option value="Live">Live</option>
                <option value="Beta">Beta</option>
                <option value="On Test">On Test</option>
              </select>
            </fieldset>
            {/* {errors.production_status && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.production_status.message as string}
              </p>
            )} */}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  //className="after:content-['_*'] after:text-red-500"
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
                {errors.release_date.message as string}
              </p>
            )} */}
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
            <fieldset className="flex flex-col border rounded-md px-2 py-1">
              <legend>
                <label
                  htmlFor="ServiceName"
                  //className="after:content-['_*'] after:text-red-500"
                >
                  Logo
                </label>
              </legend>
              <div
                onClick={() => {
                  openFileManager();
                }}
                className="w-1/3 h-8 bg-gray-100 border-dashed border-2 border-gray-300 flex items-center justify-center rounded-md cursor-pointer"
              >
                <span className="text-12 text-green-700">
                  png, jpg, jpeg, gif, bmp, tiff
                </span>
              </div>

              {/* <input
                {...register(
                  "logo"
                  //   {
                  //   required: "Logo is required",
                  // }
                )}
                id="file"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setServiceImg(e.target.files[0]);
                  }
                }}
                // accept="video/mp4, video/ogg, video/avi"
                accept="image/*"
              /> */}
            </fieldset>
            {/* {errors.logo && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.logo.message as string}
              </p>
            )} */}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  //className="after:content-['_*'] after:text-red-500"
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
            {/* {errors.paid_status && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.paid_status.message as string}
              </p>
            )} */}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  //className="after:content-['_*'] after:text-red-500"
                >
                  Components
                </label>
              </legend>

              <input
                type="text"
                {...register(
                  "component"
                  //    {
                  //   required: "Components is required",
                  // }
                )}
                className="outline-none p-2 bg-white"
                placeholder="Enter Components"
              />
            </fieldset>
            {/* {errors.component && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.component.message as string}
              </p>
            )} */}
          </div>
          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  //className="after:content-['_*'] after:text-red-500"
                >
                  Purchase Service Link
                </label>
              </legend>

              <input
                type="text"
                {...register(
                  "purchase_service_link"
                  //    {
                  //   required: "Purchase Service Link is required",
                  // }
                )}
                className="outline-none p-2 bg-white"
                placeholder="Enter Purchase Service Link"
              />
            </fieldset>
            {/* {errors.purchase_service_link && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.purchase_service_link.message as string}
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
                id=""
                className="outline-none p-2 bg-white"
              >
                <option value="">-- Select --</option>
                <option value="Download">Download</option>
                <option value="Visit">Visit</option>
                <option value="Subscribe">Subscribe</option>
              </select>
            </fieldset>
            {/* {errors.visit_type && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.visit_type.message as string}
              </p>
            )} */}
          </div>

          {showItem == "Visit" || showItem == "Subscribe" ? (
            <div>
              <fieldset className="flex flex-col border rounded-md px-2">
                <legend>
                  <label
                    htmlFor="ServiceName"
                    //className="after:content-['_*'] after:text-red-500"
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
                  {errors.visit_link.message as string}
                </p>
              )} */}
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
                      //className="after:content-['_*'] after:text-red-500"
                    >
                      Resource Download
                    </label>
                  </legend>

                  <input
                    {...register(
                      "resource_file"
                      //   {
                      //   required: "Resource File is required",
                      // }
                    )}
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
                {/* {errors.resource_file && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {errors.resource_file.message as string}
                  </p>
                )} */}
              </div>
            </>
          )}

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

export default ServiceResourceNew;

// const MAX_WORDS = 30;
// useEffect(() => {
//   const words = description ? description.trim().split(/\s+/).length : 0;
//   setWordCount(words);

//   if (words > MAX_WORDS) {
//     setError("description", {
//       type: "manual",
//       message: "Description cannot exceed 30 words",
//     });
//   } else {
//     clearErrors("description");
//   }
// }, [description, setError, clearErrors]);

{
  /* <div>
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
</div> */
}
