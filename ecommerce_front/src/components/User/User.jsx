import React, { useEffect, useState } from "react";
import UserMenu from "./UserMenu/UserMenu";
import userSvg from "../../Photos/userSvg.svg";
import style from "./User.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

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
    <div className={style.userContainer}>
      <div className={style.userImg}>
        <img src={userSvg} alt="user logo" />
        <div>
          <h1>User´s name</h1>
          <h2>email@email.com</h2>
        </div>
      </div>
      <UserMenu />
    </div>
  );
};

export default User;
