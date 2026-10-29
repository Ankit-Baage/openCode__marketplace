import React from "react";
import classes from "./categoryActionButtonGroup.module.css";
import { Link } from "react-router-dom";

export const CategoryActionButtonGroup = ({ onAdd, isAddedToCart }) => {
  return (
    <div
      className={classes.box__info__btns}
      onClick={(e) => e.stopPropagation()}
    >
      <button className={classes.box__info__btns__cart} onClick={onAdd}>
        {isAddedToCart ? "Update Quantity" : "Add To Cart"}
      </button>
      {isAddedToCart !== 0 ? (
        <Link
          to="/cart"
          className={`${classes.box__btns__btn} ${classes.box__btns__buy}`}
        >
          Go To Cart
        </Link>
      ) : null}
      {/* <button className={classes.box__info__btns__buy}>Buy Now</button> */}
    </div>
  );
};
