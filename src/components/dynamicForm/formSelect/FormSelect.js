import React from "react";
import classes from "./formSelect.module.css";

export const FormSelect = ({
  options,
  label,
  register,
  id,
  validation,
  disabled
}) => {

  return (
    <div className={classes.box}>
      <select
        className={classes.box__select}
        {...(register ? register(id, validation) : {})}
        disabled={disabled}
      >
        <option value="" className={classes.box__select__option}>
          {label}
        </option>
        {options?.map((option) => (
          <option
            key={option.id}
            value={option.id }
            className={classes.box__select__option}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
