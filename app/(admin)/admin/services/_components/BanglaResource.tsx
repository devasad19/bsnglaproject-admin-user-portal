import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const BanglaResource = () => {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [serviceImg, setServiceImg] = useState<File | null>(null);
  const [tutorialVideo, setTutorialVideo] = useState(null);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showItem, setShowItem] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitBanglaResource = async (data:any) => {
    console.log(data);
  }
    


  return (
    <>
      <form onSubmit={handleSubmit(onSubmitBanglaResource)}>
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

            <textarea
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
            ></textarea>
          </fieldset>
          {errors.description && (
            <p className="text-red-500 text-12 px-2 pt-1">
              {errors.description.message as string}
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
                Description For Details Page
              </label>
            </legend>

            <textarea
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
            ></textarea>
          </fieldset>
          {errors.description && (
            <p className="text-red-500 text-12 px-2 pt-1">
              {errors.description.message as string}
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
              /* {...register("name", {
                                required: "Name is required",
                                validate: {
                                  wordCount: (value) => {
                                    const wordCount = value
                                      .trim()
                                      .split(/\s+/).length;
                                    if (wordCount < 3) {
                                      return "Description must have at least 3 words";
                                    } else if (wordCount > 8) {
                                      return "Description cannot exceed 8 words";
                                    }
                                    return true;
                                  },
                                },
                              })} */
              type="text"
              placeholder="Support Address"
              className="outline-none p-2"
            />
          </fieldset>
          {errors.name && (
            <p className="text-red-500 text-12 px-2 pt-1">
              {errors.name.message as string}
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

export default BanglaResource;
