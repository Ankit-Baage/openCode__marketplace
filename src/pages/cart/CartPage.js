import React, { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import classes from "./cartPage.module.css";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";

import { VrpCartItem } from "../../components/cart/vrpCartItem/VrpCartItem";
import useGetCartList from "../../tanstack-query/cartList/useGetCartList";
import { SparesCartItem } from "../../components/cart/sparesCartItem/SparesCartItem";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";
import { OpenBoxCartItem } from "../../components/cart/openBoxCartItem/OpenBoxCartItem";
import { NewPhoneCartItem } from "../../components/cart/newPhoneCartItem/NewPhoneCartItem";
import { toast } from "react-toastify";
import useCartListDeleteItemMutation from "../../tanstack-query/cartList/useCartListDeleteItemMutation";
import useCartListQuantityMutation from "../../tanstack-query/cartList/useCartListQuantityMutation";
import useMoveToLaterMutation from "../../tanstack-query/cartList/useMoveToLaterMutation";
import { EmptyCart } from "../../components/cart/EmptyCart";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { OrderSummary } from "../../components/orderSummary/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import {
  couponAdded,
  couponRemoved,
  selectCouponState,
} from "../../store/coupon/couponSlice";
import { cartLisGuestUrl } from "../../config/config";

export const CartPage = () => {
  const dispatch = useDispatch();
  const coupon = useSelector(selectCouponState);
  const guestId = Cookies.get("guestId");
  const { data, isSuccess, isLoading, refetch } = useGetCartList(
    coupon?.id,
    guestId
  );
  const navigate = useNavigate();
  const [qty, setQty] = useState(data?.data?.data?.quantity);

  const handleQuantityUpdate = (newQty) => {
    setQty(newQty);
    // console.log("cart_page updated Quantity:", newQty);
  };

  const { mutateAsync: deleteItem } = useCartListDeleteItemMutation();
  // const { mutate: updateQuantity } = useCartListQuantityMutation();
  const {
    mutateAsync,
    isLoading: isMoving,
    isSuccess: IsMoved,
    isPending,
  } = useMoveToLaterMutation();

  const placeholder = "Search...";

  const handleRemove = useCallback(
    async (item) => {
      const { category_id, master_product_id, request_id } = item;

      const data = {
        category_id,
        ...(category_id === 5 ? { request_id } : { master_product_id }),
      };

      // setIsUpdating(true);

      try {
        const response = await deleteItem(data);
        toast.success(response.message.displayMessage);
        // console.log(response.message.displayMessage);
      } catch (error) {
        toast.error(error.response.data.message.displayMessage);
      } finally {
        // setIsUpdating(false);
      }
    },
    [deleteItem] // Dependencies for useCallback
  );

  const handleSaveForLater = useCallback(
    async (item) => {
      const authToken = Cookies.get("authToken");
      if (!authToken) {
        navigate("/authentication");
        toast.warning("Please login");
        return;
      }

      try {
        const isCategoryFive = item.category_id === 5;
        const payload = {
          category_id: item.category_id,
          ...(isCategoryFive
            ? { request_id: item.request_id }
            : {
                master_product_id: item.master_product_id,
                item_id: item.id,
              }),
        };

        const response = await mutateAsync(payload);
        toast.success(response.message.displayMessage);
        // console.log(item);
      } catch (error) {
        toast.error(
          error?.response?.data?.message?.displayMessage ||
            "Something went wrong"
        );
      }
    },
    [mutateAsync, navigate]
  );

  const handleNavigateToCoupons = () => {
    navigate("/cart/coupons");
  };

  const handleNavigateToAddresses = () => {
    if (!data?.data?.data?.qty_changed_flag) {
      navigate("/address");
    } else {
      toast.warning("Accept the new quantity in the cart");
    }
  };
  const handleRemoveCoupon = () => {
    dispatch(couponRemoved());
  };

  const content = useMemo(() => {
    if (isLoading) {
      return <CartLoader />;
    }
    if (isSuccess && data?.data?.data?.cart_items.length > 0) {
      return data.data.data.cart_items.map((item) => {
        switch (item.category_id) {
          case 5:
            return (
              <VrpCartItem
                key={item.request_id}
                item={item}
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={() => handleSaveForLater(item)}
              />
            );
          case 6:
            return (
              <SparesCartItem
                key={item.id}
                item={item}
                onQuantityUpdate={(newQty) => handleQuantityUpdate(newQty)}
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={() => handleSaveForLater(item)}
                refetch={refetch}
              />
            );
          case 7:
            return (
              <NewPhoneCartItem
                item={item}
                onQuantityUpdate={(newQty) => handleQuantityUpdate(newQty)}
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={() => handleSaveForLater(item)}
              />
            );
          case 8:
            return (
              <OpenBoxCartItem
                item={item}
                onQuantityUpdate={(newQty) => handleQuantityUpdate(newQty)}
                onRemove={() => {
                  handleRemove(item);
                }}
                onLater={() => handleSaveForLater(item)}
              />
            );
          default:
            return null;
        }
      });
    }
    return <EmptyCart />;
  }, [
    data?.data?.data?.cart_items,
    handleRemove,
    handleSaveForLater,
    isLoading,
    isSuccess,
    refetch,
  ]);

  useEffect(() => {
    const isInvalidCoupon = data?.data?.data?.show_coupon_msg;
    const message = data?.data?.message?.displayMessage;

    if (isInvalidCoupon && coupon?.id) {
      toast.error(message || "Invalid coupon");

      // Remove coupon and refresh to reset Redux state
      dispatch(couponRemoved());

      // Give toast time to show before reload
      setTimeout(() => {
        window.location.reload();
      }, 2000); // wait 1.5 seconds so the toast is seen
    }
  }, [
    data?.data?.data?.show_coupon_msg,
    data?.data?.message?.displayMessage,
    dispatch,
    coupon?.id,
  ]);

  console.log("couponId :", coupon.id);

  return isSuccess ? (
    <div className={classes.wrapper}>
      <div className={classes.box__intro}>
        <h1 className={classes.box__intro__title}>My Cart</h1>
      </div>
      <div className={classes.box}>
        <div className={classes.box__cart}>{content}</div>
        {isSuccess && data?.data?.data?.cart_items.length > 0 && (
          <div className={classes.box__sep}></div>
        )}

        {isSuccess && data?.data?.data?.cart_items.length > 0 && (
          <div className={classes.box__cart}>
            <h3 className={classes.box__cart__order}>Order Summary</h3>
            {!data?.data?.data?.applied_coupon_code && (
              <button
                className={classes.box__coupons}
                onClick={handleNavigateToCoupons}
              >
                <div className={classes.box__coupons__content}>
                  <span className={classes.box__coupons__content__img} />
                  <h3 className={classes.box__coupons__content__title}>
                    Use Coupons
                  </h3>
                </div>

                <span className={classes.box__coupons__navigate} />
              </button>
            )}

            {data?.data?.data?.applied_coupon_code && (
              <div className={classes.box__coupons__applied}>
                <div className={classes.box__coupons__content}>
                  <span className={classes.box__coupons__content__img} />
                  <div className={classes.box__coupons__applied__content}>
                    <h3
                      className={classes.box__coupons__content__applied__title}
                    >
                      Coupon applied...
                    </h3>
                    <h3 className={classes.box__coupons__content__subTitle}>
                      {data?.data?.data?.applied_coupon_code}
                    </h3>
                  </div>
                </div>

                <button
                  className={classes.box__coupons__remove}
                  onClick={handleRemoveCoupon}
                >
                  Remove
                </button>
              </div>
            )}

            <OrderSummary
              subTotal={data?.data?.data.total_amount}
              originalAmount={data?.data?.data?.original_amount}
              gst={data?.data?.data?.gst_amount}
              grandTotal={data?.data?.data?.final_amount}
              couponAmount={data?.data?.data?.applied_coupon_amount}
              couponCode={data?.data?.data?.applied_coupon_code}
              discountedShippingFee={data?.data?.data?.discounted_shipping_fee}
              shippingFee={data?.data?.data?.shipping_fee}
              isShippingWaiver={
                data?.data?.data?.is_shipping_fee_waiver_applied
              }
            />
            <button
              className={classes.box__cart__order__btn}
              onClick={handleNavigateToAddresses}
            >
              Select Address
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <CartLoader />
  );
};
