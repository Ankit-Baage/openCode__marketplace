import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  couponAdded,
  couponRemoved,
  selectCouponState,
} from "../../store/coupon/couponSlice";
import {
  selectAddressState,
  setAddressId,
} from "../../store/address/addressSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import classes from "./reviewPage.module.css";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";

import { EmptyCart } from "../../components/cart/EmptyCart";
import { OrderSummary } from "../../components/orderSummary/OrderSummary";
import { VrpReviewItem } from "../../components/review/vrpReviewItem/VrpReviewItem";
import { SparesReviewItem } from "../../components/review/sparesReviewItem/SparesReviewItem";
import { OpenBoxReviewItem } from "../../components/review/openBoxReviewItem/OpenBoxReviewItem";
import { NewPhoneReviewItem } from "../../components/review/newPhoneReviewItem/NewPhoneReviewItem";
import useGetReviewList from "../../tanstack-query/reviewList/useGetReviewList";
import usePlaceOrderMutation from "../../tanstack-query/placeOrder/usePlaceOrderMutation";
import { AddressReview } from "../../components/review/addressReview/AddressReview";
import { toast } from "react-toastify";
import usePaymentRecordMutation from "../../tanstack-query/paymentRecord/usePaymentRecordMutation";
import { Capacitor } from "@capacitor/core";
import { Checkout } from "capacitor-razorpay";
import { Card } from "../../components/card/Card";
import { razorpay_key } from "../../config/config";

export const ReviewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const coupon = useSelector(selectCouponState);
  const address = useSelector(selectAddressState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isSuccess, isLoading } = useGetReviewList({
    coupon_code: coupon.id,
    address_id: address.id,
  });
  const {
    mutate,
    isLoading: orderPosting,
    isError: orderError,
    isSuccess: orderSuccess,
  } = usePlaceOrderMutation();

  const { mutate: paymentRecordMutation } = usePaymentRecordMutation();

  const handlePlaceOrder = () => {
    if (!data?.data?.data?.qty_changed_flag) {
      mutate(
        {
          coupon_code: coupon.id,
          address_id: address.id,
        },
        {
          onSuccess: async (orderData) => {
            console.log(
              "Order placed successfully:",
              orderData?.data?.razorpay_info
            );

            const razorpayOptions = {
              key: razorpay_key,
              amount: orderData?.data?.razorpay_info.amount.toString(),
              currency: orderData?.data?.razorpay_info.currency,
              name: "FUEVATION TECHNOLOGY SOLUTIONS PVT LTD",
              description: "Order Payment",
              image:
                "https://mp-beta.mobigarage.com/static/media/logoWithName.51474f59be27a332367d3060904388b0.svg",
              order_id: orderData?.data?.razorpay_info.id,
              prefill: {
                name: orderData?.data?.razorpay_info.name,
                email: orderData?.data?.razorpay_info.email,
                contact: orderData?.data?.razorpay_info.contact,
              },
              theme: {
                color: "#3399cc",
              },
            };

            const platform = Capacitor.getPlatform();

            if (platform === "web") {
              // ✅ Web SDK (no change here)
              const razorpay = new window.Razorpay({
                ...razorpayOptions,
                handler: async function (response) {
                  console.log("Payment Successful (Web)", response);
                  await recordPayment(response);
                },
              });
              razorpay.open();
            } else {
              // ✅ Native SDK for Android/iOS
              console.log("Android/iOS detected - using Native Razorpay SDK");
              try {
                const response = await Checkout.open(razorpayOptions);
                console.log("Native Payment Success:", response);
                await recordPayment({
                  razorpay_payment_id: response.response.razorpay_payment_id,
                  razorpay_order_id: response.response.razorpay_order_id,
                  razorpay_signature: response.response.razorpay_signature, // if signature is included
                });
                console.log("Payment Successful (Native)", response);
                // const result = await RazorpayPlugin.openPayment({
                //   key: razorpayOptions.key,
                //   options: JSON.stringify(razorpayOptions),
                // });
                // console.log("Payment Successful (Native)", result);
                // await recordPayment({
                //   razorpay_payment_id: result.paymentId,
                //   razorpay_order_id: orderData?.data?.razorpay_info.id,
                //   razorpay_signature: result.signature, // if signature is included
                // });
              } catch (err) {
                console.error("Native payment failed:", err);
                toast.error("Payment failed or was cancelled.");
              }
            }

            dispatch(couponRemoved());
          },
          onError: (error) => {
            console.error("Failed to place order:", error);
            toast.error(
              error?.response?.data?.message?.displayMessage ||
                "Something went wrong"
            );
            navigate("/cart");
          },
        }
      );
    } else {
      toast.warning("Accept the new quantity in the cart");
      navigate("/cart");
    }
  };

  const recordPayment = async (response) => {
    const payload = {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
    };

    paymentRecordMutation(payload, {
      onSuccess: () => {
        toast.success("Payment recorded successfully!");
        navigate("/order-success");
      },
      onError: (error) => {
        console.error(
          "Failed to record payment:",
          error?.response?.data?.message?.displayMessage
        );
        toast.error(error?.response?.data?.message?.displayMessage);
        navigate("/cart");
      },
    });
  };

  const content = useMemo(() => {
    if (isLoading) {
      return <CartLoader />;
    }
    if (isSuccess && data?.data?.data?.cart_items.length > 0) {
      return data.data.data.cart_items.map((item) => {
        switch (item.category_id) {
          case 5:
            return <VrpReviewItem key={item.request_id} item={item} />;
          case 6:
            return <SparesReviewItem key={item.id} item={item} />;
          case 7:
            return <NewPhoneReviewItem key={item.id} item={item} />;
          case 8:
            return <OpenBoxReviewItem key={item.id} item={item} />;
          default:
            return null;
        }
      });
    }
    return <EmptyCart />;
  }, [data?.data?.data?.cart_items, isLoading, isSuccess]);

  useEffect(() => {
    const couponIdFromUrl = searchParams.get("coupon");
    const addressIdFromUrl = searchParams.get("address");

    if (couponIdFromUrl) {
      dispatch(couponAdded({ id: couponIdFromUrl }));
    }
    if (addressIdFromUrl) {
      dispatch(setAddressId({ id: addressIdFromUrl }));
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    setSearchParams((params) => {
      if (coupon.id) {
        params.set("coupon", coupon.id);
      } else {
        params.delete("coupon");
      }

      if (address.id) {
        params.set("address", address.id);
      } else {
        params.delete("address");
      }
      return params;
    });
  }, [coupon.id, address.id, setSearchParams]);

  const handleNavigate = () => {
    navigate("/cart");
  };

  return (
    <div className={classes.box}>
      <div className={classes.box__cart}>
        {data?.data?.data?.address && (
          <Card className={classes.box__address}>
            <h2 className={classes.box__address__title}>Selected address</h2>
            <AddressReview address={data?.data?.data?.address} />
          </Card>
        )}
        <div className={classes.box__cart}>{content}</div>
      </div>

      <div className={classes.box__cart}>
        <h3 className={classes.box__cart__order}>Order Summary</h3>
        {data?.data?.data?.applied_coupon_code && (
          <div className={classes.box__coupons__applied}>
            <div className={classes.box__coupons__content}>
              <span className={classes.box__coupons__content__img} />
              <div className={classes.box__coupons__applied__content}>
                <h3 className={classes.box__coupons__content__applied__title}>
                  Coupon applied...
                </h3>
                <h3 className={classes.box__coupons__content__subTitle}>
                  {data?.data?.data?.applied_coupon_code}
                </h3>
              </div>
            </div>
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
          isShippingWaiver={data?.data?.data?.is_shipping_fee_waiver_applied}
        />
        <button
          className={classes.box__cart__order__btn}
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
