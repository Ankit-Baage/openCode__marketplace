import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import classes from "./order.module.css";
import { formatDate, formatNumber } from "../../utils/helpers/formatNumber";
import useGetOrderDetail from "../../tanstack-query/orderDetail/useGetOrderDetail";
import { useDispatch } from "react-redux";
import { openReturnShipmentModal } from "../../store/returnShipment/returnShipmentSlice";
import { checkReturnEligibility } from "../../utils/helpers/checkReturnEligibility";
import { cancelDuration } from "../../config/config";
import usePCancelOrderMutation from "../../tanstack-query/cancelOrder/useCancelOrderMutation";
import { toast } from "react-toastify";
import { eligibleForCancel } from "../../utils/helpers/elligibleForCancel";
import { openCancellationModal } from "../../store/cancellation/cancellationSlice";

export const Order = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openShipments, setOpenShipments] = useState({});
  const [isPriceDetailsOpen, setIsPriceDetailsOpen] = useState(false);
  const { data, isSuccess } = useGetOrderDetail(selectedOrderId, {
    enabled: !!selectedOrderId, // <- only fetch when ID is set
  });
  const { mutate, isLoading, isError } = usePCancelOrderMutation();
  const dispatch = useDispatch();

  const shipments = useMemo(() => {
    if (isSuccess && data?.data?.data) {
      return Object.entries(data.data.data).map(([key, value], index) => ({
        id: index + 1, // Adding 'id' as index + 1
        title: key.replace("_", " "), // Format title by replacing underscores with spaces
        ...value, // Spread the properties from the inner object
      }));
    }
    return []; // Return an empty array if data is not available
  }, [isSuccess, data?.data?.data]);
  const { canCancel, cancelDuration } = eligibleForCancel(
    order?.order_status_code,
    order?.ordered_on
  );

  const handleToggleDropdown = () => {
    setIsExpanded((prev) => {
      if (!prev) {
        setSelectedOrderId(order.id); // Set order ID for expanded dropdown
      } else {
        setSelectedOrderId(null); // Reset order ID when collapsing
      }
      return !prev; // Toggle the expanded state
    });
  };

  const handleToggleSubDropdown = (id) => {
    setOpenShipments((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the open state for the specific shipment
    }));
  };

  // const buttonText = (item.status,item.updated_at)

  const handleReturnShipment = (shipment) => {
    console.log(shipment);

    dispatch(
      openReturnShipmentModal({
        order_id: order.order_id,
        shipment: shipment,
      })
    );
  };

   const handleCancel = () => {

    // console.log("orderId",order?.id)
    dispatch(
      openCancellationModal({
        orderId: order?.id,
      })
    );
  };

  const togglePriceDetails = () => {
    setIsPriceDetailsOpen((prev) => !prev);
  };

  // const handleCancelOrder = () => {
  //   mutate(
  //     { order_id: order.id },
  //     {
  //       onSuccess: (data) => {
  //         toast.success(data?.message?.displayMessage);
  //         console.log("Order cancelled:", data?.message?.displayMessage);
  //       },
  //       onError: (error) => {
  //         console.error("Cancel failed:", error);
  //         toast.error(data?.message?.displayMessage);
  //       },
  //     }
  //   );
  //   console.log(order);
  // };
  return (
    <motion.div className={classes.box}>
      <div className={classes.box__wrapper}>
        <div className={classes.box__upper}>
          <div className={classes.box__upper__order}>
            <div className={classes.box__upper__order__info}>
              <h1 className={classes.box__upper__order__info__key}>Order:</h1>
              <h1 className={classes.box__upper__order__info__value}>
                #{order.order_id}
              </h1>
            </div>
            <div className={classes.box__upper__order__info}>
              <h1 className={classes.box__upper__order__info__key}>
                No of items :
              </h1>
              <h1 className={classes.box__upper__order__info__value}>
                {order.num_of_items}
              </h1>
            </div>

            {/* <div className={classes.box__return}>
            <hr className={classes.box__sep} />
            <div className={classes.box__return__info}>
              <img
                src={returnImage}
                alt="return"
                className={classes.box__return__info__img}
              />
              <h3 className={classes.box__return__info__title}>
                3 days left to return
              </h3>
            </div>
          </div> */}
          </div>
          <div className={classes.box__upper__order__date}>
            <h1 className={classes.box__upper__order__date__text}>
              {formatDate(order.ordered_on)}
            </h1>
            <motion.span
              className={classes.box__expand}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={handleToggleDropdown}
            />
          </div>
        </div>

        {shipments.map((shipment) => {
          // const buttonText = getReturnButtonText(shipment);
          const returnEligible = checkReturnEligibility(
            shipment.status,
            shipment.delivered_on,
            shipment.return_status
          );
          console.log("shipment", shipment);

          return (
            <div
              className={`${classes.box__content} ${
                isExpanded ? classes.open : ""
              }`}
              key={shipment.id}
            >
              <div className={classes.box__content__info}>
                <h1 className={classes.box__content__info__title}>
                  {shipment.title}
                </h1>
                <div className={classes.box__content__info__box}>
                  <h2
                    className={classes.box__content__info__box__status}
                    style={{
                      backgroundColor:
                        shipment.status === "Pending"
                          ? "#FBE8B3"
                          : shipment.status === "In process"
                          ? "#D0F1FF"
                          : shipment.status === "Shipped"
                          ? "#D0F1FF"
                          : shipment.status === "Delivered"
                          ? "#EFEFEF"
                          : shipment.status === "order placed"
                          ? "#E4FDEF"
                          : "transparent", // Default background color
                      color:
                        shipment.status === "Pending"
                          ? "#F2B200"
                          : shipment.status === "Shipped"
                          ? "#F2B200"
                          : shipment.status === "In process"
                          ? "red"
                          : shipment.status === "Delivered"
                          ? "#4A4C5F"
                          : shipment.status === "order placed"
                          ? "#46CD80"
                          : "inherit", // Default text color
                    }}
                  >
                    {shipment.status}
                  </h2>

                  <span
                    className={`${classes.box__content__expand} ${
                      openShipments[shipment.id] ? classes.rotate : ""
                    }`}
                    onClick={() => handleToggleSubDropdown(shipment.id)}
                  />
                </div>
              </div>
              <div
                className={`${classes.box__content__detail__info} ${
                  openShipments[shipment.id] ? classes.open : ""
                }`}
              >
                <div className={classes.box__content__detail__item__shipment}>
                  <h2
                    className={
                      classes.box__content__detail__item__info__shipment
                    }
                  >
                    {shipment.category}
                  </h2>
                  <h2
                    className={
                      classes.box__content__detail__item__info__shipment
                    }
                  >
                    {shipment.quantity}
                  </h2>
                  <h2
                    className={
                      classes.box__content__detail__item__info__shipment
                    }
                  >
                    Rs {formatNumber(shipment.total)}
                  </h2>
                </div>
                {shipment.items.map((item) => (
                  <div
                    key={item.id}
                    className={classes.box__content__detail__item}
                  >
                    <h2 className={classes.box__content__detail__item__info}>
                      {item.category_id === 5 ? item.lot_id : item.item}
                    </h2>
                    <h2 className={classes.box__content__detail__item__info}>
                      {item.qty}
                    </h2>
                    <h2 className={classes.box__content__detail__item__info}>
                      Rs {formatNumber(item.price)}
                    </h2>
                  </div>
                ))}
                {returnEligible.isVisible && (
                  <div className={classes.box__content__return}>
                    <p className={classes.box__content__return__text}>
                      {shipment.return_status === 0
                        ? returnEligible.message
                        : returnEligible.returnStatus}
                    </p>
                    {shipment.return_status === 0 && (
                      <button
                        className={classes.box__content__return__btn}
                        onClick={() => handleReturnShipment(shipment)}
                      >
                        <span className={classes.box__content__return__img} />
                        {`Return`}
                      </button>
                    )}
                  </div>
                )}
              </div>
              <hr className={classes.box__sep} />
            </div>
          );
        })}
      </div>
      <div className={classes.box__wrapper}>
        {!isExpanded && <hr className={classes.box__sep} />}
        <div
          className={`${classes.box__order__info__payment__details} ${
            isPriceDetailsOpen ? classes.open : ""
          }`}
        >
          <h2 className={classes.box__order__info__payment__details__title}>
            Price Details
          </h2>
          <div className={classes.box__order__info__payment__details__info}>
            <div
              className={classes.box__order__info__payment__details__info__item}
            >
              <h3
                className={
                  classes.box__order__info__payment__details__info__item__title
                }
              >
                Total MRP
              </h3>
              <h3
                className={
                  classes.box__order__info__payment__details__info__item__value
                }
              >
                Rs {formatNumber(order?.original_amount)}
              </h3>
            </div>
            <div
              className={classes.box__order__info__payment__details__info__item}
            >
              <h3
                className={
                  classes.box__order__info__payment__details__info__item__title
                }
              >
                Coupon Discount
              </h3>
              <h3
                className={
                  classes.box__order__info__payment__details__info__item__value
                }
              >
                - Rs {formatNumber(order?.coupon_amount)}
              </h3>
            </div>
            <div
              className={classes.box__order__info__payment__details__info__item}
            >
              <h3
                className={
                  classes.box__order__info__payment__details__info__item__title
                }
              >
                Shipping Fee
              </h3>
              <h3
                className={
                  classes.box__order__info__payment__details__info__item__value
                }
              >
                Rs {formatNumber(order?.shipping_fee)}
              </h3>
            </div>
            <div
              className={classes.box__order__info__payment__details__info__item}
            >
              <h3
                className={
                  classes.box__order__info__payment__details__info__item__title
                }
              >
                Gst
              </h3>
              <h3
                className={
                  classes.box__order__info__payment__details__info__item__value
                }
              >
                Rs {formatNumber(order?.gst_amount)}
              </h3>
            </div>
          </div>

          {/* <div className={classes.box__order__info__payment__details__info}>
          <hr className={classes.box__sep} />
          <div
            className={classes.box__order__info__payment__details__info__item}
          >
            <h3
              className={
                classes.box__order__info__payment__details__info__item__total__title
              }
            >
              Total
            </h3>
            <h3
              className={
                classes.box__order__info__payment__details__info__item__total__value
              }
            >
              Rs {formatNumber(order?.total_amount)}
            </h3>
          </div>
        </div> */}
        </div>

        <motion.div className={classes.box__upper}>
          <div className={classes.box__upper__order__info}>
            <h1 className={classes.box__upper__order__info__key__amt}>
              Total Amt:
            </h1>
            <h1 className={classes.box__upper__order__info__value__amt}>
              Rs {formatNumber(order?.total_amount)}
            </h1>
            <motion.span
              className={classes.box__order__info__payment}
              onClick={togglePriceDetails}
              animate={{ rotate: isPriceDetailsOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>

          {order.is_invoice === 1 && (
            <div className={classes.box__downLoad}>
              <span className={classes.box__downLoad__icon} />
              <h3 className={classes.box__downLoad__text}>Download Invoice</h3>
            </div>
          )}

          {order.order_status && (
            <h3
              className={classes.box__order__status}
              style={{
                color:
                  order.order_status_code === 1
                    ? "#46CD80"
                    : order.order_status_code === 11
                    ? "#FE0000"
                    : "#F2B200",
                backgroundColor:
                  order.order_status_code === 1
                    ? "#E4FDEF"
                    : order.order_status_code === 11
                    ? "#FFB3B3"
                    : "#FFF4D2",
              }}
            >
              {order.order_status}
            </h3>
          )}
        </motion.div>
        <hr className={classes.box__sep} />
        {canCancel && (
          <div className={classes.box__order__cancel}>
            <button
              className={classes.box__order__cancel__btn}
              onClick={handleCancel}
            >
              Cancel Order
            </button>
            <p className={classes.box__order__cancel__text}>
              {`cancel within ${cancelDuration}`}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
