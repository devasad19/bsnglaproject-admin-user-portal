"use client";
import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CustomizeServiceBodyList from "./CustomizeServiceBodyList";
import TableSkeleton from "../TableSkeleton/TableSkeleton";
import ServerPagination from "../ServerPagination/ServerPagination";

type ServiceProps = {
  services: any;
  loading: boolean;
  page: number;
  limit: number;
  showPage: number;
  setPage: any;
};

// {(page - 1) * limit + index + 1}

const CustomizeServiceTableList = ({
  services,
  loading,
  page,
  limit,
  showPage,
  setPage,
}: ServiceProps) => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-md pb-3">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-primary text-white h-10 text-12 md:text-15">
          <tr>
            <th className="text-sm text-center px-2">SL</th>
            <th className="text-sm text-center px-2">Name</th>
            <th className="text-sm text-center">logo</th>
          </tr>
        </thead>
        {loading ? (
          <TableSkeleton col={5} row={10} />
        ) : (
          <SortableContext
            items={services.map((s: any) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <tbody className="[&>tr]:border-b [&>tr]:border-gray-200 [&>tr]:text-left [&>tr]:h-16 text-12 lg:text-16">
              {services.map((service: any, index: number) => (
                <CustomizeServiceBodyList
                  key={service.id}
                  index={index + 1}
                  page={page}
                  limit={limit}
                  id={service.id}
                  name={service.name}
                  logo={service.logo}
                />
              ))}
            </tbody>
          </SortableContext>
        )}
      </table>
      <ServerPagination page={page} setPage={setPage} showPage={showPage} />
    </div>
  );
};

export default CustomizeServiceTableList;
