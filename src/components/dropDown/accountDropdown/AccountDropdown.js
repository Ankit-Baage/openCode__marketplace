import React from "react";
import { Link } from "react-router-dom";

import logIn from "../../../assets/logInicon.svg";
import profileNavigator from "../../../assets/profileNavigator.svg";
import cartNavigator from "../../../assets/cartNavigator.svg";
import addressNavigator from "../../../assets/addressNavigator.png";
import laterNavigator from "../../../assets/laterNavigator.svg";
import wishListNavigator from "../../../assets/wishListNavigator.svg";
import more from "../../../assets/more.svg";
import logOut from "../../../assets/logOut.svg";
import classes from "./accountDropdown.module.css";


const navigators = [
  {
    id: 7,
    title: "Login",
    subTitle: "Your account info",
    image: logIn,
    path: "authentication",
    ariaLabel: "Login",
  },
  {
    id: 1,
    title: "My Profile",
    subTitle: "Your account info",
    image: profileNavigator,
    path: "profile",
    ariaLabel: "My Profile",
  },
  {
    id: 2,
    title: "My Orders",
    subTitle: "View order history",
    image: cartNavigator,
    path: "orders",
    ariaLabel: "My Orders",
  },
  {
    id: 3,
    title: "My Address",
    subTitle: "Edit saved addresses",
    image: addressNavigator,
    path: "address",
    ariaLabel: "My Address",
  },
  {
    id: 4,
    title: "Save for Later",
    subTitle: "Visit saved items",
    image: laterNavigator,
    path: "later",
    ariaLabel: "Save for Later",
  },
  {
    id: 5,
    title: "My Wishlist",
    subTitle: "Saved favorite items",
    image: wishListNavigator,
    path: "wishlist",
    ariaLabel: "My Wishlist",
  },
  { id: 6, title: "Settings", image: more, path: "", ariaLabel: "Settings" },
  {
    id: 7,
    title: "Log Out",
    subTitle: "Your account info",
    image: logOut,
    path: "",
    ariaLabel: "Log Out",
  },
];

export const AccountDropdown = ({ authToken, displayName, handleLogOut }) => {
  return (
    <section className={classes.box__media__getApp__profile}>
      <div className={classes.box__media__getApp__profile__content}>
        <span className={classes.box__media__getApp__profile__content__name}>
          Hello,
        </span>
        <span className={classes.box__media__getApp__profile__content__name}>
          {authToken ? displayName : "Sign In"}
        </span>
      </div>

      <span
        className={classes.box__media__getApp__profile__content}
        aria-label="Account Menu"
      >
        <h4 className={classes.box__media__getApp__profile__account}>
          Account
        </h4>
        <span
          className={classes.box__media__getApp__profile__account__dropdown}
          role="presentation"
        />
      </span>

      <div
        className={classes.box__media__getApp__profile__account__navigate}
        role="menu"
      >
        {navigators.map(({ id, title, image, path, ariaLabel }) => {
          if (title === "Login" && authToken) return null;
          if (title === "Log Out" && !authToken) return null;

          const isLogout = title === "Log Out";
          const isLogin = title === "Login";

          if (isLogout) {
            return (
              <button
                key={id}
                type="button"
                onClick={handleLogOut}
                className={`${classes.box__media__getApp__profile__account__navigate__link} ${classes.logoutLink}`}
              >
                <img
                  src={image}
                  alt={`${title} Icon`}
                  className={
                    classes.box__media__getApp__profile__account__navigate__link__img
                  }
                />
                <p
                  className={
                    classes.box__media__getApp__profile__account__navigate__link__text
                  }
                >
                  {title}
                </p>
              </button>
            );
          }

          return (
            <Link
              key={id}
              aria-label={`Go To ${ariaLabel} Page`}
              to={isLogin ? "/authentication" : `/profileInfo/${path}`}
              className={`${
                classes.box__media__getApp__profile__account__navigate__link
              } ${isLogin ? classes.loginLink : ""}`}
            >
              <img
                src={image}
                alt={`${title} Icon`}
                className={
                  classes.box__media__getApp__profile__account__navigate__link__img
                }
              />
              <p
                className={
                  classes.box__media__getApp__profile__account__navigate__link__text
                }
              >
                {ariaLabel}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
