import React from "react";
import classes from "./spareHighlight.module.css";

export const SpareHighlights = ({ highlights }) => {
  return (
    <div className={classes.box}>
      <h1 className={classes.box__title}>Highlights</h1>
      <div className={classes.box__content}>
        {highlights.map((highlight) => (
          <div key={highlight.id} className={classes.box__content__desc}>
            <span className={classes.box__desc__bullet} />
            <h2 className={classes.box__desc__text}>{highlight.desc}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
