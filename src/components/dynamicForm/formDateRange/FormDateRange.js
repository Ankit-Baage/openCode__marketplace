import React, { useState, useEffect } from "react";
import { useController } from "react-hook-form";
import classes from "./formDateRange.module.css";

export const FormDateRange = ({ control, id, label }) => {
  const {
    field: { value = {}, onChange },
  } = useController({ name: id, control });

  const [startDate, setStartDate] = useState(value.start_date || "");
  const [endDate, setEndDate] = useState(value.end_date || "");

  useEffect(() => {
    setStartDate(value.start_date || "");
    setEndDate(value.end_date || "");
  }, [value]);

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);
    onChange({ ...value, start_date: newStartDate });
  };

  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);
    onChange({ ...value, end_date: newEndDate });
  };

  return (
    <div className={classes.box}>
      <div className={classes.boxWrapper}>
        {!startDate && <span className={classes.placeholder}>Start Date</span>}
        <input
          id="start"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className={classes.boxInput}
        />
      </div>
      <div className={classes.boxWrapper}>
        {!endDate && <span className={classes.placeholder}>End Date</span>}
        <input
          id="end"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          min={startDate || undefined}
          className={classes.boxInput}
        />
      </div>
    </div>
  );
};
