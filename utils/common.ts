export interface PaginationResponseType<T> {
  from: number;
  to: number;
  total: number;
  totalPages: number;
  data: T[];
}
//Pagination response
export function PaginationResponse<T>(
  page: number,
  totalCount: number,
  itemsPerPage: number,
  data: T[],
): PaginationResponseType<T> {
  const offset = (page - 1) * itemsPerPage;
  let from = 0;
  let to = 0;
  if (totalCount > 0) {
    from = offset + 1;
    if (offset + itemsPerPage > totalCount) {
      to = totalCount;
    } else {
      to = offset + itemsPerPage;
    }
  }
  return {
    from: from,
    to: to,
    total: totalCount,
    totalPages: Math.ceil(totalCount / itemsPerPage),
    data,
  };
}





