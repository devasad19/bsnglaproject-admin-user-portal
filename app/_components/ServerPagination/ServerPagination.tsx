"use client";
import { useRouter } from "next/navigation";
import React from "react";

type TServerPaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  showPage: number;
  // setCurrentPage? :any;
};

const ServerPagination = ({
  page,
  setPage,
  showPage,
}: TServerPaginationProps) => {
  const router = useRouter();
  const handlePageChange = (newPage:number) => {
    setPage(newPage);
    console.log({newPage});
    
    router.push(`?page=${newPage}`, undefined, ); // Update URL without reloading
  };
  console.log({page});
  
  return (
    <>
      <div className="flex justify-center mt-6 gap-2">
        {/* Previous Button */}
        <button
          disabled={page === 1}
          onClick={() =>{
            
            setPage((prev: number) => prev - 1)
            handlePageChange(page - 1)
          }}
          className={`px-3 py-1 rounded ${
            page === 1
              ? "bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed"
              : "bg-primary text-white"
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex gap-1">
          {Array.from({ length: showPage }).map((_, index) => (
            <button
              key={index}
              
              onClick={() => {
                handlePageChange(index + 1)
                setPage(index + 1)}}
              className={`px-3 py-1 rounded ${
                page === index + 1
                  ? "bg-primary text-white"
                  : "bg-white text-primary border border-primary"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          disabled={page === showPage}
          onClick={() => {
           
            setPage((prev: number) => prev + 1)
            handlePageChange(page + 1)
          }}
          className={`px-3 py-1 rounded ${
            page === showPage
              ? "bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed"
              : "bg-primary text-white"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ServerPagination;
