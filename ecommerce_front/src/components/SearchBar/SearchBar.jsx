import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getAllGames, getGamesByName } from "../../Redux/actions_creators";
import style from "./SearchBar.module.css";
import searchIcon from "../../Photos/search_icon.svg";

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
  const allGames = useSelector((state) => state.allGames);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredGames, setFilteredGames] = useState([]);

  const handleSearch = (event) => {
    const { value } = event.target;
    const searchWord = event.target.value;
    setSearch(value);
    setError(validation(value));

    const newFilter = allGames.filter((game) => {
      return game.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredGames([]);
    } else {
      setFilteredGames(newFilter);
    }
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
      navigate("/games");
      /* setModal(true); */
      if (Object.keys(error).length) {
        alert("The field doesn't admit numbers");
      } else {
        if (!search) {
          navigate("/games");
          dispatch(getAllGames());
          setSearch("");
        } else {
          dispatch(getGamesByName(search));
          setSearch("");
        }
      }
    }
  };

  const handleEmptyModal = () => {
    setFilteredGames([]);
  };

  return (
    <div>
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
      {filteredGames.length > 0 && (
        <div className={style.searchModal}>
          {filteredGames.slice(0, 10).map((game) => {
            return (
              <Link
                to={`/details/${game.game_id}`}
                key={game.game_id}
                className={style.itemModal}
                onClick={handleEmptyModal}
              >
                <img src={game.image[0]} alt="" width="100px" />
                <h1>{game.name}</h1>
                <div className={style.itemModalPrice}>
                  <p>Price</p>
                  <p>${game.price}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
