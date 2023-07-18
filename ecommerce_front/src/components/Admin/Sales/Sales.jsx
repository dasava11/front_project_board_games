import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../../../Photos/search_icon.svg";
import style from "./sales.module.css";
export const Sales = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.allPurchases);
  const [search, setSearch] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = () => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  return (
    <div className={style.mainFormPurchase}>
      <h1>All Sales</h1>
      <div className={style.searchContainer}>
        <img src={searchIcon} alt="search button" width="15px" height="15px" />
        <hr />
        <input
          className={style.inputSearch}
          type="search"
          placeholder="Search by ID"
          onChange={handleSubmit}
        />
      </div>
      <table className={style.purchaseTable}>
        <thead className={style.purchaseHead}>
          <tr className={style.purchTr}>
            <th className={style.tH}>Purchase Id</th>
            <th className={style.tH}>Username</th>
            <th className={style.tH}>Products purchased</th>
            <th className={style.tH}>Amount</th>
          </tr>
        </thead>
        <tbody className={style.purchaseBody}>
          {sales &&
            sales.map((sale) => {
              return (
                <tr className={style.purchTr}>
                  <td claseName={style.tH}>{sale.purchase_id}</td>
                  <td claseName={style.tH}>{sale.username}</td>
                  <td claseName={style.tH}>{sale.description}</td>
                  <td claseName={style.tH}>{sale.amount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
