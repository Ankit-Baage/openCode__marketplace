import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import debounce from "lodash/debounce";
import classes from "./sparePrice.module.css";
import { toast } from "react-toastify";
import useCartListSparesMutation from "../../../tanstack-query/cartList/useCartListSparesMutation";
import useCartListDeleteItemMutation from "../../../tanstack-query/cartList/useCartListDeleteItemMutation";
import { useQueryClient } from "@tanstack/react-query";

export const SparePrice = ({ prices, item }) => {
  const [qty, setQty] = useState(item?.cart_count);
  const [prevQty, setPrevQty] = useState(item?.cart_count);
  const authToken = Cookies.get("authToken");
  const { patchCart } = useCartListSparesMutation();
  const { mutateAsync: deleteItem } = useCartListDeleteItemMutation();
  const queryClient = useQueryClient();
  const updateCart = useCallback(
    async (updatedQty) => {
      const data = {
        category_id: item?.category_id,
        master_product_id: item?.master_product_id,
        item_id: item?.id,
        qty: updatedQty,
      };

      try {
        const response = await patchCart(data);
        toast.success(response.message.displayMessage);
        setPrevQty(updatedQty);
        await queryClient.invalidateQueries(["cartList"]);
      } catch (error) {
        toast.error(
          error.response?.data?.message?.displayMessage || "Update failed."
        );
        setQty(prevQty); // ✅ Rollback to last successful, not stale item.cart_count
      }
    },
    [
      item?.category_id,
      item?.id,
      item?.master_product_id,
      patchCart,
      prevQty,
      queryClient,
    ]
  );

  console.log("prices", item);

  // ✅ Debounced version (wrapped in useCallback to ensure stability)
  const debouncedUpdate = useCallback(
    debounce((val) => updateCart(val), 500),
    [updateCart]
  );

  const deliveryDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7);

    const options = { weekday: "short", day: "2-digit", month: "short" };
    return today.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    return () => debouncedUpdate.cancel();
  }, [debouncedUpdate]);
  useEffect(() => {
    setQty(item?.cart_count);
    setPrevQty(item?.cart_count);
  }, [item?.cart_count]);

  const handleInputChange = useCallback(
    (e) => {
      e.stopPropagation();
      const value = e.target.value;

      // Allow empty input for controlled component
      if (value === "") {
        setQty("");
        return;
      }

      // Reject anything that's not a non-negative integer (regex check)
      if (!/^\d+$/.test(value)) return;

      const parsed = parseInt(value, 10);

      setQty(parsed);

      if (parsed > item?.quantity) {
        toast.warn(`Only ${item?.quantity} in stock.`);
      }

      if (parsed !== prevQty) {
        debouncedUpdate(parsed);
      }
    },
    [item?.quantity, prevQty, debouncedUpdate]
  );

  const handleIncrement = useCallback(
    (e) => {
      e.stopPropagation();
      if (qty < item?.quantity) {
        const updated = qty + 1;
        setQty(updated);
        // updateCart(updated);
        debouncedUpdate(updated);
      }
    },
    [qty, item?.quantity, debouncedUpdate]
  );

  const handleDecrement = useCallback(
    (e) => {
      e.stopPropagation();
      if (qty > 0) {
        const updated = qty - 1;
        setQty(updated);
        // updateCart(updated);
        debouncedUpdate(updated);
      }
    },
    [debouncedUpdate, qty]
  );

  const handleRemove = useCallback(async () => {
    const { category_id, master_product_id, request_id } = item;

    const data = {
      category_id,
      ...(category_id === 5 ? { request_id } : { master_product_id }),
    };

    try {
      const response = await deleteItem(data);
      toast.success(response.message.displayMessage);
    } catch (error) {
      toast.error(
        error.response?.data?.message?.displayMessage || "Delete failed."
      );
    }
  }, [item, deleteItem]);

  console.log("quantity :", qty);
  return (
    <div className={classes.box}>
      <div className={classes.box__info}>
        <h1 className={classes.box__title}>Our Price</h1>
        <div className={classes.box__price}>
          <div className={classes.box__container}>
            <h3 className={classes.box__price__discount}>
              Rs.{prices.discountedPrice}
            </h3>
            {prices.discountPercentage !== 0 && (
              <h3 className={classes.box__price__original}>
                {prices.originalPrice}
              </h3>
            )}

            {prices.discountPercentage !== 0 && (
              <span className={classes.box__price__discount__img}>
                {prices.discountPercentage}% OFF
              </span>
            )}
          </div>
          <div className={classes.box__qty__wrapper}>
            <div className={classes.box__info__qty}>
              <button
                onClick={handleDecrement}
                disabled={qty <= 0}
                className={
                  qty <= 0
                    ? classes.box__info__qty__btn
                    : classes.box__info__qty__btn__enabled
                }
              >
                –
              </button>
              <label
                htmlFor={`qty-${item?.id}`}
                className={classes.box__info__qty__label}
              >
                <input
                  type="number"
                  id={`qty-${item?.id}`}
                  className={classes.box__info__qty__input}
                  value={qty}
                  onChange={handleInputChange}
                  onClick={(e) => e.stopPropagation()}
                  min={0}
                  max={item?.quantity}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </label>
              <button
                onClick={handleIncrement}
                disabled={qty >= item?.quantity}
                className={
                  qty >= item?.quantity
                    ? classes.box__info__qty__btn
                    : classes.box__info__qty__btn__enabled
                }
              >
                +
              </button>
            </div>
            {item?.cart_count !== 0 && (
              <button
                className={classes.box__qty__delete__btn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
              />
            )}
          </div>
        </div>
        <div className={classes.box__qty__wrapper}>
          <div className={classes.box__qrty__wrapper__helper}>
            <div className={classes.box__qty__wrapper__content}>
              <h3 className={classes.box__wrapper__para}>
                Pan India Delivery: Arrives by
              </h3>
              <h3 className={classes.box__wrapper__para__black}>
                {/* Mon, 14 Apr */} {deliveryDate()}
              </h3>
            </div>
            <div className={classes.box__qty__wrapper__content}>
              <h4 className={classes.box__wrapper__para}>if ordered in</h4>
              <h4 className={classes.box__wrapper__para__orange}>48 mins.</h4>
            </div>
          </div>

          {qty > 0 && (
            <button
              className={classes.box__wrapper__para__btn}
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            ></button>
          )}
        </div>
      </div>
      <hr className={classes.box__divider} />
    </div>
  );
};
