import React from "react";
import classes from "./formTextArea.module.css";

export const FormTextArea = ({
  id,
  type,
  placeholder,
  label,
  register,
  disabled,
  validation,
  defaultValue,
}) => {
  return (
    <div className={classes.box}>
      <textarea
        type={type}
        id={id}
        className={classes.box__input}
        placeholder={placeholder}
        {...register(id, validation)}
        defaultValue={defaultValue}
        disabled={disabled}
      />
      <label htmlFor={id} className={classes.box__label}>
        {label || placeholder}
      </label>
    </div>
  );
};
