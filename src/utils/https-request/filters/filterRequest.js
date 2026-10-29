import axiosInstance from "../../axios-middleware/axiosMiddleware";
import { filterUrl } from "../../../config/config";


export const filterRequest = async (category) => {
  try {
    const response = await axiosInstance.get(filterUrl(category));
    const data = response?.data?.data || [];
    return { data };
  } catch (error) {
    console.error("Filter API Error:", error);
    throw error;
  }
};
