

import { useInfiniteQuery } from "@tanstack/react-query";
import { spareListRequest } from "../../utils/https-request/spares/spareListRequest";

function useGetSpareList(filters, user_id, medium) {
  return useInfiniteQuery({
    queryKey: ["spareList", filters, user_id, medium], // React Query will detect changes
    queryFn: ({ pageParam = null }) => spareListRequest({ pageParam, filters, user_id, medium }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    keepPreviousData: false, // Ensures new filters start fresh
  });
}

export default useGetSpareList;
