import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Address } from "../../components/address/Address";
import useGetAddressList from "../../tanstack-query/address/useGetAddressList";
import { redirect, useNavigate } from "react-router-dom";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";
import useSelectAddressMutation from "../../tanstack-query/address/useSelectAddressMutation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { onOpen } from "../../store/confirmationModal/confirmationModalSlice";
import { useLocation } from "react-router-dom";
import classes from "./addressPage.module.css";
import { setAddressId } from "../../store/address/addressSlice";

// Function to get heading text based on pathname
const getAddressHeading = (pathname) =>
  pathname === "/address" ? "Select Address" : "";

export const AddressPage = () => {
  const location = useLocation();
  const heading = getAddressHeading(location.pathname);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch address list
  const { data, isLoading, isSuccess } = useGetAddressList();
  const { mutateAsync, isLoading: selecting } = useSelectAddressMutation();

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const addresses = data?.data?.data;
  const handleSelectAddress = async (id) => {
    try {
      const response = await mutateAsync(id);
      if (response?.message?.displayMessage) {
        toast.success(response.message.displayMessage);
        setSelectedAddressId(id);
      }
    } catch (error) {
      toast.error(error?.message?.displayMessage || "Error selecting address");
    }
  };

  // Navigate to address detail page
  const handleNavigateToDetailPage = (id) => {
    navigate(`${id}`);
  };

  // Navigate to add address form
  const handleEdit = () => navigate("add");

  // Handle delete modal opening
  const handleDeleteModal = (address) => {
    if (address) {
      dispatch(onOpen({ ...address }));
    }
  };

  // Go back to the previous page
  const handleNavigateBack = () => navigate(-1);

  // Proceed to review & checkout
  const handleNavigateToReview = () => {
    dispatch(setAddressId({ id: selectedAddressId }));
    navigate("/review");
  };

  // Set default selected address on success
  useEffect(() => {
    if (isSuccess && data?.data?.data?.length) {
      const defaultAddress = data.data.data.find(
        (address) => address.is_default === 1
      );
      if (defaultAddress?.id !== selectedAddressId) {
        setSelectedAddressId(defaultAddress?.id || null);
      }
    }
  }, [isSuccess, data, selectedAddressId]);

  return isSuccess ? (
    <div className={classes.box}>
      <h1 className={classes.box__wrapper__title}>
        {heading || "My Addresses"}
      </h1>
      <div className={classes.box__wrapper}>
        {/* Render Address List */}
        {addresses.map((address) => (
          <Address
            key={address.id}
            address={address}
            selectedAddressId={selectedAddressId}
            onAddressChange={handleSelectAddress}
            onEdit={() => handleNavigateToDetailPage(address.id)}
            onOpenDeleteModal={() => handleDeleteModal(address)}
          />
        ))}
      </div>
      <div className={classes.box__card__new}>
        <button className={classes.box__card__new__btn} onClick={handleEdit}>
          +Add a New Address <span className={classes.box__card__new__right} />
        </button>
        {heading === "Select Address" && addresses.length > 0 && (
          <button
            className={classes.box__btn__review}
            onClick={handleNavigateToReview}
          >
            Review & Checkout
          </button>
        )}
      </div>
    </div>
  ) : (
    <CartLoader />
  );
};

// Authentication Loader to check for auth token
export const checkAuthLoader = () => {
  const authToken = Cookies.get("authToken");
  return authToken
    ? null
    : new Response(null, {
        status: 302,
        headers: { Location: "/authentication" },
      });
};