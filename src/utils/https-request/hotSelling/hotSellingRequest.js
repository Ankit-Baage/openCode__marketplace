import { hotSellingUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";
export const hotSellingListRequest = async ({
  pageParam = null,
  user_id,
}) => {
  try {
    // Construct query parameters
    const params = {
      pagination: 1,
      cursor: pageParam ?? undefined, // Avoid sending `null`
      user_id: user_id ?? undefined,
    };

    // Make API request
    const response = await axiosInstance.get(hotSellingUrl, { params });

    // Debugging: Log the response structure
    console.log("API Response:", response.data.data);

    return {
      data: response.data.data || [], // Ensure `data` is always an array
      nextCursor: response.data.nextCursor ?? null, // Ensure `nextCursor` exists
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
