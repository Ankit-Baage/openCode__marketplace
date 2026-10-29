import { useQuery } from "@tanstack/react-query";
import { hotDealsSparesRequest } from "../../utils/https-request/hotDeals/hotDealsProductRequest";



export function useGetHotDealsSpareList() {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["hotDealsSpares"],
    queryFn: hotDealsSparesRequest,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });

  return { data, isError, isLoading, isSuccess };
}
