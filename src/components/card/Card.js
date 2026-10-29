import React from "react";
import classes from "./card.module.css";

export const Card = ({ children, className = "", style = {}, ...rest }) => {
  return (
    <div
      className={`${classes.card} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};
