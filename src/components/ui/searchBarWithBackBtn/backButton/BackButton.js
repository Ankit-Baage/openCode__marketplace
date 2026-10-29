import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./backButton.module.css";

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBack = () => {
    console.log("✅ Back button clicked");
    console.log("Current location:", location.pathname);
    console.log("History length:", window.history.length);
  
    if (window.history.length > 2) {
      console.log("🔙 Navigating back");
      navigate(-1);
    } else {
      console.log("🔄 Navigating to fallback '/'");
      navigate("/");
    }
  };

  return <button className={classes.box__btn} onClick={handleBack} />;
};
