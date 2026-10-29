import { useQuery } from "@tanstack/react-query";
import { subCategoryRequest } from "../../utils/https-request/subCat/subCategoryRequest";



function useGetSubCategory(category) {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["category", category],
    queryFn: () => subCategoryRequest(category),
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000, // Delay in milliseconds
  });

  return { data, isError, isLoading, isSuccess };
}


export default useGetSubCategory;
