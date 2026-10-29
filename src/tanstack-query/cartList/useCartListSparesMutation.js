import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartListPostRequest } from "../../utils/https-request/cart/cartListPostRequest";
import { cartListPatchRequest } from "../../utils/https-request/cart/cartListPatchRequest";

const useCartListSparesMutation = (coupon_code, guestId, quantity) => {
  const queryClient = useQueryClient();

  // Post Mutation
  const { mutateAsync: postCart, isLoading: isPostLoading } = useMutation({
    mutationFn: cartListPostRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cartList", coupon_code, guestId],
      });
    },
  });

  // Patch Mutation
  const { mutateAsync: patchCart, isLoading: isPatchLoading } = useMutation({
    mutationFn: cartListPatchRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cartList", coupon_code, guestId, quantity],
      });
    },
  });

  return {
    postCart,
    patchCart,
    isPostLoading,
    isPatchLoading,
  };
};

export default useCartListSparesMutation;
