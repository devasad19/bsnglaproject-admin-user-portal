export const PaginationTotalPage = (totalItems: number, limit: number) => {
  const totalNumberOfPage = Math.ceil(totalItems / limit);
  const pageNumberArr = Array.from(
    { length: totalNumberOfPage },
    (_, i) => i + 1
  );
  return {totalNumberOfPage, pageNumberArr};
};
