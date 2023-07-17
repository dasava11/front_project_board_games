import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../../../Photos/search_icon.svg";
import { getAllUsers } from "../../../Redux/actions_creators";
import { toast } from "react-toastify";
import style from "./userAdmin.module.css";
import { useNavigate } from "react-router-dom";

export const UsersAdmin = () => {
  const [checked, setChecked] = useState(false);
  const [search, setSearch] = useState({});
  const users = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleSearchUsers = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (search) {
        navigate(`/admin/userid/${search}`);
        setSearch("");
      }
    }
  };

  return (
    <div className={style.mainContainerUser}>
      <h2>All Users</h2>
      <div className={style.searchContainer}>
        <img src={searchIcon} alt="search button" width="15px" height="15px" />
        <input
          className={style.inputSearch}
          type="search"
          placeholder="Search user by ID"
          onChange={handleSearchUsers}
          onKeyDown={handleKey}
        />
      </div>
      <table className={style.tableUser}>
        <thead className={style.titleUser}>
          <tr className={style.tr}>
            <th className={style.th}>UserID</th>
            <th className={style.th}>Name</th>
            <th className={style.th}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((u) => {
              return (
                <tr className={style.tr} key={u.user_id}>
                  <td className={style.th}>{u.user_id}</td>
                  <td className={style.th}>{u.name}</td>
                  <td className={style.th}>{u.email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default UsersAdmin;
