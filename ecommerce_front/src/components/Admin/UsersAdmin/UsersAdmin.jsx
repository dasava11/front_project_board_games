import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const handleSwitch = () => {};
  console.log("aca users", users);
  return (
    <div className={style.mainContainerUser}>
      <h2>All Users</h2>
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
          {/* {users &&
            users.map((u) => {
              <tr>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.RoleRoleId}</td>
                <td>
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
              </tr>;
            })} */}
        </tbody>
      </table>
    </div>
  );
};
export default UsersAdmin;
