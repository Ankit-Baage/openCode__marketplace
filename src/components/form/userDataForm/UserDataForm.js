import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./userDataForm.module.css";
import { uploadImageRequest } from "../../../utils/https-request/profile/uploadImage";
import { CustomInput } from "../customInput/CustomInput";
import { FileUploadInput } from "../fileUploadInput/FileUploadInput";
import { toast } from "react-toastify";
import { shortUrl } from "../../../utils/helpers/shortUrl";

const validationRules = {
  name: {
    required: "Name is required",
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "Name should contain only alphabets",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Enter a valid email address",
    },
  },
  gst_number: {
    pattern: {
      value: /^[0-9A-Z]{15}$/,
      message: "Please provide a valid GST Number",
    },
  },
  pan_number: {
    pattern: {
      value: /^[A-Z]{5}[0-9]{4}[A-Z]$/i,
      message: "Enter a valid PAN card number",
    },
  },
  aadhar_number: {
    pattern: {
      value: /^\d{12}$/,
      message: "Enter a valid 12-digit Aadhar card number",
    },
  },
};

export const UserDataForm = ({ userData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: userData,
    mode: "onChange",
  });

  const watchFields = watch([
    "name",
    "email",
    "gst_number",
    "pan_number",
    "pan_image_url",
    "aadhar_number",
    "aadhar_image_url",
  ]);

  const [
    name,
    email,
    gst_number,
    pan_number,
    pan_image_url,
    aadhar_number,
    aadhar_image_url,
  ] = watchFields;

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleFileChange = async (event, field) => {
    const selectedFile = event.target.files[0];
    const toastId = toast.success("Uploading...");

    try {
      const response = await uploadImageRequest(selectedFile);
      const imageUrl = response?.data?.fileUrl;
      setValue(field, imageUrl, { shouldValidate: true });
      toast.update(toastId, {
        render: "Upload successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: `Upload failed: ${error.message || "Unknown error"}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      console.error(`Upload failed for ${field}:`, error);
    }
  };

  const submitHandler = async (data) => {
    const {
      name,
      email,
      gst_number,
      pan_number,
      pan_image_url,
      aadhar_number,
      aadhar_image_url,
    } = data;

    const isGroupAValid = name && email && gst_number;
    const isGroupBValid =
      name &&
      email &&
      pan_number &&
      pan_image_url &&
      aadhar_number &&
      aadhar_image_url;

    if (!isGroupAValid && !isGroupBValid) {
      setError("gst_number", {
        type: "custom",
        message: "Provide either GST details or all required documents.",
      });
      setError("pan_number", {
        type: "custom",
        message: "Provide either GST details or all required documents.",
      });
      return;
    }

    clearErrors("gst_number");
    clearErrors("pan_number");

    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  useEffect(() => {
    const isGroupAValid =
      !!name?.trim() &&
      !!email?.trim() &&
      /^[0-9A-Z]{15}$/.test(gst_number || "");

    const isGroupBValid =
      !!name?.trim() &&
      !!email?.trim() &&
      /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan_number || "") &&
      !!pan_image_url?.trim() &&
      /^\d{12}$/.test(aadhar_number || "") &&
      !!aadhar_image_url?.trim();

    const currentValues = {
      name,
      email,
      gst_number,
      pan_number,
      pan_image_url,
      aadhar_number,
      aadhar_image_url,
    };

    const isChanged = Object.keys(currentValues).some((key) => {
      const original = (userData?.[key] ?? "").toString().trim();
      const current = (currentValues[key] ?? "").toString().trim();
      return original !== current;
    });

    setIsButtonEnabled((isGroupAValid || isGroupBValid) && isChanged);
  }, [
    name,
    email,
    gst_number,
    pan_number,
    pan_image_url,
    aadhar_number,
    aadhar_image_url,
    userData,
  ]);

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)} noValidate>
      <div className={classes.form__controls}>
        <CustomInput
          id="name"
          type="text"
          placeholder="Name*"
          register={register}
          validationRules={validationRules.name}
          error={errors.name?.message}
        />
        <CustomInput
          id="mobile_no"
          type="tel"
          placeholder="Phone Number"
          register={register}
          disabled
        />
        <CustomInput
          id="email"
          type="email"
          placeholder="Email ID*"
          register={register}
          validationRules={validationRules.email}
          error={errors.email?.message}
        />
        <h4 className={classes.form__business}>Business Details</h4>
        <CustomInput
          id="gst_number"
          type="text"
          placeholder="GST No."
          register={register}
          validationRules={validationRules.gst_number}
          error={errors.gst_number?.message}
        />
        <div className={classes.form__divider}>
          <div className={classes.form__divider__container}>
            <hr className={classes.form__divider__line} />
            <div className={classes.form__divider__textBox}>
              <h4 className={classes.form__divider__textBox__text}>Or</h4>
            </div>
            <hr className={classes.form__divider__line} />
          </div>
        </div>
        <CustomInput
          id="pan_number"
          type="text"
          placeholder="Pan Number"
          register={register}
          validationRules={validationRules.pan_number}
          error={errors.pan_number?.message}
        />
        <FileUploadInput
          id="pan_image_url"
          label="Pan Image Upload"
          register={register}
          onChange={(e) => handleFileChange(e, "pan_image_url")}
          imageUrl={shortUrl(pan_image_url)}
        />
        <CustomInput
          id="aadhar_number"
          type="text"
          placeholder="Aadhar Number"
          register={register}
          validationRules={validationRules.aadhar_number}
          error={errors.aadhar_number?.message}
        />
        <FileUploadInput
          id="aadhar_image_url"
          label="Aadhar Image Upload"
          register={register}
          onChange={(e) => handleFileChange(e, "aadhar_image_url")}
          imageUrl={shortUrl(aadhar_image_url)}
        />
        <button
          type="submit"
          className={
            isButtonEnabled ? classes.form__btn__enabled : classes.form__btn
          }
          disabled={!isButtonEnabled}
        >
          Save
        </button>
      </div>
    </form>
  );
};
