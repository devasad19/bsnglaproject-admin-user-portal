import React from "react";
import Skeleton from "react-loading-skeleton";


export const SkeletonLoading = ({col, counter}: {col: number, counter: number}) => {
  return (
    <div>
      <tr>
        <td colSpan={col}>
          <Skeleton width="100%" height={50} count={counter} style={{marginBottom: 10}} />
        </td>
      </tr>
    </div>
  );
};
