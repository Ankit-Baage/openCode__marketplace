import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../../store/searchText/searchTextSlice";

import search_dropDown from "../../../assets/search_dropDown.svg";

import classes from "./searchBar.module.css";

import useGetCartList from "../../../tanstack-query/cartList/useGetCartList";
import { selectCouponState } from "../../../store/coupon/couponSlice";
import { useGetSearchTextSuggestionQuery } from "../../../tanstack-query/searchTextSuggestion/useGetSearchTextSuggestionQuery";
import { useDebounce } from "../../../customHook/useDebounce";

const CATEGORY_OPTIONS = [
  { id: 1, category: "All" },
  // { id: 5, category: "VRP" },
  // { id: 6, category: "Spare Parts" },
  // { id: 7, category: "New Phones" },
  // { id: 8, category: "Prexo" },
  // { id: 9, category: "Open Box" },
];

export const SearchBar = ({ placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearch = useDebounce(searchInput, 500);

  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { data: suggestions = [] } = useGetSearchTextSuggestionQuery(
    { searchTxt: debouncedSearch },
    { enabled: !!debouncedSearch }
  );

  // Handle outside clicks for dropdowns and suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync URL params with state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchText = params.get("searchText") || "";
    const categoryId = parseInt(params.get("categoryId"), 10);

    setSearchInput(searchText);
    dispatch(setSearchText({ searchText }));

    if (categoryId) {
      const matched = CATEGORY_OPTIONS.find((opt) => opt.id === categoryId);
      if (matched) setSelected(matched);
    }
  }, [location.search, dispatch]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const handleSearch = (searchTextParam) => {
    const searchValue = searchTextParam || searchInput;
    if (!searchValue && !selected) return;

    const params = new URLSearchParams();
    if (searchValue) params.set("searchText", searchValue);
    if (selected) params.set("categoryId", selected.id);

    navigate(`/search?${params.toString()}`, { replace: true });
  };

  const handleBack = () => {
    navigate(location.pathname === "/cart" ? "/" : -1);
  };

  const selectedLabel = selected?.category || "All";

  return (
    <section className={classes.box__wrapper} ref={containerRef}>
      <div className={classes.box}>
        <button
          className={classes.box__backBtn}
          onClick={handleBack}
          aria-label="Go back"
        />

        <form
          role="search"
          className={classes.box__control}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          {/* Category Dropdown */}
          <div
            className={classes.box__control__select}
            onClick={() => setIsOpen((prev) => !prev)}
            role="button"
            tabIndex={0}
          >
            <span className={classes.box__control__select__label}>
              {selectedLabel.length !== 4
                ? selectedLabel.slice(0, 3)
                : selectedLabel}
            </span>
            <img
              src={search_dropDown}
              alt="Toggle category dropdown"
              className={classes.box__control__select__img}
            />
          </div>

          {/* Search Input */}
          <div className={classes.box__control__search}>
            <input
              id="searchInput"
              type="search"
              placeholder={placeholder}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className={classes.box__control__search__input}
              autoComplete="off"
            />
            {searchInput && (
              <button
                type="button"
                className={classes.box__control__search__clear}
                onClick={() => setSearchInput("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
            <button
              type="submit"
              className={classes.box__control__search__btn}
              aria-label="Search"
            />
          </div>
        </form>

        {/* Cart + Profile Links */}
      </div>

      {/* Category Options Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={classes.box__control__select__dropdown__options}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <h3
                key={option.id}
                className={classes.box__control__select__dropdown__option}
                onClick={() => handleSelect(option)}
              >
                {option.category}
              </h3>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isFocused && searchInput && suggestions.length > 0 && (
          <motion.ul
            className={classes.suggestionsDropdown}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className={classes.suggestionItem}
                onClick={() => {
                  setSearchInput(suggestion.tag);
                  handleSearch(suggestion.tag);
                  setIsFocused(false);
                }}
              >
                {suggestion.tag}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
};