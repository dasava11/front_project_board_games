import React, { useState } from "react";
import style from "./sales.module.css";
export const Sales = () => {
  const [search, setSearch] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = () => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };
  return (
    <div>
      <h1>All Sales</h1>
      <form onSubmit={() => handleSubmit(e)}>
        <input
          value={search}
          name="search"
          className={style.searchInput}
          type="text"
          placeholder="Search User/Games "
          onChange={handleChange}
        />
        {/* <button type="submit">Search</button> */}
      </form>
      <table>
        <thead>
          <tr>
            <th>Purchase Id</th>
            <th>Name</th>
            <th>Purchase Status</th>
            <th>Products purchased </th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
