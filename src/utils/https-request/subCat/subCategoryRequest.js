import { buyBySubCategoryHomeUrl, buyBySubCategoryUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const subCategoryHomeRequest = async (category) => {
  try {
    const response = await axiosInstance.get(
      buyBySubCategoryHomeUrl(category),

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

export const subCategoryRequest = async (category) => {
  try {
    const response = await axiosInstance.get(
      buyBySubCategoryUrl(category),

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
