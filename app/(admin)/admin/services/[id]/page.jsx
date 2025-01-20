"use client";

import { useState, useEffect, useRef } from "react";
import { modelClose, modelOpen } from "@/helper";
import Image from "next/image";
import {
  getFeaturesByServiceId,
  getSingleService,
  uploadFeatureData,
  deleteFeature,
  updateFeatureDataById,
} from "@/app/(portal)/_api";
import Modal from "@/app/_components/Modal/Modal";

import Skeleton from "react-loading-skeleton";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { da } from "@faker-js/faker";

const Home = ({ params }) => {
  const [service, setService] = useState([]);

  const [features, setFeatures] = useState([]);
  const [serviceStatus, setServiceStatus] = useState(0);
  const [updateFeaturePlan, setUpdateFeaturePlan] = useState([]);
  const featureModal = useRef(null); //featureModal ref
  const featureForm = useRef(null); //featureForm ref
  const [isLoading, setIsLoading] = useState(false);
  const [featureUpdateItem, setFeatureUpdateItem] = useState({});
  const featureUpdateForm = useRef(null); //featureUpdaForm ref
  const featureUpdateModal = useRef(null); // featureUpdateModal ref
  const [featurePlan, setFeaturePlan] = useState([]);
  const [refesh, setRefesh] = useState(false); // refesh state
  const [isUpdate, setIsUpdate] = useState(false); // update feature state
  const [formData, setFormData] = useState({
    feature_name: "",
    plan: "",
    is_public: false,
    service_id: "",
    limits: [""],
    validities: [""],
    days: ["365"],
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "feature_name":
        if (!value.trim()) error = "Feature Name is required";
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log({ name, value, type, checked });

    let newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    // Validate the field
    const fieldError = validateField(name, newValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    const featureByService = async () => {
      const data = await getFeaturesByServiceId(params?.id);
      return data;
    };
    getSingleService(params.id)
      .then((data) => (setIsLoading(false), setService(data)))
      .catch((err) => console.log(err));
    featureByService().then(
      (data) => (setIsLoading(false), setFeatures(data?.data))
    );
    setIsLoading(false);
  }, [params?.id, refesh]);

  useEffect(() => {
    if (featureUpdateItem?.plans?.length > 0) {
      const featurePlans = JSON.parse(featureUpdateItem?.plans);
      setUpdateFeaturePlan(featurePlans);
    }
  }, [isUpdate, featureUpdateItem?.plans]);

  const handleCreateFeature = () => {
    modelOpen(featureModal);
  };

  const handleCreateFeatureSubmit = async (e) => {
    e.preventDefault();

    let f_name = e.target.feature_name.value;
    let f_type = e.target.plan.value;
    let f_value = e.target.is_public.checked;
    let service_id = e.target.service_id.value;

    // Get the array values for limit and validaty

    if (!f_name) {
      setErrors({
        feature_name: "Feature Name is required !",
      });
      return;
    }

    let limits = Array.from(
      e.target.querySelectorAll('input[name="limit[]"]')
    ).map((input) => input.value);
    let validities = Array.from(
      e.target.querySelectorAll('input[name="validaty[]"]')
    ).map((input) => input.value);

    // let days = Array.from(
    //   e.target.querySelectorAll('input[name="days[]"]')
    // ).map((input) => input.value);

    // const validationErrors = {};
    // Object.keys(formData).forEach((key) => {
    //   const error = validateField(key, formData[key]);
    //   if (error) validationErrors[key] = error;
    // });

    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   toast.error("Please fix the errors in the form");
    //   return;
    // }

    // Combine the limits and validities into an array of objects
    let plans = limits.map((limit, index) => {
      return {
        limit: limit,
        validaty: validities[index],
      };
    });
    try {
      let uploadData = {
        service_id,
        name: f_name,
        unit: f_type,
        is_public: f_value ? 1 : 0,
        plans: plans,
        status: 1,
      };
      // console.log({uploadData});
      // return;
  
      const featureData = await uploadFeatureData(uploadData);
      if (featureData) {
        setRefesh(!refesh);
        toast.success(featureData?.message);
        setFeaturePlan([]);
        setFormData({
          feature_name: "",
          plan: "",
          is_public: false,
          service_id: "",
          limits: [""],
          validities: [""],
        }); // Clear the form data
        modelClose(featureModal, featureForm);
      } else {
        toast.error(featureData?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleDeleteFeature = async (feature) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const featureDeleteData = deleteFeature(feature?.id);
        if (featureDeleteData) {
          setFeatures(features.filter((f) => f.id !== feature.id));
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleUpdateFeature = async (e) => {
    e.preventDefault();
    let f_name = e.target.feature_name.value;
    let f_type = e.target.plan.value;
    let f_value = e.target.is_public.checked;
    let service_id = e.target.service_id.value;

    // Get the array values for limit and validaty
    let limits = Array.from(
      e.target.querySelectorAll('input[name^="limit-"]')
    ).map((input) => input.value);
    let validities = Array.from(
      e.target.querySelectorAll('input[name^="validaty-"]')
    ).map((input) => input.value);
    // let days = Array.from(
    //   e.target.querySelectorAll('input[name^="expire_days-"]')
    // ).map((input) => input.value);

    // Combine the limits and validities into an array of objects
    let plans = limits.map((limit, index) => {
      return {
        limit: limit,
        validaty: validities[index],
        // expire_days: days[index],
      };
    });

    // Prepare data to be sent
    let uploadData = {
      service_id,
      name: f_name,
      unit: f_type,
      is_public: f_value ? 1 : 0,
      plans: plans,
      status: "imagedata",
    };
    // console.log({uploadData});
    // return;

    const featureUpdateData = await updateFeatureDataById(
      featureUpdateItem?.id,
      uploadData
    );

    if (featureUpdateData?.status === true) {
      setRefesh(!refesh);
      toast.success("Feature Updated Successfully");
      modelClose(featureUpdateModal, featureUpdateForm);
    } else {
      toast.error("Feature Not Updated");
    }
  };

  // console.log({updateFeaturePlan });

  return (
    <>
      <section>
        <div className="flex items-center gap-12">
          <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${service?.logo || ""}`}
              className="w-16 h-16 lg:h-[5em] lg:w-[5em] pb-2"
              width={1000}
              height={1000}
              alt="Bangla"
            />
            <div className="lg:pl-2">
              <h1 className="text-18 font-mono font-bold text-[#151D48]">
                {service?.name}
              </h1>
              <p
                className="pb-5 text-14 text-justify"
                dangerouslySetInnerHTML={{ __html: service?.description }}
              ></p>
            </div>
          </div>

          {/* <button
            onClick={() => setServiceStatus(!serviceStatus)}
            className={`px-2 py-1 lg:px-4 lg:py-2 text-white active:scale-90 transition-all duration-400 rounded-md ${
              serviceStatus ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            {serviceStatus ? "Active" : "Inactive"}
          </button> */}
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between gap-2 py-3">
            <h1 className="text-20 font-bold text-[#151D48]">
              Service Features Details:
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCreateFeature()}
                className="px-2 py-1  bg-blue-500 text-white active:scale-90 transition-all duration-400 rounded-md"
              >
                Create Feature
              </button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-md flex flex-col gap-3">
            <div className="w-full ">
              <div className="w-full overflow-x-auto">
                <table className="w-full text-center border border-gray-500">
                  <thead>
                    <tr>
                      <th className="border-2 border-gray-500 p-2">
                        Feature Name
                      </th>
                      <th className="border-2 border-gray-500 p-2">
                        Plans Details
                      </th>
                      <th className="border-2 border-gray-500 p-2">Unit</th>
                      <th className="border-2 border-gray-500 p-2">Status</th>
                      <th className="border-2 border-gray-500 p-2">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && (
                      <tr>
                        <td colSpan={5}>
                          <Skeleton height={20} width="100%" count={15} />
                        </td>
                      </tr>
                    )}
                    {features?.length > 0 ? (
                      features?.map((feature, featureIndex) => {
                        // Parse plans data
                        const plans = JSON.parse(feature?.plans || "[]");
                        const limits = plans.map((plan) => plan.limit);
                        const units = plans.map((plan) => plan.validaty);

                        return (
                          <tr key={feature.id || featureIndex}>
                            <td className="border-2 border-gray-500 p-2">
                              {feature.name}
                            </td>
                            <td className=" border-2 border-gray-500">
                              <table className="w-full">
                                <thead>
                                  <tr>
                                    {plans.length > 0 && limits.length > 0 ? (
                                      limits.map((limit, index) => (
                                        <th
                                          key={`limit-${index}`}
                                          className={`${
                                            index === 0
                                              ? " border-b"
                                              : "border-l border-b"
                                          }  border-gray-500 p-2`}
                                        >
                                          {limit} {feature.unit}
                                        </th>
                                      ))
                                    ) : (
                                      <th className="p-2">No Data</th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    {plans.length > 0 && units.length > 0 ? (
                                      units.map((unit, index) => (
                                        <td
                                          key={`unit-${index}`}
                                          className={`${
                                            index === 0 ? "" : "border-l"
                                          }  border-gray-500 p-2`}
                                        >
                                          {unit} TK
                                        </td>
                                      ))
                                    ) : (
                                      <td
                                        className="p-2"
                                        colSpan={limits.length || 1}
                                      >
                                        No Data
                                      </td>
                                    )}
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td className="border-2 border-gray-500 p-2">
                              {feature.unit}
                            </td>
                            <td className="border-2 border-gray-500 p-2">
                              {feature.is_public === "1" ? "Free" : "Paid"}
                            </td>
                            <td className="border-2 border-gray-500 px-2">
                              <div className="flex flex-col gap-2">
                                <button
                                  onClick={() => {
                                    setFeatureUpdateItem(feature);
                                    modelOpen(featureUpdateModal);
                                    setIsUpdate(!isUpdate);
                                  }}
                                  className="bg-gray-300 shadow-lg rounded border border-blue-600 px-1 py-1"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteFeature(feature)}
                                  className="bg-gray-300 shadow-lg rounded border border-red-600 px-1 py-1"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center p-4">
                          No Data Available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* createFeature modal */}
      <Modal
        modalForm={featureForm}
        modalRef={featureModal}
        title={"Create Feature"}
        arrDataCloseEmty={setFeaturePlan}

        // setPreviewSrc={setPreviewSrc}
        // setServiceValidation={setServiceValidation}
        // Pass handleSubmit to subFunc
      >
        <form onSubmit={handleCreateFeatureSubmit} ref={featureForm}>
          <input type="text" name="service_id" value={service?.id} hidden />
          <div className="flex flex-col gap-2">
            <div>
              <fieldset className="border border-primary px-2 rounded">
                <legend>
                  <label htmlFor="feature_name" className="text-14">
                    Feature Name
                  </label>
                </legend>
                <input
                  name="feature_name"
                  type="text"
                  className="outline-none w-full"
                  value={formData.feature_name}
                  onChange={handleInputChange}
                  placeholder="validaty"
                />
              </fieldset>
              {errors.feature_name && (
                <span className="text-red-500 text-12 pt-1">
                  {errors.feature_name}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between gap-2">
              <div>
                <fieldset className="border border-primary px-2 rounded grow">
                  <legend>
                    <label htmlFor="feature_name" className="text-14">
                      Plans Value Unit
                    </label>
                  </legend>
                  <select className="outline-none w-full" name="plan">
                    <option value="Days">Days</option>
                    <option value="MB">MB</option>
                    <option value="Min">Min</option>
                    <option value="Audio">Audio</option>
                  </select>
                </fieldset>
                {errors.plan && (
                  <span className="text-red-500 text-12 pt-1">
                    {errors.plan}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="is_public" id="" />
                <span className="text-14">Is Publically Open?</span>
              </div>
            </div>
            <div>
              <div className="bg-gray-300 flex items-center justify-between p-2">
                <h3 className="text-primary font-semibold">Add Plans</h3>
                <button
                  type="button"
                  onClick={() => {
                    setFeaturePlan((pre) => {
                      if (pre.length < 5) {
                        return [...pre, { name: "", value: "" }];
                      }
                      return pre; // Return the original state if length is greater than 5
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
              <div className="px-2 flex flex-col gap-2">
                {featurePlan.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2"
                  >
                    <div>
                      <fieldset className="border border-primary px-2 rounded">
                        <legend>
                          <label htmlFor="" className="text-14">
                            Limit
                          </label>
                        </legend>
                        <input
                          type="text"
                          name="limit[]"
                          className="outline-none w-full"
                          required
                          // value={3}
                        />
                      </fieldset>
                      {/* {errors.limits && <span className="text-red-500 text-12 pt-1">{errors.limits}</span>} */}
                    </div>
                    <div>
                      <fieldset className="border border-primary px-2 rounded">
                        <legend>
                          <label htmlFor="" className="text-14">
                            Price
                          </label>
                        </legend>
                        <input
                          type="text"
                          name="validaty[]"
                          className="outline-none w-full"
                          required
                          // value={100}
                        />
                      </fieldset>
                      {/* {errors.validities && <span className="text-red-500 text-12 pt-1">{errors.validities}</span>} */}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setFeaturePlan(() => {
                          return featurePlan.filter(
                            (item, index2) => index !== index2
                          );
                        });
                      }}
                      className="border border-primary bg-primary text-white mt-2 px-2 py-1"
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
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center gap-2 pt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                setFeaturePlan([]);
                setErrors({});
                setFormData({
                  feature_name: "",
                  plan: "",
                  is_public: false,
                  service_id: "",
                  limits: [""],
                  validities: [""],
                });
                modelClose(featureModal, featureForm);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            <button
              // onClick={(e) => {
              //   e.preventDefault();
              //   setFeaturePlan([]);
              //   modelClose(featureModal, featureForm);
              // }}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {/* update feature modal */}
      <Modal
        modalForm={featureUpdateForm}
        modalRef={featureUpdateModal}
        title={"Update Feature"}
        arrDataCloseEmty={setUpdateFeaturePlan}

        // setPreviewSrc={setPreviewSrc}
        // setServiceValidation={setServiceValidation}
        // Pass handleSubmit to subFunc
      >
        <form onSubmit={handleUpdateFeature} ref={featureUpdateForm}>
          <input type="text" name="service_id" value={service?.id} hidden />
          <div className="flex flex-col gap-2">
            <fieldset className="border border-primary px-2 rounded">
              <legend>
                <label htmlFor="feature_name" className="text-14">
                  Feature Name
                </label>
              </legend>
              <input
                name="feature_name"
                type="text"
                value={featureUpdateItem?.name}
                onChange={(e) => {
                  setFeatureUpdateItem((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
                className="outline-none w-full"
                placeholder="Validaty"
              />
            </fieldset>
            <div className="flex items-center justify-between gap-2">
              {/* <fieldset className="border border-primary px-2 rounded grow">
                <legend>
                  <label htmlFor="feature_name" className="text-14">
                    Plans Value Unit
                  </label>
                </legend>
                <input
                  name="plan"
                  type="text"
                  value={featureUpdateItem?.unit}
                  onChange={(e) => {
                    setFeatureUpdateItem((prev) => {
                      return { ...prev, unit: e.target.value };
                    });
                  }}
                  className="outline-none w-full"
                  placeholder="days"
                />
              </fieldset> */}
              <fieldset className="border border-primary px-2 rounded grow">
                  <legend>
                    <label htmlFor="feature_name" className="text-14">
                      Plans Value Unit
                    </label>
                  </legend>
                  <select className="outline-none w-full" name="plan">
                    <option value="Days" selected={featureUpdateItem?.unit == "Days"}>Days</option>
                    <option value="MB" selected={featureUpdateItem?.unit == "MB"}>MB</option>
                    <option value="Min" selected={featureUpdateItem?.unit == "Min"}>Min</option>
                    <option value="Audio" selected={featureUpdateItem?.unit == "Audio"}>Audio</option>
                  </select>
                </fieldset>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_public"
                  onChange={(e) => {
                    setFeatureUpdateItem((prev) => {
                      return {
                        ...prev,
                        is_public: e.target.checked ? "1" : "0",
                      };
                    });
                  }}
                  checked={featureUpdateItem.is_public === "1"}
                />
                <span className="text-14">Is Publically Open?</span>
              </div>
            </div>
            <div>
              {/* Plans Section */}
              <div className="bg-gray-300 flex items-center justify-between p-2">
                <h3 className="text-primary font-semibold">Add Plans</h3>
                <button
                  type="button"
                  onClick={() => {
                    setUpdateFeaturePlan((prev) => {
                      if (prev.length < 5) {
                        return [...prev, { limit: "", price: "" }];
                      }
                      return prev; // Do not add more if there are already 5 items
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

              {/* Render the Update Plan Form */}
              <div className="px-2 flex flex-col gap-2">
                {updateFeaturePlan.length > 0 &&
                  updateFeaturePlan.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2"
                    >
                      <fieldset className="border border-primary px-2 rounded">
                        <legend>
                          <label htmlFor={`limit-${index}`} className="text-14">
                            Limit
                          </label>
                        </legend>
                        <input
                          type="text"
                          name={`limit-${index}`}
                          className="outline-none w-full"
                          value={item.limit}
                          onChange={(e) =>
                            setUpdateFeaturePlan((prev) =>
                              prev.map((p, idx) =>
                                idx === index
                                  ? { ...p, limit: e.target.value }
                                  : p
                              )
                            )
                          }
                        />
                      </fieldset>
                      <fieldset className="border border-primary px-2 rounded">
                        <legend>
                          <label
                            htmlFor={`validaty-${index}`}
                            className="text-14"
                          >
                            Price
                          </label>
                        </legend>
                        <input
                          type="text"
                          name={`validaty-${index}`}
                          className="outline-none w-full"
                          value={item.validaty}
                          onChange={(e) =>
                            setUpdateFeaturePlan((prev) =>
                              prev.map((p, idx) =>
                                idx === index
                                  ? { ...p, validaty: e.target.value }
                                  : p
                              )
                            )
                          }
                        />
                      </fieldset>

                      {/* Optional delete button */}
                      <button
                        type="button"
                        onClick={() => {
                          setUpdateFeaturePlan((prev) =>
                            prev.filter((_, idx) => idx !== index)
                          );
                        }}
                        className="border border-primary bg-primary text-white mt-2 px-2 py-1"
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
                  ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center gap-2 pt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                setUpdateFeaturePlan([]);
                modelClose(featureUpdateModal, featureUpdateForm);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            <button
              // onClick={(e) => {
              //   e.preventDefault();
              //   setFeaturePlan([]);
              //   modelClose(featureModal, featureForm);
              // }}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Home;
