import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartListDeleteRequest } from "../../utils/https-request/cart/cartListDeleteRequest";

const useCartListDeleteItemMutation = (coupon_code, guestId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartListDeleteRequest, // Ensure data is passed
    onSuccess: () => {
      queryClient.invalidateQueries(["cartList", coupon_code, guestId]); // Invalidate the cache of the cart list after deletion
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });
};

export default useCartListDeleteItemMutation;
