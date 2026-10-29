import React from "react";
import classes from "./loginForm.module.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button } from "../../ui/button/Button";
import { Link } from "react-router-dom";

export const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState, control, reset } = useForm({
    defaultValues: {
      phoneNumber: "",
    },
  });

  const handleLogin = (data) => {
    onSubmit(data);
    reset();
  };
  const { isValid } = formState;

  return (
    <div className={classes.login}>
      <div className={classes.login__head}>
        <h1 className={classes.login__head__title}>Welcome to</h1>
        <h2 className={classes.login__head__subtitle}>Login</h2>
      </div>
      <form
        className={classes.form}
        onSubmit={handleSubmit(handleLogin)}
        noValidate
      >
        <div className={classes.form__controls}>
          <div className={classes.form__group}>
            <input
              type="tel"
              id="phoneNumber"
              className={classes.form__field}
              placeholder="Phone Number"
              {...register("phoneNumber", {
                required: { value: true, message: "Phone number is required" },
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
            />
            <label htmlFor="phoneNumber" className={classes.form__label}>
              Phone Number
            </label>
          </div>
        </div>
        <div className={classes.form__btn__wrapper}>
          <Button text="Get OTP" type="submit" disabled={!isValid} />
          <Link to="/" className={classes.form__navigate}>Go Back To Home</Link>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
