import React from "react";
import style from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import heartIcon from "../../Photos/heartIconEmpty.svg";
import shoppingCart from "../../Photos/shoppingCart.svg";
import { useAuth } from "../Auth/authContext";


const Navbar = () => {
  const navigate = useNavigate();
  const { userAuth } = useAuth();

  return (
    <div className={style.navBar}>
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
      </ul>
      <div className={style.navBarIcons}>
        <button className={style.heartIcon}>
          <img src={heartIcon} alt="heart Icon" width="30px" height="30px" />
        </button>
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
