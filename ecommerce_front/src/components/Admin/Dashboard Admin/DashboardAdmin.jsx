import React, { useEffect } from "react";
import { EditProduct } from "../EditProduct/EditProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../../Redux/actions_creators";
import { Link } from "react-router-dom";
import styles from "./test.module.css";
import { HeaderAdmin } from "../HeaderAdmin/HeaderAdmin";
export const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.allGames);

  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  return (
    <div className={styles.containerAdmin}>
      <HeaderAdmin />
      <br />
      <br />
      <br />
    </div>
  );
};
