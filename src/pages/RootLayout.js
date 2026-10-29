import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import {
  generateId,
  getAuthToken,
  getTokenDuration,
} from "../utils/helpers/getAuth";
import { checkAndRemoveExpiredToken } from "../utils/https-request/auth/otpVerificationRequest";
import classes from "./rootLayout.module.css";
import Breadcrumbs from "./breadCrump/BreadCrump";

export const RootLayout = () => {
  const location = useLocation(); // ⬅️
  useEffect(() => {
    checkAndRemoveExpiredToken();
    generateId();

    const token = getAuthToken();
    if (!token || token === "EXPIRED") {
      removeAuthToken();
      return;
    }

    const tokenDuration = getTokenDuration();
    if (tokenDuration <= 0) {
      removeAuthToken();
      return;
    }

    const timeoutId = setTimeout(() => {
      console.warn("Auth token expired! Removing...");
      removeAuthToken();
    }, tokenDuration);

    return () => clearTimeout(timeoutId);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // ⬅️ dependency on pathname

  return (
    <div className={classes.layout}>
      {/* <Link to="/help" className={classes.box__helpChat}></Link> */}
      <div className={classes.layout__header__wrapper}>
        <div className={classes.layout__header}>
          <Header />
        </div>
      </div>
      <div className={classes.layout__map}>
         <Breadcrumbs />
      </div>

     
      <main className={classes.layout__main}>
        <Outlet />
      </main>
      <div className={classes.layout__footer__wrapper}>
        <div className={classes.layout__footer}>
         
          <Footer />
        </div>
      </div>
    </div>
  );
};

const removeAuthToken = () => {
  Cookies.remove("authToken");
  localStorage.removeItem("authToken");
  localStorage.removeItem("expiryTimestamp");
};
