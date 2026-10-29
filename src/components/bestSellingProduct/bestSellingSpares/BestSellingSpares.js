import React, { useCallback } from "react";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import dummyImage from "../../../assets/dummyPreview.png";
import classes from "./bestSellingSpares.module.css";

export const BestSellingSpares = ({ spare, onClick }) => {
  const handleImageError = useCallback((e) => {
    e.target.src = dummyImage;
  }, []);

  return (
    <article
      className={classes.card}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${spare?.part_name || "Spare part"}`}
      onClick={() => onClick(spare)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(spare);
        }
      }}
    >
      {/* Discount Badge */}
      {spare?.discount_percentage > 0 && (
        <span className={classes.card__discount}>
          {spare.discount_percentage}% OFF
        </span>
      )}

      {/* Image */}
      <div className={classes.box__img}>
        {spare?.stock_status === "sold" && (
          <span className={classes.box__img__sold} aria-label="Sold Out" />
        )}
        <img
          className={classes.box__image}
          src={spare?.image || dummyImage}
          alt={spare?.part_name || "Spare Part Image"}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
          
        />
      </div>

      {/* Content */}
      <div className={classes.card__content}>
        <h3 className={classes.card__title}>{spare?.part_name}</h3>

        <div className={classes.card__price}>
          <span className={classes.card__price__discounted}>
            ₹
            {spare?.discounted_price
              ? formatNumber(spare.discounted_price)
              : "N/A"}
          </span>

          {spare?.discount_percentage > 0 && spare?.original_price && (
            <span
              className={classes.card__price__original}
              aria-label={`Original price ₹${formatNumber(
                spare.original_price
              )}`}
            >
              ₹{formatNumber(spare.original_price)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
