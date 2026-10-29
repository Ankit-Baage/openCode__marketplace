import React from "react";
import classes from "./helpPage.module.css";
import { Help } from "../../components/help/Help";
import { Header } from "../../components/header/Header";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import { Outlet } from "react-router-dom";

export const HelpPage = () => {
  const placeholder = "Search...";
  return <Outlet />;
};
