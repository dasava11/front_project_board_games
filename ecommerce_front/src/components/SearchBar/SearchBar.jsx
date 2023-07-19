import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllGames, getGamesByName } from "../../Redux/actions_creators";
import { Modal } from "antd";
import style from "./SearchBar.module.css";
import searchIcon from "../../Photos/search_icon.svg";
import ModalSearch from "../ModalSearch/ModalSearch";

const regexNumber = /^[0-9]+$/;

const validation = (search) => {
  const errors = {};
  if (regexNumber.test(search)) {
    errors.search = "The field doesn't admit numbers";
  }
  return errors;
};

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
    setError(validation(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(error).length) {
      alert("The field doesn't admit numbers");
    } else {
      if (!search) {
        dispatch(getAllGames());
        setSearch("");
      } else {
        dispatch(getGamesByName(search));
        /* setPages(1); */
        setSearch("");
      }
    }
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (Object.keys(error).length) {
        alert("The field doesn't admit numbers");
      } else {
        if (!search) {
          dispatch(getAllGames());
          setSearch("");
        } else {
          dispatch(getGamesByName(search));
          /* setPages(1); */
          setSearch("");
        }
      }
    }
  };

  return (
    <div className={style.searchContainer}>
      <img src={searchIcon} alt="search button" width="15px" height="15px" />
      <hr />
      <input
        className={style.inputSearch}
        type="search"
        placeholder="Search a Game"
        onChange={handleSearch}
        onKeyDown={handleKey}
      />
    </div>
  );
};

export default SearchBar;
