"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { modelClose, modelOpen } from "@/helper";
import Modal from "@/app/_components/Modal/Modal";
import { useForm } from "react-hook-form";
import {
  AddSLiderApi,
  getAllSliderApi,
  sliderUpdateStatus,
} from "@/app/(portal)/_api/SliderApi/SliderApi";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { DeleteSlider } from "@/app/(admin)/_api";

const Home = () => {

  const sliderAddModal = useRef(null);
  const sliderAddForm = useRef(null);
  const [slider, setSlider] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchApi, setFetchAPi] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    const fetchSlider = async () => {
      const resSlider = await getAllSliderApi();
      setSlider(resSlider?.data);
      setLoading(false);
    };
    fetchSlider();
  }, [fetchApi]);


  const setBtnToggle = async (status, id) => {
    const sliderRes = await sliderUpdateStatus(id, status);
    if (sliderRes.status) {
      setFetchAPi(!fetchApi);
      toast.success("Slider status updated successfully");
    }
  }

  const onSliderSubmit = async (data) => {
    const { slider_image, caption_text, caption_text_link, caption_button, caption_button_link, slider_status, link } = data;
    let fromData = new FormData();
    fromData.append("img", slider_image[0]);
    fromData.append("caption_text", caption_text);
    fromData.append("caption_text_link", caption_text_link);
    fromData.append("caption_btn", caption_button);
    fromData.append("caption_btn_link", caption_button_link);
    fromData.append("status", slider_status);
    fromData.append("link", link);

    const sliderRe = await AddSLiderApi(fromData);

    if (sliderRe.status) {
      setFetchAPi(!fetchApi);
      reset();
      modelClose(sliderAddModal, sliderAddForm);
      toast.success("Slider Added Successfully");
    } else {
      toast.error("Something went wrong");
    }
  };


  const HandleDelete = (id) => {
    setLoading(true);
    if (id) {
      DeleteSlider(id).then((data) => {
        if (data) {
          setFetchAPi(!fetchApi);
          toast.success("Slider Deleted Successfully");
        } else {
          toast.error("Something went wrong");
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      });
    }
  };


  console.log('admin sliders: ', slider)

  return (
    <>
      <section className="bg-white rounded-lg p-4 shadow-lg min-h-screen">
        <div className=" w-full inline-flex flex-col lg:flex-row justify-between pb-6">
          <div className="flex items-center gap-4">
            <Link
              href={{
                pathname: "/admin/setting/frontend-setting",
              }}
              shallow
            >
              <svg
                className="w-6 h-6 fill-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </Link>

            <h3 className="text-32 font-mono font-bold text-[#151D48]">
              Slider List
            </h3>
          </div>
          <div>
            <button
              className="bg-blue-500 px-4 py-2 rounded text-white"
              onClick={() => modelOpen(sliderAddModal)}
            >
              Add Slider
            </button>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-white h-16 px-2">
                <th className="px-2">Serial</th>
                <th>Banner</th>
                <th>Url</th>
                <th>Caption Text</th>
                <th>Caption Button Text</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {loading && (
                <tr>
                  <td colSpan={7}>
                    <Skeleton width="100%" count={10} height={50} />
                  </td>
                </tr>
              )}
              {slider?.length > 0 ? (
                slider?.map((item, index) => (
                  <tr key={index} className="h-16">
                    <td className="px-3">
                      <span className="border border-gray-300 px-2 py-1 rounded-md">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-3">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.img}`}
                        className="w-[7.8125em] h-[3.57375em]"
                        width={1000}
                        height={1000}
                        alt="Bangla"
                      />
                    </td>
                    <td>
                      {
                        item?.link
                      }
                    </td>
                    <td className="px-3">
                      <p className="text-14 font-bold">{item?.caption_text?.slice(0, 20)}</p>
                    </td>
                    <td className="px-3">
                      <p className="text-14 font-bold">{item?.caption_btn}</p>
                    </td>

                    <td className="px-4">{
                      slider?.status == 1 ? "Active" : "Inactive"
                    }</td>
                    <td className="px-3">
                      <div className="flex items-center gap-2">
                        {/* <button
                          className="border border-gray-300 p-1 rounded-md"
                          onClick={() =>
                            document.getElementById("my_modal_2").showModal()
                          }
                        >
                          <svg
                            className="w-6 h-6 fill-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                          </svg>
                        </button>
                        <dialog id="my_modal_2" className="modal">
                          <div className="modal-box bg-white">
                            <h3 className="font-bold text-lg text-left pb-3">
                              Edit Slider
                            </h3>
                            <div>
                              <form
                                action="#"
                                className="grid grid-cols-1 gap-2"
                              >
                                <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                                  <legend>
                                    <label
                                      htmlFor="slider_image"
                                      className="text-14  bg-white px-2"
                                    >
                                      Select Slider Image:
                                    </label>
                                  </legend>
                                  <input
                                    type="file"
                                    name="slider_image"
                                    id="slider_image"
                                    className="p-2 w-full"
                                  />
                                </fieldset>

                                <div>
                                  <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                                    <legend>
                                      <label
                                        htmlFor="link"
                                        className="text-14 bg-white px-2"
                                      >
                                        Url:
                                      </label>
                                    </legend>
                                    <input
                                      {...register("link")}
                                      id="link"
                                      placeholder="Enter Slider url"
                                      className="outline-none text-14 p-2 w-full"
                                    ></input>
                                  </fieldset>
                                </div>
                                <div>
                                  <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                                    <legend>
                                      <label
                                        htmlFor="slider_description"
                                        className="text-14 bg-white px-2"
                                      >
                                        Caption Text:
                                      </label>
                                    </legend>
                                    <input
                                      {...register("caption_text")}
                                      id="slider_description"
                                      placeholder="Enter Slider Description"
                                      className="outline-none text-14 p-2 w-full"
                                    ></input>
                                  </fieldset>
                                </div>
                                <div>
                                  <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                                    <legend>
                                      <label
                                        htmlFor="caption_button"
                                        className="text-14 bg-white px-2"
                                      >
                                        Caption Button Text:
                                      </label>
                                    </legend>
                                    <input
                                      {...register("caption_button")}
                                      id="caption_button"
                                      placeholder="Enter caption button text"
                                      className="outline-none text-14 p-2 w-full"
                                    ></input>
                                  </fieldset>
                                </div>
                                <div>
                                  <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                                    <legend>
                                      <label
                                        htmlFor="slider_status"
                                        className="text-14 p-2 bg-white"
                                      >
                                        Select Slider Status:
                                      </label>
                                    </legend>
                                    <select
                                      {...register("slider_status", { required: true })}
                                      id="slider_status"
                                      className="text-14 p-2 bg-white"
                                    >
                                      <option value="1">Active</option>
                                      <option value="2">Inactive</option>
                                    </select>
                                  </fieldset>
                                </div>


                                <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                                  <legend>
                                    <label
                                      htmlFor="slider_status"
                                      className="text-14 p-2 bg-white"
                                    >
                                      Select Slider Status:
                                    </label>
                                  </legend>
                                  <select
                                    name="slider_status"
                                    id="slider_status"
                                    className="text-14 p-2 bg-white"
                                  >
                                    <option value="1">Active</option>
                                    <option value="2">Inactive</option>
                                  </select>
                                </fieldset>
                              </form>
                            </div>
                            <div className="modal-action">
                              <form method="dialog" className="flex gap-2">
                                <button className="bg-red-500 px-4 py-2 rounded text-white">
                                  Cancel
                                </button>
                                <button className="bg-blue-500 px-4 py-2 rounded text-white">
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </dialog> */}

                        
                        <Link href={{
                          pathname: `/admin/setting/banner/edit/${item.id}`
                        }} shallow>
                          <svg
                            className="w-6 h-6 fill-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                          </svg>
                        </Link>


                        <button onClick={() => HandleDelete(item.id)} className=" p-1 rounded-md">
                          <svg
                            className="w-6 h-6 fill-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <Modal
        modalForm={sliderAddForm}
        modalRef={sliderAddModal}
        title={"Add Slider Form"}
      >
        <div>
          <form
            onSubmit={handleSubmit(onSliderSubmit)}
            className="grid grid-cols-1 gap-2"
            ref={sliderAddForm}
          >
            <div>
              <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                <legend>
                  <label
                    htmlFor="slider_image"
                    className="text-14  bg-white px-2"
                  >
                    Select Slider Image:
                  </label>
                </legend>
                <input
                  type="file"
                  {...register("slider_image", { required: true })}
                  id="slider_image"
                  className="p-2 w-full"
                />
              </fieldset>
              {errors.slider_image && (
                <span className="text-red-500 text-12 px-2 pt-1">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                <legend>
                  <label
                    htmlFor="link"
                    className="text-14 bg-white px-2"
                  >
                    Url:
                  </label>
                </legend>
                <input
                  {...register("link")}
                  id="link"
                  placeholder="Enter Slider url"
                  className="outline-none text-14 p-2 w-full"
                ></input>
              </fieldset>
            </div>
            <div>
              <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                <legend>
                  <label
                    htmlFor="slider_description"
                    className="text-14 bg-white px-2"
                  >
                    Caption Text:
                  </label>
                </legend>
                <input
                  {...register("caption_text")}
                  id="slider_description"
                  placeholder="Enter Slider Description"
                  className="outline-none text-14 p-2 w-full"
                ></input>
              </fieldset>
            </div>
            <div>
              <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                <legend>
                  <label
                    htmlFor="caption_button"
                    className="text-14 bg-white px-2"
                  >
                    Caption Button Text:
                  </label>
                </legend>
                <input
                  {...register("caption_button")}
                  id="caption_button"
                  placeholder="Enter caption button text"
                  className="outline-none text-14 p-2 w-full"
                ></input>
              </fieldset>
            </div>
            <div>
              <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                <legend>
                  <label
                    htmlFor="slider_status"
                    className="text-14 p-2 bg-white"
                  >
                    Select Slider Status:
                  </label>
                </legend>
                <select
                  {...register("slider_status", { required: true })}
                  id="slider_status"
                  className="text-14 p-2 bg-white"
                >
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </select>
              </fieldset>
            </div>
            <div className="pt-6 flex justify-end">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    modelClose(sliderAddModal, sliderAddForm);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-3 rounded-md"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Home;
