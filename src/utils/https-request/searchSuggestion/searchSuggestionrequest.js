import { searchTextSuggestionUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const searchTextSuggestionRequest = async ({ searchTxt}) => {
  try {
    // Construct query parameters
    const params = {
      skw: searchTxt?.trim() || "",
    };

    // Make API request
    const response = await axiosInstance.get(searchTextSuggestionUrl, {
      params,
    });

    // Extract results
    const data = response?.data?.data || [];

    return data;
  } catch (error) {
    console.error("❌ Search API Error:", error);
    throw error; // 🔹 let React Query or caller handle it
  }
};
