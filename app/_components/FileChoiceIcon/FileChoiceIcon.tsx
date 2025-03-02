import Image from "next/image";
import React from "react";
import { FaFileImage, FaFilePdf, FaFileWord, FaFileAlt } from "react-icons/fa";
const FileChoiceIcon = ({ file }: { file: File | null }) => {
  return (
    <>
      {file && (
        <>
          {file.type.startsWith("image/") ? (
            <Image
              src={file && URL.createObjectURL(file)}
              width={200}
              height={200}
              className="w-full h-full object-cover"
              alt="Placeholder"
            />
          ) : file.type === "application/pdf" ? (
            <FaFilePdf className="text-red-500 text-3xl w-14 h-20" />
          ) : file.type === "application/msword" ||
            file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
            <FaFileWord className="text-blue-700 text-3xl" />
          ) : (
            <FaFileAlt className="text-gray-500 text-3xl" />
          )}
        </>
      )}
    </>
  );
};

export default FileChoiceIcon;
