import React from "react";
import { Carousel } from "../carousel/Carousel";
import { Advertisement } from "../advertisement/Advertisement";

export const Banner = React.memo(({ data = [] }) => {
  if (data.length === 0) return null;
  return data.length > 1 ? (
    <Carousel images={data} />
  ) : (
    <Advertisement image={data} />
  );
});
