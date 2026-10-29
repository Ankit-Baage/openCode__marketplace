import { searchTextUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const searchRequest = async ({ pageParam = null, searchTxt, user_id }) => {
  try {
    // Construct query parameters
    const params = {
      skw: searchTxt, // trim whitespace and fallback to empty string
      pagination: 1,
      cursor: pageParam ?? undefined, // optional chaining handled
      user_id: user_id ?? undefined,
    };

    // Make API request
    const response = await axiosInstance.get(searchTextUrl, { params });

    // Extract and fallback
    const data = response?.data?.data || [];
    const nextCursor = response?.data?.nextCursor ?? null;

    // Debugging (optional)
    console.log("API Response:", data);

    return {
      data,
      nextCursor,
    };
  } catch (error) {
    console.error("Search API Error:", error);
    throw error;
  }
};
