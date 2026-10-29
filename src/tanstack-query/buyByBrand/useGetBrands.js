import { useQuery } from "@tanstack/react-query";
import { buyByBrandRequest } from "../../utils/https-request/buyByBrand/buyByBrandRequest";

function useGetBrands(category) {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["brand", category],
    queryFn: () => buyByBrandRequest(category),
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });

  return { data, isError, isLoading, isSuccess };
}

export default useGetBrands;
