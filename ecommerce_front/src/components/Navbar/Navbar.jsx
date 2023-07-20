import React from "react";
import style from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import shoppingCart from "../../Photos/shoppingCart.svg";
import { useAuth } from "../Auth/authContext";
import userIcon from "../../Photos/icons8-user.png";

const Navbar = () => {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode);
  const { userAuth, role } = useAuth();

  return (
    <div className={darkMode === true ? style.darkNavBar : style.navBar}>
      <ul className={style.listFlex}>
        <li>
          <NavLink
            to="/questions"
            className={({ isActive }) =>
              isActive ? style.active : style.disable
            }
          >
            FAQ
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? style.active : style.disable
            }
          >
            Contact Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/games"
            className={({ isActive }) =>
              isActive ? style.active : style.disable
            }
          >
            Games
          </NavLink>
        </li>
        {role === "admin" && (
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? style.active : style.disable
              }
            >
              Menu Admin
            </NavLink>
          </li>
        )}
      </ul>
      <div className={style.navBarIcons}>
        {userAuth && role !== "admin" && (
          <button>
            <img
              src={userIcon}
              alt="userIcon"
              width="40px"
              height="40px"
              onClick={() => navigate("/user")}
            />
          </button>
        )}
        <button>
          <img
            src={shoppingCart}
            alt="Shopping cart"
            width="30px"
            height="30px"
            onClick={() => navigate("/cart")}
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
