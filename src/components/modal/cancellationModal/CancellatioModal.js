import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { closeCancellationModal } from "../../../store/cancellation/cancellationSlice";
import classes from "./cancellationModal.module.css";
import useCancelOrderMutation from "../../../tanstack-query/cancelOrder/useCancelOrderMutation";

const radioButtons = [
  { id: "1", label: "Changed my mind" },
  { id: "2", label: "Found a better price elsewhere" },
  { id: "3", label: "Ordered by mistake" },
  { id: "4", label: "Item won’t arrive on time" },
  { id: "5", label: "Duplicate order" },
  { id: "6", label: "Item no longer needed" },
  { id: "7", label: "Other" },
];

export const CancellationModal = () => {
  const { isOpen, orderId } = useSelector((state) => state.cancellation);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState, watch } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;

  const cancelOrder = useCancelOrderMutation();
  const selectedReason = watch("reason");

  const onSubmit = async (data) => {
    try {
      const { reason, comments } = data;

      // Determine remarks based on selected reason
      const remarks = reason === "Other" ? comments : reason;

      console.log("cancellation", {
        order_id: orderId,
        remarks,
      });

      await cancelOrder({ order_id: orderId, remarks });
      toast.success("Cancellation request submitted successfully!");
      dispatch(closeCancellationModal());
      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message?.displayMessage ||
          "Something went wrong!"
      );
      console.error("error", error.response?.data?.message?.displayMessage);
    }
  };

  const handleClose = () => {
    dispatch(closeCancellationModal());
    reset();
  };

  return isOpen ? (
    <motion.div
      className={classes.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={classes.box}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -120 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className={classes.box__content}>
          <div className={classes.box__content__head}>
            <h1 className={classes.box__content__head__title}>
              {`Cancel Order Id : ${orderId}`}
            </h1>
            <button
              className={classes.box__content__close}
              onClick={handleClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.box__content__info}>
              <p className={classes.box__content__info__quest}>
                Reason for cancellation.
              </p>

              <div className={classes.box__content__filter}>
                {radioButtons.map((item) => (
                  <label
                    htmlFor={item.id}
                    key={item.id}
                    className={classes.box__content__filter__option}
                  >
                    <input
                      id={item.id}
                      type="radio"
                      value={item.label}
                      {...register("reason", { required: true })}
                      className={classes.box__content__filter__option__input}
                    />
                    <span className={classes.box__content__filter__labelText}>
                      {item.label}
                    </span>
                    <span
                      className={classes.box__content__filter__option__label}
                    ></span>
                  </label>
                ))}
              </div>

              {/* ✅ Animate Textarea Smoothly with Framer Motion */}
              <AnimatePresence mode="wait">
                {selectedReason === "Other" && (
                  <motion.textarea
                    key="textarea"
                    placeholder="Please specify your reason..."
                    {...register("comments", { required: true })}
                    className={classes.box__content__textarea}
                    rows={6}
                    style={{ resize: "none" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>

              <hr className={classes.box__sep} />
            </div>

            <div className={classes.box__content__btns}>
              <button
                type="submit"
                className={
                  isValid
                    ? classes.box__content__btn__confirm__enabled
                    : classes.box__content__btn__confirm
                }
              >
                Confirm
              </button>
              <button
                type="button"
                className={classes.box__content__btn__cancel}
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  ) : null;
};
