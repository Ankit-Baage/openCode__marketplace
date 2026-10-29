import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import classes from "./spareColors.module.css";

export const SpareColors = ({
  colors = [],
  color: initialColor,
  onColorSelect,
}) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const colorCarousel = useRef(null);
  const [dragWidth, setDragWidth] = useState(0);

  // Calculate drag width
  useEffect(() => {
    const updateWidth = () => {
      if (colorCarousel.current) {
        setDragWidth(
          colorCarousel.current.scrollWidth - colorCarousel.current.offsetWidth
        );
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [colors]);

  const handleSelect = (color) => {
    setSelectedColor(color.color);
    onColorSelect?.(color);
  };

  if (!colors.length) return null;

  return (
    <section className={classes.box}>
      <motion.div className={classes.box__colors}>
        <motion.div
          ref={colorCarousel}
          drag="x"
          dragConstraints={{ right: 0, left: -dragWidth }}
          className={classes.box__colors__carousel}
        >
          {colors.map((color) => (
            <button
              key={color.record_id}
              className={`${classes.box__colors__btn} ${
                selectedColor === color.color
                  ? classes.box__colors__btn__selected
                  : ""
              }`}
              onClick={() => handleSelect(color)}
              aria-label={`Select color ${color.color}`}
            >
              {color.color}
            </button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
