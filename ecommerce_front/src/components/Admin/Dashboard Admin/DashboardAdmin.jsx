import React, { useEffect } from "react";
import { EditProduct } from "../EditProduct/EditProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../../Redux/actions_creators";
import { Link } from "react-router-dom";
import styles from "./test.module.css";
import { LikeOutlined } from "@ant-design/icons";
import { AntDesignOutlined } from "@ant-design/icons";
import { Col, Row, Statistic, Avatar } from "antd";
import { MailOutlined } from "@ant-design/icons";
export const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.allGames);

  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  return (
    <div className={styles.containerAdmin}>
      <h2>Administration Panel</h2>
      <div className={styles.dashBoardAd}>
        <button className={styles.checkMail}>
          <h3>Gmail Account</h3>
          <Link to="https://accounts.google.com/">
            <MailOutlined
              style={{
                fontSize: "25px",
                margin: "1px",
                padding: "7px",
                color: "black",
              }}
            />
          </Link>
        </button>
      </div>
      <div className={styles.dashBoardAd}>
        <button className={styles.checkMail}>
          <h3>Bodu Gemu Instagram</h3>
          <Link to="https://www.instagram.com/hpartb/"></Link>
        </button>
      </div>
      <div className={styles.dashBoardAd}>
        <button className={styles.checkMail}>
          <h3>Body Gemu Facebook</h3>
          <Link to="https://www.facebook.com/profile.php?id=100094509813076"></Link>
        </button>
      </div>
      <div>
        <br />
      </div>
    </div>
  );
};
