import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import search from "../../assets/search.svg";
import classes from "./searchInput.module.css";
import {
  setSearchText,
  setSearchTextModalIsOpen,
} from "../../store/searchText/searchTextSlice";

export const SearchInput = ({ placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // ✅ On mount: hydrate from URL if `search` param exists
  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setInputValue(searchParam);
      setDebouncedValue(searchParam);
      dispatch(setSearchText({ searchText: searchParam }));
      // dispatch(setSearchTextModalIsOpen())
      navigate("/search");
    }
  }, [dispatch, navigate, searchParams]); // on mount

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 2000);

    console.log("inputValue", debouncedValue);

    return () => clearTimeout(handler);
  }, [debouncedValue, inputValue]);

  useEffect(() => {
    if (debouncedValue || debouncedValue === "") {
      dispatch(setSearchText({ searchText: debouncedValue }));

      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (debouncedValue.trim() === "") {
          newParams.delete("search"); // 🔥 Remove if empty

        } else {
          newParams.set("search", debouncedValue);
        }
        return newParams;
      });
    }
  }, [debouncedValue, dispatch, setSearchParams]);

  return (
    <div className={classes.container}>
      <label htmlFor="searchInput" className={classes.container__label}>
        <input
          id="searchInput"
          type="search"
          placeholder={placeholder}
          className={classes.container__input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <div className={classes.container__box}>
        <img
          src={search}
          alt="search"
          className={classes.container__box__img}
        />
      </div>
    </div>
  );
};
