"use client";
import { getAllFiles } from "@/app/(admin)/_api/fileManagerApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFilesApi = async () => {
    setLoading(true);
    try {
      const response = await getAllFiles();
      setFiles(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFilesApi();
  }, []);

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
                  {files?.length > 0 ? (
                    files.map((file: any, index:number) => (
                      <tr key={index} className="border-b border-gray-500 h-28">
                        <td>{index+1}</td>
                        <td>
                          <div className="flex justify-center items-center w-24 h-24">
                            <Image
                              src={
                                file?.filepath
                                  ? (process.env.NEXT_PUBLIC_IMAGE_URL || "") +
                                    file?.filepath
                                  : (process.env.NEXT_PUBLIC_IMAGE_URL || "") +
                                    process.env.NEXT_PUBLIC_DEFAULT_IMAGE
                              }
                              alt="file"
                              width={50}
                              height={50}
                              className=""
                            />
                          </div>
                        </td>
                        <td>{file?.caption || ""}</td>
                        <td>
                          <input
                            type="text"
                            className="w-[300px] rounded-t-sm border border-gray px-2 py-1 focus:outline-none"
                            value={
                              file?.filepath
                                ? (process.env.NEXT_PUBLIC_IMAGE_URL || "") +
                                  file?.filepath
                                : ""
                            }
                          />
                        </td>
                        <td>
                          <button className="px-2 py-1  bg-blue-500 text-white active:scale-90 transition-all duration-400 rounded-md">
                            <CiEdit />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>No data found</td>
                    </tr>
                  )}
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
