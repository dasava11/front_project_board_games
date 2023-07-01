import React from "react";
import style from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import heartIcon from "../../Photos/heartIconEmpty.svg";
import shoppingCart from "../../Photos/shoppingCart.svg";

const Navbar = () => {
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
            to="/createproduct"
            className={({ isActive }) =>
              isActive ? style.active : style.disable
            }
          >
            Create Game
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/paypal"
            className={({ isActive }) =>
              isActive ? style.active : style.disable
            }
          >
            Paypal
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? style.active : style.disable
            }
          >
            Shopping Cart
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
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
