"use client";
import { getAllPaymentAPi } from "@/app/(portal)/_api";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
const Home = (): JSX.Element => {
  const [payments, setPayments] = useState([]);
  const [totalPaymentLength, setTotalPaymentLength] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const totalNumberOfPage = Math.ceil(totalPaymentLength / limit);
  const pageNumberArr = Array.from(
    { length: totalNumberOfPage },
    (_, i) => i + 1
  );

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const paymentsData = await getAllPaymentAPi(page, limit);
        setPayments(paymentsData?.data);
        setTotalPaymentLength(paymentsData?.total);
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    };
    loadPayments();
  }, [page, limit]);

  console.log({ payments });

  return (
    <section>
      <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
        Citizen Payment Lists
      </h3>
      <div className="w-full overflow-x-auto bg-white p-7 rounded-md">
        {/* <div className="w-full flex items-center justify-between py-4">
          <div>
            <input
              type="text"
              placeholder="Search"
              className="w-48 border border-primary focus:outline-none rounded-md px-2 py-2"
            />
          </div>
          <div>
            <select
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-20 border border-primary focus:outline-none rounded-md px-2 py-1"
              defaultValue={limit}
            >
              <option  value="5">
                5
              </option>
              <option  value="10">
                10
              </option>
              <option  value="20">
                20
              </option>
              <option  value="40">
                40
              </option>
              <option  value="80">
                80
              </option>
            </select>
          </div>
        </div> */}
        <table className="w-full">
          <thead className="border-b   border-gray-200 rounded  bg-primary text-white  h-10 text-12 lg:text-16">
            <tr>
              <th className="text-left px-2">SL</th>
              <th className="text-left px-2">Bill Id</th>
              <th className="text-center">Service Name</th>
              <th className="text-center">Amount</th>
              {/* <th className="text-center">Plan</th> */}
              <th className="text-center">User Name</th>
              <th className="text-center">Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Options</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-b [&>tr]:border-gray-200 [&>tr]:text-left [&>tr]:h-12">
            {payments?.length > 0 ? (
              payments?.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="px-3">
                    <span className="border border-gray-300 px-2 py-1 rounded-md">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-2 border-r border-gray-200">
                    <div
                      
                      className="flex items-center gap-2 text-14"
                    >
                      <span>
                        <svg
                          className="fill-current w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M64 464l48 0 0 48-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 304l-48 0 0-144-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z" />
                        </svg>
                      </span>
                      <span>Billing no. {item?.id}</span>
                    </div>
                  </td>
                  <td className="px-2 border-r border-gray-200 text-center">
                    {item?.service ? item?.service?.name : ""}
                  </td>
                  <td className="px-2 border-r border-gray-200 text-center">
                    {item?.amount} tk
                  </td>
                  <td className="px-2 border-r border-gray-200 text-center">
                    {item?.user?.name}
                  </td>
                  <td className="px-2 border-r border-gray-200 text-center">
                    {new Date(item?.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-2 border-r border-gray-200 text-center">
                    {item?.payment_status}
                  </td>
                  <td className="px-2 border-r border-gray-200 text-center">
                    <Link
                      href={{
                        pathname: `/admin/invoice/${item?.id}`,
                      }}
                      className="text-13 px-2 py-1 bg-blue-400 rounded-md text-white"
                    >
                      Invoice
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td colSpan={8}>
                    <Skeleton width="100%" count={10} height={50} />
                  </td>
                </tr>
              </>
            )}
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
      </div>
    </section>
  );
};

export default Home;
