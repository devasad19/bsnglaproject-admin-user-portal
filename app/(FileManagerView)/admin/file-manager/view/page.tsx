"use client";
import FileUploadViewPage from "@/app/_components/FileUploadViewPage/FileUploadViewPage";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const FileManager = () => {
  const searchParams = useSearchParams();
  const isMultiple = searchParams.get("multiple") === "true";
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const data = [
    { id: 1, title: "Image 1" },
    { id: 2, title: "Image 2" },
    { id: 3, title: "Image 3" },
    { id: 4, title: "Image 4" },
    { id: 5, title: "Image 5" },
    { id: 6, title: "Image 6" },
    { id: 7, title: "Image 7" },
    { id: 8, title: "Image 8" },
    { id: 9, title: "Image 9" },
    { id: 10, title: "Image 10" },
  ];

  const handleImageClick = (imageId: number) => {
    if (isMultiple) {
      setSelectedImages(
        (prev: any) =>
          prev.includes(imageId)
            ? prev.filter((id: number) => id !== imageId) // Remove if already selected
            : [...prev, imageId] // Add if not selected
      );
    } else {
      window.opener.postMessage(
        { type: "SELECT_IMAGE", imageIds: [imageId] },
        window.location.origin
      );
      window.close();
    }
  };

  console.log("Selected Images:", selectedImages);

  const handleSubmitMultipleSelection = () => {
    window.opener.postMessage(
      { type: "SELECT_IMAGE", imageIds: selectedImages },
      window.location.origin
    );
    window.close();
  };

  return (
    <div className="bg-white w-full h-screen px-8 py-2">
      <div className="flex justify-between items-center">
        <FileUploadViewPage />
      </div>
      <div className="bg-white">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Images List</h2>
              <div>
                <input
                  type="text"
                  placeholder="Search"
                  className="border rounded-md px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Search
                </button>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  Reset
                </button>
              </div>
            </div>
            <div>
              {isMultiple && (
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSubmitMultipleSelection}
                >
                  Select {selectedImages.length} Image(s)
                </button>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.map((item) => (
                  <div
                    onClick={() => {
                      handleImageClick(item.id);
                    }}
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm cursor-pointer"
                  >
                    <div
                      className="p-4"
                      style={{ height: "200px" }}
                      key={item.id}
                    >
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManager;
