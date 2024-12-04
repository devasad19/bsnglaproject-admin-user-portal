"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateUserTypePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
    control,
  } = useForm();
  return (
    <div className="relative px-32">
      <h1 className="text-26 font-semibold py-4">Create User Type</h1>
      <form className="flex flex-col gap-3 mt-3 ">
        <div className="flex items-center justify-between gap-8">
          <div className="w-1/2">
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Name (Bangle)
                </label>
              </legend>
              <input
                {...register("name", {
                  required: "Name is required",
                  validate: {
                    wordCount: (value) => {
                      const wordCount = value.trim().split(/\s+/).length;
                      if (wordCount < 1) {
                        return "Description must have at least 1 words";
                      } else if (wordCount > 3) {
                        return "Description cannot exceed 3 words";
                      }
                      return true;
                    },
                  },
                })}
                type="text"
                placeholder="Name (Bangle)"
                className="outline-none p-1 mb-2"
                required
              />
            </fieldset>
            {errors.name && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.name.message as string}
              </p>
            )}
          </div>

          <div className="w-1/2">
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="ServiceName"
                  className="after:content-['_*'] after:text-red-500"
                >
                  Name (English)
                </label>
              </legend>
              <input
                {...register("description_title", {
                  required: "Description Title is required",
                  validate: {
                    maxWords: (value) => {
                      const wordCount = value.trim().split(/\s+/).length;
                      return (
                        wordCount <= 1 || "Description cannot exceed 1 words"
                      );
                    },
                  },
                })}
                id="description_title"
                type="text"
                placeholder="Name (English)"
                className="outline-none p-1 mb-2"
                required
              />
            </fieldset>
            {errors.description_title && (
              <p className="text-red-500 text-12 px-2 pt-1">
                {errors.description_title.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="border rounded-md px-2">
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
  );
};

export default CreateUserTypePage;
