import React, { useEffect, useState } from "react";
import UserMenu from "./UserMenu/UserMenu";
import userSvg from "../../Photos/userSvg.svg";
import style from "./User.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../Auth/authContext";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const darkMode = useSelector((state) => state.darkMode);
  const { userAuth } = useAuth();

  useEffect(() => {
    /*     try {
      axios
        .get(
          `https://backprojectboardgames-production.up.railway.app/users/${id}`
        )
        .then((response) => {
          const userGet = response.data;
          setUser(userGet);
        })
        .catch((res) => alert(res.message));
    } catch (error) {
      alert(error.message);
    } */
  }, [id]);

  return (
    <div
      className={
        darkMode === true ? style.darkUserContainer : style.userContainer
      }
    >
      <div className={style.userImg}>
        <img src={userSvg} alt="user logo" />
        <div>
          <h4>{userAuth.displayName}</h4>
          <h2>{userAuth.email}</h2>
        </div>
      </div>
      <UserMenu darkMode={darkMode} />
    </div>
  );
};

export default User;
