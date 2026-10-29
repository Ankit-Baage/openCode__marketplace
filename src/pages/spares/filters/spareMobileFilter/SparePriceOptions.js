import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import classes from "./sparePriceOptions.module.css";

export const SparePriceOptions = ({
  sparePriceFilter, // parent provides filter config
  selectedPrice,
  onChange,
}) => {
  // Get extreme min/max values from config or fallback
  const extremeMin = sparePriceFilter?.filter_options?.[0]?.start ?? 0;
  const extremeMax = sparePriceFilter?.filter_options?.[0]?.end ?? 10000;

  const [selectedMin, setSelectedMin] = useState(
    selectedPrice?.min ?? extremeMin
  );
  const [selectedMax, setSelectedMax] = useState(
    selectedPrice?.max ?? extremeMax
  );

  // Handle slider or input changes together
  const handleChange = ({ minValue, maxValue }) => {
    const min = Math.max(extremeMin, Math.min(minValue, maxValue));
    const max = Math.min(extremeMax, Math.max(maxValue, minValue));

    setSelectedMin(min);
    setSelectedMax(max);

    const minToSend = min === extremeMin ? null : min;
    const maxToSend = max === extremeMax ? null : max;
    onChange?.({ min: minToSend, max: maxToSend });
  };

  return (
    <div className={classes.box}>
      <div className={classes.box__content}>
        <MultiRangeSlider
          min={extremeMin}
          max={extremeMax}
          minValue={selectedMin || extremeMin}
          maxValue={selectedMax || extremeMax}
          onChange={handleChange}
          canMinMaxValueSame={false}
          label={true}
          ruler={false}
          style={{
            width: "100%",
            border: "none",
            boxShadow: "none",
            padding: "6px 5px 6px 12px",
            color: "#2F3567",
            fontWeight: "600",
          }}
          barLeftColor="#C6C6C6"
          barInnerColor="#FF6F3F"
          barRightColor="#C6C6C6"
          thumbLeftColor="#C6C6C6"
          thumbRightColor="#C6C6C6"
        />
      </div>

      {/* Manual input controls */}
      <div className={classes.box__content__info}>
        <label htmlFor="minValue" className={classes.box__contet__info__label}>
          Min:
          <input
            id="minValue"
            type="number"
            value={selectedMin}
            min={extremeMin}
            max={selectedMax}
            onChange={(e) =>
              handleChange({
                minValue: Number(e.target.value),
                maxValue: selectedMax,
              })
            }
            className={classes.box__content__info__input}
          />
        </label>

        <span className={classes.box__content__info__to}></span>
        <label htmlFor="maxValue" className={classes.box__contet__info__label}>
          Max:
          <input
            id="maxValue"
            type="number"
            value={selectedMax}
            min={selectedMin}
            max={extremeMax}
            onChange={(e) =>
              handleChange({
                minValue: selectedMin,
                maxValue: Number(e.target.value),
              })
            }
            className={classes.box__content__info__input}
          />
        </label>
      </div>
    </div>
  );
};
