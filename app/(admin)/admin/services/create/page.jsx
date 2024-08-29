"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { uploadServiceData } from "@/app/(portal)/_api";
import { tr } from "@faker-js/faker";

const Home = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("");
  const [serviceImg, setServiceImg] = useState(null);
  const [tutorialVideo, setTutorialVideo] = useState(null);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 
  

  const onSubmitService = async (data) => {
    // const linksArray = data.link.map((linkValue) => ({
    //   link: linkValue,
    // }));
    setIsLoading(true);
    const { name, des, link, status, image, tutorial, documentation, support } =
      data;

    // const dataSubmited = {
    //   name,
    //   des,
    //   // link: linksArray,
    //   status,
    //   link: mainlink,
    //   img: serviceImg,
    //   tutorial: tutorialVideo,
    //   documentation: documentation,
    //   support: support,
    // };
    // console.log("ceate service", dataSubmited);
    // return;

    // Create a FormData object
    const formData = new FormData();
    // Append your data to the FormData object
    formData.append("name", name);
    formData.append("des", des);
    formData.append("link", link);
    formData.append("status", status);
    formData.append("img", image[0]);
    formData.append("tutorial", tutorial[0]);
    formData.append("documentation", documentation);
    formData.append("support", support);

    const uploadRes = await uploadServiceData(formData);
    console.log("uploadRes", uploadRes);

    if (uploadRes.status === true) {
      setIsLoading(false);
      toast.success("Service Created Successfully");
      router.push("/admin/services");
      reset();
    } else {
      setIsLoading(false);
      toast.error("Service Creation Failed");
    }
  };

  // console.log('links: ',links);

  return (
    <>
      <section className="pb-10">
        <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
          Create New Service
        </h3>
        <div className="flex justify-center w-full">
          <form
            className="bg-white p-4 w-full lg:w-[80%] overflow-hidden"
            onSubmit={handleSubmit(onSubmitService)}
          >
            <div className="flex flex-col gap-3">
              <h1 className="text-20 font-mono font-bold text-[#151D48]">
                Service Details
              </h1>
              <div>
                <fieldset className="flex flex-col border rounded-md px-2">
                  <legend>
                    <label
                      htmlFor="ServiceName"
                      className="after:content-['_*'] after:text-red-500"
                    >
                      Name
                    </label>
                  </legend>
                  <input
                    {...register("name", {
                      required: "Name is required",
                      maxLength: {
                        value: 30,
                        message: "Name cannot exceed 30 characters",
                      },
                    })}
                    id="ServiceName"
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
                      htmlFor="description"
                      className="after:content-['_*'] after:text-red-500"
                    >
                      Description
                    </label>
                  </legend>
                  <textarea
                    {...register("des", {
                      required: "Description is required",
                      maxLength: {
                        value: 300,
                        message: "Description cannot exceed 300 characters",
                      },
                    })}
                    id="description"
                    placeholder="Description"
                    className="outline-none p-2"
                    onChange={(e) => setDes(e.target.value)}
                  ></textarea>
                </fieldset>
                {errors.des && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {errors.des.message}
                  </p>
                )}
              </div>
              <div>
                <fieldset className="flex flex-col border rounded-md px-2">
                  <legend>
                    <label
                      htmlFor="documentation"
                      className="after:content-['_*'] after:text-red-500"
                    >
                      Documentation
                    </label>
                  </legend>
                  <textarea
                    {...register("documentation", {
                      required: "Documentation is required",
                      maxLength: {
                        value: 300,
                        message: "Documentation cannot exceed 300 characters",
                      },
                    })}
                    id="description"
                    placeholder="Documentation"
                    className="outline-none p-2"
                    // onChange={(e) => setDes(e.target.value)}
                  ></textarea>
                </fieldset>
                {errors.documentation && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {errors.documentation.message}
                  </p>
                )}
              </div>
              <div>
                <fieldset className="flex flex-col border rounded-md px-2">
                  <legend>
                    <label
                      htmlFor="support"
                      className="after:content-['_*'] after:text-red-500"
                    >
                      Support
                    </label>
                  </legend>
                  <textarea
                    {...register("support", {
                      required: "Suppoort is required",
                      maxLength: {
                        value: 300,
                        message: "Support cannot exceed 300 characters",
                      },
                    })}
                    id="support"
                    placeholder="Support"
                    className="outline-none p-2"
                    // onChange={(e) => setDes(e.target.value)}
                  ></textarea>
                </fieldset>
                {errors.support && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {errors.support.message}
                  </p>
                )}
              </div>
              <div>
                <fieldset className="flex flex-col border rounded-md p-2">
                  <legend>
                    <label
                      htmlFor="file"
                      className="after:content-['_*'] after:text-red-500"
                    >
                      Service Icon
                    </label>
                  </legend>
                  <input
                    {...register("image", { required: "image is required" })}
                    id="file"
                    type="file"
                    onChange={(e) => {
                      setServiceImg(e.target.files[0]);
                    }}
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </fieldset>
                {errors.image && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {serviceImg && (
                <img
                  src={URL.createObjectURL(serviceImg)}
                  className="w-80 h-48 rounded-md"
                  alt="Preview"
                />
              )}
              <div>
                <fieldset className="flex flex-col border rounded-md p-2">
                  <legend>
                    <label
                      htmlFor="file"
                      className="after:content-['_*'] after:text-red-500"
                    >
                      Tutorial
                    </label>
                  </legend>
                  <input
                    {...register("tutorial", { required: "Video is required" })}
                    id="file"
                    type="file"
                    onChange={(e) => {
                      setTutorialVideo(e.target.files[0]);
                    }}
                    accept="video/mp4, video/ogg, video/avi"
                  />
                </fieldset>
                {errors.tutorial && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {errors.tutorial.message}
                  </p>
                )}
              </div>

              {tutorialVideo && (
                <video
                  src={URL.createObjectURL(tutorialVideo)}
                  className="w-80 h-48 rounded-md"
                  controls
                />
              )}

              <div>
                <fieldset className="flex flex-col border rounded-md px-2">
                  <legend>
                    <label
                      htmlFor="ServiceName"
                      className="after:content-['_*'] after:text-red-500"
                    >
                      Link
                    </label>
                  </legend>
                  <input
                    id="ServiceName"
                    type="text"
                    {...register("link", {
                      required: "Link is required",
                      maxLength: {
                        value: 30,
                        message: "Link cannot exceed 30 characters",
                      },
                    })}
                    placeholder="Service Link"
                    className="outline-none p-2"
                  />
                </fieldset>
                {errors.link && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {errors.link.message}
                  </p>
                )}
              </div>
              {/* <div className="border border-gray-300 rounded">
              <div className="bg-gray-300 flex items-center justify-between p-2">
                <h3 className="text-primary font-semibold">Add Links</h3>
                <button
                  type="button"
                  onClick={() => {
                    setLinks([...links, { name: "", link: "" }]);
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
              {links.map((item, index) => (
                <div key={index} className="p-2 bg-neutral-100">
                  <div>
                    <div className="flex gap-2">
                      <fieldset className="w-full flex flex-col border rounded-md px-2">
                        <legend>
                          <label
                            htmlFor="ServiceName"
                            className="after:content-['_*'] after:text-red-500"
                          >
                            Link
                          </label>
                        </legend>
                        <input
                          type="text"
                          id={`ServiceName${index}`}
                          {...register(`link.${index}`, {
                            required: "Link is required",
                            maxLength: {
                              value: 30,
                              message: "Link cannot exceed 30 characters",
                            },
                          })}
                          placeholder="Service Link"
                          className="outline-none p-2 "
                          // onChange={(e) => setLink(e.target.value)}
                        />
                      </fieldset>
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => {
                            setLinks(() => {
                              return links.filter(
                                (item, index2) => index !== index2
                              );
                            });
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

                    {errors.link?.[index] && (
                      <p className="text-red-500 text-12 px-2 pt-1">
                        {errors.link[index]?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div> */}
              <div>
                <fieldset className="flex flex-col border rounded-md px-2">
                  <legend>
                    <label htmlFor="status">Status</label>
                  </legend>
                  <select
                    {...register("status", { required: "status is required" })}
                    id="status"
                    className="uppercase bg-white outline-none p-2"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="1">active</option>
                    <option value="2">inactive</option>
                    <option value="3">archeive</option>
                  </select>
                </fieldset>
                {errors.status && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>
              <div className="flex justify-between">
                <p className="text-14">
                  <span className="text-red-500">*</span> Required
                </p>
                {
                  isLoading ? (<button
                    type="button"
                    className="px-4 py-2 bg-violet-700 text-white active:scale-90 transition-all duration-400 rounded-md"
                  >
                    Loading...
                  </button>):<button
                    type="submit"
                    className="px-4 py-2 bg-violet-700 text-white active:scale-90 transition-all duration-400 rounded-md"
                  >
                    Create
                  </button>
                }
                
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
