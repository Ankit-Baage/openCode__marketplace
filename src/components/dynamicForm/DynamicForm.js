import React from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "./formInput/FormInput";

import classes from "./dynamicForm.module.css";

import { FormTextArea } from "./formTextArea/FormTextArea";
import { CustomMediaPreview } from "./customMediaPreview/CustomMediaPreview";
import { FormSelect } from "./formSelect/FormSelect";
import { FormUploadInput } from "./formUploadInput/FormUploadInput";
import { FormMultipleSelect } from "./formMultipleSelect/FormMultipleSelect";
import { FormDateRange } from "./formDateRange/FormDateRange";

export const DynamicForm = ({
  heading,
  config,
  onSubmit,
  onClose,
  primaryButtonLabel,
  secondaryButtonLabel,
  onSecondHandler,
  isGridRequired,
  disabled,
}) => {
  const defaultValues = config.reduce((acc, field) => {
    if (field.type === "dateRange") {
      acc[field.id] = field.defaultValue ?? { start_date: "", end_date: "" };
    } else {
      acc[field.id] = field.defaultValue ?? "";
    }
    return acc;
  }, {});

  // const defaultValues = config.reduce((acc, field) => {
  //   if (field.type === "dateRange") {
  //     acc[field.id] = field.defaultValue ?? { start_date: undefined, end_date: undefined };
  //   } else {
  //     acc[field.id] = field.defaultValue; // Instead of ""
  //   }
  //   return acc;
  // }, {});
  const { register, handleSubmit, setValue, formState, control } = useForm({
    defaultValues,
  });
  const { isValid } = formState;
  console.log(config);

  const handleFileChange = (id, url) => {
    setValue(id, url);
    console.log("url", url);
  };

  console.log("dynamicForm isValid: ", isValid); // Debugging log

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {heading && <h1 className={classes.form__head}>{heading}</h1>}
      <div
        className={`${classes.form} ${
          isGridRequired ? classes.from__grid : ""
        }`}
      >
        {config.map((field, index) => {
          const key = `${field.id}_${index}`;

          switch (field.type) {
            case "text":
            case "email":
            case "password":
            case "number":
              return (
                <FormInput
                  key={key}
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  label={field.label}
                  register={register}
                  validation={field.validation}
                  disabled={field.disabled}
                />
              );

            case "select":
              return (
                <FormSelect
                  key={key}
                  id={field.id}
                  options={field.options}
                  label={field.label}
                  // value={field.value}
                  register={register}
                  disabled={field.disabled}
                />
              );
            case "multipleSelect":
              return (
                <FormMultipleSelect
                  key={key}
                  id={field.id}
                  options={field.options}
                  label={field.label}
                  control={control} // Pass control for React Hook Form
                />
              );
            case "dateRange":
              return (
                <FormDateRange
                  key={key}
                  id={field.id}
                  control={control}
                  label={field.label}
                />
              );

            case "file":
              return (
                <FormUploadInput
                  key={key}
                  id={field.id}
                  onChange={handleFileChange}
                  label={field.label}
                  urlLabel={field?.urlLabel}
                  url={field?.url}
                  disabled={field.disabled}
                />
              );
            case "textarea": // Add support for CustomTextArea
              return (
                <FormTextArea
                  key={key}
                  id={field.id}
                  placeholder={field.placeholder}
                  label={field.label}
                  register={register}
                  validation={field.validation}
                  disabled={field.disabled}
                />
              );
            case "preview":
              return (
                <CustomMediaPreview
                  key={key}
                  id={field.id}
                  label={field.label}
                  register={register}
                  disabled={field.disabled}
                  media_type={field.media_type}
                  url={field.url}
                  urlLabel={field.urlLabel}
                />
              );
            default:
              return null;
          }
        })}
      </div>

      <div className={classes.form__btns}>
        <button
          type="submit"
          style={{ width: !secondaryButtonLabel ? "100%" : "" }}
          className={`${classes.form__btn} ${
            isValid && !disabled ? classes.form__btn__enabled : ""
          }`}
          disabled={!isValid || disabled}
        >
          {primaryButtonLabel}
        </button>
        {secondaryButtonLabel && (
          <button
            type="button"
            className={`${classes.form__btn} ${classes.form__btn__enabled}`}
            onClick={onSecondHandler}
          >
            {secondaryButtonLabel}
          </button>
        )}
      </div>
    </form>
  );
};
