"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPortalMenu, deletePortalMenu } from "@/app/(admin)/_api";
import { SkeletonLoading } from "@/app/_components/Skeleton/Skeleton";
import TableSkeleton from "@/app/_components/TableSkeleton/TableSkeleton";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getPortalMenu()
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const HandleDelete = (id) => {
    setLoading(true);
    if (id) {
      deletePortalMenu(id)
        .then(() => {
          getPortalMenu()
            .then((res) => {
              setData(res);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  console.log(loading);
  
  return (
    <section className="bg-white p-4 min-h-screen rounded">
      <div className="flex justify-between items-center pb-5">
        <h3 className="text-32 font-mono font-bold text-[#151D48]">
          Hamburger Menu List
        </h3>
        <Link
          href={{
            pathname: "/admin/setting/sidebar-links/create",
          }}
          shallow
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create
        </Link>
      </div>

      <div>
        <table className="w-full">
          <thead className="bg-primary text-white h-10">
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>English Title</th>
              <th>Sort Value</th>
              <th>Url</th>
              <th>Status</th>
              <th className="w-[20em]">Action</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {loading ? (
              <TableSkeleton col={8} row={10}/>
            ) : data?.length > 0 ? (
              data?.map((item, index) => (
                <tr key={index} className="h-16">
                  <td className="px-3">
                    <span className="border border-gray-300 px-2 py-1 rounded-md">
                      {index + 1}
                    </span>
                  </td>
                  <td>{item?.title_bn}</td>
                  <td>{item?.title_eng}</td>
                  <td>{item?.sort_id}</td>
                  <td>{item?.url}</td>
                  <td>{item?.status == 1 ? "Active" : "Inactive"}</td>
                  <td className="space-x-5">
                    <Link
                      href={{
                        pathname: `/admin/setting/sidebar-links/edit/${item?.id}`,
                      }}
                      shallow
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => HandleDelete(item?.id)}
                      className="bg-red-500 text-white px-4 py-1.5 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Home;
