import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import useGetHomeSubCategory from "../../../tanstack-query/subCategory/useGetHomeSubCategory";

import { BannerSkeleton } from "../../../components/skeletons/bannerSkeleton/BannerSkeleton";

import classes from "./swipeFilterPage.module.css";

export const SwipeFilterPage = () => {
  const [categoryWidth, setCategoryWidth] = useState(0);
  const [subCategoryWidth, setSubCategoryWidth] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCatX, setSubCatX] = useState(0);

  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);
  const navigate = useNavigate();

  const { data: subCategoryData, isSuccess: isSubCatSuccess } =
    useGetHomeSubCategory("spares");

  // ✅ Default selected category
  useEffect(() => {
    if (subCategoryData?.data?.data?.length > 0) {
      // Defer to next frame for smoother first paint
      requestAnimationFrame(() => {
        setSelectedCategory(subCategoryData.data.data[0]);
      });
    }
  }, [subCategoryData?.data?.data]);

  // ✅ Calculate category slider width (after idle)
  useEffect(() => {
    if (categoryRef.current && subCategoryData?.data?.data?.length > 0) {
      const calculateWidth = () => {
        const diff =
          categoryRef.current.scrollWidth - categoryRef.current.offsetWidth;
        setCategoryWidth(diff > 0 ? diff : 0);
      };
      if ("requestIdleCallback" in window) requestIdleCallback(calculateWidth);
      else requestAnimationFrame(calculateWidth);
    }
  }, [subCategoryData?.data?.data]);

  // ✅ Calculate subcategory slider width (after category selection)
  useEffect(() => {
    if (subCategoryRef.current && selectedCategory?.items?.length > 0) {
      const calc = () => {
        const diff =
          subCategoryRef.current.scrollWidth -
          subCategoryRef.current.offsetWidth;
        setSubCategoryWidth(diff > 0 ? diff : 0);
        setSubCatX(0);
      };
      requestAnimationFrame(calc);
    }
  }, [selectedCategory]);

  // ✅ Handlers
  const handleCategoryClick = (cat) => setSelectedCategory(cat);

  const onClickHandler = (item) => {
    if (!item) return;
    const params = item?.params;
    let searchParams = "";
    if (params) {
      const [key, value] = params.split("=");
      if (key && value)
        searchParams = `${key === "part_name" ? "spare" : key}=${value}`;
    }
    navigate({
      pathname: item.redirect_to,
      search: searchParams ? `?${searchParams}` : "",
    });
  };

  // ✅ Dynamic scroll
  const handleScrollLeft = () => {
    if (!subCategoryRef.current) return;
    const visibleWidth = subCategoryRef.current.offsetWidth;
    setSubCatX((prev) => Math.min(prev + visibleWidth, 0));
  };

  const handleScrollRight = () => {
    if (!subCategoryRef.current) return;
    const visibleWidth = subCategoryRef.current.offsetWidth;
    setSubCatX((prev) => Math.max(prev - visibleWidth, -subCategoryWidth));
  };

  // ===== SEO: Preload + Meta =====

  return (
    <div className={classes.box__routes}>
      {/* ===== Category Slider ===== */}
      <div className={classes.box__routes__wrapper}>
        <motion.div className={classes.box__routes__category} ref={categoryRef}>
          <motion.div
            className={classes.box__routes__category__slider}
            drag="x"
            dragConstraints={{ right: 0, left: -categoryWidth }}
            dragElastic={0.2}
          >
            {subCategoryData?.data?.data?.map((cat) => (
              <button
                key={cat.id}
                className={`${classes.box__routes__category__slider__slide} ${
                  selectedCategory?.id === cat.id
                    ? classes.box__routes__category__slider__slide__active
                    : ""
                }`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <Link
          to="/category"
          className={classes.container__box__category__navigate}
          aria-label="View all spare parts"
        >
          View All
        </Link>
      </div>

      {/* ===== SubCategory Slider ===== */}
      {selectedCategory?.items?.length > 0 && (
        <div className={classes.box__routes__subCategory}>
          <motion.div className={classes.box__routes__category}>
            <motion.div
              key={selectedCategory.id}
              ref={subCategoryRef}
              className={classes.box__routes__category__slider}
              drag="x"
              dragConstraints={{ right: 0, left: -subCategoryWidth }}
              dragElastic={0.2}
              animate={{ x: subCatX }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              {selectedCategory.items.map((button) => (
                <button
                  key={button.id}
                  className={classes.box__routes__subCategory__btn}
                  onClick={() => onClickHandler(button)}
                >
                  <img
                    src={button.url}
                    alt={button.label}
                    loading="lazy"
                    decoding="async"
                    className={classes.box__routes__subCategory__img}
                  />
                  <h3 className={classes.box__routes__subCategory__name}>
                    {button.label}
                  </h3>
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* ===== Scroll Buttons ===== */}

          <div className={classes.box__routes__subCategory__controls}>
            {subCatX < 0 && (
              <button
                onClick={handleScrollLeft}
                className={`${classes.box__routes__category__controls__btn} ${classes.box__routes__category__controls__btn__left}`}
              />
            )}
            {subCatX > -subCategoryWidth && (
              <button
                onClick={handleScrollRight}
                className={`${classes.box__routes__category__controls__btn} ${classes.box__routes__category__controls__btn__right}`}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
