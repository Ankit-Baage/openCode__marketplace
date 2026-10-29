import { useQuery } from "@tanstack/react-query";
import { profileDataRequest } from "../../utils/https-request/profile/profileRequest";

function useGetProfileData(user_id) {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch, // Refetch function
  } = useQuery({
    queryKey: ["profile", user_id],
    queryFn: profileDataRequest,
    refetchOnWindowFocus: false,
    retry: 2, // Maximum number of retries
    retryDelay: 1000,
  });
  return { data, isError, isLoading, isSuccess, refetch };
}

export default useGetProfileData;
