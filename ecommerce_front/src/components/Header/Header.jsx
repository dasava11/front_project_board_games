import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../Photos/logo.png";
import dice1 from "../../Photos/dice_1.svg";
import dice4 from "../../Photos/dice_4.svg";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Header.module.css";
import Navbar from "../Navbar/Navbar";
import userIcon from "../../Photos/icons8-user.png";
import { useAuth } from "../Auth/authContext";
import { auth } from "../Auth/firebase";
import { Switch } from "antd";
import { setDarkMode } from "../../Redux/actions_creators";
import axios from "axios";

const VITE_URL_USERS = import.meta.env.VITE_URL_USERS;

export const Header = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const darkMode = useSelector((state) => state.darkMode);

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const userIdAux = localStorage.getItem("userId");
    axios
      .get(`${VITE_URL_USERS}/${userIdAux}`)
      .then((res) => setUser(res.data));
  }, []);

  const handleSwitch = (e) => {
    dispatch(setDarkMode(e));
    document.body.classList.toggle("dark");
  };
  return (
    <div>
      <div
        id="headerFlex"
        className={darkMode === true ? style.darkHeaderFlex : style.headerFlex}
      >
        <img
          src={logo}
          alt="logo"
          className={darkMode === true ? style.darkLogoHead : style.logoHead}
          onClick={() => navigate("/")}
        />

        <div className={style.inputsSB}>
          <div className={style.darkMode}>
            <h6>Dark Mode</h6>
            <div className={style.switchDiv}>
              <Switch onChange={handleSwitch} />
            </div>
          </div>

          <SearchBar />

          {!auth.currentUser && (
            <div className={style.inputs}>
              <button>
                <img
                  src={dice1}
                  alt="sign un"
                  width="45px"
                  height="45px"
                  onClick={() => navigate("/signup")}
                />
                <h5>Sign Up</h5>
              </button>
              <button>
                <img
                  src={dice4}
                  alt="log In"
                  width="45px"
                  height="45px"
                  onClick={() => navigate("/login")}
                />
                <h5>Log In</h5>
              </button>
            </div>
          )}

          {auth?.currentUser && (
            <div className={style.loginCorrectContainer}>
              <Link to="/user" className={style.logInUserStyle}>
                <button>
                  <img src={userIcon} alt="userIcon" />
                </button>
                <h5 className={style.name}>
                  {user.name && user.name.split(" ")[0]}
                </h5>
              </Link>
              <div className={style.inputs}>
                <button>
                  <img
                    src={dice1}
                    alt="sign un"
                    width="45px"
                    height="45px"
                    onClick={handleLogOut}
                  />
                  <h5>Sign Out</h5>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
