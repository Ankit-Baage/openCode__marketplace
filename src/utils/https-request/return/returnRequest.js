import axios from "axios";
import { returnUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const returnRequest = async (payload) => {
  try {
    const response = await axiosInstance.patch(returnUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // Only return relevant data, not the whole response object
  } catch (error) {
    throw error
  }
};
