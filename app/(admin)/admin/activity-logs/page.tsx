"use client";
import { getAllActivityLogsApi } from "@/app/(portal)/_api";

import TableSkeleton from "@/app/_components/TableSkeleton/TableSkeleton";
import { TActivityLog } from "@/types/ActivityLog";
import { PaginationTotalPage } from "@/utilis/PageNumberArr";
import { useEffect, useState } from "react";


const Home = (): JSX.Element => {
  const [activityLogs, setActivityLogs] = useState<TActivityLog[] | []>([]);
  const [totalActivity, setTotalActivity] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadActivityLogs = async () => {
      setIsLoading(true);
      try {
        const activityData = await getAllActivityLogsApi(page, limit);
        setActivityLogs(activityData?.data);
        setTotalActivity(activityData?.total);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load orders:", error);
        setIsLoading(false);
      }
    };
  
    loadActivityLogs();
  }, [page, limit]);
  const totalPaginationCalculate = PaginationTotalPage(totalActivity, limit);
  return (
    <section className="bg-white p-4">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-0 pb-5">
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
          <p className="pt-1">Filter by date: </p>
          <div className="flex flex-col lg:flex-row gap-2">
            <fieldset className="flex flex-col border border-gray-500 px-2">
              <legend>
                <label htmlFor="FromDate" className="text-12">
                  From
                </label>
              </legend>
              <input id="FromDate" type="date" className=" outline-none" />
            </fieldset>
            <fieldset className="flex flex-col border border-gray-500 px-2">
              <legend>
                <label htmlFor="ToDate" className="text-12">
                  To
                </label>
              </legend>
              <input id="ToDate" type="date" className=" outline-none" />
            </fieldset>
          </div>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Clear all logs
        </button>
      </div>
      <div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <select
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1)
              }}
              className="w-20 bg-white border p-1"
            >
              <option selected={limit === 5} value="5">
                5
              </option>
              <option selected={limit === 10} value="10">
                10
              </option>
              <option selected={limit === 20} value="20">
                20
              </option>
              <option selected={limit === 40} value="40">
                40
              </option>
              <option selected={limit === 80} value="80">
                80
              </option>
            </select>
            <div className="flex flex-col lg:flex-row lg:items-center gap-2">
              <p>Export As: </p>
              <div className="flex flex-col lg:flex-row">
                <button className="lg:w-20 bg-white border p-1 active:scale-90 transition-all duration-100">
                  PDF
                </button>
                <button className="lg:w-20 bg-white border p-1 active:scale-90 transition-all duration-100">
                  Excel
                </button>
                <button className="lg:w-20 bg-white border p-1 active:scale-90 transition-all duration-100">
                  CSV
                </button>
              </div>
            </div>
            <button className="lg:w-20 bg-white border p-1 active:scale-90 transition-all duration-100">
              Print
            </button>
          </div>
          <div>
            <fieldset className="flex items-center">
              <label
                htmlFor="search"
                className="border border-r-0 border-gray-500 p-1 lg:p-2"
              >
                <svg
                  className="w-4 h-4 fill-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </label>
              <input
                type="search"
                name=""
                id="search"
                placeholder="Search..."
                className="outline-none border border-gray-500 lg:px-2 lg:py-1"
              />
            </fieldset>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border border-gray-500">
            <thead className="h-16 bg-blue-300 text-white">
              <tr>
                <th className="pl-2 border border-gray-500">Description</th>
                <th className="pl-2 border border-gray-500">Date</th>
                <th className="pl-2 border border-gray-500">Designation</th>
              </tr>
            </thead>
            <tbody className="text-14">
              {isLoading ? (
                <TableSkeleton col={3} row={limit} />
              ) : activityLogs && activityLogs.length > 0 ? (
                activityLogs.map((activityLog: TActivityLog) => (
                  <tr
                    key={activityLog.id}
                    className="border-b border-gray-500 h-12"
                  >
                    <td className="pl-2 border border-gray-500">
                      {activityLog.description}
                    </td>
                    <td className="pl-2 border border-gray-500">
                      {activityLog.created_at}
                    </td>
                    <td className="pl-2 border border-gray-500">User</td>
                  </tr>
                ))
              ) : null}
            </tbody>
          </table>
          {/* <div className="pt-10 flex justify-center">
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
          </div> */}
          {/* <Pagination page={page} setPage={setPage} pageNumberArr={totalPaginationCalculate.pageNumberArr} totalNumberOfPage={totalPaginationCalculate.totalNumberOfPage} /> */}
        </div>
      </div>
    </section>
  );
};

export default Home;
