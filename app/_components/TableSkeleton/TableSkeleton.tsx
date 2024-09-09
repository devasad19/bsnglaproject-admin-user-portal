import React from "react";
import Skeleton from "react-loading-skeleton";

type TTableSkeletonProps = {
  col: number;
  row: number;
};

const TableSkeleton = ({ col, row }: TTableSkeletonProps) => {
  return (
    <>
      <tr>
        <td colSpan={3}>
          <Skeleton width="100%" count={row} height={50} />
        </td>
      </tr>
    </>
  );
};

export default TableSkeleton;
