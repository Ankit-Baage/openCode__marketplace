import { useMutation } from "@tanstack/react-query";
import { paymentRecordRequest } from "../../utils/https-request/paymentRecord/paymentRecordRequest";

function usePaymentRecordMutation() {
  return useMutation({
    mutationFn: paymentRecordRequest,
    retry: 1, // Retry once in case of failure
    retryDelay: 1000, // Wait 1 second before retrying
    // onError: (error) => {
    //   console.error("Payment failed:", error.message);
    // },
  });
}

export default usePaymentRecordMutation;
