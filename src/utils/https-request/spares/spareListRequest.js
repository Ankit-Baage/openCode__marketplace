import { spareListUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

const normalizeFilters = (filters = {}) => {
  const normalized = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value === null || value === undefined || (Array.isArray(value) && value.length === 0)) return;
    normalized[key] = Array.isArray(value) ? value.join(",") : value;
  });
  return normalized;
};

export const spareListRequest = async ({ pageParam = null, filters, user_id, medium }) => {
  try {
    const params = {
      ...normalizeFilters(filters),
      cursor: pageParam ?? undefined,
    };

    const response = await axiosInstance.get(spareListUrl(user_id, medium), { params });

    return {
      data: response.data.data || [],
      nextCursor: response.data.nextCursor ?? null,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
