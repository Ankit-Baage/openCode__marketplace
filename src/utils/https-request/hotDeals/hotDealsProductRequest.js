import { hotDealsSparesUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const hotDealsSparesRequest = async () => {
  try {
    const response = await axiosInstance.get(
      hotDealsSparesUrl,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.data);
    return response;
  } catch (error) {
    throw error;
  }
};