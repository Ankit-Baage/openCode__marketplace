import React from "react";
import classes from "./addressForm.module.css";
import { useForm } from "react-hook-form";
import { CustomInput } from "../../form/customInput/CustomInput";
import { Button } from "../../ui/button/Button";
import { useParams } from "react-router-dom";
import address_form from "../../../assets/address_form.svg";

export const AddressForm = ({
  addressData,
  onSubmit,
  onNavigate,
  addressId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      name: addressData?.name || "",
      mobile_no: addressData?.mobile_no || "",
      address_line1: addressData?.address_line1 || "",
      address_line2: addressData?.address_line2 || "",
      city: addressData?.city || "",
      state: addressData?.state || "",
      postal_code: addressData?.postal_code || "",
      landmark: addressData?.landmark || "",
      country: addressData?.country || "",
      is_default: addressData?.is_default === 1 || false,
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const payload = {
      ...data,
      is_default: data.is_default ? 1 : 0,
    };
    onSubmit(payload);
  };

  return (
    <div className={classes.userProfile}>
      <div className={classes.profile__head}>
        <h2 className={classes.profile__head__title}>
          {addressId ? "Edit Address" : "Add Address"}
        </h2>

        <form
          className={classes.form}
          onSubmit={handleSubmit(submitHandler)}
          noValidate
        >
          <div className={classes.form__controls}>
            <CustomInput
              id="name"
              placeholder="Full Name"
              register={register}
              validationRules={{
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message:
                    "Name should not contain numbers or special characters",
                },
              }}
              error={errors.name?.message}
            />

            <CustomInput
              id="mobile_no"
              type="tel"
              inputMode="numeric"
              placeholder="Phone Number*"
              register={register}
              validationRules={{
                required: "Mobile number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Mobile number must be exactly 10 digits",
                },
              }}
              error={errors.mobile_no?.message}
            />

            <CustomInput
              id="address_line1"
              placeholder="Flat, House no, Building, Company"
              register={register}
            />
            <CustomInput
              id="address_line2"
              placeholder="Area, Street, Sector, Village"
              register={register}
            />
            <CustomInput
              id="landmark"
              placeholder="Landmark"
              register={register}
            />

            <div className={classes.form__city}>
              <div className={classes.form__select}>
                <CustomInput
                  id="postal_code"
                  placeholder="Pincode"
                  type="text"
                  inputMode="numeric"
                  register={register}
                  validationRules={{
                    required: "Pincode is required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Pincode must be 6 digits",
                    },
                  }}
                  error={errors.postal_code?.message}
                />
              </div>

              <div className={classes.form__select}>
                <CustomInput
                  id="city"
                  placeholder="Town/City"
                  register={register}
                  error={errors.city?.message}
                />
              </div>
            </div>

            <CustomInput
              id="state"
              placeholder="State"
              register={register}
              error={errors.state?.message}
            />

            <div>
              <label
                htmlFor="is_default"
                className={classes.box__content__filter__option}
              >
                <input
                  id="is_default"
                  type="checkbox"
                  className={classes.box__content__filter__option__input}
                  {...register("is_default")}
                  defaultChecked={addressData?.is_default === 1}
                />
                <span className={classes.box__content__filter__option__label}>
                  
                </span>
                <span className={classes.box__content__filter__labelText}>
                  Make this my default address
                </span>
              </label>
            </div>
          </div>

          <Button type="submit" text="Save" disabled={!isValid} />
        </form>
      </div>

      <div className={classes.address__banner}>
        <img
          src={address_form}
          alt="Address Form"
          className={classes.address__banne__img}
        />
      </div>
    </div>
  );
};
