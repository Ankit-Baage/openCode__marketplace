import React from "react";
import classes from "./spareSortFilter.module.css";

export const SpareSortFilter = ({ spareSortData, selectedSort, onChange }) => {
  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <h2 className={classes.box__head__title}>{spareSortData.filter_label}</h2>
      </div>

      <div className={classes.box__content}>
        {spareSortData.filter_options.map((item) => (
          <label
            key={item.id}
            className={classes.box__content__sort__label}
            htmlFor={`sort-${item.id}`}
          >
            <input
              type="checkbox" // ✅ keep checkbox style
              id={`sort-${item.id}`}
              className={classes.box__content__sort__input}
              checked={selectedSort === String(item.id)}
              onChange={() => onChange(selectedSort === String(item.id) ? "" : String(item.id))}
            />
            <span className={classes.box__content__sort__checkbox}></span>
            <span className={classes.box__content__sort__title}>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
