import { useQuery } from "@tanstack/react-query";
import { searchTextSuggestionRequest } from "../../utils/https-request/searchSuggestion/searchSuggestionrequest";

export const useGetSearchTextSuggestionQuery = ({ searchTxt }) => {
  return useQuery({
    queryKey: ["searchSuggestions", searchTxt],
    queryFn: () =>
      searchTextSuggestionRequest({
        searchTxt,
      }),
    enabled: !!searchTxt, // 🔹 only run if there's text
    staleTime: 1000 * 60, // cache for 1 min
  });
};
