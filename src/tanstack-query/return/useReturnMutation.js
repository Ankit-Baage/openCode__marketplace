import { useMutation, useQueryClient } from "@tanstack/react-query";
import { returnRequest } from "../../utils/https-request/return/returnRequest";

const useReturnMutation = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: returnMutate,
    isPending: isReturnLoading,
    isError: isReturnError,
    error: returnError,
  } = useMutation({
    mutationFn: returnRequest,
    onSuccess: () => {
      // Fix: Ensure all queries are invalidated properly
      queryClient.invalidateQueries({ queryKey: ["orderDetail"] });
    },
  });

  return {
    returnMutate, // Function to call the return request
    isReturnLoading, // Loading state
    isReturnError, // Error state
    returnError, // Error message
  };
};

export default useReturnMutation;
