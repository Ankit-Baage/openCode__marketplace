import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useGetFilters } from "../../../../tanstack-query/filters/useGetFilters";
import { selectFilterOptions } from "../../../../store/category/categorySlice";
import { debounce } from "../../../../utils/helpers/debounce";
import mobile_filter from "../../../../assets/mobile_filter.svg";

import { SpareBrandModelFilterOptions } from "./SpareBrandModelOptions";
import classes from "./spareMobileFilterPage.module.css";
import { SparePartOptions } from "./SparePartOptions";
import { SparePriceOptions } from "./SparePriceOptions";
import { SpareSortOptions } from "./SpareSortOptions";

export const SpareMobileFilterPage = () => {
  const dispatch = useDispatch();

  const scrollFilter = useRef(null);
  const filterRefs = useRef({});
  const overlayRef = useRef(null);
  const [dragWidth, setDragWidth] = useState(0);
  const reduxFilters = useSelector(selectFilterOptions);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const { data: filters } = useGetFilters("spares");
  const quickTrayFilters = useMemo(
    () => filters?.filter((f) => f.is_quick_access) || [],
    [filters]
  );

  console.log(quickTrayFilters ? quickTrayFilters : "no quick tray filters");

  const initialBrands =
    searchParams.get("brand")?.split(",") || reduxFilters.brand || [];
  const initialModels =
    searchParams.get("model")?.split(",") || reduxFilters.model || [];
  const initialSpares =
    searchParams.get("spare")?.split(",") || reduxFilters.spare || [];
  const sortParam = searchParams.get("sort");
  const initialSort = sortParam !== null && sortParam !== "" ? sortParam : "";

  const startParam = searchParams.get("start");
  const endParam = searchParams.get("end");

  const initialSelectedMin =
    startParam !== null && startParam !== "" ? Number(startParam) : null;
  const initialSelectedMax =
    endParam !== null && endParam !== "" ? Number(endParam) : null;

  const [selectedBrands, setSelectedBrands] = useState(initialBrands);
  const [selectedModels, setSelectedModels] = useState(initialModels);
  const [selectedSpares, setSelectedSpares] = useState(initialSpares);
  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [selectedMin, setSelectedMin] = useState(initialSelectedMin);
  const [selectedMax, setSelectedMax] = useState(initialSelectedMax);

  const [selectedFilterKey, setSelectedFilterKey] = useState(
    quickTrayFilters[0]?.filter || null
  );

  const handleOpenModal = (filterKey = null) => {
    // If specific filter is clicked (from quick access)
    if (filterKey) {
      setSelectedFilterKey(filterKey);
    } else {
      // Otherwise, default to the first filter in quick tray
      setSelectedFilterKey(quickTrayFilters[0]?.filter || null);
    }

    setIsOpen(true);
  };

  const renderOptions = (filter) => {
    switch (filter.filter) {
      case "brand":
        return (
          <SpareBrandModelFilterOptions
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
          <SparePartOptions
            key={filter.filter}
            sparePartsData={filter}
            selectedFilters={{ spares: selectedSpares }}
            onChange={handleSpareChange}
          />
        );
      case "sort":
        return (
          <SpareSortOptions
            key={filter.filter}
            spareSortData={filter}
            selectedSort={selectedSort}
            onChange={handleSortChange}
          />
        );

      case "price":
        return (
          <SparePriceOptions
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

  const isFilterActive = (filter) => {
    switch (filter.filter) {
      case "brand":
        return selectedBrands.length > 0 || selectedModels.length > 0;
      case "spare":
        return selectedSpares.length > 0;
      case "price":
        return selectedMin !== null || selectedMax !== null;
      case "sort":
        return selectedSort !== "";
      default:
        return false;
    }
  };

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

      return nextSpares;
    });
  };

  const handleSortChange = (sortValue) => {
    setSelectedSort(sortValue);
  };

  /** ------------------------
   * Price Logic (debounced)
   * ------------------------ */
  const handlePriceChange = debounce(({ min, max }) => {
    setSelectedMin(min);
    setSelectedMax(max);
  }, 300);

  useEffect(() => {
    const updateWidth = () => {
      if (scrollFilter.current) {
        setDragWidth(
          scrollFilter.current.scrollWidth - scrollFilter.current.offsetWidth
        );
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);


   useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount (good practice)
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (selectedBrands.length) params.set("brand", selectedBrands.join(","));
    if (selectedModels.length) params.set("model", selectedModels.join(","));
    if (selectedSpares.length) params.set("spare", selectedSpares.join(","));
    if (selectedSort) params.set("sort", selectedSort);

    if (selectedMin !== null && selectedMin !== 0)
      params.set("start", selectedMin);
    if (selectedMax !== null && selectedMax !== 0)
      params.set("end", selectedMax);

    setSearchParams(params);
    setIsOpen(false);
  };

  const handleClearFilter = (filterKey) => {
    switch (filterKey) {
      case "brand":
        setSelectedBrands([]);
        setSelectedModels([]);
        searchParams.delete("brand");
        searchParams.delete("model");
        break;

      case "spare":
        setSelectedSpares([]);
        searchParams.delete("spare");
        break;

      case "price":
        setSelectedMin(null);
        setSelectedMax(null);
        searchParams.delete("start");
        searchParams.delete("end");
        break;

      case "sort":
        setSelectedSort("");
        searchParams.delete("sort");
        break;

      default:
        break;
    }

    setSearchParams(searchParams);
  };

  const handleClearAll = () => {
    // Reset all local states
    setSelectedBrands([]);
    setSelectedModels([]);
    setSelectedSpares([]);
    setSelectedSort("");
    setSelectedMin(null);
    setSelectedMax(null);

    // Clear search params from URL
    setSearchParams(new URLSearchParams());

    // Optional: reset selected filter tab to the first one
    setSelectedFilterKey(quickTrayFilters[0]?.filter || null);
    setIsOpen(false);
  };

  return (
    <section className={classes.box}>
      <section className={classes.box__filters}>
        <section className={classes.box__filters__main}>
          <button
            type="button"
            className={classes.box__filters__tab}
            onClick={() => handleOpenModal()}
          >
            <img
              alt="filter icon"
              src={mobile_filter}
              className={classes.box__filters__tab__icon}
            />
            <h1 className={classes.box__filters__tab__title}>Filters</h1>
          </button>
          <span className={classes.box__filters__main__sep} />
        </section>

        <section
          className={classes.box__quick}
          role="tablist"
          aria-label="Quick filters"
        >
          <motion.div
            ref={scrollFilter}
            drag="x"
            dragConstraints={{ left: -dragWidth, right: 0 }}
            className={classes.box__filters__quick__tray}
          >
            {quickTrayFilters.map((filter) => {
              return (
                <div
                  key={filter.filter}
                  ref={(el) => (filterRefs.current[filter.key] = el)}
                  role="tab"
                  // aria-selected={selectedFilter === filter.key}
                  tabIndex={0}
                  className={`
    ${classes.box__filters__quick__tray__btn} 
    ${
      isFilterActive(filter)
        ? classes.box__filters__quick__tray__btn__applied
        : ""
    }
  `}
                  onClick={() => handleOpenModal(filter.filter)}
                  // onKeyDown={(e) =>
                  //   ["Enter", " "].includes(e.key) && toggleFilter(filter.key)
                  // }
                >
                  <h3
                    className={`
    ${classes.box__filters__quick__tray__btn__text} 
    ${
      isFilterActive(filter)
        ? classes.box__filters__quick__tray__btn__text__applied
        : ""
    }
  `}
                  >
                    {filter.filter_label}
                  </h3>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent opening the modal
                      handleClearFilter(filter.filter);
                    }}
                    className={`
    ${classes.box__filters__quick__tray__btn__close} 
    ${
      isFilterActive(filter)
        ? classes.box__filters__quick__tray__btn__close__active
        : ""
    }
  `}
                  >
                    ×
                  </span>
                </div>
              );
            })}
          </motion.div>
        </section>
      </section>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            className={classes.box__filters__overlay}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <section className={classes.box__filters__modal}>
              <div className={classes.box__filters__modal__head}>
                <div className={classes.box__filters__modal__head__content}>
                  <img
                    alt="filter icon"
                    src={mobile_filter}
                    className={classes.box__filters__tab__icon}
                  />
                  <h4 className={classes.box__filters__modal__head__title}>
                    Filters
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={classes.box__filters__modal__close}
                >
                  X
                </button>
              </div>
              <div className={classes.box__filters__modal__content}>
                <div className={classes.box__space__wrapper}>
                  <div className={classes.box__filters__modal__content__left}>
                    {quickTrayFilters.map((filter) => {
                      return (
                        <button
                          type="button"
                          key={filter.filter}
                          ref={(el) => (filterRefs.current[filter.key] = el)}
                          role="tab"
                          // aria-selected={selectedFilter === filter.key}
                          tabIndex={0}
                          className={`
  ${classes.box__filters__modal__content__left__btn}
  ${
    selectedFilterKey === filter.filter
      ? classes.box__filters__modal__content__left__btn__active
      : isFilterActive(filter)
      ? classes.box__filters__modal__content__left__btn__applied
      : ""
  }
`}
                          onClick={() => setSelectedFilterKey(filter.filter)}
                          // onKeyDown={(e) =>
                          //   ["Enter", " "].includes(e.key) && toggleFilter(filter.key)
                          // }
                        >
                          {filter.filter_label}
                        </button>
                      );
                    })}
                  </div>
                  <div
                    className={classes.box__filters__modal__content__sep}
                  ></div>
                </div>

                <div className={classes.box__filters__modal__content__right}>
                  {selectedFilterKey ? (
                    renderOptions(
                      filters?.find((f) => f.filter === selectedFilterKey)
                    )
                  ) : (
                    <p className={classes.box__filters__modal__placeholder}>
                      Select a filter to view options
                    </p>
                  )}
                </div>
              </div>
              <div className={classes.box__filters__modal__footer}>
                <button
                  className={`${classes.box__filters__modal__footer__btn} ${classes.box__filters__modal__footer__btn__cancel}`}
                  onClick={handleClearAll}
                >
                  Clear All
                </button>
                <button
                  className={`${classes.box__filters__modal__footer__btn} ${classes.box__filters__modal__footer__btn__show}`}
                  onClick={handleApplyFilters}
                >
                  Apply
                </button>
              </div>
            </section>
          </motion.section>
        )}
      </AnimatePresence>
    </section>
  );
};
