"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getServicePurchaseHistory } from "@/app/(user)/_api";
import { formatDateToDDMMYYYY, CalculateDaysBetweenDates, convertToMinutesAndSeconds } from "@/helper";
import { useHomeContext } from "@/ContextProvider/Home.Context";
import { toast } from "react-toastify";
import TableSkeleton from "@/app/_components/TableSkeleton/TableSkeleton";

const Home = ({ params: { id } }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useHomeContext();

  // console.log({user,id});

  useEffect(() => {
    if (user?.id && id) {
      setLoading(true);
      getServicePurchaseHistory(id, user?.id)
        .then((response) => {
          // console.log('Payment history response: ', response?.data);
          setData(response?.data || []);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          toast.error(
            error?.response?.data?.message ||
              "Failed to load data. Please try again."
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.id, id]);

  console.log("payment history response: ", data);
  return (
    <>
      <section>
        <div className="flex items-center gap-4 pb-5">
          <Link
            href={{
              pathname: "/user/accounts-settings/purchase-services",
            }}
            shallow
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </span>
          </Link>
          <h3 className="text-26 lg:text-32 font-mono font-bold text-[#151D48]">
            Service Name:
          </h3>
        </div>

        {/* <h3 className="text-28 font-bold text-[#151D48] pb-5">
          Citizen Name: Md. Shakhawat Hossain
        </h3> */}
        <div className="overflow-x-auto bg-white rounded shadow-lg mb-5">
          <table className="w-full lg:table-fixed text-center">
            <thead className="h-10 bg-blue-500 text-white">
              <tr>
                <th>SI</th>
                <th>Purchasing Date</th>
                <th>Purchase Plan</th>
                <th>Remaining  Plan</th>
                {/* <th>Valid Date</th>
                <th>Remain Days</th> */}
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && <TableSkeleton row={10} col={6} />}
              {data?.length > 0
                ? data.map((item, index) => {
                    const plans = JSON.parse(item?.plans || "[]");
                    return (
                      <tr key={index} className="h-12">
                        <td>{index + 1}</td>
                        <td>{formatDateToDDMMYYYY(item?.created_at)}</td>
                        <td>
                          <div>
                            {plans?.slice(1).map((plan, planIndex) => (
                              <div key={planIndex} className="flex items-center justify-center gap-2">
                                <p>{plan?.data}</p>
                                <span>{plan?.unit}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td>
                          {
                            item?.userplan ? convertToMinutesAndSeconds(item.userplan?.total_plan) : 0
                          }
                        </td>
                        
                        <td>{item?.total} TK</td>
                        <td>
                          {
                            item?.user_service.length >0 ? <span className="text-primary">	Active	</span>  :  <span className="text-red-500">	Expire	</span>
                          }
                        </td>
                      </tr>
                    );
                  })
                : !loading && (
                    <tr className="h-12">
                      <td colSpan="6">No data found</td>
                    </tr>
                  )}

              {/* <tr className="h-12 border-t border-black">
                <td>Validity</td>
                <td>2022-01-01</td>
                <td>2022-01-01</td>
                <td>60 days</td>
                <td>1000</td>
                <td>Active</td>
              </tr>
              <tr className="h-12 border-t border-black">
                <td>Translator BP</td>
                <td>2022-01-01</td>
                <td>2022-01-01</td>
                <td>60 days</td>
                <td>1000</td>
                <td>Active</td>
              </tr> */}
            </tbody>
          </table>
        </div>

        {/* <h3 className="text-28 font-bold text-[#151D48] pb-5">
          Citizen Name: Md. Jobbar Hossain
        </h3>
        <div className="overflow-x-auto bg-white rounded shadow-lg mb-5">
          <table className="w-full lg:table-fixed text-center">
            <thead className="h-10 bg-blue-500 text-white">
              <tr>
                <th>Feature Name</th>
                <th>Purchasing Date</th>
                <th>Valid Till</th>
                <th>Remain Days</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-12">
                <td>Validity</td>
                <td>2022-01-01</td>
                <td>2022-01-01</td>
                <td>60 days</td>
                <td>1000</td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </section>
    </>
  );
};

export default Home;
