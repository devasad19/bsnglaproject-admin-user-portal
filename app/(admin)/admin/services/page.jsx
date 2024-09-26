"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { modelClose } from "@/helper";
import { getServices, updateAnService } from "@/app/(portal)/_api";
import Modal from "@/app/_components/Modal/Modal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import CustomEditor from "@/app/_components/CustomEditor/CustomEditor";

const Home = () => {
  const [previewSrc, setPreviewSrc] = useState(null); // image sr
  const [tutorialVideo, setTutorialVideo] = useState(null); // video src
  const [serviceUpdate, serviceUpdateModal] = useState({}); // state for update data
  const [services, setServices] = useState([]); //state for services
  const serviceModal = useRef(null); //modal ref
  const serviceForm = useRef(null); //form ref
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [serviceValidation, setServiceValidation] = useState({
    name: "",
    description: "",
    sub_title: "",
    distribution: "",
    visit_link: "",
    component: "",
    release_date: "",
  });

  useEffect(() => {
    setIsLoading(true);
    getServices()
      .then((data) => (setServices(data), setIsLoading(false)))
      .catch((err) => console.log(err));
  }, [refetch]);

  // console.log(services);

  // delete service in this function
  const handleDelete = (id) => {
    // console.log("id", id);
    if (id) {
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
          console.log("id", id);

          fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === true) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                const filtered = services.filter((item) => item.id !== id);
                setServices(filtered);
              }
              if (data.status === 500) {
                Swal.fire({
                  title: "Error!",
                  text: "Something went wrong.",
                  icon: "error",
                });
              }
            })
            .catch((err) => console.log(err));
        }
      });
    }
  };

  // onclick edit button this function will be called
  const handleEdit = (item) => {
    if (serviceModal?.current) {
      serviceModal.current.showModal();
    }
    serviceUpdateModal(item);
  };

  const validationUpdateServiceForm = (
    name,
    description,
    sub_title,
    distribution,
    visit_link,
    component,
    release_date
  ) => {
    let errors = {};

    // Validate Name
    if (name?.length === 0) {
      errors.name = "Name is required.";
    } else if (name?.length > 30) {
      errors.name = "Name cannot exceed 30 characters.";
    }

    // Validate Description
    if (description?.length === 0) {
      errors.des = "Description is required.";
    } else if (description?.length > 300) {
      errors.description = "Description cannot exceed 300 characters.";
    }

    // Validate Link
    if (sub_title?.length === 0) {
      errors.sub_title = "sub_title is required.";
    } else if (sub_title?.length > 30) {
      errors.sub_title = "sub_title cannot exceed 30 characters.";
    }

    // Set errors in state
    setServiceValidation(errors);

    // Return true if no errors, otherwise false
    return Object.keys(errors).length === 0;
  };

  // edit service in this function
  // const handleServiceUpdate = async (e) => {
  //   e.preventDefault();
  //   let name = e.target.name.value;
  //   let description = e.target.des.value;
  //   let img = e.target.img.files[0];
  //   let link = e.target.link.value;
  //   let status = e.target.status.value;
  //   let tutorial = e.target.tutorial.files[0];
  //   let documentation = e.target.documentation.value;
  //   let support = e.target.support.value;
  //   const validation = validationUpdateServiceForm(name, description, link);
  //   console.log(
  //     "submit data :",
  //     name,
  //     description,
  //     img,
  //     link,
  //     status,
  //     tutorial,
  //     documentation,
  //     support
  //   );
  //   if (!validation) {
  //     return;
  //   }
  //   // Create FormData object to hold the data
  //   if (!img && !tutorial) {
  //     console.log("update  img nai and tutorial nai");

  //     let updateDataInfo = {
  //       name: name,
  //       des: description,
  //       link: link,
  //       status: status,
  //       documentation: documentation,
  //       support: support,
  //     };
  //     let updateData = await updateAnService(serviceUpdate?.id, updateDataInfo);
  //     if (updateData?.status === true) {
  //       toast.success("Service updated successfully");
  //       setRefetch(!refetch);
  //     } else {
  //       console.error("Update failed:", updateData?.message);
  //     }
  //   }

  //   if (!img && tutorial) {
  //     console.log("update  img nai and tutorial ase");
  //     let fromData = new FormData();
  //     fromData.append("name", name);
  //     fromData.append("des", description);
  //     fromData.append("link", link);
  //     fromData.append("status", status);
  //     fromData.append("documentation", documentation);
  //     fromData.append("support", support);
  //     fromData.append("img", img || "");
  //     fromData.append("tutorial", tutorial);
  //     let updateData = await updateAnService(serviceUpdate?.id, fromData);
  //     if (updateData?.status === true) {
  //       toast.success("Service updated successfully");
  //       setRefetch(!refetch);
  //     } else {
  //       console.error("Update failed:", updateData?.message);
  //     }
  //   }

  //   if (!tutorial && img) {
  //     console.log("update  img ase and tutorial nai");

  //     let fromData = new FormData();
  //     fromData.append("name", name);
  //     fromData.append("des", description);
  //     fromData.append("link", link);
  //     fromData.append("status", status);
  //     fromData.append("documentation", documentation);
  //     fromData.append("support", support);
  //     fromData.append("tutorial", tutorial || "");
  //     fromData.append("img", img);
  //     console.log("fromData:", fromData);

  //     let updateData = await updateAnService(serviceUpdate?.id, fromData);
  //     if (updateData?.status === true) {
  //       toast.success("Service updated successfully");
  //       setRefetch(!refetch);
  //     } else {
  //       console.error("Update failed:", updateData?.message);
  //     }
  //   }
  //   if (img && tutorial) {
  //     console.log("update  img ase and tutorial ase");
  //     let fromData = new FormData();
  //     fromData.append("name", name);
  //     fromData.append("des", description);
  //     fromData.append("link", link);
  //     fromData.append("status", status);
  //     fromData.append("documentation", documentation);
  //     fromData.append("support", support);
  //     fromData.append("img", img);
  //     fromData.append("tutorial", tutorial);
  //     let updateData = await updateAnService(serviceUpdate?.id, fromData);
  //     if (updateData?.status === true) {
  //       toast.success("Service updated successfully");
  //       setRefetch(!refetch);
  //     } else {
  //       console.error("Update failed:", updateData?.message);
  //     }
  //   }
  //   if (serviceForm.current) {
  //     serviceForm.current.reset(); // Reset the form fields
  //   }
  //   if (serviceModal.current) {
  //     serviceModal.current.close();
  //   }
  //   setPreviewSrc(null);
  // };

  const handleServiceUpdate = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let description = e.target.description.value;
    let logo = e.target.logo.files[0];
    let sub_title = e.target.sub_title.value;
    let distribution = e.target.distribution.value;
    let visit_link = e.target.visit_link.value;
    let component = e.target.component.value;
    let paid_status = e.target.paid_status.value;
    let production_status = e.target.production_status.value;
    let release_date = e.target.release_date.value;
    let type = e.target.type.value;
    let visit_type = e.target.visit_type.value;

    const validation = validationUpdateServiceForm(
      name,
      description,
      sub_title,
      distribution,
      visit_link,
      component,
      release_date
    );

    if (!validation) {
      return;
    }
    // Create FormData object to hold the data
    // console.log({
    //   name,
    //   description,
    //   logo,
    //   sub_title,
    //   distribution,
    //   visit_link,
    //   component,
    //   paid_status,
    //   production_status,
    //   release_date,
    //   type,
    //   visit_type,
    // });
    let fromData = new FormData();
    fromData.append("name", name);
    fromData.append("description", description);
    fromData.append("logo", logo || "");
    fromData.append("sub_title", sub_title);
    fromData.append("distribution", distribution);
    fromData.append("visit_link", visit_link);
    fromData.append("component", component);
    fromData.append("paid_status", paid_status);
    fromData.append("production_status", production_status);
    fromData.append("release_date", release_date);
    fromData.append("type", type);
    fromData.append("visit_type", visit_type);

    let updateData = await updateAnService(serviceUpdate?.id, fromData);
    console.log({ updateData });

    if (updateData?.status === true) {
      toast.success("Service updated successfully");
      setRefetch(!refetch);
    } else {
      toast.error("Service Updated Failed");
      console.error("Update failed:", updateData?.message);
    }

    if (serviceForm.current) {
      serviceForm.current.reset(); // Reset the form fields
    }
    if (serviceModal.current) {
      serviceModal.current.close();
    }
    setPreviewSrc(null);
  };

  const UpdateServicePublishStatus = async (id, status) => {
    const result = await fetch(
      `http://dev-bangla-dashboard.mysoftheaven.com/api/service/publish-unpublish/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      }
    ).then((res) => res.json()).catch((err) => {
      console.log(err);
    });


    if (result?.status === true) {
      toast.success("Service status updated successfully");
      setRefetch(!refetch);
    } else {
      console.error("Update failed:", result?.message);
    }
  }

  console.log("service data: ", services);

  // console.log("validation body: ", serviceValidation);

  return (
    <>
      <section>
        <div className="flex flex-wrap justify-between">
          <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
            Services
          </h3>
          <div>
            <Link
              href={{
                pathname: "/admin/services/create",
              }}
              shallow
              className="flex items-center gap-2 bg-primary hover:border hover:border-primary rounded-md text-white hover:text-primary hover:bg-white text-14 px-2 py-1 lg:px-4 lg:py-2"
            >
              <span>
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </span>
              <span>Add</span>
            </Link>
          </div>
        </div>
        <div className="w-full overflow-x-auto bg-white  rounded-md">
          <table className="w-full">
            <thead className="border-b  border-gray-200  bg-primary text-white  h-10 text-12 lg:text-16">
              <tr>
                <th className="text-left px-2">Name</th>
                <th className="text-center">Sub Title</th>
                <th className="text-center">Type</th>
                <th className="text-center">Production Status</th>
                <th className="text-center">Paid Status</th>
                <th className="text-center">Publish/Unpublish</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-gray-200 [&>tr]:text-left [&>tr]:h-16 text-12 lg:text-16 ">
              {isLoading && (
                <tr>
                  <td colSpan={6}>
                    <Skeleton width="100%" count={10} height={50} />
                  </td>
                </tr>
              )}
              {services?.length > 0
                ? services?.map((item, index) => {
                    const paidStatus = JSON?.parse(item?.paid_status || "{}");
                    return (
                      <tr key={index}>
                        <td className="px-2 border-r border-gray-200">
                          <Link
                            href={{
                              pathname: `/admin/services/${item?.id}`,
                            }}
                            className="flex items-center gap-2 text-14"
                            shallow
                          >
                            <span className="flex items-center gap-3">
                              <Image
                                className="w-10 h-10 rounded-md"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.logo}`}
                                height={1000}
                                width={1000}
                                alt="Bangla"
                              />
                              {/* {item?.name.substring(0, 15)
                            ? item?.name.substring(0, 15)
                            : item?.name.substring(0, 15) + "..."} */}
                              {item?.name || " "}
                            </span>
                          </Link>
                        </td>
                        <td className="text-center border-r border-gray-200">
                          {item?.sub_title?.length > 35
                            ? item?.sub_title?.substring(0, 25) + "..."
                            : item?.sub_title}
                        </td>
                        <td className="text-center border-r border-gray-200">
                          {item?.type || ""}
                        </td>

                        <td className="text-center border-r border-gray-200">
                          {item?.production_status || ""}
                        </td>
                        <td className="text-center border-r border-gray-200">
                          <div className="flex items-center gap-2">
                            {paidStatus?.free == 1 ? (
                              <button className="bg-[#2F93DF] px-1 py-1 lg:px-3 lg:py-2 text-white  rounded ">
                                Free
                              </button>
                            ) : (
                              ""
                            )}

                            {paidStatus?.pro == 1 && (
                              <button className="bg-[#1AB17A] px-1 py-1 lg:px-3 lg:py-2 text-white  rounded ">
                                Pro
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="text-center border-r border-gray-200">
                          {/* <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                          </label> */}
                          <button
                            onClick={() => UpdateServicePublishStatus(item?.id, item?.status == 1 ? 0 : 1)}
                            className={`text-white px-4 py-2 rounded transition-all duration-300 w-[90%] ${
                              item?.status == 1
                                ? "bg-green-700"
                                : "bg-yellow-500"
                            }`}
                          >
                            {item?.status == 1 ? "Publish" : "UnPublish"}
                            {/* {publish ? "Published" : "Unpublished"} */}
                          </button>

                          {/* <button className="text-white">
                            <span
                              onClick={() => setPublish(1)}
                              className={`p-2 border border-gray-500 ${
                                publish == 1 ? "bg-primary" : "bg-gray-500"
                              }`}
                            >
                              Publish
                            </span>
                            <span
                              onClick={() => setPublish(0)}
                              className={`p-2 border border-gray-500 ${
                                publish == 0 ? "bg-primary" : "bg-gray-500"
                              }`}
                            >
                              UnPublish
                            </span>
                          </button> */}
                        </td>
                        <td className="">
                          <div className="w-full flex items-center justify-center gap-2">
                            {/* {item?.status == 2 ? ( */}
                            <>
                              <Link
                                href={{
                                  pathname: `/admin/services/${item?.id}`,
                                }}
                                shallow
                                className="px-2 py-1  bg-green-500 text-white active:scale-90 transition-all duration-400 rounded-md"
                              >
                                View
                              </Link>

                              <button
                                onClick={() => handleEdit(item)}
                                className="px-2 py-1  bg-blue-500 text-white active:scale-90 transition-all duration-400 rounded-md"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleDelete(item?.id)}
                                className="p-1  bg-red-500 text-white active:scale-90 transition-all duration-400 rounded-md"
                              >
                                <svg
                                  className="w-4 h-4 fill-current"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                </svg>
                              </button>
                            </>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
      </section>
      {/* service edit modal */}
      {/* <Modal
        modalForm={serviceForm}
        modalRef={serviceModal}
        title={"Update Service"}
        setPreviewSrc={setPreviewSrc}
        setTutorialVideo={setTutorialVideo}
        setServiceValidation={setServiceValidation}
        // Pass handleSubmit to subFunc
      >
        <form
          onSubmit={handleServiceUpdate}
          className="flex flex-col gap-2"
          ref={serviceForm}
        >
          <div>
            <fieldset className="w-full border border-gray-300 rounded-md px-2">
              <legend>
                <label>Name</label>
              </legend>
              <input
                type="text"
                name="name"
                // onChange={e => validationUpdateServiceForm(e.target.value, )}
                placeholder="Update name of the service"
                defaultValue={serviceUpdate?.name}
                className="outline-none w-full text-14"
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
                <label>Description</label>
              </legend>
              <textarea
                name="des"
                placeholder="Update description"
                onChange={(e) => validationUpdateServiceForm(e.target.value)}
                className="outline-none w-full text-14"
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
                <label>Documentation</label>
              </legend>
              <textarea
                name="documentation"
                placeholder="Update description"
                onChange={(e) => validationUpdateServiceForm(e.target.value)}
                className="outline-none w-full text-14"
                defaultValue={serviceUpdate?.documentation}
              ></textarea>
            </fieldset>
            {serviceValidation?.documentation && (
              <p className="text-red-500 px-2 text-10 pt-1">
                {serviceValidation?.documentation}
              </p>
            )}
          </div>
          <div>
            <fieldset className="w-full border border-gray-300 rounded-md px-2">
              <legend>
                <label>Support</label>
              </legend>
              <textarea
                name="support"
                placeholder="Update description"
                onChange={(e) => validationUpdateServiceForm(e.target.value)}
                className="outline-none w-full text-14"
                defaultValue={serviceUpdate?.support}
              ></textarea>
            </fieldset>
            {serviceValidation?.support && (
              <p className="text-red-500 px-2 text-10 pt-1">
                {serviceValidation?.support}
              </p>
            )}
          </div>
          <div>
            <fieldset className="w-full border border-gray-300 rounded-md px-2">
              <legend>
                <label>Link</label>
              </legend>
              <input
                type="text"
                name="link"
                // onChange={e => validationUpdateServiceForm(e.target.value)}
                placeholder="Update name of the service"
                defaultValue={serviceUpdate?.link}
                className="outline-none w-full text-14"
              />
            </fieldset>
            {serviceValidation?.link && (
              <p className="text-red-500 px-2 text-10 pt-1">
                {serviceValidation?.link}
              </p>
            )}
          </div>

          <div>
            <fieldset className="w-full border border-gray-300 rounded-md px-2">
              <legend>
                <label>tutorial</label>
              </legend>
              <input
                id="file"
                type="file"
                onChange={(e) => {
                  setTutorialVideo(e.target.files[0]);
                }}
                name="tutorial"
                accept="video/mp4, video/ogg, video/avi, video/webm"
                className="p-2"
              />
              {tutorialVideo ? (
                <video
                  src={URL.createObjectURL(tutorialVideo)}
                  controls
                  className="w-60 h-48 rounded-md my-2"
                />
              ) : (
                serviceUpdate?.tutorial && (
                  <video
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${serviceUpdate?.tutorial}`}
                    controls
                    className="w-60 h-48 rounded-md my-2"
                  />
                )
              )}
            </fieldset>
            {serviceValidation?.tutorial && (
              <p className="text-red-500 px-2 text-10 pt-1">
                {serviceValidation?.tutorial}
              </p>
            )}
          </div>
          <div>
            <fieldset className="w-full border border-gray-300 rounded-md px-2">
              <legend>
                <label>Image</label>
              </legend>
              <input
                id="file"
                type="file"
                onChange={(e) => {
                  setPreviewSrc(e.target.files[0]);
                }}
                name="img"
                accept="image/*"
                className="p-2"
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
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${serviceUpdate?.img}`}
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

          <div className="modal-action">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setServiceValidation({});
                  modelClose(serviceModal, serviceForm);
                  setPreviewSrc(null);
                  setTutorialVideo(null);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-3 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </Modal> */}

      <Modal
        modalForm={serviceForm}
        modalRef={serviceModal}
        title={"Update Service"}
        setPreviewSrc={setPreviewSrc}
        setTutorialVideo={setTutorialVideo}
        setServiceValidation={setServiceValidation}
        // Pass handleSubmit to subFunc
      >
        <form
          onSubmit={handleServiceUpdate}
          className="flex flex-col gap-2"
          ref={serviceForm}
        >
          <div>
            <fieldset className="w-full border border-gray-300 rounded-md px-2">
              <legend>
                <label>Name</label>
              </legend>
              <input
                type="text"
                name="name"
                // onChange={e => validationUpdateServiceForm(e.target.value, )}
                placeholder="Update name of the service"
                defaultValue={serviceUpdate?.name}
                className="outline-none w-full text-14"
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
                <label>Sub Title</label>
              </legend>
              <input
                type="text"
                name="sub_title"
                placeholder="Update name of the service"
                defaultValue={serviceUpdate?.sub_title}
                className="outline-none w-full text-14"
              />
            </fieldset>
            {serviceValidation?.sub_title && (
              <p className="text-red-500 px-2 text-10 pt-1">
                {serviceValidation?.sub_title}
              </p>
            )}
          </div>
          <div>
            <fieldset className="w-full border border-gray-300 rounded-md px-2">
              <legend>
                <label>Description</label>
              </legend>

              {/* <textarea
                name="description"
                placeholder="Update description"
                onChange={(e) => validationUpdateServiceForm(e.target.value)}
                className="outline-none w-full text-14"
                defaultValue={serviceUpdate?.description}
              ></textarea> */}

              <CustomEditor
                data={serviceUpdate?.description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  validationUpdateServiceForm(data);
                }}
              />
            </fieldset>
            {serviceValidation?.description && (
              <p className="text-red-500 px-2 text-10 pt-1">
                {serviceValidation?.description}
              </p>
            )}
          </div>
          <div>
            <fieldset className="w-full border border-gray-300 rounded-md px-2">
              <legend>
                <label>Distribution</label>
              </legend>

              {/* <textarea
                name="distribution"
                placeholder="Update description"
                onChange={(e) => validationUpdateServiceForm(e.target.value)}
                className="outline-none w-full text-14"
                defaultValue={serviceUpdate?.distribution}
              ></textarea> */}

              <CustomEditor
                data={serviceUpdate?.distribution}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  validationUpdateServiceForm(data);
                }}
              />
            </fieldset>
            {serviceValidation?.distribution && (
              <p className="text-red-500 px-2 text-10 pt-1">
                {serviceValidation?.distribution}
              </p>
            )}
          </div>
          <div>
            <fieldset className="w-full border border-gray-300 rounded-md px-2">
              <legend>
                <label>Component</label>
              </legend>

              {/* <textarea
                name="component"
                placeholder="Update component"
                onChange={(e) => validationUpdateServiceForm(e.target.value)}
                className="outline-none w-full text-14"
                defaultValue={serviceUpdate?.component}
              ></textarea> */}

              <CustomEditor
                data={serviceUpdate?.component}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  validationUpdateServiceForm(data);
                }}
              />
            </fieldset>
            {serviceValidation?.component && (
              <p className="text-red-500 px-2 text-10 pt-1">
                {serviceValidation?.component}
              </p>
            )}
          </div>

          <div>
            <fieldset className="w-full border border-gray-300 rounded-md px-2">
              <legend>
                <label>Visit Link</label>
              </legend>
              <input
                type="text"
                name="visit_link"
                // onChange={e => validationUpdateServiceForm(e.target.value)}
                placeholder="Update name of the service"
                defaultValue={serviceUpdate?.visit_link}
                className="outline-none w-full text-14"
              />
            </fieldset>
            {serviceValidation?.visit_link && (
              <p className="text-red-500 px-2 text-10 pt-1">
                {serviceValidation?.visit_link}
              </p>
            )}
          </div>

          <div>
            <fieldset className="w-full border border-gray-300 rounded-md px-2">
              <legend>
                <label>Logo</label>
              </legend>
              <input
                id="file"
                type="file"
                onChange={(e) => {
                  setPreviewSrc(e.target.files[0]);
                }}
                name="logo"
                accept="image/*"
                className="p-2"
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
                serviceUpdate?.logo && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${serviceUpdate?.logo}`}
                    className="w-60 h-48 rounded-md my-2"
                    height={1000}
                    width={1000}
                    alt="Service Image"
                  />
                )
              )}
            </fieldset>
            {serviceValidation?.logo && (
              <p className="text-red-500 px-2 text-10 pt-1">
                {serviceValidation?.logo}
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
                id="status"
                defaultValue={serviceUpdate?.type}
                className="outline-none p-2 bg-white"
              >
                <option
                  selected={serviceUpdate?.type == "Application"}
                  value="Application"
                >
                  Application
                </option>
                <option
                  selected={serviceUpdate?.type == "Plugin"}
                  value="Plugin"
                >
                  Plugin
                </option>
                <option
                  selected={serviceUpdate?.type == "Mobile Apps"}
                  value="Mobile Apps"
                >
                  Mobile Apps
                </option>
                <option
                  selected={serviceUpdate?.type == "Datasets"}
                  value="Datasets"
                >
                  Data Sets
                </option>
                <option selected={serviceUpdate?.type == "Tools"} value="Tools">
                  Tools
                </option>
                <option
                  selected={serviceUpdate?.type == "Papers"}
                  value="Papers"
                >
                  Papers
                </option>
              </select>
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
                name="production_status"
                defaultValue={serviceUpdate?.production_status}
                className="outline-none p-2 bg-white"
              >
                <option
                  selected={serviceUpdate?.production_status == "Live"}
                  value="Live"
                >
                  Live
                </option>
                <option
                  selected={serviceUpdate?.production_status == "Beta"}
                  value="Beta"
                >
                  Beta
                </option>
                <option
                  selected={serviceUpdate?.production_status == "On Test"}
                  value="On Test"
                >
                  On Test
                </option>
              </select>
            </fieldset>
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
                defaultValue={serviceUpdate?.release_date}
                className="outline-none p-2 bg-white"
              />
            </fieldset>
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
                    name="free"
                    id=""
                    className="w-4 h-4"
                    value={"Free"}
                  />
                  <label htmlFor="free">Free</label>
                </div>
                <div className="space-x-2">
                  <input
                    type="checkbox"
                    name="pro"
                    id=""
                    className="w-4 h-4"
                    value={"Pro"}
                  />
                  <label htmlFor="pro">Pro</label>
                </div>
              </div>

              {/* <select
                defaultValue={serviceUpdate?.paid_status}
                name="paid_status"
                className="outline-none p-2 bg-white"
              >
                <option
                  selected={serviceUpdate?.paid_status == "Free"}
                  value="Free"
                >
                  Free
                </option>
                <option
                  selected={serviceUpdate?.paid_status == "Pro"}
                  value="Pro"
                >
                  Pro
                </option>
              </select> */}
            </fieldset>
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
                name="visit_type"
                id=""
                className="outline-none p-2 bg-white"
                defaultValue={serviceUpdate?.visit_type}
              >
                <option
                  selected={serviceUpdate?.visit_type == "Download"}
                  value="Download"
                >
                  Download
                </option>
                <option
                  selected={serviceUpdate?.visit_type == "Visit"}
                  value="Visit"
                >
                  Visit
                </option>
                <option
                  selected={serviceUpdate?.visit_type == "Subscribe"}
                  value="Subscribe"
                >
                  Subscribe
                </option>
              </select>
            </fieldset>
          </div>

          <div className="modal-action">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setServiceValidation({});
                  modelClose(serviceModal, serviceForm);
                  setPreviewSrc(null);
                  setTutorialVideo(null);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-3 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Home;
