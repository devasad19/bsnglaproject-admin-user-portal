import { log } from "node:console";
import React, { useState } from "react";

interface TCustomPaginationWIthFilterProps {
  allData: any;
  filterData: any;
  setData: any;
  setSearchByName: any;
  setFilterData: any;
  currentPage: number;
  setCurrentPage: any;
  setDisplayItems: any;
}

const CustomPaginationWIthFilter = ({
  filterData,
  currentPage,
  setCurrentPage,
  setDisplayItems,
}: TCustomPaginationWIthFilterProps) => {
  const itemsPerPage = 10; // Customize items per page

  // Calculate total pages
  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  // Get items for the current page
  setDisplayItems(
    filterData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
  );

  // Handlers for pagination
  const handlePreviousClick = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={handlePreviousClick}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-primary text-white"
          }`}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => setCurrentPage(pageIndex + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === pageIndex + 1
                ? "bg-primary text-white"
                : "bg-white text-primary border border-primary"
            }`}
          >
            {pageIndex + 1}
          </button>
        ))}

        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500"
              : "bg-primary text-white"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CustomPaginationWIthFilter;
