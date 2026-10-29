import React from "react";
import classes from "./fileUploadInput.module.css";

export const FileUploadInput = ({
  id,
  label,
  register,
  onChange,
  error,
  imageUrl,
}) => {
  return (
    <div className={classes.form__group}>
      <h3 className={classes.form__field__upload__title}>{label}</h3>
      <div className={classes.form__group__upload}>
        <div className={classes.form__group__upload__wrapper}>
          <label htmlFor={id} className={classes.form__field__upload__label}>
            <input
              type="file"
              id={id}
              className={classes.form__field__upload}
              {...register}
              onChange={onChange}
            />
            <span className={classes.form__field__upload__img} />
            <h3 className={classes.form__field__upload__label__text}>
              {imageUrl ? "Uploaded Photo" : "Upload Photo"}
            </h3>
          </label>
          <span className={classes.form__field__upload__showUrl}>
            {imageUrl}
          </span>
        </div>
        <div className={classes.form__group__upload__wrapper}>
          <label
            htmlFor={`cam${id}`}
            className={classes.form__field__upload__takePic__label}
          >
            <input
              type="file"
              id={`cam${id}`}
              accept="image/*"
              capture="camera"
              className={classes.form__field__upload__takePic}
              {...register}
              onChange={onChange}
            />
          </label>
        </div>
      </div>
      {error && <p className={classes.errorText}>{error}</p>}
    </div>
  );
};
