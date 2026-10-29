import { useInfiniteQuery } from "@tanstack/react-query";
import { searchRequest } from "../../utils/https-request/searchRequest/searchRequest";

function useGetSearchQuery(searchTxt, user_id) {
  return useInfiniteQuery({
    queryKey: ["search", searchTxt, user_id],
    queryFn: ({ pageParam = null }) =>
      searchRequest({ pageParam, searchTxt, user_id }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    enabled: !!searchTxt, // Prevents query from running if searchTxt is empty
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
    keepPreviousData: false,
  });
}

export default useGetSearchQuery;
