import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleNavigateFromAdvertisement } from "../../utils/helpers/getParamsFromAdd";
import classes from "./advertisement.module.css";

export const Advertisement = React.memo(({ image }) => {
  const navigate = useNavigate();
  const ad = image?.[0];

  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!ad) return null;

  const imageUrl = isDesktop ? ad.url_2 || ad.url : ad.url;
  const altText = ad.alt || ad.label || "Mobigarage Advertisement";

  return (
    <img
      src={imageUrl}
      alt={altText}
      width="100%"
      height="auto"
      loading="eager" // 👈 ensures FCP optimization
      decoding="async" // 👈 reduces render-blocking
      className={classes.box__img}
      onClick={() => handleNavigateFromAdvertisement(ad, navigate)}
    />
  );
});
