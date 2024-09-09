import React from "react";

type TPaginationProps = {
  page: number;
  pageNumberArr: number[];
  setPage: (page: number) => void;
  totalNumberOfPage: number;
};

const Pagination = ({
  page,
  pageNumberArr,
  setPage,
  totalNumberOfPage,
}: TPaginationProps) => {
  return (
    <>
      <div className="pt-10 flex justify-center">
        <div className="flex items-center gap-2">
          {page !== 1 && (
            <button
              onClick={() => setPage(page - 1)}
              className="p-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 bg-primary text-white"
            >
              Prev
            </button>
          )}

          {pageNumberArr.map((item: number, index) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              className={`px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border  ${
                page == item ? "border-green-800" : "border-gray-300"
              }`}
            >
              {item}
            </button>
          ))}

          <span>...</span>

          {page !== totalNumberOfPage && (
            <button
              onClick={() => setPage(page + 1)}
              className="p-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 bg-primary text-white"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Pagination;
