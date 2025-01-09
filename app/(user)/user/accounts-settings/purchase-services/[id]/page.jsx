'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { getServicePurchaseHistory } from "@/app/(user)/_api";
import { formatDateToDDMMYYYY, CalculateDaysBetweenDates } from "@/helper";


const Home = ({ params: { id } }) => {
  const [data, setData] = useState();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userCookie = document.cookie.split(';').find(c => c.trim().startsWith('user='));
    if (userCookie != undefined) {
      setUser(JSON.parse(decodeURIComponent(userCookie.split('=')[1])));
    }
  }, []);

  useEffect(() => {
    getServicePurchaseHistory(user?.id)
      .then((response) => {
        console.log('payment history response: ', response?.data);
        
        setData(response?.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [user,id]);

  // console.log('payment history response: ', data, id);


  return (
    <>
      {
        loading ? (
          <p>Loading...</p>
        ) : (
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
                    <th>Feature Name</th>
                    <th>Purchasing Date</th>
                    <th>Valid Till</th>
                    <th>Remain Days</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.map((item, index) => {
                      return (
                        <tr key={index} className="h-12">
                          <td>
                            {
                              item?.service?.name
                            }
                          </td>
                          <td>
                            {
                              formatDateToDDMMYYYY(item?.created_at)
                            }
                          </td>
                          <td>
                            {
                              formatDateToDDMMYYYY(item?.created_at)
                            }
                          </td>
                          <td>
                            {
                              CalculateDaysBetweenDates(item?.created_at, item?.created_at)
                            }
                          </td>
                          <td>
                            {
                              item?.total
                            }
                          </td>
                          <td>
                            {
                              CalculateDaysBetweenDates(item?.created_at, item?.created_at) > 0 ? "Active" : "Expired"
                            }
                          </td>
                        </tr>
                      )
                    })
                  }

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
        )
      }
    </>
  );
};

export default Home;