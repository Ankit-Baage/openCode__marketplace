import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./brandsPage.module.css";
import useGetBrands from "../../../tanstack-query/buyByBrand/useGetBrands";

export const BrandsPage = memo(() => {
  const navigate = useNavigate();
  const { data: BrandsData, isError } = useGetBrands("spares");

  // Handle brand click navigation
  const onClickHandler = useCallback(
    (item) => {
      if (!item) return;
      const params = item?.params;
      let searchParams = "";
      if (params) {
        const [key, value] = params.split("=");
        if (key && value) {
          searchParams = `${key === "part_name" ? "spare" : key}=${value}`;
        }
      }
      navigate({
        pathname: item.redirect_to,
        search: searchParams ? `?${searchParams}` : "",
      });
    },
    [navigate]
  );

 

  const brands = BrandsData?.data?.data ?? [];

  return (
    <section className={classes.box__brands}>
      <h1 className={classes.box__brands__title}>
        Shop by Brand & Model – Mobile Spares
      </h1>

      <div className={classes.box__brands__container}>
        {brands.map((brand) => (
          <button
            key={brand?.id}
            type="button"
            onClick={() => onClickHandler(brand)}
            className={classes.box__brands__item}
          >
            <img
              src={brand?.url}
              alt={brand?.brand_name || "Mobile Brand"}
              loading="lazy"
              className={classes.box__brands__item__img}
            />
          </button>
        ))}
      </div>
    </section>
  );
});
