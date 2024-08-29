'use client';

import { useState } from "react";
import Image from "next/image";
import { relative_image_path } from "@/helper";

const Home = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [edit, setEdit] = useState(false);

  const [formInputs, setFormInputs] = useState({
    username: "John Doe",
    email: "john@gmail.com",
    password: "123456",
    confirmPassword: "123456",
  });

  


  return (
    <section>
      <div className=" w-full p-4 rounded flex flex-wrap justify-between items-center pb-5">
        <h3 className="text-24 lg:text-32 font-mono font-bold text-[#151D48]">
          My Profile
        </h3>
        {!edit && (
          <button
            onClick={() => setEdit(true)}
            className="flex items-center gap-2 border border-primary px-2 py-1 lg:px-4 lg:py-2 rounded-md text-primary text-14"
          >
            <span>
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
              </svg>
            </span>
            <span>Edit</span>
          </button>
        )}
      </div>
      <div className="bg-white w-full p-4 rounded-md">
        <div className="flex flex-wrap items-center gap-4 border border-gray-300 p-4 rounded-md overflow-hidden mb-5">
          <Image
            className="w-20 h-20 rounded-full"
            width={1000}
            height={1000}
            src={relative_image_path("dummy_image1.jpg")}
            alt="Bangla"
          />
          <div className="text-gray-500">
            <p>{formInputs?.username}</p>
            <p>{formInputs?.email}</p>
          </div>
        </div>
        <div className="border border-gray-300 p-4 rounded-md mb-2">
          <h3 className="text-20 font-mono font-bold text-[#151D48] pb-3 overflow-hidden">
            Personal Information
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="lg:w-[45%] overflow-hidden">
              <p className="text-gray-500 text-14">Name:</p>
              {edit ? (
                <input
                  onChange={(e) => {
                    setFormInputs({ ...formInputs, username: e.target.value });
                  }}
                  type="text"
                  name="username"
                  value={formInputs?.username}
                  className="border border-gray-300 p-2 outline-none text-gray-700 rounded-md text-14 lg:text-16"
                />
              ) : (
                <p className="text-gray-700">{formInputs?.username}</p>
              )}
            </div>
            <div className="lg:w-[45%] overflow-hidden">
              <p className="text-gray-500 text-14">Email:</p>
              {edit ? (
                <input
                  type="email"
                  name="email"
                  onChange={(e) => {
                    setFormInputs({ ...formInputs, email: e.target.value });
                  }}
                  value={formInputs?.email}
                  className="border border-gray-300 p-2 outline-none text-gray-700 rounded-md text-14 lg:text-16"
                />
              ) : (
                <p className="text-gray-700">{formInputs?.email}</p>
              )}
            </div>
          </div>
        </div>
        <div className="border border-gray-300 p-4 rounded-md overflow-hidden">
          <h3 className="text-20 font-mono font-bold text-[#151D48] pb-3">
            Security Information
          </h3>
          <div className="grid grid-cols-1">
            {edit ? (
              <div className="flex flex-col lg:flex-row gap-2">
                <div>
                  <p className="text-gray-500 text-14">Password:</p>
                  <div className="flex items-center gap-2">
                    <input
                      onChange={(e) => {
                        setFormInputs({
                          ...formInputs,
                          password: e.target.value,
                        });
                      }}
                      type={passwordVisibility ? "text" : "password"}
                      name="password"
                      value={formInputs?.password}
                      id=""
                      className="border border-[#979C9E] rounded-md text-13 lg:text-15 placeholder:text-[#979C9E] px-2"
                    />
                    <button
                      onClick={() => setPasswordVisibility(!passwordVisibility)}
                    >
                      {!passwordVisibility ? (
                        <span title="Show Password">
                          <svg
                            className="w-5 h-5 fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                          </svg>
                        </span>
                      ) : (
                        <span title="Hide Password">
                          <svg
                            className="w-5 h-5 fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                          >
                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-14">Confirm Password:</p>
                  <div className="flex items-center gap-2">
                    <input
                      type={passwordVisibility ? "text" : "password"}
                      name="confirmPassword"
                      onChange={(e) => {
                        setFormInputs({
                          ...formInputs,
                          confirmPassword: e.target.value,
                        });
                      }}
                      value={formInputs?.confirmPassword}
                      id=""
                      className="border border-[#979C9E] rounded-md text-13 lg:text-15 placeholder:text-[#979C9E] px-2"
                    />
                    <button
                      onClick={() => setPasswordVisibility(!passwordVisibility)}
                    >
                      {!passwordVisibility ? (
                        <span title="Show Password">
                          <svg
                            className="w-5 h-5 fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                          </svg>
                        </span>
                      ) : (
                        <span title="Hide Password">
                          <svg
                            className="w-5 h-5 fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                          >
                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-500 text-14">Password:</p>
                <div className="flex items-center overflow-hidden">
                  <input
                    type={passwordVisibility ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formInputs?.password}
                    className="outline-none max-w-48"
                    readOnly
                  />
                  <button
                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                  >
                    {!passwordVisibility ? (
                      <span title="Show Password">
                        <svg
                          className="w-5 h-5 fill-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                        </svg>
                      </span>
                    ) : (
                      <span title="Hide Password">
                        <svg
                          className="w-5 h-5 fill-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                        >
                          <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {edit && (
          <div className="flex justify-end gap-4 pt-12">
            <button
              onClick={() => setEdit(false)}
              className="bg-gray-200 text-gray-700 border border-gray-400 rounded text-14 lg:text-16 px-2 py-1 lg:px-4 lg:py-2"
            >
              Cancel
            </button>
            <button
              onClick={() => setEdit(false)}
              className="bg-primary text-white border border-primary rounded text-14 lg:text-16 px-2 py-1 lg:px-4 lg:py-2"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
