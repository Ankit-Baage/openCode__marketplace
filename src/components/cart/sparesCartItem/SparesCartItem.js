import React, { useCallback, useEffect, useState } from "react";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import dummyImage from "../../../assets/dummyPreview.png";
import classes from "./sparesCartItem.module.css";
import { CartActionButtonGroup } from "../CartActionButtonGroup/CartActionButtonGroup";

import { Link } from "react-router-dom";
import useCartListSparesMutation from "../../../tanstack-query/cartList/useCartListSparesMutation";
import { toast } from "react-toastify";
import useCartListDeleteItemMutation from "../../../tanstack-query/cartList/useCartListDeleteItemMutation";
import { debounce } from "lodash";
import {
  couponRemoved,
  selectCouponState,
} from "../../../store/coupon/couponSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Card } from "../../card/Card";
import { toSlug } from "../../../utils/toSlug";

export const SparesCartItem = ({
  item,
  onQuantityUpdate,
  isUpdating,
  onRemove,
  onLater,
  refetch,
}) => {
  const coupon = useSelector(selectCouponState);
  const guestId = Cookies.get("guestId");

  const [qty, setQty] = useState(item.cart_count);
  const [prevQty, setPrevQty] = useState(item.cart_count);
  const [isQtyChangedFlag, setIsQtyChangedFlag] = useState(item.qty_changed_flag);

  const dispatch = useDispatch();
  const { patchCart } = useCartListSparesMutation(coupon.id, guestId);
  const { mutateAsync: deleteItem } = useCartListDeleteItemMutation(
    coupon.id,
    guestId
  );

  // Update local qty and flag on item prop changes
  useEffect(() => {
    setQty(item.cart_count);
    setPrevQty(item.cart_count);
    setIsQtyChangedFlag(item.qty_changed_flag);
  }, [item.cart_count, item.qty_changed_flag]);

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

        setPrevQty(updatedQty);
        toast.success(response.message.displayMessage);

        // Update local flag and qty according to server response
        if (response.is_quantity_changed === true) {
          // Quantity corrected by server — reset flag and qty to server value
          setIsQtyChangedFlag(false);
          setQty(item.quantity);
        } else {
          setIsQtyChangedFlag(false);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message?.displayMessage || "Update failed."
        );
        setQty(prevQty); // revert on failure
      }
    },
    [item, patchCart, prevQty]
  );

  const debouncedUpdate = useCallback(
    debounce((val) => updateCart(val), 1000),
    [updateCart]
  );

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleInputChange = useCallback(
    (e) => {
      e.stopPropagation();
      const value = e.target.value;

      if (value === "") {
        setQty("");
        return;
      }

      if (!/^\d+$/.test(value)) return;

      const parsed = parseInt(value, 10);
      setQty(parsed);

      if (parsed > item.quantity) {
        toast.warn(`Only ${item.quantity} in stock.`);
      }

      // IMPORTANT: Only auto-update if qty_changed_flag is false
      if (!isQtyChangedFlag && parsed !== prevQty) {
        debouncedUpdate(parsed);
      }
    },
    [item.quantity, prevQty, debouncedUpdate, isQtyChangedFlag]
  );

  // Increment and decrement also respect qty_changed_flag: disable if flag true
  const handleIncrement = useCallback(
    (e) => {
      e.stopPropagation();
      if (isQtyChangedFlag) return; // disable if qty_changed_flag true
      if (qty < item.quantity) {
        const updated = qty + 1;
        setQty(updated);
        // updateCart(updated);
        debouncedUpdate(updated); 
      }
    },
    [isQtyChangedFlag, qty, item.quantity, debouncedUpdate]
  );

  const handleDecrement = useCallback(
    (e) => {
      e.stopPropagation();
      if (isQtyChangedFlag) return; // disable if qty_changed_flag true
      if (qty > 0) {
        const updated = qty - 1;
        setQty(updated);
        // updateCart(updated);
        debouncedUpdate(updated); 
      }
    },
    [isQtyChangedFlag, qty, debouncedUpdate]
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

  const handleImageError = (e) => {
    e.target.src = dummyImage;
  };

  // When user clicks "Accept Quantity"
  const handleAcceptQuantity = async () => {
    // Force refetch to get updated cart info (including flag reset)
    await refetch();
    setIsQtyChangedFlag(false); // reset local flag after accept
  };

  const brand = toSlug(item.brand ?? "");
    const model = toSlug(item.model ?? "");
    const spareName = toSlug(
      item.part_name ?? item.part ?? item.title ?? item.name ?? "spare"
    );
  
    const spareDetailUrl = `/spares/${brand}/${model}/${spareName}/${item.id}`;

  return (
    <Card className={classes.box}>
      <div className={classes.box__info}>
        <Link to={spareDetailUrl}>
          <img
            src={item.image}
            alt="item"
            className={classes.box__img}
            onError={handleImageError}
          />
        </Link>

        <div className={classes.box__info__cred}>
          <h2 className={classes.box__info__cred__badge}>Spares</h2>
          <Link
            to={spareDetailUrl}
            className={classes.box__info__cred__title}
          >
            <h1 className={classes.box__info__cred__title__head}>
              {item.part_name}
            </h1>
            <h2 className={classes.box__info__cred__title__color}>
              {`(${item.color})`}
            </h2>
          </Link>

          <div className={classes.box__info__cred__price}>
            <h1 className={classes.box__info__cred__price__value}>
              Rs.{formatNumber(item.discounted_price)}
            </h1>
            {item?.discount_percentage !== 0 && (
              <h2 className={classes.box__info__cred__price__subValue}>
                Rs.{formatNumber(item.original_price)}
              </h2>
            )}

            {item?.discount_percentage !== 0 && (
              <span className={classes.box__info__cred__price__discount}>
                {item.discount_percentage}% OFF
              </span>
            )}
          </div>

          <div className={classes.box__qty__wrapper}>
            <div className={classes.box__info__qty}>
              <button
                onClick={handleDecrement}
                disabled={qty <= 0 || isQtyChangedFlag}
                className={
                  qty <= 0 || isQtyChangedFlag
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
                  onChange={handleInputChange}
                  onClick={(e) => e.stopPropagation()}
                  min={0}
                  max={item.quantity}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  disabled={isQtyChangedFlag}
                />
              </label>
              <button
                onClick={handleIncrement}
                disabled={qty >= item.quantity || isQtyChangedFlag}
                className={
                  qty >= item.quantity || isQtyChangedFlag
                    ? classes.box__info__qty__btn
                    : classes.box__info__qty__btn__enabled
                }
              >
                +
              </button>
            </div>
            {isQtyChangedFlag && (
              <button
                className={classes.box__qty__btn}
                onClick={handleAcceptQuantity}
              >
                Accept Quantity
              </button>
            )}
          </div>
        </div>
      </div>

      <CartActionButtonGroup
        onRemove={onRemove}
        isUpdating={isUpdating}
        onLater={onLater}
      />
    </Card>
  );
};
