// store.js
import { configureStore } from "@reduxjs/toolkit";

import backdropReducer from "./backdropSlice";

import loaderReducer from "./loaderSlice";
import phoneNumberReducer from "./authentication/phoneNumberSlice";
import spinnerReducer from "./spinnerSlice";
import newPhoneFilterReducer from "./newPhoneFilter/newPhoneFilterSlice";
import confirmationModalReducer from "./confirmationModal/confirmationModalSlice";
import couponReducer from "./coupon/couponSlice";
import addressReducer from "./address/addressSlice";
import errorReducer from "./error/errorSlice";
import advertisementParamsReducer from "./advertisementParams/advertisementParamsSlice";
import categoryReducer from "./category/categorySlice";
import returnShipmentReducer from "./returnShipment/returnShipmentSlice";
import cancellatioReducer from "./cancellation/cancellationSlice";
import searchTextReducer from "./searchText/searchTextSlice";

export const store = configureStore({
  reducer: {
    backdrop: backdropReducer,
    error: errorReducer,
    loader: loaderReducer,
    phoneNumber: phoneNumberReducer,
    spinner: spinnerReducer,
    newPhoneFilters: newPhoneFilterReducer,
    confirmationModal: confirmationModalReducer,
    coupon: couponReducer,
    address: addressReducer,
    advertisementParams: advertisementParamsReducer,
    category: categoryReducer,
    returnShipment: returnShipmentReducer,
    cancellation: cancellatioReducer,
    searchText: searchTextReducer,
  },
});
