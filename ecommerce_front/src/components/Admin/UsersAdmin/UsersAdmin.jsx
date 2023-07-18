import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../../../Photos/search_icon.svg";
import { getAllUsers } from "../../../Redux/actions_creators";

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

  const editUser = (e) => {
    const { name, value } = e.target;
    navigate(`/admin/userid/${value}`);
  };
  return (
    <div className={style.mainContainerUser}>
      <h2>All Users</h2>

      <table className={style.tableUser}>
        <thead className={style.titleUser}>
          <tr className={style.tr}>
            <th className={style.th}>Name</th>
            <th className={style.th}>Email</th>
            <th className={style.th}>Change Information</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((u) => {
              return (
                <tr className={style.tr} key={u.user_id}>
                  <td className={style.th}>{u.name}</td>
                  <td className={style.th}>{u.email}</td>
                  <td className={style.th}>
                    <button
                      className={style.thb}
                      key={u.user_id}
                      type="button"
                      value={u.user_id}
                      onClick={(e) => editUser(e)}
                    >
                      Edit User
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default UsersAdmin;
