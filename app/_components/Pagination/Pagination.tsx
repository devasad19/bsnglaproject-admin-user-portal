import React from "react";

interface PaginationProps {
    displayedItems: any[];
    handlePreviousClick: () => void;
    currentPage: number;
    totalPages: number;
    setCurrentPage:any;
    handlePageClick: (pageIndex: number) => void;
    handleNextClick: () => void;
}

const Pagination = ({
  handlePreviousClick,
  currentPage,
  totalPages,
  setCurrentPage,
  handleNextClick,
}:PaginationProps) => {
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

export default Pagination;
