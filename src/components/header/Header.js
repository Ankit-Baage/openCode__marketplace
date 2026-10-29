import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import classes from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "../ui/searchBarWithBackBtn/SearchBar";
import getApp from "../../assets/getApp.svg";
import { useSelector } from "react-redux";
import { selectCouponState } from "../../store/coupon/couponSlice";
import useGetCartList from "../../tanstack-query/cartList/useGetCartList";
import cart__tab from "../../assets/cart__tab.svg";
import profileNavigator from "../../assets/profileNavigator.svg";
import laterNavigator from "../../assets/laterNavigator.svg";
import cartNavigator from "../../assets/cartNavigator.svg";
import wishListNavigator from "../../assets/wishListNavigator.svg";
import logOut from "../../assets/logOut.svg";

import { useQueryClient } from "@tanstack/react-query";

import addressNavigator from "../../assets/addressNavigator.svg";

import androidImage from "../../assets/android__app.svg";
import iosImage from "../../assets/ios__app.svg";
import useGetUserProfile from "../../tanstack-query/userProfile/useGetUserProfile";
import logIn from "../../assets/logInicon.svg";
import more from "../../assets/more.svg";
import { removeFromPreferences } from "../profileNavigation/ProfileNavigation";
import logo from "../../assets/logo_name_desktop.svg";
import logInBtn from "../../assets/logIn__btn.svg";
import { VisuallyHidden } from "../visuallyHidden/VisuallyHidden";
import { AccountDropdown } from "../dropDown/accountDropdown/AccountDropdown";

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
  {
    id: 6,
    title: "Settings",
    image: more,
    path: "",
    ariaLabel: "Settings", // ✅ custom label for accessibility and SEO
  },
  {
    id: 7,
    title: "Log Out",
    subTitle: "Your account info",
    image: logOut,
    path: "",
    ariaLabel: "Log Out",
  },
];

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const authToken = Cookies.get("authToken");

  const coupon = useSelector(selectCouponState);
  const guestId = Cookies.get("guestId");
  const userId = Cookies.get("user_id");
  const user_id = authToken ? userId : guestId;
  const { data, isError, isSuccess } = useGetUserProfile(user_id);
  const { data: cartData } = useGetCartList(coupon?.id, guestId);
  const cartItemsCount = cartData?.data?.data?.cart_items?.length || 0;
  const userName = data?.data?.data?.name || "";
  const displayName =
    userName.length > 5 ? `${userName.slice(0, 5)}...` : userName;

  const placeholder = "Search by model or part";

  const queryClient = useQueryClient();

  const handleLogOut = () => {
    Cookies.remove("authToken");
    Cookies.remove("user_id");
    removeFromPreferences("authToken");
    removeFromPreferences("user_id");
    removeFromPreferences("expiryTimestamp");

    // 👇 Invalidate or clear cart data immediately
    queryClient.invalidateQueries(["cartList"]);
    queryClient.clear(); // optional: clears all cached data (if you want a full reset)

    navigate("/authentication");
    toast.success("Successfully logged out");
    setIsDropdownOpen(false);
  };

  return (
    <header className={classes.box}>
      <div className={classes.box__wrapper}>
        <Link to="/" className={classes.box__logo} aria-label="Home">
          <img
            src={logo}
            alt="Mobigarage company logo"
            className={classes.box__box__logo__img}
            loading="eager"
          />
        </Link>
        {!authToken && (
          <Link
            to="/authentication"
            className={classes.box__controls__tab__btn__head}
          >
            <img
              src={logInBtn}
              className={classes.box__box__logo__img}
              alt="Log In"
              loading="lazy"
            />
          </Link>
        )}
      </div>

      <section className={classes.box__controls}>
        <div className={classes.box__controls__search}>
          <SearchBar placeholder={placeholder} />
        </div>

        <div className={classes.box__media}>
          {/* Get App */}
          <div className={classes.box__media__getApp}>
            <img
              src={getApp}
              className={classes.box__media__getApp__icon}
              alt="Get App"
            />

            <div className={classes.box__media__getApp__buttons}>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${classes.box__media__getApp__content} ${classes.box__media__getApp__android}`}
                aria-label="Download Android App"
              >
                <img
                  src={androidImage}
                  alt="download android app"
                  className={classes.box__media__getApp__img}
                />
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${classes.box__media__getApp__content} ${classes.box__media__getApp__ios}`}
                aria-label="Download Apple App"
              >
                <img
                  src={iosImage}
                  alt="download ios app"
                  className={classes.box__media__getApp__img}
                />
              </a>
            </div>
          </div>

          {/* Customer Care */}
          <Link
            to="/help"
            className={classes.box__controls__custCare}
            aria-label="Customer Care"
          />

          <AccountDropdown
            authToken={authToken}
            displayName={displayName}
            handleLogOut={handleLogOut}
          />
        </div>

        {/* Cart */}
        <Link
          to="/cart"
          className={classes.box__controls__cart}
          aria-label={`Cart with ${cartItemsCount} items`}
        >
          <span className={classes.box__controls__cart__item}>
            {cartItemsCount}
          </span>
          <img
            src={cart__tab}
            className={classes.box__controls__cart__img}
            alt="cart link"
          />
        </Link>

        <section className={classes.box__controls__tab}>
          {/* {!authToken && (
            <button
              type="button"
              onClick={handleLogOut}
              className={classes.box__media__getApp__profile__logout}
              aria-label="Log In"
            ></button>
          )} */}
        </section>
        {!authToken && (
          <Link
            to="/authentication"
            className={classes.box__controls__tab__btn__head__tablet}
          >
            <img
              src={logInBtn}
              className={classes.box__box__logo__img}
              alt="Log In"
              loading="lazy"
            />
          </Link>
        )}
      </section>
    </header>
  );
};
