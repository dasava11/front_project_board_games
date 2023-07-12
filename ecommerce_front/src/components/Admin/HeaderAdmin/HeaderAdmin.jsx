import React from "react";
import style from "./headerAdmin.module.css";
import { Header } from "../../Header/Header";
export const HeaderAdmin = () => {
  return (
    <>
      <Header />
      <div className={style.mainContainerAdmin}>
        <ul className={style.ulStyl}>
          <li className={style.dropdown}>
            <a href="" className={style.dropbtn}>
              Products
            </a>
            <div className={style.dropdownContent}>
              <a href="/admin/createproduct">Create Product</a>
              <a href="/admin/editproduct">Edit && Deactivate Product</a>
            </div>
          </li>
        </ul>
        <ul className={style.ulStyl}>
          <li className={style.dropdown}>
            <a href="*" className={style.dropbtn}>
              Sales
            </a>
            <div className={style.dropdownContent}>
              <a href="/admin/sales">All Orders</a>
            </div>
          </li>
        </ul>
        <ul className={style.ulStyl}>
          <li className={style.dropdown}>
            <a href="*" className={style.dropbtn}>
              Users
            </a>
            <div className={style.dropdownContent}>
              <a href="/admin/usersadmin">All Users</a>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
