import Link from "next/link";
import React from "react";

const RequestServiceList = () => {
  return (
    <>
      <section>
        <div className="flex flex-wrap justify-between pb-1">
          <h3 className="text-32 font-mono font-bold text-[#151D48]">
           Organization Service Request List
          </h3>
        </div>
        {/* <div className="py-2 flex flex-wrap justify-between pb-4">
          <div className="flex items-center gap-2"></div>
          <div>
            <Link
              href={{
                pathname: "/admin/services/create",
              }}
              shallow
              className="flex items-center gap-2 bg-primary hover:border hover:border-primary rounded-md text-white hover:text-primary hover:bg-white text-14 px-2 py-1 lg:px-4 lg:py-2"
            >
              <span>
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </span>
              <span>Create Service</span>
            </Link>
          </div>
        </div> */}
        <div className="w-full overflow-x-auto bg-white  rounded-md pb-3 mt-4">
          <table className="w-full">
            <thead className="border-b border-gray-200  bg-primary text-white  h-10 text-12 md:text-15">
              <tr>
                <th className="text-sm text-center px-2">SL</th>
                <th className="text-sm text-center px-2">Service</th>
                <th className="text-sm text-center px-2">Organization Name</th>
                <th className="text-sm text-center px-2">Organization Url</th>
                <th className="text-sm text-center px-2">Organization Email</th>
                <th className="text-sm text-center px-2">Organization Ip Address</th>
                <th className="text-sm text-center px-2">Status</th>
                <th className="text-sm text-center">Action</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-gray-200 [&>tr]:text-left [&>tr]:h-16 text-12 lg:text-16 ">
              <tr>
                <td className="text-sm text-center px-2">1</td>
                <td className="text-sm text-center px-2">Service Name</td>
                <td className="text-sm text-center px-2">Service Type</td>
                <td className="text-sm text-center px-2">Production Status</td>
                <td className="text-sm text-center px-2">Paid Status</td>
                <td className="text-sm text-center px-2">Publish/Unpublish</td>
                <td className="text-sm text-center px-2">Pending</td>
                <td className="text-sm text-center px-2">Approved</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default RequestServiceList;
