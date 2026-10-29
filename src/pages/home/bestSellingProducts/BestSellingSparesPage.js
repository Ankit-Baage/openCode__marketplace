import React, { useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./bestSellingSparesPage.module.css";
import { BestSellingSpares } from "../../../components/bestSellingProduct/bestSellingSpares/BestSellingSpares";
import { BestSellingSkeleton } from "../../../components/skeletons/bestSellingSkeleton/BestSellingSkeleton";
import { BestSellingCardMessage } from "../../../components/skeletons/bestSellingCardMessage/BestSellingCardMessage";

import { useGetHotDealsSpareList } from "../../../tanstack-query/hotDealsSpares/useGetHotDealsSparesList";
import { toSlug } from "../../../utils/toSlug";

export const BestSellingSparesPage = () => {
  const { data, isSuccess, isLoading } = useGetHotDealsSpareList();
  const navigate = useNavigate();

  const spares = useMemo(() => data?.data?.data || [], [data]);

  const navigateToSpareDetail = useCallback(
    (item) => {
      if (!item?.id) return;

      const brand = toSlug(item.brand ?? "");
      const model = toSlug(item.model ?? "");
      const spareName = toSlug(item.part ?? "spare");

      navigate(`/spares/${brand}/${model}/${spareName}/${item.id}`, {
        state: { item },
      });
    },
    [navigate]
  );

  return (
    <section className={classes.box} aria-labelledby="best-selling-heading">
      <div className={classes.box__content}>
        {/* Header */}
        <header className={classes.box__content__category}>
          <h1
            id="best-selling-heading"
            className={classes.box__content__category__title}
          >
            Mobile Spare Parts – Hot Deals
          </h1>
          <Link
            to="hotSelling"
            className={classes.box__content__category__link}
            aria-label="View all hot-selling spares"
          />
        </header>

        {/* Spare Items */}
        <div className={classes.box__content__container}>
          { isSuccess && spares.length === 0 ? (
            <BestSellingCardMessage />
          ) : (
            spares.map((spare) => (
              <BestSellingSpares
                key={spare.id}
                spare={spare}
                onClick={() => navigateToSpareDetail(spare)}
              />
            ))
          )}
        </div>

        <hr className={classes.box__content__sep} />
      </div>
    </section>
  );
};
