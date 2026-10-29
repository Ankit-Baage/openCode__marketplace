import React from "react";
import Cookies from "js-cookie";
import profileNavigator from "../../assets/profileNavigator.svg";
import laterNavigator from "../../assets/laterNavigator.svg";
import cartNavigator from "../../assets/cartNavigator.svg";
import wishListNavigator from "../../assets/wishListNavigator.svg";
import aboutUs from "../../assets/aboutUs.svg";
import faqNavigator from "../../assets/faqNavigator.svg";
import tNc from "../../assets/tNc.svg";
import privacyPolicy from "../../assets/privacyPolicy.svg";
import addressNavigator from "../../assets/addressNavigator.svg";
import grievanceNavigator from "../../assets/grievanceNavigator.svg";
import warranty from "../../assets/warranty.svg";
import returnImage from "../../assets/return.svg";
import deleteAccount from "../../assets/delete__account.svg";

import { LinkItem } from "../linkItem/LinkItem";

import classes from "./profileNavigation.module.css";
import { useNavigate } from "react-router-dom";
import useGetUserProfile from "../../tanstack-query/userProfile/useGetUserProfile";
import { getFirstLetter } from "../../utils/helpers/getFirstLetter";
import { HeartBeat } from "../skeletons/heartBeat/HeartBeat";

import { Preferences } from "@capacitor/preferences"; // Also clear from Preferences

export const removeFromPreferences = async (key) => {
  // Remove from Cookies (Web)
  Cookies.remove(key);

  // Remove from Preferences (Mobile)
  await Preferences.remove({ key: key });

  console.log("key removed from Cookies & Preferences");
};

const navigators = [
  {
    id: 1,
    title: "My Profile",
    subTitle: "Your account info",
    image: profileNavigator,
    path: "profile",
  },

  {
    id: 2,
    title: "My Orders",
    subTitle: "View order history",
    image: cartNavigator,
    path: "orders",
  },
  {
    id: 3,
    title: "My Address",
    subTitle: "Edit saved addresses",
    image: addressNavigator,
    path: "address",
  },
  {
    id: 4,
    title: "Save for Later",
    subTitle: "Visit saved items",
    image: laterNavigator,
    path: "later",
  },
  {
    id: 5,
    title: "My Wishlist",
    subTitle: "Saved favorite items",
    image: wishListNavigator,
    path: "wishlist",
    backGround: "#27BEFC",
  },
];


const extendedNavigators = [
  {
    id: 1,
    title: "Help & Support",
    subTitle: "Contact us",
    image: grievanceNavigator,
    path: "/policies/support",
  },
  {
    id: 4,
    title: "FAQs",
    subTitle: "Quick answers",
    image: faqNavigator,
    path: "/policies/faqs",
  },

  {
    id: 3,
    title: "Warranty Policy",
    subTitle: "Product coverage",
    image: warranty,
    path: "/policies/warranty",
  },

  {
    id: 2,
    title: "Refund & Replacement Policy",
    subTitle: "Refund options",
    image: returnImage,
    path: "/policies/refundAndReplacement",
  },
  {
    id: 5,
    title: "Terms and Conditions",
    subTitle: "Usage rules",
    image: tNc,
    path: "/policies/termsAndConditions",
  },
  {
    id: 6,
    title: "Privacy Policy",
    subTitle: "Data safety",
    image: privacyPolicy,
    path: "/policies/privacy",
  },
  {
    id: 7,
    title: "About Us",
    subTitle: "Our story",
    image: aboutUs,
    path: "/policies/aboutUs",
  },
  {
    id: 8,
    title: "Delete Account",
    subTitle: "Remove account",
    image: deleteAccount,
    path: "/policies/deleteAccount",
  },
];

export const ProfileNavigation = () => {
  const navigate = useNavigate();
  const authToken = Cookies.get("authToken");
  const userId = Cookies.get("user_id");
  const guestId = Cookies.get("guestId");
  const user_id = authToken ? userId : guestId;

  const { data, isError, isSuccess } = useGetUserProfile(user_id);

  const handleLogOut = () => {
    if (authToken) {
      removeFromPreferences("authToken");
      removeFromPreferences("user_id");
      removeFromPreferences("expiryTimestamp");

      navigate("/");
    } else {
      // Redirect to login page
      navigate("/authentication");
    }
  };

  console.log(data);
  return (
    <div className={classes.box__wrapper}>
      <div className={classes.box}>
        <div className={classes.box__profile}>
          {/* <div className={classes.box__profile__info}> */}
          {isSuccess ? (
            <div className={classes.box__profile__user}>
              <span className={classes.box__profile__user__avatar}>
                {getFirstLetter(data?.data?.data?.name)}
              </span>
              <h2 className={classes.box__profile__user__name}>
                {data?.data?.data?.name}
              </h2>
            </div>
          ) : (
            <HeartBeat />
          )}
          {/* </div> */}
        </div>
        <div className={classes.box__links}>
          <div className={classes.box__links__container}>
            {navigators.map((navigator) => (
              <LinkItem key={navigator.id} navigator={navigator} />
            ))}
          </div>
          <h3 className={classes.box__links__moreInfo}>More Information:</h3>
          <div className={classes.box__links__container}>
            {extendedNavigators.map((navigator) => (
              <LinkItem key={navigator.id} navigator={navigator} />
            ))}
          </div>
        </div>
      </div>

      <button className={classes.box__btn} onClick={handleLogOut}>
        <span className={classes.box__btn__img} />
        {authToken ? "Log Out" : "Log In"}
      </button>
      <h1 className={classes.box__brand}>
        FUEVATION TECHNOLOGY SOLUTIONS PVT LTD
      </h1>
    </div>
  );
};
