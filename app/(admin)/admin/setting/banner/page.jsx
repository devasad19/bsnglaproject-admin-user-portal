'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { relative_image_path } from "@/helper";


const Home = () => {
  const [btnToggle, setBtnToggle] = useState(false);

    return (
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
              Banner
            </h3>
          </div>
          <div>
            <button
              className="bg-blue-500 px-4 py-2 rounded text-white"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Add Slider
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box bg-white">
                <h3 className="font-bold text-lg pb-3">Add New Slider</h3>
                <div>
                  <form action="#" className="grid grid-cols-1 gap-2">
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
                    <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                      <legend>
                        <label
                          htmlFor="slider_description"
                          className="text-14 bg-white px-2"
                        >
                          Add Slider Description:
                        </label>
                      </legend>
                      <textarea
                        name="slider_description"
                        id="slider_description"
                        placeholder="Enter Slider Description"
                        className="outline-none text-14 p-2 w-full"
                      ></textarea>
                    </fieldset>
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
            </dialog>
            {/* <Modal trigger={"Upload Banner"} title={"Add Banner"}>
              <div className="flex items-center gap-4 mt-2">
                <p>Select Image: </p>
                <input type="file" name="" id="" />
              </div>
            </Modal> */}
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-white h-16">
                <th>Number</th>
                <th>Picture</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr className="h-16">
                <td>
                  <span className="border border-gray-300 px-2 py-1 rounded-md">
                    1
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("hero_slider1.png")}
                      className="w-[7.8125em] h-[3.57375em]"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => setBtnToggle(!btnToggle)}
                    className="text-white"
                  >
                    <span
                      className={`p-2 border border-gray-500 ${
                        btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      on
                    </span>
                    <span
                      className={`p-2 border border-gray-500 ${
                        !btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      off
                    </span>
                  </button>
                </td>
                <td>
                  <div className="space-x-3">
                    <button
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
                          <form action="#" className="grid grid-cols-1 gap-2">
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
                            <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                              <legend>
                                <label
                                  htmlFor="slider_description"
                                  className="text-14 bg-white px-2"
                                >
                                  Add Slider Description:
                                </label>
                              </legend>
                              <textarea
                                name="slider_description"
                                id="slider_description"
                                placeholder="Enter Slider Description"
                                className="outline-none text-14 p-2 w-full"
                              ></textarea>
                            </fieldset>
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
                    </dialog>
                    <button className="border border-gray-300 p-1 rounded-md">
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
              <tr className="h-16">
                <td>
                  <span className="border border-gray-300 px-2 py-1 rounded-md">
                    2
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("hero_slider1.png")}
                      className="w-[7.8125em] h-[3.57375em]"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => setBtnToggle(!btnToggle)}
                    className="text-white"
                  >
                    <span
                      className={`p-2 border border-gray-500 ${
                        btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      on
                    </span>
                    <span
                      className={`p-2 border border-gray-500 ${
                        !btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      off
                    </span>
                  </button>
                </td>
                <td>
                  <div className="space-x-3">
                    <button
                      className="border border-gray-300 p-1 rounded-md"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
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
                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box bg-white">
                        <h3 className="font-bold text-lg text-left pb-3">
                          Edit Slider
                        </h3>
                        <div>
                          <form action="#" className="grid grid-cols-1 gap-2">
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
                            <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                              <legend>
                                <label
                                  htmlFor="slider_description"
                                  className="text-14 bg-white px-2"
                                >
                                  Add Slider Description:
                                </label>
                              </legend>
                              <textarea
                                name="slider_description"
                                id="slider_description"
                                placeholder="Enter Slider Description"
                                className="outline-none text-14 p-2 w-full"
                              ></textarea>
                            </fieldset>
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
                    </dialog>
                    <button className="border border-gray-300 p-1 rounded-md">
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
              <tr className="h-16">
                <td>
                  <span className="border border-gray-300 px-2 py-1 rounded-md">
                    3
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("hero_slider1.png")}
                      className="w-[7.8125em] h-[3.57375em]"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => setBtnToggle(!btnToggle)}
                    className="text-white"
                  >
                    <span
                      className={`p-2 border border-gray-500 ${
                        btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      on
                    </span>
                    <span
                      className={`p-2 border border-gray-500 ${
                        !btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      off
                    </span>
                  </button>
                </td>
                <td>
                  <div className="space-x-3">
                    <button
                      className="border border-gray-300 p-1 rounded-md"
                      onClick={() =>
                        document.getElementById("my_modal_4").showModal()
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
                    <dialog id="my_modal_4" className="modal">
                      <div className="modal-box bg-white">
                        <h3 className="font-bold text-lg text-left pb-3">
                          Edit Slider
                        </h3>
                        <div>
                          <form action="#" className="grid grid-cols-1 gap-2">
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
                            <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                              <legend>
                                <label
                                  htmlFor="slider_description"
                                  className="text-14 bg-white px-2"
                                >
                                  Add Slider Description:
                                </label>
                              </legend>
                              <textarea
                                name="slider_description"
                                id="slider_description"
                                placeholder="Enter Slider Description"
                                className="outline-none text-14 p-2 w-full"
                              ></textarea>
                            </fieldset>
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
                    </dialog>
                    <button className="border border-gray-300 p-1 rounded-md">
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
              <tr className="h-16">
                <td>
                  <span className="border border-gray-300 px-2 py-1 rounded-md">
                    4
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("hero_slider1.png")}
                      className="w-[7.8125em] h-[3.57375em]"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => setBtnToggle(!btnToggle)}
                    className="text-white"
                  >
                    <span
                      className={`p-2 border border-gray-500 ${
                        btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      on
                    </span>
                    <span
                      className={`p-2 border border-gray-500 ${
                        !btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      off
                    </span>
                  </button>
                </td>
                <td>
                  <div className="space-x-3">
                    <button
                      className="border border-gray-300 p-1 rounded-md"
                      onClick={() =>
                        document.getElementById("my_modal_5").showModal()
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
                    <dialog id="my_modal_5" className="modal">
                      <div className="modal-box bg-white">
                        <h3 className="font-bold text-lg text-left pb-3">
                          Edit Slider
                        </h3>
                        <div>
                          <form action="#" className="grid grid-cols-1 gap-2">
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
                            <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                              <legend>
                                <label
                                  htmlFor="slider_description"
                                  className="text-14 bg-white px-2"
                                >
                                  Add Slider Description:
                                </label>
                              </legend>
                              <textarea
                                name="slider_description"
                                id="slider_description"
                                placeholder="Enter Slider Description"
                                className="outline-none text-14 p-2 w-full"
                              ></textarea>
                            </fieldset>
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
                    </dialog>
                    <button className="border border-gray-300 p-1 rounded-md">
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
              <tr className="h-16">
                <td>
                  <span className="border border-gray-300 px-2 py-1 rounded-md">
                    5
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("hero_slider1.png")}
                      className="w-[7.8125em] h-[3.57375em]"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => setBtnToggle(!btnToggle)}
                    className="text-white"
                  >
                    <span
                      className={`p-2 border border-gray-500 ${
                        btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      on
                    </span>
                    <span
                      className={`p-2 border border-gray-500 ${
                        !btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      off
                    </span>
                  </button>
                </td>
                <td>
                  <div className="space-x-3">
                    <button
                      className="border border-gray-300 p-1 rounded-md"
                      onClick={() =>
                        document.getElementById("my_modal_6").showModal()
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
                    <dialog id="my_modal_6" className="modal">
                      <div className="modal-box bg-white">
                        <h3 className="font-bold text-lg text-left pb-3">
                          Edit Slider
                        </h3>
                        <div>
                          <form action="#" className="grid grid-cols-1 gap-2">
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
                            <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                              <legend>
                                <label
                                  htmlFor="slider_description"
                                  className="text-14 bg-white px-2"
                                >
                                  Add Slider Description:
                                </label>
                              </legend>
                              <textarea
                                name="slider_description"
                                id="slider_description"
                                placeholder="Enter Slider Description"
                                className="outline-none text-14 p-2 w-full"
                              ></textarea>
                            </fieldset>
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
                    </dialog>
                    <button className="border border-gray-300 p-1 rounded-md">
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
              {/* <tr className="h-16">
                <td>
                  <span className="border border-gray-300 px-2 py-1 rounded-md">
                    6
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("hero_slider1.png")}
                      className="w-[7.8125em] h-[3.57375em]"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => setBtnToggle(!btnToggle)}
                    className="text-white"
                  >
                    <span
                      className={`p-2 border border-gray-500 ${
                        btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      on
                    </span>
                    <span
                      className={`p-2 border border-gray-500 ${
                        !btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      off
                    </span>
                  </button>
                </td>
                <td>
                  <div className="space-x-3">
                    <button className="border border-gray-300 p-1 rounded-md">
                      <svg
                        className="w-6 h-6 fill-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                      </svg>
                    </button>
                    <button className="border border-gray-300 p-1 rounded-md">
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
              <tr className="h-16">
                <td>
                  <span className="border border-gray-300 px-2 py-1 rounded-md">
                    7
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("hero_slider1.png")}
                      className="w-[7.8125em] h-[3.57375em]"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => setBtnToggle(!btnToggle)}
                    className="text-white"
                  >
                    <span
                      className={`p-2 border border-gray-500 ${
                        btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      on
                    </span>
                    <span
                      className={`p-2 border border-gray-500 ${
                        !btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      off
                    </span>
                  </button>
                </td>
                <td>
                  <div className="space-x-3">
                    <button className="border border-gray-300 p-1 rounded-md">
                      <svg
                        className="w-6 h-6 fill-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                      </svg>
                    </button>
                    <button className="border border-gray-300 p-1 rounded-md">
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
              <tr className="h-16">
                <td>
                  <span className="border border-gray-300 px-2 py-1 rounded-md">
                    8
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("hero_slider1.png")}
                      className="w-[7.8125em] h-[3.57375em]"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => setBtnToggle(!btnToggle)}
                    className="text-white"
                  >
                    <span
                      className={`p-2 border border-gray-500 ${
                        btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      on
                    </span>
                    <span
                      className={`p-2 border border-gray-500 ${
                        !btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      off
                    </span>
                  </button>
                </td>
                <td>
                  <div className="space-x-3">
                    <button className="border border-gray-300 p-1 rounded-md">
                      <svg
                        className="w-6 h-6 fill-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                      </svg>
                    </button>
                    <button className="border border-gray-300 p-1 rounded-md">
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
              <tr className="h-16">
                <td>
                  <span className="border border-gray-300 px-2 py-1 rounded-md">
                    9
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("hero_slider1.png")}
                      className="w-[7.8125em] h-[3.57375em]"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => setBtnToggle(!btnToggle)}
                    className="text-white"
                  >
                    <span
                      className={`p-2 border border-gray-500 ${
                        btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      on
                    </span>
                    <span
                      className={`p-2 border border-gray-500 ${
                        !btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      off
                    </span>
                  </button>
                </td>
                <td>
                  <div className="space-x-3">
                    <button className="border border-gray-300 p-1 rounded-md">
                      <svg
                        className="w-6 h-6 fill-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                      </svg>
                    </button>
                    <button className="border border-gray-300 p-1 rounded-md">
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
              <tr className="h-16">
                <td>
                  <span className="border border-gray-300 px-2 py-1 rounded-md">
                    10
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("hero_slider1.png")}
                      className="w-[7.8125em] h-[3.57375em]"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => setBtnToggle(!btnToggle)}
                    className="text-white"
                  >
                    <span
                      className={`p-2 border border-gray-500 ${
                        btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      on
                    </span>
                    <span
                      className={`p-2 border border-gray-500 ${
                        !btnToggle ? "bg-primary" : "bg-gray-500"
                      }`}
                    >
                      off
                    </span>
                  </button>
                </td>
                <td>
                  <div className="space-x-3">
                    <button className="border border-gray-300 p-1 rounded-md">
                      <svg
                        className="w-6 h-6 fill-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                      </svg>
                    </button>
                    <button className="border border-gray-300 p-1 rounded-md">
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
              </tr> */}
            </tbody>
          </table>
        </div>
      </section>
    );
};

export default Home;