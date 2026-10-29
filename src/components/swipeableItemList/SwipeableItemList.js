import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import classes from "./swipeableItemList.module.css";

export const SwipeableItemList = ({
  items = [],
  renderItem, // function to render each item
  step = 240, // scroll step, configurable
}) => {
  const containerRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [x, setX] = useState(0);

  // Calculate scrollable width dynamically
  useEffect(() => {
    const updateScrollWidth = () => {
      if (containerRef.current && items.length > 0) {
        const diff =
          containerRef.current.scrollWidth - containerRef.current.offsetWidth;
        setScrollWidth(diff > 0 ? diff : 0);
        setX(0); // reset scroll on resize/items change
      }
    };

    updateScrollWidth();
    window.addEventListener("resize", updateScrollWidth);
    return () => window.removeEventListener("resize", updateScrollWidth);
  }, [items]);

  const handleScrollLeft = () => setX((prev) => Math.min(prev + step, 0));
  const handleScrollRight = () =>
    setX((prev) => Math.max(prev - step, -scrollWidth));

  const showLeftBtn = x < 0; // only show if not at the start
  const showRightBtn = x > -scrollWidth; // only show if not at the end

  return (
    <div className={classes.wrapper}>
      <motion.div className={classes.slider}>
        <motion.div
          ref={containerRef}
          className={classes.slider__inner}
          drag="x"
          dragConstraints={{ right: 0, left: -scrollWidth }}
          dragElastic={0.2}
          animate={{ x }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {items.map((item, index) => (
            <div key={index} className={classes.item}>
              {renderItem ? renderItem(item) : item}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {showLeftBtn && (
        <button
          className={`${classes.controlBtn} ${classes.leftBtn}`}
          onClick={handleScrollLeft}
        />
      )}
      {showRightBtn && (
        <button
          className={`${classes.controlBtn} ${classes.rightBtn}`}
          onClick={handleScrollRight}
        />
      )}
    </div>
  );
};
