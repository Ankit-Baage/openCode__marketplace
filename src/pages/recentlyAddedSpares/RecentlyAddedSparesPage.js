import React, { memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./recentlyAddedSparesPage.module.css";

import { useGetBestSparesProductList } from "../../tanstack-query/bestSellingProduct/useGetBestSellingProductList";
import { BestSellingSkeleton } from "../../components/skeletons/bestSellingSkeleton/BestSellingSkeleton";
import { BestSellingCardMessage } from "../../components/skeletons/bestSellingCardMessage/BestSellingCardMessage";
import { BestSellingSpares } from "../../components/bestSellingProduct/bestSellingSpares/BestSellingSpares";
import { toSlug } from "../../utils/toSlug";

export const RecentlyAddedSparesPage = memo(() => {
  const { data, isSuccess, isLoading } = useGetBestSparesProductList();
  const navigate = useNavigate();

  // Extract spares safely
  const spares = data?.data?.data ?? [];

  // Navigate to spare detail (SEO-friendly slug)
  const navigateToSpareDetail = useCallback(
    (item) => {
      if (!item?.id) return;

      const brand = toSlug(item.brand);
      const model = toSlug(item.model);
      const spareName = toSlug(item.part || "spare");

      navigate(`/spares/${brand}/${model}/${spareName}/${item.id}`, {
        state: { item },
      });
    },
    [navigate]
  );

  return (
    <section className={classes.box}>
      <div className={classes.box__content}>
        {/* ✅ Section Header */}
        <header className={classes.box__content__category}>
          <h1 className={classes.box__content__category__title}>
            Latest Mobile Spares & Parts
          </h1>
          <Link
            to="/spares"
            className={classes.box__content__category__link}
            aria-label="View all spares"
          />
        </header>

        {/* ✅ Spare Cards */}
        <div className={classes.box__content__container}>
          {isSuccess && spares.length === 0 ? (
            <BestSellingCardMessage />
          ) : (
            spares.map((spare) => (
              <BestSellingSpares
                key={spare.id}
                spare={spare}
                onClick={navigateToSpareDetail}
              />
            ))
          )}
        </div>

        <hr className={classes.box__content__sep} />
      </div>
    </section>
  );
});
