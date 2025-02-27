"use client";
import Image from "next/image";
import React from "react";
import { text } from "stream/consumers";

const FileList = () => {
  return (
    <>
      <section className="container mx-auto px-2 lg:px-12 pt-[30px] relative">
        <div className="border border-gray-500 p-8 rounded-lg bg-white">
          <div className="pb-7">
            <h3 className="text-20 font-semibold pb-[29px]">All File Lists</h3>
            <form
            // onSubmit={HandleSearch}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <fieldset className="border border-gray-300 p-2 rounded-md text-14">
                  <legend>
                    <label htmlFor="title">Search</label>
                  </legend>
                  <input
                    name="search_string"
                    type="text"
                    className="w-full outline-none"
                    placeholder="Search by caption name"
                  />
                </fieldset>
              </div>
            </form>
          </div>

          <div className="">
            <h3 className="text-20 font-semibold border-b border-gray-500 pb-2 mb-4">
              Search Results
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-500 h-10">
                  <tr>
                    <th>SI</th>
                    <th>File</th>
                    <th>Caption name</th>
                    <th>url</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr className="border-b border-gray-500 h-28">
                    <td>1</td>
                    <td>
                      <div className="flex justify-center items-center">
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                            (process.env.NEXT_PUBLIC_DEFAULT_IMAGE ||
                              "/default-image.png")
                          }
                          alt="file"
                          width={50}
                          height={50}
                          className="w-24 h-24"
                        />
                      </div>
                    </td>
                    <td>All File Lists All File Lists All File Lists</td>
                    <td>
                      <input
                        type="text"
                        className="w-[300px] rounded-t-sm border border-gray px-2 py-1 focus:outline-none"
                        value={"text data"}
                      />
                    </td>
                    <td>
                      <button className="p-1  bg-red-500 text-white active:scale-90 transition-all duration-400 rounded-md">
                        <svg
                          className="w-4 h-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FileList;
