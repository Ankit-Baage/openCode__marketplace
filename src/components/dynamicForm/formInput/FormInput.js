import React from "react";
import classes from "./formInput.module.css";

export const FormInput = ({
  id,
  type,
  placeholder,
  label,
  register,
  disabled,
  validation,
}) => {
  return (
    <div className={classes.box}>
      <input
        type={type}
        id={id}
        className={classes.box__input}
        placeholder={placeholder}
        {...(register ? register(id, validation) : {})} // Only use register if passed
        disabled={disabled}
      />
      <label htmlFor={id} className={classes.box__label}>
        {label || placeholder}
      </label>
    </div>
  );
};
