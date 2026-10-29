import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "./carousel.module.css";
import { handleNavigateFromAdvertisement } from "../../utils/helpers/getParamsFromAdd";

const sliderVariants = {
  incoming: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
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
  duration: 0.8,
  ease: [0.56, 0.03, 0.12, 1.04],
};

export const Carousel = ({ images }) => {
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const intervalIdRef = useRef(null);

  const activeImage = images[imageIndex];
  const imageUrl = isDesktop ? activeImage.url_2 : activeImage.url;

  // start autoplay
  const startImageCycle = useCallback(() => {
    intervalIdRef.current = setInterval(() => {
      setDirection(1);
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
  }, [images.length]);

  // stop autoplay
  const stopImageCycle = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  // handle hover pause
  useEffect(() => {
    if (!isHovered) startImageCycle();
    else stopImageCycle();

    return stopImageCycle; // ✅ cleans consistently
  }, [isHovered, startImageCycle, stopImageCycle]);

  // detect screen resize (mobile vs desktop)
  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsDesktop(window.innerWidth >= 768);
      }, 200);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const nextIndex = (imageIndex + 1) % images.length;
    const nextImage = new Image();
    nextImage.src = isDesktop
      ? images[nextIndex]?.url_2
      : images[nextIndex]?.url;
  }, [imageIndex, images, isDesktop]);

  // handle swipe
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 100;
    const { offset } = info;

    if (offset.x > swipeThreshold) {
      handlePrev();
    } else if (offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className={styles.box}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className={styles.slider}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={`${imageIndex}-${isDesktop}`}
            src={imageUrl}
            alt={activeImage?.alt || activeImage?.label || "Advertisement"}
            loading={imageIndex === 0 ? "eager" : "lazy"}
            decoding="async"
            width="100%"
            height="auto"
            custom={direction}
            variants={sliderVariants}
            initial="incoming"
            animate="active"
            exit="exit"
            transition={sliderTransition}
            onClick={() =>
              handleNavigateFromAdvertisement(activeImage, navigate)
            }
            className={styles.slide}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          />
        </AnimatePresence>

        {/* ✅ left/right buttons */}
      </div>
      <button
        aria-label="Previous slide"
        className={`${styles.controlBtn} ${styles.leftBtn}`}
        onClick={handlePrev}
      />
      <button
        aria-label="Next slide"
        className={`${styles.controlBtn} ${styles.rightBtn}`}
        onClick={handleNext}
      />

      <div className={styles.indicators}>
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              setDirection(index > imageIndex ? 1 : -1);
              setImageIndex(index);
            }}
            className={`${styles.indicator} ${
              index === imageIndex ? styles.isActive : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};
