import React from "react";

import { SpareDesktopFilterPage } from "./filters/spareDesktopFilter/SpareDesktopFilterPage";
import { SpareListingPage } from "./spareListingPage/SpareListingPage";
import { SpareMobileFilterPage } from "./filters/spareMobileFilter/SpareMobileFilterPage";
import classes from "./spareListPage.module.css";

export const SpareListPage = () => {
  return (
    <div className={classes.box}>
      <div className={classes.box__filter__mobile}>
        <SpareMobileFilterPage />
      </div>

      <div className={classes.box__filter__desktop}>
        <SpareDesktopFilterPage />
      </div>

      <SpareListingPage />
    </div>
  );
};
