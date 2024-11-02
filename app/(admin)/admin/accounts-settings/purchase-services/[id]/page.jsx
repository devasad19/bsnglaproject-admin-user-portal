'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDateToDDMMYYYY, CalculateDaysBetweenDates } from "@/helper";
import { getAdminPurchaseServiceDetails } from "@/app/(admin)/_api";


const Home = ({ params: { id } }) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAdminPurchaseServiceDetails(id).then((response) => {
            setData(response?.data);
            setLoading(false);
        }).catch((error) => console.log(error));


    }, []);

    console.log('data: ',data);
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
                                Service Name: { data?.service_name }
                            </h3>
                        </div>


                        <div>
                            {
                                data?.userOrders?.map((item, index) => {
                                    if (item?.orders.length > 0) {

                                        return (
                                            <div key={index}>
                                                <h3 className="text-28 font-bold text-[#151D48] pb-5">
                                                    Citizen Name: {item?.name}
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
                                                            {
                                                                item?.orders?.map((item2, index2) => {
                                                                    return (
                                                                        <tr key={index2} className="h-12">
                                                                            <td>
                                                                                {
                                                                                    item2?.feature?.name
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    formatDateToDDMMYYYY(item2?.created_at)
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    formatDateToDDMMYYYY(item2?.created_at)
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    CalculateDaysBetweenDates(item2?.created_at, item2?.created_at)
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    item2?.total
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    CalculateDaysBetweenDates(item2?.created_at, item2?.created_at) > 0 ? "Active" : "Expired"
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }

                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </section>
                )
            }
        </>
    );
};

export default Home;