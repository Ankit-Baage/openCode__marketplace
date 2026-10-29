import React from "react";
import { Outlet } from "react-router-dom";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import classes from "./openBox.module.css";

export const OpenBoxPage = () => {
  const placeholder = "Search...";
  return (
    <div className={classes.container}>
      <SearchBar placeholder={placeholder} />
      <Outlet />
    </div>
  );
};
