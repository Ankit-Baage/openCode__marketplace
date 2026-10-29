import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import classes from "./sparePriceFilter.module.css";

export const SparePriceFilter = ({
  sparePriceFilter, // parent provides filter config
  selectedPrice,
  onChange,
}) => {
  // Get extreme min/max values from config or fallback
  const extremeMin = sparePriceFilter?.filter_options?.[0]?.start ?? 0;
  const extremeMax = sparePriceFilter?.filter_options?.[0]?.end ?? 10000;

  const [selectedMin, setSelectedMin] = useState(
    selectedPrice?.min || extremeMin
  );
  const [selectedMax, setSelectedMax] = useState(
    selectedPrice?.max || extremeMax
  );

  
  const handleChange = (e) => {
    setSelectedMin(e.minValue);
    setSelectedMax(e.maxValue);

    // Convert extremes to null before sending
    const minToSend = e.minValue === extremeMin ? null : e.minValue;
    const maxToSend = e.maxValue === extremeMax ? null : e.maxValue;

    onChange?.({ min: minToSend, max: maxToSend });
  };

  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <h2 className={classes.box__head__title}>Price Range</h2>
      </div>

      <div className={classes.box__content}>
        <MultiRangeSlider
          min={extremeMin}
          max={extremeMax}
          minValue={selectedMin}
          maxValue={selectedMax}
          onChange={handleChange}
          canMinMaxValueSame={false}
          label
          ruler={false}
          style={{
            width: "100%",
            border: "none",
            boxShadow: "none",
            padding: "6px 5px 6px 12px",
          }}
          barLeftColor="#C6C6C6"
          barInnerColor="#FF6F3F"
          barRightColor="#C6C6C6"
          thumbLeftColor="#C6C6C6"
          thumbRightColor="#C6C6C6"
        />
      </div>
    </div>
  );
};
