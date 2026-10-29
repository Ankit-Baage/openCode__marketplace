import { useQuery } from "@tanstack/react-query";
import { filterRequest } from "../../utils/https-request/filters/filterRequest";

const FILTER_LABELS = {
  brand: "Brands + Models",
  spare: "Spares",
  sort: "Sort By Price",
  price: "Price Range",
};

export const useGetFilters = (category) => {
  return useQuery({
    queryKey: ["filters", category],
    queryFn: async () => {
      try {
        const response = await filterRequest(category);
        const data = response?.data || [];

        // Map each filter object and add filter_label
        return data.map((item) => ({
          ...item,
          filter_label: FILTER_LABELS[item.filter] || item.filter, // fallback to filter name
        }));
      } catch (error) {
        throw new Error("Failed to fetch filters: " + error.message);
      }
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
