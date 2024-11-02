'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { getUserOrders } from "@/app/(user)/_api";


const Home = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserOrders(12).then((response) => {
      setOrders(response?.data);
      setLoading(false)
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  return (
    <section>
      <h1 className="text-20 lg:text-32 font-mono font-bold text-[#151D48] pb-5">
        Payment History
      </h1>

      {
        loading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-full bg-white lg:p-4 rounded-md shadow-lg overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Amount</th>
                  <th>Billing Date</th>
                  {/* <th>Plan</th> */}
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>

                {
                  orders?.map((item, index) => {
                    return (
                      <tr key={index} className="h-16">
                        <td>
                          <Link
                            href={{
                              pathname: `/user/accounts-settings/payment-history/${item?.id}`,
                            }}
                            className="flex items-center gap-2 font-bold"
                          >
                            <span className="p-4 bg-red-100 rounded-full">
                              <svg
                                className="fill-red-500 w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z" />
                              </svg>
                            </span>
                            <span>Invoice no {item?.id}</span>
                          </Link>
                        </td>
                        <td className="text-gray-500 font-bold">{item?.total}</td>
                        <td className="text-gray-500 font-bold">{item?.created_at}</td>
                        {/* <td className="text-gray-500 font-bold">Standard</td> */}
                        <td>
                          {
                            item?.status == 1 ? (
                              <span className="text-green-500 bg-green-100 px-3 py-1 rounded">
                                Successful
                              </span>
                            ) : (
                              <span className="text-red-500 bg-red-100 px-3 py-1 rounded">
                                Unsuccessful
                              </span>
                            )
                          }

                        </td>
                        <td>
                          <Link
                            href={"/pdfs/dummy.pdf"}
                            className="text-gray-500 font-bold flex items-center gap-1"
                            download={true}
                            rel="noopener noreferrer"
                          >
                            <span>
                              <svg
                                className="fill-current w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 512"
                              >
                                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" />
                              </svg>
                            </span>
                            <span>Download</span>
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        )
      }

    </section>
  );
};

export default Home;