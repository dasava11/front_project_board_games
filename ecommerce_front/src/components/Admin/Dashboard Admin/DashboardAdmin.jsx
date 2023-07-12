import React, { useEffect } from "react";
import { EditProduct } from "../EditProduct/EditProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../../Redux/actions_creators";
import { Link } from "react-router-dom";
import styles from "./test.module.css";
import { HeaderAdmin } from "../HeaderAdmin/HeaderAdmin";
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
        <h3>Check Gmail Account</h3>
        <Link to="https://accounts.google.com/">
          <MailOutlined
            style={{
              fontSize: "30px",
              margin: "1px",
              padding: "7px",
            }}
          />
        </Link>
      </div>
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title="Feedback"
              value={1128}
              prefix={<LikeOutlined />}
            />
          </Col>
          <Col span={12}>
            <Statistic title="Unmerged" value={93} suffix="/ 100" />
          </Col>
        </Row>
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          icon={<AntDesignOutlined />}
        />
      </div>
    </div>
  );
};
