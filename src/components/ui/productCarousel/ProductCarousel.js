import React, { useState } from "react";
import { AnimatePresence, wrap, motion } from "framer-motion";
import classes from "./productCarousel.module.css";

export const ProductCarousel = ({ imageData = [], stockStatus }) => {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);
  const activeImageIndex = wrap(0, imageData.length, imageCount);

  const sliderVariants = {
    incoming: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      scale: 1.1,
      opacity: 0,
    }),
    active: { x: 0, scale: 1, opacity: 1 },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      scale: 1,
      opacity: 0.2,
    }),
  };

  const sliderTransition = {
    duration: 0.6,
    ease: [0.56, 0.03, 0.12, 1.04],
  };

  const swipeToImage = (swipeDirection) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  };

  const dragEndHandler = (dragInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) swipeToImage(-1);
    else if (draggedDistance < -swipeThreshold) swipeToImage(1);
  };

  const skipToImage = (imageId) => {
    let changeDirection = 0;
    if (imageId > activeImageIndex) changeDirection = 1;
    else if (imageId < activeImageIndex) changeDirection = -1;
    setImageCount([imageId, changeDirection]);
  };

  if (!imageData.length) {
    return <div className={classes.box}>No images available</div>;
  }

  return (
    <div className={classes.box}>
      <div className={classes.slider}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={activeImageIndex} // ✅ Fix
            src={imageData[activeImageIndex]}
            alt={`Product image ${activeImageIndex + 1}`}
            loading="lazy"
            custom={direction}
            variants={sliderVariants}
            initial="incoming"
            animate="active"
            exit="exit"
            transition={sliderTransition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
            className={classes.slide}
          />
        </AnimatePresence>

        {stockStatus === "sold" && (
          <span className={classes.box__img__sold}></span>
        )}
      </div>

      {/* Show controls only if more than 1 image */}
      {imageData.length > 1 && (
        <div className={classes.box__slider__indicators}>
          <button
            className={`${classes.controlBtn} ${classes.leftBtn}`}
            onClick={() => swipeToImage(-1)}
            aria-label="Previous image"
          />

          {imageData.map((_, index) => (
            <button
              key={index}
              onClick={() => skipToImage(index)}
              className={`${classes.indicator} ${
                index === activeImageIndex ? classes.active : ""
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}

          <button
            className={`${classes.controlBtn} ${classes.rightBtn}`}
            onClick={() => swipeToImage(1)}
            aria-label="Next image"
          />
        </div>
      )}
    </div>
  );
};
