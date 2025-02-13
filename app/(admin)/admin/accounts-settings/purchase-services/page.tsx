"use client";
import { getServices } from "@/app/(portal)/_api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getSoldServices } from "@/app/(admin)/_api";
import { formatDate, remainingDaysCalculate, remainingMonthsAndDays } from "@/helper";

const PurchaaseServicePage = () => {
  const [services, setServices] = useState<any>([]);
  const [soldServices, setSoldServices] = useState<any>([]);
  const [parChaseService, setParChaseService] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const services = await getServices();

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data), setIsLoading(false);
      })
      .catch((err) => console.log(err));
    getSoldServices()
      .then((data) => {
        setSoldServices(data?.data), setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log({ soldServices });

  return (
    <section>
      <div className="flex flex-wrap justify-between">
        <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
          Sold Services:
        </h3>
      </div>
      <div className="w-full overflow-x-auto bg-white p-7 rounded-md">
        <table className="w-full">
          <thead className="border-b border-[#151D48] text-[#151D48] h-10 text-12 lg:text-16">
            <tr>
              <th className="text-center">SL</th>
              <th className="text-center">User Name</th>
              <th className="text-center">Service Name</th>
              <th className="text-center">Transaction Id</th>
              <th className="text-center">Total Amount</th>
              <th className="text-center">Payment Type</th>
              <th className="text-center">Payment Status</th>
              <th className="text-center">Date</th>
              <th className="text-center">Options</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-b [&>tr]:border-[#151D48] [&>tr]:text-left [&>tr]:h-16 text-12 lg:text-16">
            {isLoading ? (
              <tr>
                <td colSpan={9}>
                  <Skeleton width="100%" count={10} height={50} />
                </td>
              </tr>
            ) : (
              soldServices?.map(
                (item: any, index: number) =>
                  item?.service && (
                    <tr key={index}>
                      <td className="px-3">
                        <span className="border border-gray-300 px-2 py-1 rounded-md">
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-2">
                        {
                          item?.user?.name ?? ""
                        }
                      </td>
                      <td className="px-2">
                        <div className="flex items-center gap-2 text-14">
                          <span className="flex items-center gap-3">
                            <Image
                              className="w-10 h-10 rounded-md"
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${
                                item?.service?.logo ?? ""
                              }`}
                              height={1000}
                              width={1000}
                              alt="Bangla"
                            />
                            {item?.service?.name || " "}
                          </span>
                        </div>
                      </td>
                      <td className="text-center">{item?.payment?.invoice_no}</td>
                      
                      <td className="text-center">
                        BDT {item?.total} TK
                        </td>
                      
                      <td className="text-center">
                        {item?.payment?.payment_type}
                      </td>
                      <td className="text-center">
                        {item?.status == 1 ? (
                          <span className="text-green-500">Paid</span>
                        ) : (
                          <span className="text-red-500">Unpaid</span>
                        )}
                      </td>
                      <td className="text-center">
                        {formatDate(item?.created_at)}
                      </td>
                      <td className="text-center cursor-pointer">
                        <Link
                          href={{
                            pathname: `/admin/accounts-settings/purchase-services/${item?.service_id}`,
                            query: { user: item?.user_id }, // Query parameters
                          }}
                          className="text-14 border border-primary bg-primary hover:text-white px-2 py-1 rounded-md ms-2"
                          shallow
                        >
                          <span className="text-white">Details</span>
                        </Link>
                      </td>
                    </tr>
                  )
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PurchaaseServicePage;
