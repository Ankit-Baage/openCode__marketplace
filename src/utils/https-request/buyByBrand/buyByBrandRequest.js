import { buyByBrandUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const buyByBrandRequest = async (category) => {
  try {
    const response = await axiosInstance.get(
      buyByBrandUrl(category),

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    if (axiosInstance.isAxiosError(error)) {
      // Axios error (e.g., network error, 404 Not Found)
      // console.error("Axios error:", error.message);
      throw new Error("Server error");
    } else {
      // Non-Axios error
      // console.error("Non-Axios error:", error.message);
      throw error; // Re-throw the original error
    }
  }
};
