import React, { useEffect, useState } from "react";
import UserMenu from "./UserMenu/UserMenu";
import userSvg from "../../Photos/userSvg.svg";
import style from "./User.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
const VITE_URL_USERS = import.meta.env.VITE_URL_USERS;

const User = () => {
  const [user, setUser] = useState({});
  const darkMode = useSelector((state) => state.darkMode);

  useEffect(() => {
    const userIdAux = localStorage.getItem("userId");

    axios
      .get(`${VITE_URL_USERS}/${userIdAux}`)
      .then((res) => setUser(res.data));
  }, []);
  return (
    user && (
      <div
        className={
          darkMode === true ? style.darkUserContainer : style.userContainer
        }
      >
        <div className={style.userImg}>
          <img src={userSvg} alt="user logo" />
          <div>
            {user && <h4>{user.name}</h4>}
            {user && <h2>{user.email}</h2>}
          </div>
        </div>
        <UserMenu darkMode={darkMode} user={user} />
      </div>
    )
  );
};

export default User;
