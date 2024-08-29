"use client";
import { getAllOrdersApi } from "@/app/(portal)/_api";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
const Home = (): JSX.Element => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const ordersData = await getAllOrdersApi();
      setOrders(ordersData?.data?.data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  console.log({ orders });

  return (
    <section>
      <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">Bills</h3>
      <div className="w-full overflow-x-auto bg-white p-7 rounded-md">
        <table className="w-full">
          <thead className="border-b   border-gray-200 rounded  bg-primary text-white  h-10 text-12 lg:text-16">
            <tr>
              <th className="text-left px-2">Bill Id</th>
              <th className="text-center">Service Name</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Plan</th>
              <th className="text-center">User Name</th>
              <th className="text-center">Date</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-b [&>tr]:border-gray-200 [&>tr]:text-left [&>tr]:h-12">
            {orders?.length > 0 ? (
              orders?.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="px-2 border-r border-gray-200">
                    <Link
                      href={{
                        pathname: `/admin/invoice/${item?.id}`,
                      }}
                      shallow
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
                      <span>Billing #{item?.id}</span>
                    </Link>
                  </td>
                  <td className="px-2 border-r border-gray-200 text-center">
                    {item?.service ? item?.service?.name : ""}
                  </td>
                  <td className="px-2 border-r border-gray-200 text-center">
                    {item?.total} tk
                  </td>

                  <td className="px-2 border-r border-gray-200 text-center">
                    Basic
                  </td>
                  <td className="px-2 border-r border-gray-200 text-center">
                    {item?.user?.first_name +
                      " " +
                      item?.user?.middle_name +
                      " " +
                      item?.user?.last_name}
                  </td>
                  <td className="px-2 border-r border-gray-200 text-center">
                    {new Date(item?.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-2 border-r border-gray-200 text-center">
                    {item?.status == 1 ? "PAID" : "UNPAID"}
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td colSpan={7}>
                    <Skeleton width="100%" count={10} height={50} />
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <div className="pt-10 flex justify-center">
          <div className="flex items-center gap-2">
            <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 bg-primary text-white">
              Prev
            </button>
            <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 bg-primary text-white">
              1
            </button>
            <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
              2
            </button>
            <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
              3
            </button>
            <span>...</span>
            {/* <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                2
              </button>
              <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                2
              </button>
              <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                2
              </button>
              <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                2
              </button> */}
            <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
              8
            </button>
            <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
              9
            </button>
            <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
              10
            </button>
            <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 bg-primary text-white">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
