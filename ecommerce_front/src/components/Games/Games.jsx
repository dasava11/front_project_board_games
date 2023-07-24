import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../Redux/actions_creators/index";
import { filterDelete } from "../../Redux/actions_creators/index";
import { getWishList } from "../../Redux/actions_creators/index"
import style from "./Games.module.css";
import promotionalBanner from "../../Photos/PromotionalBanner.png";
import Filter from "../Filter/Filter";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SortGames from "../SortGames/SortGames";

const Games = () => {
  const dispatch = useDispatch();
  let allGames = useSelector((state) => state.allGames);
  let filters = useSelector((state) => state.filter);
  const darkMode = useSelector((state) => state.darkMode);

  const [currentPage, SetCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  // const [filter, setFilter] = useState({
  //   mechanic_name: "",
  //   thematic_name: "",
  //   category_name: "",
  // });
  const [filter, setFilter] = useState(filters);
  const userIdAux = localStorage.getItem("userId");

  //const [currentGames, setCurrentGames] = useLocalStorage("currentGames", []);

  useEffect(() => {
    allGames.length === 0 && dispatch(getAllGames());
    // return (
    //   () => {
    //     dispatch(getWishList());
    //   }
    // )
  }, []);

  const handleDelete = (e) => {
    setFilter({ ...filter, [e.target.value]: "" });
    dispatch(filterDelete({ ...filter, [e.target.value]: "" }));
  };

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = allGames.slice(firstPostIndex, lastPostIndex);

  if (allGames.length === 0) {
    return (
      <div>
        <div className={style.gamesBanner}>
          <img src={promotionalBanner} alt="Banner" />
        </div>
        <div className={style.gamesMain}>
          <div
            className={
              darkMode === true ? style.darkTitleMain : style.titleMain
            }
          >
            <div className={style.gamesTitle}>
              <h1>Board Games</h1>
              <h3>Choose your favorite game</h3>
            </div>
            <div>
              {
                <SortGames
                  className={style.sortSelect}
                  SetCurrentPage={SetCurrentPage}
                />
              }
            </div>
          </div>
          <div className={style.filtersMain}>
            <div className={style.filters}>
              <Filter
                filter={filter}
                setFilter={setFilter}
                type={"categories"}
                nameType={"category_name"}
                SetCurrentPage={SetCurrentPage}
                /* setCurrentGames={setCurrentGames}
              currentGames={currentGames} */
              />
              <Filter
                type={"mechanics"}
                filter={filter}
                setFilter={setFilter}
                nameType={"mechanic_name"}
                SetCurrentPage={SetCurrentPage}
                /* setCurrentGames={setCurrentGames}
              currentGames={currentGames} */
              />
              <Filter
                type={"thematics"}
                filter={filter}
                setFilter={setFilter}
                nameType={"thematic_name"}
                SetCurrentPage={SetCurrentPage}
                /* setCurrentGames={setCurrentGames}
              currentGames={currentGames} */
              />
            </div>
          </div>
        </div>
        <div
          className={
            darkMode === true ? style.darkFiltersDelete : style.filtersDelete
          }
        >
          {Object.keys(filter).some((keys) => filter[keys]) === true ? (
            filter &&
            Object.keys(filter).map((key) => {
              if (filter[key] !== "") {
                return (
                  <button
                    key={key}
                    value={key}
                    onClick={(e) => handleDelete(e)}
                  >
                    {filter[key]}
                  </button>
                );
              }
            })
          ) : (
            <div className={style.filtersDelteEmpty}>
              <hr />
            </div>
          )}
        </div>
        <div
          className={darkMode === true ? style.darkNotFound : style.notFound}
        >
          GAMES WERE NOT FOUND WITH THOSE FILTERS
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className={style.gamesBanner}>
          <img src={promotionalBanner} alt="Banner" />
        </div>
        <div className={style.gamesMain}>
          <div
            className={
              darkMode === true ? style.darkTitleMain : style.titleMain
            }
          >
            <div className={style.gamesTitle}>
              <h1>Board Games</h1>
              <h3>Choose your favorite game</h3>
            </div>
            <div>
              {
                <SortGames
                  className={style.sortSelect}
                  SetCurrentPage={SetCurrentPage}
                />
              }
            </div>
          </div>
          <div className={style.filtersMain}>
            <div className={style.filters}>
              <Filter
                filter={filter}
                setFilter={setFilter}
                type={"categories"}
                nameType={"category_name"}
                SetCurrentPage={SetCurrentPage}
                /* setCurrentGames={setCurrentGames}
              currentGames={currentGames} */
              />
              <Filter
                type={"mechanics"}
                filter={filter}
                setFilter={setFilter}
                nameType={"mechanic_name"}
                SetCurrentPage={SetCurrentPage}
                /* setCurrentGames={setCurrentGames}
              currentGames={currentGames} */
              />
              <Filter
                type={"thematics"}
                filter={filter}
                setFilter={setFilter}
                nameType={"thematic_name"}
                SetCurrentPage={SetCurrentPage}
                /* setCurrentGames={setCurrentGames}
              currentGames={currentGames} */
              />
            </div>
          </div>
        </div>
        <div
          className={
            darkMode === true ? style.darkFiltersDelete : style.filtersDelete
          }
        >
          {Object.keys(filter).some((keys) => filter[keys]) === true ? (
            filter &&
            Object.keys(filter).map((key) => {
              if (filter[key] !== "") {
                return (
                  <button
                    key={key}
                    value={key}
                    onClick={(e) => handleDelete(e)}
                  >
                    {filter[key]}
                  </button>
                );
              }
            })
          ) : (
            <div className={style.filtersDelteEmpty}>
              <hr />
            </div>
          )}
        </div>
        <div className={style.gamePagination}>
          <Pagination
            totalPosts={allGames.length}
            setCurrentPage={SetCurrentPage}
            postPerPage={postPerPage}
            currentPage={currentPage}
          />
          <div className={style.gamesContainer}>
            {currentPosts &&
              currentPosts.map((game) => {
                return (
                  <Card
                    name={game.name}
                    image={game.image}
                    price={game.price}
                    key={game.game_id}
                    id={game.game_id}
                    onSale={game.on_sale}
                  />
                );
              })}
          </div>
          <Pagination
            totalPosts={allGames.length}
            setCurrentPage={SetCurrentPage}
            postPerPage={postPerPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
};
export default Games;
