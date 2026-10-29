import React, { useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { selectFilterOptions } from "../../store/category/categorySlice";
import useGetAdvertisement from "../../tanstack-query/advertisement/useGetAdvertisement";
import { Banner } from "../../components/banner/Banner";
import classes from "./advertisementPage.module.css";

export const AdvertisementPage = React.memo(({ category, page }) => {
  const filters = useSelector(selectFilterOptions, shallowEqual);

  const tag = useMemo(() => {
    const { spare, brand } = filters;

    const validSpare = Array.isArray(spare) && spare[0];
    const validBrand = Array.isArray(brand) && brand[0];

    return validSpare || validBrand || spare || brand || null;
  }, [filters]);
  const advertisementFilters = useMemo(
    () => ({ category, page, ...(tag ? { tag } : {}) }),
    [category, page, tag]
  );

  const { data, isError } = useGetAdvertisement(advertisementFilters);
  const ads = data?.data ?? [];

  console.log("filters from redux:", filters);
  console.log("computed tag:", tag);

  return <Banner data={ads} />;
});
