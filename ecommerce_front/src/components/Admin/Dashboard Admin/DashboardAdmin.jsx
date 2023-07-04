import React, { useEffect } from "react";
import { EditProduct } from "../Forms/EditProduct/EditProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGames,
  getCategories,
  getAuthors,
  getDesigners,
  getLanguages,
  getEditorials,
  getThematics,
  getMechanics,
} from "../../../Redux/actions_creators";
import { Link } from "react-router-dom";
import styles from "./test.module.css";

export const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.allGames);
  const categories = useSelector((state) => state.allCategories);
  const authors = useSelector((state) => state.allAuthors);
  const designers = useSelector((state) => state.allDesigners);
  const languages = useSelector((state) => state.allLanguages);
  const editorials = useSelector((state) => state.allEditorials);
  const thematics = useSelector((state) => state.allThematics);
  const mechanics = useSelector((state) => state.allMechanics);

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getCategories());
    dispatch(getAuthors());
    dispatch(getDesigners());
    dispatch(getLanguages());
    dispatch(getEditorials());
    dispatch(getThematics());
    dispatch(getMechanics());
  }, []);
  console.log(authors);
  return (
    <div className={styles.containerAdmin}>
      <br />
      <h1>DASHBOARD ADMIN</h1>
      <br />
      <button className={styles.buttonCreate}>
        <Link to="/createproduct">Create New Game</Link>
      </button>

      <EditProduct
        games={games}
        categories={categories}
        authors={authors}
        designers={designers}
        languages={languages}
        editorials={editorials}
        thematics={thematics}
        mechanics={mechanics}
      />
    </div>
  );
};
