import React, { Suspense, memo } from "react";
import { Helmet } from "react-helmet-async";
import Cookies from "js-cookie";

import { SwipeFilterPage } from "../swipeFilter/SwipeFilterPage";
import { AdvertisementPage } from "../../advertisement/AdvertisementPage";
import { BestSellingSkeleton } from "../../../components/skeletons/bestSellingSkeleton/BestSellingSkeleton";
import registrationImage from "../../../assets/registration_home.png";
import classes from "./homePage.module.css";
import { Link } from "react-router-dom";

const BestSellingSparesPage = React.lazy(() =>
  import("../bestSellingProducts/BestSellingSparesPage").then((module) => ({
    default: module.BestSellingSparesPage,
  }))
);
const RecentlyAddedSparesPage = React.lazy(() =>
  import("../../recentlyAddedSpares/RecentlyAddedSparesPage").then(
    (module) => ({
      default: module.RecentlyAddedSparesPage,
    })
  )
);
const BrandsPage = React.lazy(() =>
  import("../brands/BrandsPage").then((module) => ({
    default: module.BrandsPage,
  }))
);
const QualityAssurancePage = React.lazy(() =>
  import("../qualityAssurance/QualityAssurancePage").then((module) => ({
    default: module.QualityAssurancePage,
  }))
);

export const HomePage = memo(() => {
  const category = "home";
  const page = "landing";

  const authToken = Cookies.get("authToken");

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Buy Mobile & Tablet Spare Parts Online | Mobigarage</title>
        <meta
          name="description"
          content="Buy 100% QC passed OEM quality mobile and tablet spare parts – displays, batteries, cameras, charging ports and more for all top brands. Fast shipping across India."
        />
        <meta
          name="keywords"
          content="mobile spare parts, tablet spares, phone display replacement, mobile battery, camera lens, charging port, Mobigarage"
        />
      </Helmet>

      <main className={classes.box}>
        {/* Swipe Filter (critical, render immediately) */}
        <SwipeFilterPage />

        {/* Advertisement Banner (critical for FCP) */}
        <AdvertisementPage category={category} page={page} />

        {/* Lazy-loaded sections for FCP optimization */}
        <Suspense fallback={<BestSellingSkeleton />}>
          <BestSellingSparesPage />
        </Suspense>

        <Suspense fallback={<BestSellingSkeleton />}>
          <RecentlyAddedSparesPage />
        </Suspense>

        <Suspense fallback={<BestSellingSkeleton />}>
          <BrandsPage />
        </Suspense>

        <Suspense fallback={<BestSellingSkeleton />}>
          <QualityAssurancePage />
        </Suspense>

        {!authToken && (
          <Link to="/authentication" className={classes.box__registration}>
            <img
              src={registrationImage}
              alt="want dealing pricing & bulk discounts"
              title="Register your account easily on Mobigarage"
              className={classes.box__registration__img}
              loading="lazy"
              decoding="async"
            />
          </Link>
        )}
      </main>
    </>
  );
});
