import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Photos/logo.png";
import dice1 from "../../Photos/dice_1.svg";
import dice4 from "../../Photos/dice_4.svg";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Header.module.css";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "../Auth/authContext";
import { auth } from "../Auth/firebase";
export const Header = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  //const [isLogged, setIsLogged] = useState(false);

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = window.localStorage.getItem("token");
  }, []);

  return (
    <div>
      <div className={style.headerFlex}>
        <img
          src={logo}
          alt="logo"
          className={style.logoHead}
          onClick={() => navigate("/")}
        />
        <div className={style.inputsSB}>
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
                <h6>Sign Up</h6>
              </button>
              <button>
                <img
                  src={dice4}
                  alt="log In"
                  width="45px"
                  height="45px"
                  onClick={() => navigate("/login")}
                />
                <h6>Log In</h6>
              </button>
            </div>
          )}

          {auth.currentUser && (
            <div>
              <h5 className={style.name}>{auth.currentUser.email}</h5>
              <div className={style.inputs}>
                <button>
                  <img
                    src={dice1}
                    alt="sign un"
                    width="45px"
                    height="45px"
                    onClick={handleLogOut}
                  />
                  <h6>Sign Out</h6>
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
