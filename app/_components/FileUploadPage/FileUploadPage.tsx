"use client";
import Image from "next/image";
import React, { useState } from "react";
import FileChoiceIcon from "../FileChoiceIcon/FileChoiceIcon";
import { openFileManager } from "@/utilis/FileManagerFun";

const FileUploadPage = () => {
  const [formValues, setFormValues] = useState({
    caption: "",
    reference: "",
    file: null as File | null,
  });
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="max-w-5xl mx-auto bg-white p-6 shadow rounded-lg">
          <h2 className="text-24 font-semibold mb-4">Insert File</h2>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <fieldset className="flex flex-col border rounded-md px-2">
                <legend>
                  <label
                    htmlFor="caption"
                    className="after:content-['_*'] after:text-red-500"
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
                  className="outline-none p-2 bg-white"
                  placeholder="Enter Caption"
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="flex flex-col border rounded-md px-2">
                <legend>
                  <label
                    htmlFor="reference"
                    className="after:content-['_*'] after:text-red-500"
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
                  className="outline-none p-2 bg-white"
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
                    className="after:content-['_*'] after:text-red-500"
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
                  className="outline-none p-2 bg-white"
                />
              </fieldset>
              <div className="border p-2 rounded mt-2 h-24 w-40">
                {formValues.file && (
                  <FileChoiceIcon file={formValues.file} />
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
             className="bg-primary text-white px-6 py-2 rounded">
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploadPage;
