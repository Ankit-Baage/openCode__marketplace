import axiosInstance from "../../axios-middleware/axiosMiddleware";
import Cookies from "js-cookie";
import { otpVerificationUrl } from "../../../config/config";
import { Preferences } from "@capacitor/preferences";
import { Capacitor } from "@capacitor/core";
import { removeFromPreferences } from "../../../components/profileNavigation/ProfileNavigation";

export const saveToPreferences = async (key, value) => {
  if (!value) return;
  await Preferences.set({ key: key, value: String(value)});

  console.log("Token saved to Cookies & Preferences:", value);
};

export const otpVerificationRequest = async (data) => {
  try {
    console.log(data);

    const response = await axiosInstance.post(
      otpVerificationUrl,
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const {
      auth_token: authToken,
      profile_data,
      expiry_timestamp: expiryTimestamp,
    } = response.data.data;
    const user_id = profile_data.id;

    console.log("user_id :", user_id);

    // Store token in both Cookies & LocalStorage for iPhone compatibility

    saveToPreferences("authToken", authToken);
    saveToPreferences("user_id", user_id);
    saveToPreferences("expiryTimestamp", expiryTimestamp);
    Cookies.set("authToken", authToken, {
      secure: true,
      sameSite: "None",
      path: "/",
    });

    Cookies.set("user_id", user_id);
    Cookies.set("expiryTimestamp", expiryTimestamp);

    // ✅ Fallback for Safari (iOS) & Better Persistence
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("expiryTimestamp", expiryTimestamp);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Auto-Remove Expired Token (Recommended)
export const checkAndRemoveExpiredToken = () => {
  const expiryTimestamp =
    localStorage.getItem("expiryTimestamp") || Cookies.get("expiryTimestamp");

  if (expiryTimestamp && Date.now() > expiryTimestamp * 1000) {
    console.warn("Auth token expired. Logging out...");
    removeFromPreferences("authToken");
    removeFromPreferences("user_id");
    removeFromPreferences("expiryTimestamp");


    localStorage.removeItem("authToken");
    localStorage.removeItem("user_id");
    localStorage.removeItem("expiryTimestamp");

    window.location.href = "/authentication"; // Redirect to login
  }
};

// ✅ Call this function at app startup
// checkAndRemoveExpiredToken();
