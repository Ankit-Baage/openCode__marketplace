import React from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/helpers/formatNumber";
import dummyImage from "../../../assets/dummyPreview.png";

import classes from "./sparesLaterItem.module.css";
import { LaterActionButtonGroup } from "../laterActionButtonGroup/LaterActionButtonGroup";
import { Card } from "../../card/Card";
import { toSlug } from "../../../utils/toSlug";

export const SparesLaterItem = ({
  item,
  onUpdateQuantity,
  spareQuantity,
  isUpdating,
  onRemove,
  onMove,
}) => {
  const handleImageError = (e) => {
    e.target.src = dummyImage;
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
        <Link to={spareDetailUrl} className={classes.box__link}>
          {item?.stock_status === "sold" && (
            <span className={classes.box__img__sold} />
          )}
          <img
            src={item.image}
            alt="item"
            className={classes.box__img}
            onError={handleImageError}
          />
        </Link>

        <div className={classes.box__info__cred}>
          <h2 className={classes.box__info__cred__badge}>Spares</h2>
          <Link to={spareDetailUrl} className={classes.box__info__cred__title}>
            <h1 className={classes.box__info__cred__title__head}>
              {item.part_name}
            </h1>
            <h2
              className={classes.box__info__cred__title__color}
            >{`(${item.color})`}</h2>
          </Link>

          <div className={classes.box__info__cred__price}>
            <h1 className={classes.box__info__cred__price__value}>
              Rs.{formatNumber(item.discounted_price)}
            </h1>
            {item.discount_percentage !== 0 && (
              <h2 className={classes.box__info__cred__price__subValue}>
                Rs.{formatNumber(item.original_price)}
              </h2>
            )}

            {item.discount_percentage !== 0 && (
              <span className={classes.box__info__cred__price__discount}>
                {item.discount_percentage}% OFF
              </span>
            )}
          </div>
        </div>
      </div>

      <LaterActionButtonGroup
        onRemove={onRemove}
        isUpdating={isUpdating}
        onMove={onMove}
      />
    </Card>
  );
};
