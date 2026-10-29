import React from "react";
import classes from "./customInput.module.css";

export const CustomInput = ({
  id,
  type = "text",
  placeholder,
  register,
  validationRules = {},
  disabled = false,
  error,
  inputMode,
}) => {
  return (
    <div className={classes.form__group}>
      <input
        id={id}
        type={type}
        className={`${classes.form__field} ${error ? classes.error : ""} ${
          disabled ? classes.form__field__disabled : ""
        }`}
        placeholder={placeholder}
        disabled={disabled}
        inputMode={inputMode}
        {...register(id, validationRules)} // ✅ this now works correctly
      />

      <label htmlFor={id} className={classes.form__label}>
        {placeholder}
      </label>
      {error && <p className={classes.errorText}>{error}</p>}
    </div>
  );
};
