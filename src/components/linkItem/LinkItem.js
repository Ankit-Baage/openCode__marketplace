import React from "react";
import { Link } from "react-router-dom";
import navigateArrow from "../../assets/navigateArrow.png";
import classes from "./linkItem.module.css";

export const LinkItem = ({ navigator }) => {
  return (
    <Link key={navigator.id} to={navigator.path} className={classes.box}>
      <img
        src={navigator.image}
        alt={navigator.name}
        className={classes.box__image}
      />
      <div className={classes.box__info}>
        <h3 className={classes.box__info__title}>{navigator.title}</h3>
        <h4 className={classes.box__info__subTitle}>
          {navigator.subTitle}
        </h4>
      </div>
    </Link>
  );
};
