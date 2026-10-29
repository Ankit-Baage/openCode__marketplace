import { paymentRecordUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const paymentRecordRequest = async (payload) => {
  try {
    const { data } = await axiosInstance.post(paymentRecordUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(data.data);
    return data;
  } catch (error) {
    throw error;
  }
};
