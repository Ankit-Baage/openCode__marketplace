import React, { useCallback } from "react";
import dummyImage from "../../../assets/spare_preview_not_available.svg";
import classes from "./customMediaPreview.module.css";
import { useDispatch } from "react-redux";
import { openMedia } from "../../../store/mediaPreviewSlice";

export const CustomMediaPreview = ({ label, media_type, url, urlLabel }) => {
  const dispatch = useDispatch();
  const handleOpenView = useCallback(() => {
    dispatch(
      openMedia({
        url: url ? url : dummyImage,
        media_type: media_type,
      })
    );
  }, [dispatch, media_type, url]);

  const handleMediaError = (e) => {
    if (media_type === "image") {
      e.target.src = dummyImage;
    } else {
      e.target.poster = dummyImage; // For video, set a poster image on error
    }
  };
  return (
    <div className={classes.box}>
      <h3 className={classes.box__title}>{label}-View</h3>
      <div className={classes.box__content} onClick={handleOpenView}>
        <img
          src={url ? url : dummyImage}
          alt="upload"
          className={classes.box__img}
          onError={handleMediaError}
        />
        <span className={classes.box__url}>{urlLabel}</span>
      </div>
    </div>
  );
};
