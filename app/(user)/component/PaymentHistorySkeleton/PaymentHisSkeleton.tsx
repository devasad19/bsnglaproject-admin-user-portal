import React from "react";

const PaymentHisSkeleton = () => {
  return (
    <>
      
        <div className="w-full">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-2 lg:gap-0 pb-5">
            <div className="h-6 lg:h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="flex gap-4">
              <div className="bg-gray-200 h-8 w-20 lg:w-24 rounded animate-pulse"></div>
              <div className="bg-gray-200 h-8 w-20 lg:w-24 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-14 flex justify-center">
              <div className="w-full bg-white p-6 shadow-lg rounded-md">
                <div className="pb-5">
                  <div className="w-24 flex flex-col items-center gap-1 pb-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-2 pb-5">
                    <div className="flex flex-col gap-1">
                      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <div className="w-full overflow-x-auto pb-5">
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="border border-gray-300 h-10">
                          {[...Array(6)].map((_, index) => (
                            <th
                              key={index}
                              className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                            ></th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(2)].map((_, rowIndex) => (
                          <tr key={rowIndex} className="h-10">
                            {[...Array(6)].map((_, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="border border-gray-300"
                              >
                                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                              </td>
                            ))}
                          </tr>
                        ))}
                        <tr className="h-10">
                          {[...Array(4)].map((_, index) => (
                            <td key={index}></td>
                          ))}
                          <td className="border border-gray-300">
                            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                          </td>
                          <td className="border border-gray-300">
                            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="border-b border-gray-300 h-10 flex items-center">
                      <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                      <ul className="list-disc list-inside">
                        {[...Array(3)].map((_, index) => (
                          <li key={index}>
                            <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pr-4 flex flex-col items-center">
                      <div className="h-20 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse mt-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
};

export default PaymentHisSkeleton;
