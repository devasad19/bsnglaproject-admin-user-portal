"use client";
import { allFeaturesName } from "@/app/(portal)/_api";
import { manageUserTypeCreate } from "@/app/(admin)/_api/MangeUserTypeApi";
import FeaturesNameSkeleton from "@/app/_components/SekeletonALl/FeaturesNameSkeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface TFeatureName {
  id: number;
  name: string;
}
const CreateUserTypePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState("");
  const [selectFeatureName, setSelectFeatureName] = useState<number[]>([]);
  const [featureNames, setFeatureName] = useState<TFeatureName[]>([]);
  const router = useRouter();

  const fetchFeatureName = async () => {
    const featureNameData = await allFeaturesName();
    setFeatureName(featureNameData?.data);
  };

  useEffect(() => {
    fetchFeatureName();
  }, []);

  const handleCheckboxChange = (value: string) => {
    setSelected(selected === value ? "" : value);
  };

  const handleFeatureName = (id: number) => {
    if (selectFeatureName.includes(id)) {
      const index = selectFeatureName.indexOf(id);
      selectFeatureName.splice(index, 1);
      return setSelectFeatureName([...selectFeatureName]);
    } else {
      setSelectFeatureName([...selectFeatureName, id]);
    }
  };
  // console.log(selectFeatureName);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleMangeUser = async (data: any) => {
    setIsLoading(true);
    // console.log(data);

    try {
      const userType = {
        name_en: data.enName,
        name_bn: data.bnName,
        charge: selected,
        discount: data.discount,
        max_file_limit: data.maxFile,
        max_word_limit: data.maxWord,
        free_features: JSON.stringify(selectFeatureName),
        status: 1,
      };
      // console.log({userType});

      const response: any = await manageUserTypeCreate(userType);
      console.log(response);
      if (response.status) {
        reset();
        setSelected("");
        setSelectFeatureName([]);
        router.push("/admin/manage-user-type");
        toast.success("User Type Created Successfully");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("User Type Created Failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <h1 className="text-26 font-semibold py-4">Create User Type</h1>
      <div className="flex justify-center w-full">
        <div className="bg-white p-4 w-full lg:w-[80%] overflow-hidden">
          <div className="flex flex-col gap-3">
            <form
              onSubmit={handleSubmit(handleMangeUser)}
              className="flex flex-col gap-3 mt-3 "
            >
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
                      {...register("bnName", {
                        required: "Bangla Name is required",
                        validate: {
                          wordCount: (value) => {
                            const wordCount = value.trim().split(/\s+/).length;
                            if (wordCount < 1) {
                              return "Bangla Name must have at least 1 words";
                            } else if (wordCount > 5) {
                              return "Bangla word cannot exceed 5 words";
                            }
                            return true;
                          },
                        },
                      })}
                      type="text"
                      placeholder="Name (Bangle)"
                      className="outline-none p-1 mb-2"
                    />
                  </fieldset>
                  {errors.bnName && (
                    <p className="text-red-500 text-12 px-2 pt-1">
                      {errors.bnName.message as string}
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
                      {...register("enName", {
                        required: "English Name is required",
                        validate: {
                          wordCount: (value) => {
                            const wordCount = value.trim().split(/\s+/).length;
                            if (wordCount < 1) {
                              return "English Name must have at least 1 words";
                            } else if (wordCount > 5) {
                              return "English word cannot exceed 5 words";
                            }
                            return true;
                          },
                        },
                      })}
                      id="enName"
                      type="text"
                      placeholder="Name (English)"
                      className="outline-none p-1 mb-2"
                    />
                  </fieldset>
                  {errors.enName && (
                    <p className="text-red-500 text-12 px-2 pt-1">
                      {errors.enName.message as string}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h1>Freatures List</h1>
                <table className="border w-full">
                  <tbody>
                    <tr className="bg-slate-300">
                      <td className="text-center py-3">Feature Name</td>
                      <td className="text-center py-3 border-l">
                        Configuration
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="text-center py-3">Charge</td>
                      <td className="text-center py-3 border-l">
                        <div className="flex items-center justify-center gap-6">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id="charge_apply"
                              className="w-4 h-4"
                              checked={selected == "1"}
                              onChange={() => handleCheckboxChange("1")}
                            />
                            <label htmlFor="charge"> Charge Apply</label>
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id="charge_no"
                              className="w-4 h-4"
                              checked={selected == "0"}
                              onChange={() => handleCheckboxChange("0")}
                            />
                            <label htmlFor="charge">No Charge</label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="text-center py-3">
                        Discount(in percentage)
                      </td>
                      <td className="text-center py-3 border-l">
                        <div className="flex items-end justify-center">
                          <div className="w-2/3">
                            <input
                              type="number"
                              {...register("discount", {
                                required: "Discount is required",
                                min: {
                                  value: 0,
                                  message: "Discount must be greater than 0",
                                },
                                max: {
                                  value: 100,
                                  message: "Discount must be less than 100",
                                },
                              })}
                              className="w-full border py-2 px-3 outline-none rounded"
                              placeholder="Enter percentage"
                            />
                            {errors.discount && (
                              <p className="text-red-500 text-12 px-2 pt-1 text-start">
                                {errors.discount.message as string}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="text-center py-3">Max File upload (MB)</td>
                      <td className="text-center py-3 border-l">
                        <div className="flex items-end justify-center">
                          <div className="w-2/3">
                            <input
                              type="number"
                              className="w-full border py-2 px-3 outline-none rounded"
                              {...register("maxFile", {
                                required: "Max File is required",
                                min: {
                                  value: 1,
                                  message: "Max File must be greater than 0",
                                },
                                max: {
                                  value: 256,
                                  message: "Max File must be less than 256",
                                },
                              })}
                              placeholder="Enter Max File"
                            />
                            {errors.maxFile && (
                              <p className="text-red-500 text-12 px-2 pt-1 text-start">
                                {errors.maxFile.message as string}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="text-center py-3">
                        Max word limit (count)
                      </td>
                      <td className="text-center py-3 border-l">
                        <div className="flex items-end justify-center">
                          <div className="w-2/3">
                            <input
                              type="number"
                              className="w-full border py-2 px-3 outline-none rounded"
                              {...register("maxWord", {
                                required: "Max word limit is required",
                                min: {
                                  value: 1,
                                  message:
                                    "Max word limit must be greater than 0",
                                },
                                max: {
                                  value: 1000,
                                  message:
                                    "Max word limit must be less than 1000",
                                },
                              })}
                              placeholder="Enter Max word limit"
                            />
                            {errors.maxWord && (
                              <p className="text-red-500 text-12 px-2 pt-1 text-start">
                                {errors.maxWord.message as string}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="text-center py-3">
                        <h1 className="text-16 leading-4">Features </h1>
                        <span className="text-15 leading-4">
                          (select to open/free features for this type)
                        </span>
                      </td>
                      <td className="flex items-center justify-center py-3 border-l">
                        <div>
                          {featureNames.length > 0 ? (
                            featureNames?.map(
                              (featureName: TFeatureName, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    id="charge"
                                    className="w-4 h-4"
                                    onChange={() => {
                                      handleFeatureName(featureName.id);
                                    }}
                                  />
                                  <label htmlFor="charge">
                                    {featureName.name}
                                  </label>
                                </div>
                              )
                            )
                          ) : (
                            <FeaturesNameSkeleton />
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
        </div>
      </div>
    </div>
  );
};

export default CreateUserTypePage;
