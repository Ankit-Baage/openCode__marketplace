import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classes from "./deleteAccount.module.css";

export const DeleteAccount = () => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    // your delete logic here
    console.log("Account deleted!");
    setOpen(false);
  };

  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <h1 className={classes.box__head__title}>Delete My Account</h1>
      </div>

      <div className={classes.box__content}>
        {/* your descriptive paragraphs */}
        <p className={classes.box__content__para}>
          Deleting your MobiGarage account will permanently remove your personal
          information from our system.
        </p>
        <p className={classes.box__content__para}>
          Your name, email, and contact details will be deleted or replaced with
          “Data deleted by user request.”
        </p>
        <p className={classes.box__content__para}>
          Your past orders and payments will remain in our records for legal and
          tax purposes but will no longer be linked to you.
        </p>
        <p className={classes.box__content__para}>
          Are you sure you want to delete your account and data?
        </p>
        {/* add the rest of your paragraphs here */}
      </div>

      <button className={classes.box__button} onClick={handleOpenModal}>
        Delete Account
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={classes.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className={classes.overlay__modal}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={classes.overlay__modal__content}>
                <div className={classes.overlay__modal__content__head}>
                  <h3 className={classes.overlay__modal__content__head__title}>
                    Confirm Deletion
                  </h3>
                  <p className={classes.overlay__modal__content__head__info}>
                    This action is permanent and cannot be undone. Are you sure
                    you want to delete this account?
                  </p>
                </div>
                <div className={classes.box__overlay__modal__content__actions}>
                  <button
                    onClick={handleClose}
                    className={`${classes.box__overlay__modal__content__actions__btn} ${classes.box__overlay__modal__content__actions__btn__cancel}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className={`${classes.box__overlay__modal__content__actions__btn} ${classes.box__overlay__modal__content__actions__btn__confirm}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
