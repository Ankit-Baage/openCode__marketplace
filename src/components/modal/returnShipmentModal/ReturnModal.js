import React from "react";
import { motion } from "framer-motion";
import classes from "./returnModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { closeReturnShipmentModal } from "../../../store/returnShipment/returnShipmentSlice";
import useReturnMutation from "../../../tanstack-query/return/useReturnMutation";
import { toast } from "react-toastify";

const radioButtons = [
  { id: "1", label: "Item was defective" },
  { id: "2", label: "Wrong item was sent" },
  { id: "3", label: "Item arrived late" },
  { id: "4", label: "broken product" },
  // { id: "5", label: "Other" },
];

export const ReturnModal = () => {
  const { isOpen, shipment } = useSelector((state) => state.returnShipment);

  const dispatch = useDispatch();
  const { register, handleSubmit, watch, reset, formState } = useForm();

  const { isValid } = formState;
  const { returnMutate, isReturnLoading } = useReturnMutation();

  const onSubmit = async (data) => {
    if (!shipment || !data) return;

    try {
      await returnMutate({
        order_id: shipment.order_id,
        shipment_id: shipment.shipment_id,
        reason: data.reason,
        comments: data.comments || "",
      });

      toast.success("Return request submitted successfully!"); // ✅ Success toaster

      dispatch(closeReturnShipmentModal());
      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message?.displayMessage ||
          "Something went wrong!"
      );
      console.log("error", error.response.data.message.displayMessage);
    }

    console.log({
      order_id: shipment.order_id,
      shipment_id: shipment.shipment_id,
      reason: data.reason,
      comments: data.comments || "",
    });
  };

  const handleClose = () => {
    dispatch(closeReturnShipmentModal());
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
        transition={{ duration: 0.5 }}
      >
        <div className={classes.box__content}>
          <div className={classes.box__content__head}>
            <h1 className={classes.box__content__head__title}>
              {`Return Shipment Id : ${shipment.shipment_id}`}
            </h1>

            <button
              className={classes.box__content__close}
              onClick={handleClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.box__content__info}>
              <p className={classes.box__content__info__quest}>
                Reason for raising the return request.
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

              {/* Textarea */}
              <textarea
                placeholder="Additional comments..."
                {...register("comments")}
                className={classes.box__content__textarea}
                rows={6} // for static height (optional)
                style={{ resize: "none" }}
              />

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
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  ) : null;
};
