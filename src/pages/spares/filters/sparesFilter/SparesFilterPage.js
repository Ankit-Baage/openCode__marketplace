import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useGetFilterSpareOption from "../../../../tanstack-query/spares/useGetFilterSpareOption";
import classes from "./sparesFilterPage.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { SpareFilterModal } from "../../../../components/spares/spareFilters/spareFilterModal/SpareFilterModal";
import { SparesPriceFilterPage } from "./SparesPriceFilterPage";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterOptions, setFilterOption } from "../../../../store/category/categorySlice";

const filterButtons = [
  { id: "spare", label: "Spares" },
  { id: "brand", label: "Brand" },
  { id: "model", label: "Model" },
  { id: "price", label: "Price" },
];

export const SparesFilterPage = () => {
  const selectedFilters = useSelector(selectFilterOptions);
  const [filters, setFilters] = useState({
    spare: [],
    brand: [],
    model: [],
    start: [],
    end: null,
    sort: null,
  });

  const [currentFilterType, setCurrentFilterType] = useState(null);
  const [selectedFilterTab, setSelectedFilterTab] = useState(null);
  const [inFilterMode, setInFilterMode] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState([]);
  const [positions, setPositions] = useState({});
  const scrollFilter = useRef(null);
  const scrollFilterContainer = useRef(null);
  const filterRefs = useRef({});
  const { data, isSuccess } = useGetFilterSpareOption(currentFilterType);
  const dispatch = useDispatch();

  // Sync filters from URL
  useEffect(() => {
    const urlKeys = Array.from(searchParams.keys());
    const priceKeys = ["start", "end", "sort"];
    const hasPrice = priceKeys.some((key) => urlKeys.includes(key));
    const filtersFromUrl = [
      ...new Set([...urlKeys, ...(hasPrice ? ["price"] : [])]),
    ];
    setActiveFilters(filtersFromUrl);
  }, [searchParams]); // <--- ensure update on change

  useEffect(() => {
  const urlFilters = {};
  searchParams.forEach((value, key) => {
    if (key === "start" || key === "end") {
      urlFilters[key] = value;
    } else if (key === "sort") {
      urlFilters.sort = value;
    } else {
      urlFilters[key] = value.split(",");
    }
  });

  setFilters((prev) => ({
    ...prev,
    ...urlFilters,
  }));
  dispatch(setFilterOption(urlFilters));
}, [dispatch, searchParams]);

  // Animate tab indicator
  useLayoutEffect(() => {
    const rects = {};
    filterButtons.forEach(({ id }) => {
      const el = filterRefs.current[id];
      if (el) {
        rects[id] = {
          left: el.offsetLeft,
          width: el.offsetWidth,
        };
      }
    });
    setPositions(rects);
  }, [selectedFilterTab, activeFilters]);

  // Auto scroll to active tab
  useEffect(() => {
    const el = filterRefs.current[selectedFilterTab];
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedFilterTab]);

  const isActive = (id) => activeFilters.includes(id);

  const handleFilter = (e) => {
    const type = e.currentTarget.id;
    setCurrentFilterType(type);
    setSelectedFilterTab(type);
    setInFilterMode(true);
  };

  const handleClear = (e, type) => {
    if (!inFilterMode) e.stopPropagation();

    setFilters((prev) => ({
      ...prev,
      ...(type === "price"
        ? { start: null, end: null, sort: null }
        : { [type]: [] }),
    }));

    setSearchParams((params) => {
      if (type === "price") {
        params.delete("start");
        params.delete("end");
        params.delete("sort");
      } else {
        params.delete(type);
      }
      return params;
    });

    handleClose();
  };

  const handleClose = () => setInFilterMode(false);

  const handleApply = ({ type, options }) => {
    setSearchParams((params) => {
      params.set(type, options.join(","));
      return params;
    });
    handleClose();
  };

  const handlePriceChange = (start, end) => {
    setSearchParams((params) => {
      if (filters.sort) {
        params.set("sort", filters.sort);
      }
      params.set("start", start);
      params.set("end", end);
      return params;
    });
    handleClose();
  };

  const handleRadio = (id) => setFilters((prev) => ({ ...prev, sort: id }));

  return (
    <div className={classes.box}>
      <div className={classes.scrollWrapper} ref={scrollFilterContainer}>
        <motion.div
          className={classes.box__filter}
          ref={scrollFilter}
          drag="x"
          dragConstraints={scrollFilterContainer}
          dragElastic={0.05}
        >
          {/* Animated Indicator */}
          {positions[selectedFilterTab] && (
            <motion.div
              className={classes.box__filter__selected}
              initial={false}
              animate={{
                left: positions[selectedFilterTab].left,
                width: positions[selectedFilterTab].width,
              }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            />
          )}

          {/* Filter Buttons */}
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              id={btn.id}
              ref={(el) => (filterRefs.current[btn.id] = el)}
              onClick={handleFilter}
              className={`${classes.box__filter__btn} ${
                selectedFilterTab === btn.id || isActive(btn.id)
                  ? classes.box__filter__btn__active
                  : ""
              }`}
              role="tab"
              aria-selected={selectedFilterTab === btn.id}
            >
              {btn.label}
              <span
                className={`${
                  isActive(btn.id) ? classes.box__filter__chevron__active : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isActive(btn.id)) {
                    handleClear(e, btn.id);
                  } else {
                    handleFilter(e);
                  }
                }}
              />
            </button>
          ))}
        </motion.div>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {isSuccess &&
          inFilterMode &&
          (currentFilterType === "price" ? (
            <SparesPriceFilterPage
              optionsData={data?.data.data}
              onApply={handlePriceChange}
              onClose={handleClose}
              onRadioApplied={handleRadio}
            />
          ) : (
            <SpareFilterModal
              optionsData={data?.data.data}
              onApply={handleApply}
              filterType={currentFilterType}
              filterData={{
                type: currentFilterType,
                options: filters[currentFilterType],
              }}
              onClose={handleClose}
              onClear={handleClear}
            />
          ))}
      </AnimatePresence>
    </div>
  );
};
