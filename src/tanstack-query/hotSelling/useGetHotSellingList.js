import { useInfiniteQuery } from "@tanstack/react-query";
import { hotSellingListRequest } from "../../utils/https-request/hotSelling/hotSellingRequest";

function useGetHotSellingList(user_id) {
  return useInfiniteQuery({
    queryKey: ["hotSellingList", user_id], // React Query will detect changes
    queryFn: ({ pageParam = null }) =>
      hotSellingListRequest({ pageParam, user_id }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    keepPreviousData: false, // Ensures new filters start fresh
  });
}

export default useGetHotSellingList;
