import { cancelOrderUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const cancelOrderRequest = async (order_id, remarks) => {
  try {
    const url = cancelOrderUrl(order_id);
    const response = await axiosInstance.post(
      url,
      { order_id, remarks },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data.data);

    return response.data; // Only return the relevant data
  } catch (error) {
    console.error(
      "Cancel order failed:",
      error?.response?.data || error.message
    );
    throw error;
  }
};
