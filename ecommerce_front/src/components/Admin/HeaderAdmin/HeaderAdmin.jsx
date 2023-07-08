import React from "react";
import style from "./headerAdmin.module.css";
export const HeaderAdmin = () => {
  return (
    <div className={style.mainContainerAdmin}>
      <ul className={style.ulStyl}>
        <li className={style.dropdown}>
          <a href="" className={style.dropbtn}>
            Products
          </a>
          <div className={style.dropdownContent}>
            <a href="/createproduct">Create Product</a>
            <a href="/editproduct">Edit Product && Deactivate product</a>
          </div>
        </li>
      </ul>
      <ul className={style.ulStyl}>
        <li className={style.dropdown}>
          <a href="" className={style.dropbtn}>
            Sales
          </a>
          <div className={style.dropdownContent}>
            <a href="#">All Orders</a>
          </div>
        </li>
      </ul>
      <ul className={style.ulStyl}>
        <li className={style.dropdown}>
          <a href="" className={style.dropbtn}>
            Users
          </a>
          <div className={style.dropdownContent}>
            <a href="#">All Users</a>
          </div>
        </li>
      </ul>
    </div>
  );
};
