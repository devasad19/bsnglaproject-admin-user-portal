'use client';
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
const Home = ({params: {id}}) => {
    console.log('service id: ',id);
    
  const serviceForm = useRef(null); //form ref
  const [serviceUpdate, serviceUpdateModal] = useState({}); // state for update data
  const [serviceValidation, setServiceValidation] = useState({
    name: "",
    des: "",
    link: "",

    img: "",
  });
  const [previewSrc, setPreviewSrc] = useState(null); // image sr
  const handleServiceUpdate = (e) => {
    e.preventDefault();
    let name = e.target.name.value;

    let description = e.target.des.value;
    let img = e.target.img.files[0];
    let link = e.target.link.value;
    let status = e.target.status.value;
    const validation = validationUpdateServiceForm(name, description, link);
    console.log("validation", validation);

    if (!validation) {
      return;
    }
    // Create FormData object to hold the data
    let formData = new FormData();
    formData.append("name", name);
    formData.append("des", description);
    formData.append("link", link);
    formData.append("status", status);
    if (img) {
      formData.append("img", img);
    }
    if (serviceUpdate?.id) {
      fetch(`http://127.0.0.1:8000/api/service/${serviceUpdate.id}`, {
        method: "POST",
        body: formData, // Send FormData instead of JSON
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            toast.success("Service updated successfully");
            getServices()
              .then((data) => setServices(data))
              .catch((err) => console.log(err));
          } else {
            console.error("Update failed:", data.message);
          }
        })
        .catch((err) => console.error("Fetch error:", err));
    } else {
      console.error("No service ID provided");
    }
    if (serviceForm.current) {
      serviceForm.current.reset(); // Reset the form fields
    }
    if (serviceModal.current) {
      serviceModal.current.close();
    }
    setPreviewSrc(null);
  };
  return (
    <section className="pb-10">
      <div>
        <h1 className="text-32 font-mono font-bold text-[#151D48] pb-5">
          Edit Service
        </h1>
      </div>
      <div className="flex justify-center w-full">
        <form
          onSubmit={handleServiceUpdate}
          className="flex flex-col gap-3 bg-white p-4 w-full lg:w-[63%]"
          ref={serviceForm}
        >
          <h1 className="text-20 font-mono font-bold text-[#151D48]">
            Service Details
          </h1>
          <div>
            <fieldset className="w-full border border-gray-300 rounded-md px-2">
              <legend>
                <label className="after:content-['_*'] after:text-red-500">
                  Name
                </label>
              </legend>
              <input
                type="text"
                name="name"
                // onChange={e => validationUpdateServiceForm(e.target.value, )}
                placeholder="Update name of the service"
                defaultValue={serviceUpdate?.name}
                className="outline-none p-2 w-full"
              />
            </fieldset>
            {serviceValidation?.name && (
              <p className="text-red-500 px-2 text-10 pt-1">
                {serviceValidation?.name}
              </p>
            )}
          </div>
          <div>
            <fieldset className="w-full border border-gray-300 rounded-md px-2">
              <legend>
                <label className="after:content-['_*'] after:text-red-500">
                  Description
                </label>
              </legend>
              <textarea
                name="des"
                placeholder="Update description"
                onChange={(e) => validationUpdateServiceForm(e.target.value)}
                className="outline-none p-2 w-full"
                defaultValue={serviceUpdate?.des}
              ></textarea>
            </fieldset>
            {serviceValidation?.des && (
              <p className="text-red-500 px-2 text-10 pt-1">
                {serviceValidation?.des}
              </p>
            )}
          </div>
          <div>
            <fieldset className="w-full border border-gray-300 rounded-md px-2">
              <legend>
                <label className="after:content-['_*'] after:text-red-500">
                  Link
                </label>
              </legend>
              <input
                type="text"
                name="link"
                // onChange={e => validationUpdateServiceForm(e.target.value)}
                placeholder="Update name of the service"
                defaultValue={serviceUpdate?.link}
                className="outline-none p-2 w-full"
              />
            </fieldset>
            {serviceValidation?.link && (
              <p className="text-red-500 px-2 text-10 pt-1">
                {serviceValidation?.link}
              </p>
            )}
          </div>

          <div>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label htmlFor="status">Status</label>
              </legend>
              <select
                name="status"
                id="status"
                className="uppercase bg-white outline-none p-2"
                defaultValue={serviceUpdate?.status}
              >
                <option value="1" selected={serviceUpdate?.status === "1"}>
                  active
                </option>
                <option value="2" selected={serviceUpdate?.status === "2"}>
                  inactive
                </option>
                <option value="3" selected={serviceUpdate?.status === "3"}>
                  archeive
                </option>
              </select>
            </fieldset>
          </div>

          <div>
            <fieldset className="w-full border border-gray-300 rounded-md p-2">
              <legend>
                <label className="after:content-['_*'] after:text-red-500">
                  Service Icon
                </label>
              </legend>
              <input
                id="file"
                type="file"
                onChange={(e) => {
                  setPreviewSrc(e.target.files[0]);
                }}
                name="img"
                accept="image/*"
                // className="p-2"
              />
              {previewSrc ? (
                <Image
                  src={URL.createObjectURL(previewSrc)}
                  className="w-60 h-48 rounded-md my-2"
                  height={1000}
                  width={1000}
                  alt="Preview"
                />
              ) : (
                serviceUpdate?.img && (
                  <Image
                    src={serviceUpdate?.img}
                    className="w-60 h-48 rounded-md my-2"
                    height={1000}
                    width={1000}
                    alt="Service Image"
                  />
                )
              )}
            </fieldset>
            {serviceValidation?.img && (
              <p className="text-red-500 px-2 text-10 pt-1">
                {serviceValidation?.img}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <p className="text-14">
              <span className="text-red-500">*</span> Required
            </p>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-700 text-white active:scale-90 transition-all duration-400 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Home;