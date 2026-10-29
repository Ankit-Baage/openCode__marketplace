import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrderRequest } from "../../utils/https-request/cancelOrder/cancelOrderRequet";

function useCancelOrderMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    // Destructure remarks but only use order_id in the actual request
    mutationFn: ({ order_id, remarks }) => cancelOrderRequest(order_id, remarks),
    retry: 1,
    retryDelay: 1000,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ordersList"],
        exact: false,
      });
    },
  });

  return mutateAsync;
}

export default useCancelOrderMutation;
