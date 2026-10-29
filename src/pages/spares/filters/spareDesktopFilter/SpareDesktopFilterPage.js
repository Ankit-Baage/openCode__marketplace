import React, { useEffect, useState, useMemo } from "react";
import filterIcon from "../../../../assets/filterIcon.svg";
import classes from "./spareDesktopFilterPage.module.css";
import { useGetFilters } from "../../../../tanstack-query/filters/useGetFilters";
import { SpareBrandModelFilter } from "../../../../components/filter/sparesDeskTopFilters/SpareBrandModelFilter";
import { SparePartFilter } from "../../../../components/filter/sparesDeskTopFilters/SparePartFilter";
import { SpareSortFilter } from "../../../../components/filter/sparesDeskTopFilters/SpareSortFilter";
import { SparePriceFilter } from "../../../../components/filter/sparesDeskTopFilters/SparePriceFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterOption,
  selectFilterOptions,
} from "../../../../store/category/categorySlice";
import { useSearchParams } from "react-router-dom";
import { debounce } from "../../../../utils/helpers/debounce";

export const SpareDesktopFilterPage = () => {
  const { data: filters } = useGetFilters("spares");
  const dispatch = useDispatch();
  const reduxFilters = useSelector(selectFilterOptions);
  const [searchParams, setSearchParams] = useSearchParams();

  /** ------------------------
   * Extract backend price limits (extremes)
   * ------------------------ */

  /** ------------------------
   * Initialize state from URL, Redux, or backend
   * ------------------------ */
  const initialBrands =
    searchParams.get("brand")?.split(",") || reduxFilters.brand || [];
  const initialModels =
    searchParams.get("model")?.split(",") || reduxFilters.model || [];
  const initialSpares =
    searchParams.get("spare")?.split(",") || reduxFilters.spare || [];
  const initialSort = searchParams.get("sort") || reduxFilters.sort || "";

  const parsedStart = Number(searchParams.get("start"));
  const parsedEnd = Number(searchParams.get("end"));

  const initialSelectedMin = !isNaN(parsedStart)
    ? parsedStart
    : reduxFilters.start ?? 5;

  const initialSelectedMax = !isNaN(parsedEnd)
    ? parsedEnd
    : reduxFilters.end ?? 10000;

  const [selectedBrands, setSelectedBrands] = useState(initialBrands);
  const [selectedModels, setSelectedModels] = useState(initialModels);
  const [selectedSpares, setSelectedSpares] = useState(initialSpares);
  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [selectedMin, setSelectedMin] = useState(initialSelectedMin);
  const [selectedMax, setSelectedMax] = useState(initialSelectedMax);

  /** ------------------------
   * Brand / Model / Spare Logic
   * ------------------------ */
  const handleBrandChange = (brandId, brandModels = []) => {
    setSelectedBrands((prevBrands) => {
      const isSelected = prevBrands.includes(brandId);

      // Calculate the next brands
      const nextBrands = isSelected
        ? prevBrands.filter((b) => b !== brandId)
        : [...prevBrands, brandId];

      // Update models if deselecting a brand
      if (isSelected) {
        setSelectedModels((prevModels) =>
          prevModels.filter((m) => !brandModels.includes(m))
        );
      }

      // Update URL
      setSearchParams((prevParams) => {
        const params = new URLSearchParams(prevParams);

        // Update brands in URL
        if (nextBrands.length) params.set("brand", nextBrands.join(","));
        else params.delete("brand");

        // If deselected, remove associated models from URL
        if (isSelected) {
          const remainingModels = params
            .get("model")
            ?.split(",")
            .filter((m) => !brandModels.includes(m));
          if (remainingModels && remainingModels.length) {
            params.set("model", remainingModels.join(","));
          } else {
            params.delete("model");
          }
        }

        return params;
      });

      return nextBrands;
    });
  };

  const handleModelChange = (brandId, modelId) => {
    setSelectedModels((prevModels) => {
      const isSelected = prevModels.includes(modelId);
      const nextModels = isSelected
        ? prevModels.filter((m) => m !== modelId)
        : [...prevModels, modelId];

      // Update URL for models
      setSearchParams((prevParams) => {
        const params = new URLSearchParams(prevParams);

        if (nextModels.length) params.set("model", nextModels.join(","));
        else params.delete("model");

        // Also ensure brand is present in URL
        const currentBrands = params.get("brand")?.split(",") || [];
        if (!currentBrands.includes(brandId)) {
          params.set("brand", [...currentBrands, brandId].join(","));
        }

        return params;
      });

      return nextModels;
    });

    // Ensure brand is selected in state
    setSelectedBrands((prevBrands) =>
      prevBrands.includes(brandId) ? prevBrands : [...prevBrands, brandId]
    );
  };

  const handleSpareChange = (spareId) => {
    setSelectedSpares((prev) => {
      const nextSpares = prev.includes(spareId)
        ? prev.filter((s) => s !== spareId)
        : [...prev, spareId];

      // Update URL
      setSearchParams((prevParams) => {
        const params = new URLSearchParams(prevParams);

        if (nextSpares.length) params.set("spare", nextSpares.join(","));
        else params.delete("spare");

        return params;
      });

      return nextSpares;
    });
  };

  const handleSortChange = (sortValue) => {
    setSelectedSort(sortValue);

    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);

      if (sortValue) params.set("sort", sortValue);
      else params.delete("sort");

      return params;
    });
  };

  /** ------------------------
   * Price Logic (debounced)
   * ------------------------ */
  const handlePriceChange = debounce(({ min, max }) => {
    setSelectedMin(min);
    setSelectedMax(max);

    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);

      if (min !== null) params.set("start", min);
      else params.delete("start");

      if (max !== null) params.set("end", max);
      else params.delete("end");

      return params;
    });
  }, 300);

  const renderOptions = (filter) => {
    switch (filter.filter) {
      case "brand":
        return (
          <SpareBrandModelFilter
            key={filter.filter}
            brandData={filter}
            selectedBrands={selectedBrands}
            selectedModels={selectedModels}
            onBrandChange={handleBrandChange}
            onModelChange={handleModelChange}
          />
        );
      case "spare":
        return (
          <SparePartFilter
            key={filter.filter}
            sparePartsData={filter}
            selectedFilters={{ spares: selectedSpares }}
            onChange={handleSpareChange}
          />
        );
      case "sort":
        return (
          <SpareSortFilter
            key={filter.filter}
            spareSortData={filter}
            selectedSort={selectedSort}
            onChange={handleSortChange}
          />
        );
      case "price":
        return (
          <SparePriceFilter
            key={filter.filter}
            sparePriceFilter={filter}
            selectedPrice={{ min: selectedMin, max: selectedMax }}
            onChange={handlePriceChange}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(
      setFilterOption({
        brand: selectedBrands,
        model: selectedModels,
        spare: selectedSpares,
        sort: selectedSort,
        start: selectedMin,
        end: selectedMax,
      })
    );
  }, [
    selectedBrands,
    selectedModels,
    selectedSpares,
    selectedSort,
    selectedMin,
    selectedMax,
    dispatch,
  ]);


  useEffect(() => {
  const urlBrands = searchParams.get("brand")?.split(",") || [];
  const urlModels = searchParams.get("model")?.split(",") || [];
  const urlSpares = searchParams.get("spare")?.split(",") || [];
  const urlSort = searchParams.get("sort") || "";

  const urlStart = Number(searchParams.get("start"));
  const urlEnd = Number(searchParams.get("end"));

  const urlMin = !isNaN(urlStart) ? urlStart : 5;
  const urlMax = !isNaN(urlEnd) ? urlEnd : 10000;

  setSelectedBrands(urlBrands);
  setSelectedModels(urlModels);
  setSelectedSpares(urlSpares);
  setSelectedSort(urlSort);
  setSelectedMin(urlMin);
  setSelectedMax(urlMax);
}, [searchParams]);


  return (
    <div className={classes.box}>
      <div className={classes.box__head}>
        <div className={classes.box__head__content}>
          <img
            src={filterIcon}
            alt="filter icon"
            className={classes.box__head__icon}
          />
          <h1 className={classes.box__head__title}>Filters</h1>
        </div>
        <hr className={classes.box__sep} />
      </div>
      <div className={classes.box__itemList}>
        {filters?.map((filter) => renderOptions(filter))}
      </div>
    </div>
  );
};
