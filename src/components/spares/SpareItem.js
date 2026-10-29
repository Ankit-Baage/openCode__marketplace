import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import useCartListSparesMutation from "../../tanstack-query/cartList/useCartListSparesMutation";
import useCartListDeleteItemMutation from "../../tanstack-query/cartList/useCartListDeleteItemMutation";
import { formatNumber } from "../../utils/helpers/formatNumber";
import dummyImage from "../../assets/dummyPreview.png";
import classes from "./spareItem.module.css";
import { Card } from "../card/Card";
import { useQueryClient } from "@tanstack/react-query";

export const SpareItem = ({ item, onClick, onWishList }) => {
  const authToken = Cookies.get("authToken");
  const { patchCart } = useCartListSparesMutation();
  const { mutateAsync: deleteItem } = useCartListDeleteItemMutation();
  const queryClient = useQueryClient();

  const [qty, setQty] = useState(item.cart_count);
  const [prevQty, setPrevQty] = useState(item?.cart_count);

  const updateCart = useCallback(
    async (updatedQty) => {
      const data = {
        category_id: item.category_id,
        master_product_id: item.master_product_id,
        item_id: item.id,
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
        setQty(prevQty);
      }
    },
    [item, patchCart, prevQty]
  );

  const debouncedUpdate = useCallback(
    debounce((val) => updateCart(val), 500),
    [updateCart]
  );

  useEffect(() => {
    return () => debouncedUpdate.cancel();
  }, [debouncedUpdate]);

  const handleQtyChange = useCallback(
    (e) => {
      e.stopPropagation();
      const value = e.target.value;

      if (value === "") return setQty("");

      if (!/^\d+$/.test(value)) return;

      const parsed = parseInt(value, 10);
      setQty(parsed);

      if (parsed > item.quantity) {
        toast.warn(`Only ${item.quantity} in stock.`);
      }

      if (parsed !== prevQty) {
        debouncedUpdate(parsed);
      }
    },
    [item.quantity, prevQty, debouncedUpdate]
  );

  const changeQty = useCallback(
    (diff) => {
      const newQty = qty + diff;
      if (newQty >= 0 && newQty <= item.quantity) {
        setQty(newQty);
        debouncedUpdate(newQty);
      }
    },
    [qty, item.quantity, debouncedUpdate]
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

  useEffect(() => {
    setQty(item.cart_count);
    setPrevQty(item.cart_count);
  }, [item.cart_count]);

  return (
    <Card className={classes.box} onClick={() => onClick(item.id)}>
      <div className={classes.box__img}>
        {item?.stock_status === "sold" && (
          <span className={classes.box__img__sold} />
        )}
        <img
          src={item.image}
          onError={(e) => (e.target.src = dummyImage)}
          alt={item.part_name}
          className={classes.box__image}
        />
      </div>

      <div className={classes.box__info}>
        <div className={classes.box__info__head}>
          <h1 className={classes.box__info__head__title}>{item.part_name}</h1>
          {authToken && (
            <span
              className={
                item.wishlist_status === 1
                  ? classes.box__info__fav__active
                  : classes.box__info__fav
              }
              onClick={(e) => {
                e.stopPropagation();
                onWishList(item.id);
              }}
            />
          )}
        </div>

        <h1 className={classes.box__info__head__title}>{`(${item.color})`}</h1>

        <div className={classes.box__discount}>
          <h3 className={classes.box__discount__container__discountedPrice}>
            Rs.{formatNumber(item.discounted_price)}
          </h3>
          {item.discount_percentage !== 0 && (
            <>
              <h3 className={classes.box__discount__container__price}>
                Rs.{formatNumber(item.original_price)}
              </h3>
              <span className={classes.box__discount__img}>
                {item.discount_percentage}% OFF
              </span>
            </>
          )}
        </div>

        <div
          className={classes.box__qty__wrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={classes.box__info__qty}>
            <button
              onClick={() => changeQty(-1)}
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
              htmlFor={`qty-${item.id}`}
              className={classes.box__info__qty__label}
            >
              <input
                type="number"
                id={`qty-${item.id}`}
                className={classes.box__info__qty__input}
                value={qty}
                onChange={handleQtyChange}
                onClick={(e) => e.stopPropagation()}
                min={0}
                max={item.quantity}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </label>
            <button
              onClick={() => changeQty(1)}
              disabled={qty >= item.quantity}
              className={
                qty >= item.quantity
                  ? classes.box__info__qty__btn
                  : classes.box__info__qty__btn__enabled
              }
            >
              +
            </button>
          </div>

          {qty > 0 && (
            <button
              className={classes.box__qty__delete__btn}
              onClick={handleRemove}
            />
          )}
        </div>
      </div>
    </Card>
  );
};
