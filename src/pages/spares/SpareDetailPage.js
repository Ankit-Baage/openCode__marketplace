import React, { useEffect, useReducer, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCartListSparesMutation from "../../tanstack-query/cartList/useCartListSparesMutation";
import useGetSpareDetail from "../../tanstack-query/spares/useGetSpareDetail";
import { Spinner } from "../../components/ui/spinner/Spinner";
import { SpareDetail } from "../../components/spares/spareDetail/SpareDetail";
import useGetSpareColors from "../../tanstack-query/spares/useGetSpareColors";
import { formatNumber } from "../../utils/helpers/formatNumber";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import useAddToWishListMutation from "../../tanstack-query/wishList/useAddToWishListMutation";
import { extractIdFromSlug } from "../../utils/extractIdFromSlug";
import { toSlug } from "../../utils/toSlug";

// Initial state for reducer
const initialState = {
  spareCarouselData: null,
  spareDescription: null,
  prices: null,
  colorQuery: null,
  color: null,
  partName: null,
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        spareCarouselData: action.payload.spareCarouselData,
        spareDescription: action.payload.spareDescription,
        prices: action.payload.prices,
        colorQuery: action.payload.colorQuery,
        color: action.payload.color,
        partName: action.payload.partName,
      };
    default:
      return state;
  }
}

export const SpareDetailPage = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  // Auth and user IDs
  const authToken = Cookies.get("authToken");
  const userId = Cookies.get("user_id");
  const guestId = Cookies.get("guestId");
  const medium = authToken ? "user" : "guest";
  const user_id = authToken ? userId : guestId;

  const { brand, model, spareName, id } = useParams();
  const requestId = id;
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();
  console.log("id", id ? id : "none");
  // Fetch spare detail
  const { data, isSuccess } = useGetSpareDetail({
    requestId,
    user_id,
    medium,
  });

  const [qty, setQty] = useState(data?.data?.data?.cart_count || 1);
  const { postCart, patchCart } = useCartListSparesMutation();

  // Quantity handler
  const handleQtyChange = useCallback(
    (newQty) => {
      const parsedQty = parseInt(newQty, 10);
      if (isNaN(parsedQty) || parsedQty <= 0) {
        setQty(data?.data?.data?.cart_count || 1);
      } else {
        setQty(parsedQty);
      }
    },
    [data]
  );

  // SEO-friendly color selection
  const handleColorSelect = (color) => {
    // setSelectedColor(color);

    // const brand = toSlug(data.brand ?? "");
    // const model = toSlug(data.model ?? "");
    // const spareName = toSlug(data.part ?? "");

    navigate(`/spares/${brand}/${model}/${spareName}/${color.record_id}`);

    console.log("color", color)
  };

  // Set data in reducer after fetching
  useEffect(() => {
    if (isSuccess && data) {
      const spareCarouselData = data.data.data.images;
      const spareDescription = [
        { id: 1, desc: data.data.data.description_1 },
        { id: 2, desc: data.data.data.description_2 },
        { id: 3, desc: data.data.data.description_3 },
        { id: 4, desc: data.data.data.description_4 },
      ];

      const colorQuery = {
        sellerId: data.data.data.seller_id,
        brand: data.data.data.brand,
        model: data.data.data.model,
        part: data.data.data.part,
      };

      const prices = {
        originalPrice: formatNumber(data.data.data.original_price),
        discountedPrice: formatNumber(data.data.data.discounted_price),
        discountPercentage: data.data.data.discount_percentage,
        quantity: data.data.data.cart_count,
        onQuantityUpdate: handleQtyChange,
      };

      const color = data.data.data.color;
      const partName = data.data.data.part_name;

      setQty(data.data.data.cart_count || 1);

      dispatch({
        type: "SET_DATA",
        payload: {
          spareCarouselData,
          spareDescription,
          prices,
          colorQuery,
          color,
          partName,
        },
      });
    }
  }, [isSuccess, data, handleQtyChange]);

  const { spareCarouselData, colorQuery, prices, spareDescription, color } =
    state;

  // Fetch spare colors if enough info is available
  const shouldFetchColors =
    !!colorQuery?.sellerId &&
    !!colorQuery?.brand &&
    !!colorQuery?.model &&
    !!colorQuery?.part;

  const { data: spareColors, isSuccess: isSpareColorSuccess } =
    useGetSpareColors(
      shouldFetchColors
        ? {
            sellerId: colorQuery.sellerId,
            brand: encodeURIComponent(colorQuery.brand),
            model: encodeURIComponent(colorQuery.model),
            part: encodeURIComponent(colorQuery.part),
          }
        : null
    );

  // Add to wishlist mutation
  const { mutateAsync: addToWishList } = useAddToWishListMutation();

  const handleAddToWishList = async () => {
    const payload = {
      category_id: data?.data?.data?.category_id,
      item_id: data?.data?.data?.id,
      master_product_id: data?.data?.data?.master_product_id,
    };

    try {
      const response = await addToWishList(payload);
      toast.success(response?.data?.message?.displayMessage);
    } catch (error) {
      toast.error(error.message.displayMessage);
    }
  };

  // Add to cart / update cart
  const handleAddToCart = useCallback(
    async (event) => {
      event.stopPropagation();
      if (isNaN(qty) || qty <= 0) {
        toast.error("Quantity must be a positive number.");
        return;
      }

      if (qty === data?.data?.data.cart_count) {
        toast.info("Quantity remains unchanged. No action taken.");
        return;
      }

      const payload = {
        category_id: data?.data?.data.category_id,
        master_product_id: data?.data?.data.master_product_id,
        item_id: data?.data?.data.id,
        qty: qty * 1,
      };

      try {
        if (data?.data?.data.cart_count === 0 && qty > 0) {
          const response = await postCart(payload);
          toast.success(response.message.displayMessage);
        } else if (data?.data?.data.cart_count > 0 && qty > 0) {
          const response = await patchCart(payload);
          toast.success(response.message.displayMessage);
        } else {
          toast.error("Invalid action.");
        }
      } catch (error) {
        console.error("Add to Cart Error:", error);
        setQty(data?.data?.data.cart_count);
        toast.error(
          error.response?.data?.message?.displayMessage ||
            "An unexpected error occurred."
        );
      }
    },
    [data, qty, postCart, patchCart]
  );

  // Render spinner while fetching colors
  if (!isSpareColorSuccess) return <Spinner />;

  return (
    <SpareDetail
      spareData={data}
      images={spareCarouselData}
      prices={prices}
      colors={spareColors?.data.data}
      color={color}
      partName={state.partName}
      onColorSelect={handleColorSelect}
      descriptions={spareDescription}
      onAddToCart={handleAddToCart}
      cart_status={data?.data?.data.cart_status}
      wishlist_status={data?.data?.data.wishlist_status}
      onWishList={handleAddToWishList}
    />
  );
};
