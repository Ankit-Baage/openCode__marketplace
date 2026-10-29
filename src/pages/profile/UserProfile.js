import React from "react";
import { useNavigate } from "react-router-dom";
import useGetProfileData from "../../tanstack-query/profile/useGetProfile";
import { UserDataForm } from "../../components/form/userDataForm/UserDataForm";
import { BrandIdentity } from "../../components/brandIdentity/BrandIdentity";
import useUpdateProfileMutation from "../../tanstack-query/profile/useUpdateProfile";
import axiosInstance from "../../utils/axios-middleware/axiosMiddleware";
import { useDispatch } from "react-redux";
import { openLoader } from "../../store/loaderSlice";
import classes from "./userProfile.module.css";
import { UserProfileSkeleton } from "../../components/skeletons/userProfileSkeleton/UserProfileSkeleton";
import { ButtonSkeleton } from "../../components/skeletons/buttonSkeleton/ButtonSkeleton";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import profile_form from "../../assets/profile_form.svg"

export const UserProfile = () => {
  // const authToken = Cookies.get("authToken");
  const user_id =  Cookies.get( "user_id");
  const { data, isLoading, isError, isSuccess, refetch } = useGetProfileData(user_id);
  const {
    mutateAsync,
    isLoading: isMutating,
    isError: mutationError,
  } = useUpdateProfileMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("form", user_id)

  if (isError) {
    console.log(isError);
    navigate("/error");
    return null;
  }

  const handleSubmit = async (formData) => {
    try {
      const profile = {
        name: formData.name,
        email: formData.email,
        pan_number: formData.pan_number,
        pan_image_url: formData.pan_image_url,
        gst_number: formData.gst_number,
        aadhar_number: formData.aadhar_number,
        aadhar_image_url: formData.aadhar_image_url,
      };
      console.log(profile);

      const response = await mutateAsync(profile);
      console.log(response.data.message.displayMessage)
      toast.success(response.data.message.displayMessage);

      // Perform any actions after successful mutation if needed
      console.log("Form data submitted successfully");
      refetch();
    } catch (error) {}
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <div className={classes.userProfile}>
      {/* <div className={classes.box__brand__wrapper}>

        <BrandIdentity />
      </div> */}

      <div className={classes.profile}>
        <div className={classes.profile__head}>
          <h1 className={classes.profile__head__title}>Profile Details</h1>
          {isSuccess ? (
            <h2
              className={`${classes.profile__head__status} ${
                data?.data?.data.profile_status === "Pending for verification"
                  ? classes.profile__head__status__pending
                  : data?.data?.data.profile_status === "Incomplete"
                  ? classes.profile__head__status__incomplete
                  : data?.data?.data.profile_status === "Verified"
                  ? classes.profile__head__status__completed
                  : data?.data?.data.profile_status === "Rejected"
                  ? classes.profile__head__status__rejected
                  : ""
              }`}
            >
              {data?.data?.data.profile_status}
            </h2>
          ) : (
            <ButtonSkeleton />
          )}
        </div>
        {isSuccess ? (
          <UserDataForm
            userData={data?.data?.data}
            onSubmit={handleSubmit}
            status={data?.data?.data.profile_status}
          />
        ) : (
          <UserProfileSkeleton />
        )}
      </div>
      <div className={classes.profile__banner}><img src={profile_form} alt="Profile Form"  className={classes.profile__banner__img}/></div>
    </div>
  );
};
