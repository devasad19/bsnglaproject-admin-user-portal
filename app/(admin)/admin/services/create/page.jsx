"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { uploadServiceData } from "@/app/(portal)/_api";
import Image from "next/image";

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
    const linksArray = data?.key?.map((linkValue) => ({
      link: linkValue,
    }));
    const valueArr = data?.url?.map((linkValue) => ({
      url: linkValue,
    }));

    const combinedArray = linksArray?.map((linkObj, index) => ({
      key: linkObj.link,
      value: valueArr?.[index]?.url,
    }));

    console.log({ combinedArray });

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
    formData.append("main_url", link);
    formData.append("status", status);
    formData.append("img", image[0]);
    formData.append("others_link", JSON.stringify(combinedArray));
    formData.append("tutorial", tutorial[0] || '');
    formData.append("documentation", documentation);
    formData.append("support", support);
    
    
    // console.log(Object.fromEntries(formData));
    //  return;

    // console.log("url links uploads");
    
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
                      Resoource Name
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
                    placeholder="Resoource Name"
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
                      Resoource Sub Title
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
                    placeholder="Resoource Sub Title"
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
                      Description
                    </label>
                  </legend>

                  <textarea
                    name="description"
                    id=""
                    className="outline-none p-2"
                    placeholder="Description"
                  ></textarea>
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
                      Type
                    </label>
                  </legend>

                  <select
                    name="type"
                    id=""
                    className="outline-none p-2 bg-white"
                  >
                    <option value="application">Application</option>
                    <option value="plugin">Plugin</option>
                    <option value="mobile_apps">Mobile Apps</option>
                    <option value="data_sets">Data Sets</option>
                    <option value="tools">Tools</option>
                    <option value="papers">Papers</option>
                  </select>
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
                      Distribution
                    </label>
                  </legend>

                  <select
                    name="type"
                    id=""
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
                      Production Status
                    </label>
                  </legend>

                  <select
                    name="type"
                    id=""
                    className="outline-none p-2 bg-white"
                  >
                    <option value="live">Live</option>
                    <option value="beta">Beta</option>
                    <option value="on_test">On Test</option>
                  </select>
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
                      Release Date
                    </label>
                  </legend>

                  <input
                    type="date"
                    name="release_date"
                    id=""
                    className="w-full outline-none p-2"
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
                      Component
                    </label>
                  </legend>

                  <input
                    type="text"
                    name="release_date"
                    id=""
                    className="w-full outline-none p-2"
                    placeholder="Enter Component"
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
                      Logo Image
                    </label>
                  </legend>
                  <input
                    type="file"
                    name="logo"
                    id=""
                    className="w-full outline-none p-2"
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
                      Label Top
                    </label>
                  </legend>

                  <select
                    name="type"
                    id=""
                    className="outline-none p-2 bg-white"
                  >
                    <option value="live">Free</option>
                    <option value="beta">Pro</option>
                  </select>
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
                      Button
                    </label>
                  </legend>

                  <select
                    name="type"
                    id=""
                    className="outline-none p-2 bg-white"
                  >
                    <option value="download">Download</option>
                    <option value="visit">Visit</option>
                    <option value="subscribe">Subscribe</option>
                  </select>
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
                      Visit
                    </label>
                  </legend>

                  <input
                    type="text"
                    name="release_date"
                    id=""
                    className="w-full outline-none p-2"
                    placeholder="Enter Link"
                  />
                </fieldset>
                {errors.name && (
                  <p className="text-red-500 text-12 px-2 pt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between">
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
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
