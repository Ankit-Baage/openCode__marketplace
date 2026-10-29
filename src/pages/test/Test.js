import React from "react";
import { useQuery } from "@tanstack/react-query";
import { advertisementRequest } from "../../utils/https-request/address/advertisement/advertisementRequest";
import axiosInstance from "../../utils/axios-middleware/axiosMiddleware";

// ---- Test URL parameters ----
const brand_name = "testbrand";
const model_name = "testmodel";
const part_name = "testpart";
const color_name = "testcolor";
const no = "1";

// ---- Correct URL generator ----
export const testUrl = `https://dev.backend.mobigarage.com/v1/mp/accounts/upload_spare_product_image?brand_name=${brand_name}&model_name=${model_name}&part_name=${part_name}&color_name=${color_name}&no=${no}`;

// ---- NEW useTest hook ----
function useTest() {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["testUrl"],
    queryFn: async () => {
      const response = await axiosInstance.post(testUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch test data");
      }
      console.log(response);
      return response;
    },
    refetchOnWindowFocus: false,
  });

  return { data, isError, isLoading, isSuccess, refetch };
}

export { useTest };

// ---- Test Component ----
export const Test = () => {
  const { data, isLoading, isError } = useTest();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <div>
      <h3>Test API Data:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
