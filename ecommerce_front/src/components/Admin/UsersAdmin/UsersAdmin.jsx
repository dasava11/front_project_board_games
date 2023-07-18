import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../../../Photos/search_icon.svg";
import { getAllUsers } from "../../../Redux/actions_creators";
import { Switch } from "antd";
import style from "./userAdmin.module.css";

export const UsersAdmin = () => {
  const [checked, setChecked] = useState(false);
  const users = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const handleSwitch = () => {
    // desactivar usuario deleteUser
  };
  const handleSearchUsers = () => {
    //search user by id get user by id
  };
  console.log(users);
  return (
    <div className={style.mainContainerUser}>
      <h2>All Users</h2>
      <div className={style.searchContainer}>
        <img src={searchIcon} alt="search button" width="15px" height="15px" />
        <hr />
        <input
          className={style.inputSearch}
          type="search"
          placeholder="Search user by ID"
          onChange={handleSearchUsers}
        />
      </div>
      <table className={style.tableUser}>
        <thead className={style.titleUser}>
          <tr className={style.tr}>
            <th className={style.th}>Name</th>
            <th className={style.th}>Email</th>
            <th className={style.th}>Role</th>
            <th className={style.th}>Activate/Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((u) => {
              return (
                <tr className={style.tr} key={u.user_id}>
                  <td className={style.th}>{u.name}</td>
                  <td className={style.th}>{u.email}</td>
                  <td className={style.th}>{u.RoleRoleId}</td>
                  <td className={style.th}>
                    {users.active === true ? (
                      <Switch
                        checked={false}
                        onChange={() => {
                          handleSwitch(u.active);
                        }}
                      />
                    ) : (
                      <Switch
                        checked
                        onChange={() => {
                          handleSwitch(u.active);
                        }}
                      />
                    )}
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
