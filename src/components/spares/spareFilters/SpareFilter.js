import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import classes from "./spareFilter.module.css";

export const SpareFilter = ({ spareData, onItemSelected, selectedItemIds: parentSelectedItemIds, onApply, onClear, onClose }) => {
  const [selectedItemIds, setSelectedItemIds] = useState(parentSelectedItemIds || []);

  useEffect(() => {
    setSelectedItemIds(parentSelectedItemIds);
  }, [parentSelectedItemIds]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const updatedSelectedItemIds = checked
      ? [...selectedItemIds, value]
      : selectedItemIds.filter((id) => id !== value);

    setSelectedItemIds(updatedSelectedItemIds);
    onItemSelected(updatedSelectedItemIds);
  };

  const clearHandler = () => {
    setSelectedItemIds([]);
    onItemSelected([]);
    onClear();
  };

  const handleApply = () => {
    onApply();
  };

  const filterClose = () => {
    onClose();
  };

  return (
    <div className={classes.backdrop} onClick={filterClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={classes.box}
        initial={{ y: "100%" }}
        animate={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        exit={{ y: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
      >
        <div className={classes.box__content}>
          <div className={classes.box__content__head}>
            <h1 className={classes.box__content__head__title}>Spare</h1>
            <button
              className={classes.backdrop__btn}
              onClick={filterClose}
            ></button>
          </div>
          <hr className={classes.box__content__divider} />
          <div className={classes.box__content__filter}>
            {spareData.map((item) => (
              <label
                htmlFor={item.id}
                key={item.id}
                className={classes.box__content__filter__option}
              >
                <input
                  id={item.id}
                  type="checkbox"
                  className={classes.box__content__filter__option__input}
                  value={item.id}
                  checked={selectedItemIds.includes(item.id)}
                  onChange={handleCheckboxChange}
                />
                <span
                  className={`${classes.box__content__filter__labelText} ${
                    selectedItemIds.includes(item.id)
                      ? classes.box__content__filter__labelText__checked
                      : ""
                  }`}
                >
                  {item.spare}
                </span>
                <span
                  className={classes.box__content__filter__option__label}
                ></span>
              </label>
            ))}
          </div>
        </div>
        <hr className={classes.box__content__divider} />
        <div className={classes.box__btn}>
          <button className={classes.box__btn__clear} onClick={clearHandler}>
            Clear All
          </button>
          <button className={classes.box__btn__apply} onClick={handleApply}>
            Apply
          </button>
        </div>
      </motion.div>
    </div>
  );
};
