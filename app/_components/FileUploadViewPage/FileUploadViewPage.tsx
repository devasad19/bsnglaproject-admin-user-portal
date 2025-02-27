"use client";
import Image from "next/image";
import React, { useState } from "react";
import FileChoiceIcon from "../FileChoiceIcon/FileChoiceIcon";
import { openFileManager } from "@/utilis/FileManagerFun";

const FileUploadViewPage = () => {
  const [formValues, setFormValues] = useState({
    caption: "",
    reference: "",
    file: null as File | null,
  });
  return (
    <>
      <div className="w-full">
        <div className="w-full mx-auto bg-white p-6 shadow rounded-lg px-6">
          <h2 className="text-24 font-semibold mb-4">Upload File</h2>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <fieldset className="flex flex-col border rounded-md px-2">
                <legend>
                  <label
                    htmlFor="caption"
                    className="after:content-['_*'] after:text-red-500 text-sm"
                  >
                    Caption
                  </label>
                </legend>

                <input
                  type="text"
                  value={formValues.caption}
                  onChange={(e) =>
                    setFormValues({ ...formValues, caption: e.target.value })
                  }
                  className="outline-none px-2 py-1 bg-white"
                  placeholder="Enter Caption"
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="flex flex-col border rounded-md px-2">
                <legend>
                  <label
                    htmlFor="reference"
                    className="after:content-['_*'] after:text-red-500 text-sm"
                  >
                    Reference
                  </label>
                </legend>

                <input
                  type="text"
                  value={formValues.reference}
                  onChange={(e) =>
                    setFormValues({ ...formValues, reference: e.target.value })
                  }
                  className="outline-none px-2 py-1 bg-white"
                  placeholder="Enter Reference"
                />
              </fieldset>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6 items-start">
            <div>
              <fieldset className="flex flex-col border rounded-md px-2">
                <legend>
                  <label
                    htmlFor="reference"
                    className="after:content-['_*'] after:text-red-500 text-sm"
                  >
                    File Or Image
                  </label>
                </legend>

                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFormValues({ ...formValues, file: e.target.files[0] });
                    }
                  }}
                  className="outline-none px-2 py-1 bg-white"
                />
              </fieldset>
              <div className="border p-2 rounded mt-2 h-24 w-40">
                {formValues.file && <FileChoiceIcon file={formValues.file} />}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => {
                openFileManager();
              }}
              className="bg-primary text-white px-6 py-2 rounded"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploadViewPage;
